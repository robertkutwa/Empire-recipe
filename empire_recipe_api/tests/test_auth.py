from flask import json, Flask
from app.routes.auth import handle_signup, handle_login, handle_demo_login, handle_get_me, handle_logout

def test_signup(client):
    response = client.post('/api/auth/signup', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    assert response.status_code == 201
    assert 'token' in response.json

def test_login(client):
    response = client.post('/api/auth/login', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    assert response.status_code == 200
    assert 'token' in response.json

def test_demo_login(client):
    response = client.post('/api/auth/demo-login')
    assert response.status_code == 200
    assert 'token' in response.json

def test_get_me(client):
    response = client.get('/api/auth/me', headers={
        'Authorization': 'Bearer test_token'
    })
    assert response.status_code == 200
    assert 'username' in response.json

def test_logout(client):
    response = client.post('/api/auth/logout', headers={
        'Authorization': 'Bearer test_token'
    })
    assert response.status_code == 200
    assert response.json['message'] == 'Logged out successfully'