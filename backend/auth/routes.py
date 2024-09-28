from fastapi import APIRouter, HTTPException
from auth.models import UserSignup, UserLogin, UserResponse
from auth.utils import create_verification_token, send_verification_email, verify_password
from motor.motor_asyncio import AsyncIOMotorClient # type: ignore
from config import MONGO_DETAILS, SECRET_KEY
from jose import JWTError, jwt # type: ignore

router = APIRouter()
client = AsyncIOMotorClient(MONGO_DETAILS)
db = client["auth"]
user_collection = db["user"]

@router.post("/signup", response_model=dict)
async def signup(user: UserSignup):
    existing_user = await user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered.")
    
    hashed_password = verify_password(user.password)
    user_dict = user.dict()
    user_dict['password'] = hashed_password
    user_dict['verified'] = False
    
    await user_collection.insert_one(user_dict)
    
    token = create_verification_token(user.email)
    await send_verification_email(user.email, token)
    
    return {"msg": "User created successfully, please verify your email."}

@router.get("/verify_email", response_model=dict)
async def verify_email(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=400, detail="Invalid token")
        
        await user_collection.update_one({"email": email}, {"$set": {"verified": True}})
        return {"msg": "Email verified successfully!"}
    
    except JWTError:
        raise HTTPException(status_code=400, detail="Invalid token")

@router.post("/login", response_model=dict)
async def login(user: UserLogin):
    db_user = await user_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    if not db_user.get("verified", False):
        raise HTTPException(status_code=400, detail="Email not verified")
    
    # Create JWT token on successful login
    token = jwt.encode({"email": db_user["email"]}, SECRET_KEY, algorithm="HS256")
    
    return {"access_token": token, "token_type": "bearer", "username": db_user["username"]}

@router.get("/test_email")
async def test_email():
    try:
        await send_verification_email("your_test_email@example.com", "test_token")
        return {"message": "Test email sent successfully"}
    except Exception as e:
        return {"error": str(e)}