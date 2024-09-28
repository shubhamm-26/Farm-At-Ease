from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from jose import jwt
from datetime import datetime, timedelta
from typing import Optional
from passlib.context import CryptContext
from config import MAIL_USERNAME, MAIL_PASSWORD, MAIL_FROM, SECRET_KEY

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

conf = ConnectionConfig(
    MAIL_USERNAME=MAIL_USERNAME,
    MAIL_PASSWORD=MAIL_PASSWORD,
    MAIL_FROM=MAIL_FROM,
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

ALGORITHM = "HS256"

def create_verification_token(email: str, expires_delta: Optional[timedelta] = None):
    to_encode = {"sub": email}
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def send_verification_email(email: str, token: str):
    message = MessageSchema(
    subject="Email Verification - FastAPI",
    recipients=[email],
    body=(
        "<h3>Hello,</h3>"
        "<p>Thank you for registering with our service. Please verify your email address "
        "by clicking the link below:</p>"
        f"<p><a href='http://localhost:8000/auth/verify_email?token={token}'"
        " style='color:blue; text-decoration:none;'>Verify Email</a></p>"
        "<p>If you did not request this, please ignore this email. "
        "This verification link will expire in 24 hours.</p>"
        "<p>Best regards,<br>Your FastAPI Team</p>"
    ),
    subtype="html"
)

    fm = FastMail(conf)
    await fm.send_message(message)

def verify_password(plain_password: str, hashed_password: str = None):
    if hashed_password:
        return pwd_context.verify(plain_password, hashed_password)
    return pwd_context.hash(plain_password)