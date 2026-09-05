import asyncio

from app.database.mongodb import client


async def test():
    try:
        result = await client.admin.command("ping")

        print("MongoDB Connected Successfully!")
        print("Ping Result:", result)

    except Exception as e:
        print("MongoDB Connection Error:")
        print(repr(e))

    finally:
        client.close()


asyncio.run(test())