import asyncio

from app.models.user_model import users_collection
from app.auth.password import hash_password


async def test():
    try:
        print("Testing MongoDB INSERT...")

        new_user = {
            "name": "Test User",
            "email": "insert_test_2026@gmail.com",
            "password": hash_password("Test12345")
        }

        result = await users_collection.insert_one(new_user)

        print("INSERT SUCCESSFUL!")
        print("Inserted ID:", result.inserted_id)

    except Exception as e:
        print("INSERT ERROR:")
        print(type(e).__name__)
        print(e)


asyncio.run(test())