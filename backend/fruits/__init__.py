from fastapi import APIRouter
from fruits.apple.routes import router as apple_router
from fruits.grapes.routes import router as grapes_router
from fruits.peach.routes import router as peach_router

router = APIRouter()

# Include each fruit's router
router.include_router(apple_router, prefix="/apple", tags=["apple"])
router.include_router(grapes_router, prefix="/grapes", tags=["grapes"])
router.include_router(peach_router, prefix="/peach", tags=["peach"])
