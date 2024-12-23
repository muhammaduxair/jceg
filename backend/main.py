from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils import global_exception_handler
from routers.agent_router import router as agent_router
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

origins = os.getenv('ALLOWED_ORIGINS').split(',')

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Add the global exception handler
app.add_exception_handler(Exception, global_exception_handler)

# Add routers
app.include_router(agent_router)
