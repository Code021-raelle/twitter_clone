import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.database import Base, get_db

# Create a test database
SQLALCHEMY_DATABASE_URL = "postgresql://gabby:gabriel@localhost/test_db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Create fresh DB before tests
Base.metadata.create_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db


@pytest.fixture()
def client():
    with TestClient(app) as c:
        yield c


@pytest.fixture
def auth_headers(client):
    client.post("/auth/register", json={
        "username": "authuser",
        "email": "auth@test.com",
        "password": "password123"
    })

    login = client.post("/auth/login", data={
        "username": "authuser",
        "password": "password123"
    })

    token = login.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}
