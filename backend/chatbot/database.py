from contextlib import contextmanager
from pymongo import MongoClient
import logging

logger = logging.getLogger(__name__)

@contextmanager
def get_db_connection(mongo_uri: str):
    client = None
    try:
        client = MongoClient(mongo_uri)
        yield client
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        raise
    finally:
        if client:
            client.close()