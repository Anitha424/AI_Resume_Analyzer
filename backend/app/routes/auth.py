from fastapi import APIRouter, HTTPException
from pymongo.errors import PyMongoError

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

@router.post("/register")
async def register(user: UserRegister):

    try:
        # Check whether the email already exists
        existing_user = await users_collection.find_one(
            {"email": user.email}
        )

        if existing_user:
            raise HTTPException(
                status_code=409,
                detail="Email already registered"
            )

        # Create new user
        new_user = {
            "name": user.name,
            "email": user.email,
            "password": hash_password(user.password)
        }

        # Insert user into MongoDB
        await users_collection.insert_one(new_user)

        print("User Registered Successfully")

        return {
            "message": "Registration Successful"
        }

    except HTTPException:
        raise

    except PyMongoError as e:
        print("REGISTER DATABASE ERROR:")
        print(type(e).__name__)
        print(e)

        raise HTTPException(
            status_code=503,
            detail="Database unavailable. Check the MongoDB connection settings."
        )


# ---------------- LOGIN ---------------- #

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

    except HTTPException:
        raise

    except PyMongoError as e:
        print("LOGIN DATABASE ERROR:")
        print(type(e).__name__)
        print(e)

        raise HTTPException(
            status_code=503,
            detail="Database unavailable. Check the MongoDB connection settings."
        )

    except Exception as e:
        print("LOGIN ERROR:")
        print(type(e).__name__)
        print(e)

        raise HTTPException(
            status_code=500,
            detail="Login failed"
        )