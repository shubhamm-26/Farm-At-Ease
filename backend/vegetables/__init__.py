from fastapi import APIRouter
from vegetables.potato.routes import router as potato_router
from vegetables.tomato.routes import router as tomato_router
from vegetables.corn.routes import router as corn_router
from vegetables.pepper.routes import router as pepper_router

router = APIRouter()

# Include each vegetable's router
router.include_router(potato_router, prefix="/potato", tags=["potato"])
router.include_router(tomato_router, prefix="/tomato", tags=["tomato"])
router.include_router(corn_router, prefix="/corn", tags=["corn"])
router.include_router(pepper_router, prefix="/pepper", tags=["pepper"])



