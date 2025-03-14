from fastapi import APIRouter, HTTPException, Depends
from langchain.llms import Ollama
from langchain.chains import ConversationChain
from langchain.memory import MongoDBChatMessageHistory, ConversationBufferMemory
from pymongo import MongoClient
from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Dict
from .database import get_db_connection
import logging
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration constants
MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb://mongo:27017/")
DB_NAME = os.getenv("DB_NAME", "farmatease")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "chat_history")
MODEL_NAME = os.getenv("MODEL_NAME", "llama3.1")

# AI Assistant Context for Farming
FARMING_CONTEXT = """
**Role**: Agricultural Expert Assistant  
**Primary Objective**: Provide actionable, evidence-based farming guidance  

**Core Functions**:
1. 🩺 Disease Diagnosis & Management
   - Identify symptoms accurately (ask clarifying questions if needed)
   - Recommend *organic treatments first* (neem, biopesticides)
   - Suggest chemical interventions only when necessary (include safety precautions)

2. 🌱 Best Practices Guidance
   - Crop-specific cultivation techniques
   - Soil health management
   - Water conservation methods
   - Regional climate-appropriate advice

3. 🚨 Emergency Response
   - Prioritize urgent issues (pest outbreaks, nutrient deficiencies)
   - Provide step-by-step crisis management
   - Highlight warning signs requiring professional intervention

**Response Guidelines**:
✅ Do:
- Use simple, non-technical language
- Structure answers with bullet points
- Ask follow-up questions when details are missing
- Cite sources for uncommon recommendations
- Suggest local resources when available

❌ Don't:
- Guess uncertain information
- Recommend unverified home remedies
- Suggest non-regional solutions
- Provide financial/legal advice

**Safety Protocol**:
1. Always include disclaimer: "Consult local agricultural extension officer for verification"
2. Flag potentially risky suggestions with ⚠️ symbol
3. For unclear cases: "This requires expert inspection. Please share photos if possible."

**Example Response Format**:
"[Brief summary]  

**Recommended Actions**:  
1. First action step  
2. Second action step  

**Prevention Tips**:  
- Long-term prevention method  
- Companion planting suggestion  

⚠️ **Safety Note**: [If applicable]"

**Cultural Context**:
- Prioritize traditional farming knowledge where appropriate
- Suggest region-specific variants of solutions
- Consider smallholder farmer resource constraints
"""

# Initialize a single LLM instance for efficiency
llm = Ollama(model=MODEL_NAME)

# Create a single MongoDB client
mongo_client = MongoClient(MONGO_DETAILS)

# Pydantic Models
class ChatMessage(BaseModel):
    message: str
    user_id: str = Field(default="anonymous")  # Make user_id optional with default

class ChatResponse(BaseModel):
    response: str
    timestamp: datetime = Field(default_factory=datetime.now)


class ChatHistory(BaseModel):
    user_id: str
    messages: List[Dict[str, str]]
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

# Dependency Injection for MongoDB
def get_mongo_client():
    return mongo_client

@router.post("/chat", response_model=ChatResponse)
async def chat_with_farmer(chat_message: ChatMessage):
    logger.info(f"Received message: {chat_message.dict()}")  # Add logging
    try:
        with get_db_connection(MONGO_DETAILS) as mongo_client:
            message_history = MongoDBChatMessageHistory(
                connection_string=MONGO_DETAILS,
                database_name=DB_NAME,
                collection_name=COLLECTION_NAME,
                session_id=chat_message.user_id
            )

            # Format the user's input with farming context
            formatted_input = f"Question about farming: {chat_message.message}"
            
            # Create memory and conversation chain
            memory = ConversationBufferMemory(
                chat_memory=message_history,
                return_messages=True
            )

            conversation = ConversationChain(
                llm=llm,
                memory=memory,
                verbose=True
            )

            response = conversation.predict(input=formatted_input)
            current_time = datetime.now()
            
            logger.info(f"Generated response at {current_time}")
            
            return ChatResponse(
                response=response,
                timestamp=current_time
            )

    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# Endpoint to retrieve chat history
@router.get("/history/{user_id}", response_model=ChatHistory)
async def get_chat_history(user_id: str, mongo_client=Depends(get_mongo_client)):
    try:
        chat_collection = mongo_client[DB_NAME][COLLECTION_NAME]
        chat_data = chat_collection.find_one({"user_id": user_id}, {"_id": 0})  # Exclude MongoDB's `_id` field

        if not chat_data:
            logger.info(f"No chat history found for user {user_id}")
            return ChatHistory(user_id=user_id, messages=[])

        return ChatHistory(**chat_data)

    except Exception as e:
        logger.error(f"Error retrieving chat history: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while fetching chat history"
        )
