from pymongo import MongoClient

uri = "mongodb+srv://Anitha2005_db_user:Anitha2005@cluster0.ywvowwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

try:
    client = MongoClient(uri)
    print(client.list_database_names())
    print("MongoDB Connected Successfully")
except Exception as e:
    print(e)