def test_register_user(client):
    response = client.post("/auth/register", json={
        "username": "testuser",
        "email": "test@test.com",
        "password": "testpassword123"
    })

    assert response.status_code == 200
    assert response.json()["username"] == "testuser"


def test_login_user(client):
    # First, register the user
    client.post("/auth/register", json={
        "username": "loginuser",
        "email": "login@test.com",
        "password": "password123"
    })

    # Then, login the user
    response = client.post("/auth/login", data={
        "username": "loginuser",
        "password": "password123"
    })

    assert response.status_code == 200
    assert "access_token" in response.json()
