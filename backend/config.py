import os
from dotenv import load_dotenv

def load_config():
    load_dotenv()

load_config()

MONGO_DETAILS = os.getenv("MONGO_DETAILS")
SECRET_KEY = os.getenv("SECRET_KEY")
MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = "sugqhdzxxrdwdxfr"
MAIL_FROM = os.getenv("MAIL_FROM")