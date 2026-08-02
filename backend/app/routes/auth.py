from fastapi import APIRouter, HTTPException

from app.schemas.user_schema import (
    UserRegister,
    UserLogin,
)
from app.models.user_model import users_collection
from app.auth.password import (
    hash_password,
    verify_password,
)
from app.auth.jwt_handler import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ---------------- REGISTER ---------------- #

@router.post("/login")
async def login(user: UserLogin):

    try:
        print("Step 1: Searching user...")

        db_user = await users_collection.find_one(
            {"email": user.email}
        )

        print("User Found:", db_user)

        if not db_user:
            raise HTTPException(
                status_code=401,
                detail="Invalid Email"
            )

        print("Step 2: Verifying Password...")

        password_ok = verify_password(
            user.password,
            db_user["password"]
        )

        print("Password Result:", password_ok)

        if not password_ok:
            raise HTTPException(
                status_code=401,
                detail="Invalid Password"
            )

        print("Step 3: Creating JWT...")

        token = create_access_token(
            {
                "sub": str(db_user["_id"]),
                "email": db_user["email"]
            }
        )

        print("JWT Created Successfully")

        return {
            "access_token": token,
            "token_type": "bearer"
        }

    except Exception as e:
        print("LOGIN ERROR:")
        print(type(e).__name__)
        print(e)
        raise