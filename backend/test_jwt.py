from dotenv import load_dotenv
load_dotenv()

from app.auth.jwt_handler import create_access_token

token = create_access_token(
    {
        "sub": "anitha@gmail.com"
    }
)

print(token)