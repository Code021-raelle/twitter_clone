def test_create_tweet(client, auth_headers):
    response = client.post(
        "/tweets/",
        json={"content": "Hello test tweet"},
        headers=auth_headers
    )

    assert response.status_code == 200
    assert response.json()["content"] == "Hello test tweet"
