from fastapi import FastAPI

app = FastAPI()

@app.get("/greet")
def greet():
    return {"message": "Hello World"}

def ensure_base64_padding(base64_string):
    return base64_string + '=' * (4 - len(base64_string) % 4)
