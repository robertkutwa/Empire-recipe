from flask import json, Flask
from app import create_app

app = create_app()

def test_update_profile(client):
    response = client.put('/api/users/profile', json={
        'username': 'new_username',
        'email': 'new_email@example.com'
    })
    assert response.status_code == 200
    assert response.json['message'] == 'Profile updated successfully'

def test_get_user_interactions(client):
    response = client.get('/api/users/interactions')
    assert response.status_code == 200
    assert isinstance(response.json['interactions'], list)

def test_get_my_recipes(client):
    response = client.get('/api/users/my-recipes')
    assert response.status_code == 200
    assert isinstance(response.json['recipes'], list)

def test_get_favorite_recipes(client):
    response = client.get('/api/users/favorites')
    assert response.status_code == 200
    assert isinstance(response.json['favorites'], list)

def test_get_want_to_try_recipes(client):
    response = client.get('/api/users/want-to-try')
    assert response.status_code == 200
    assert isinstance(response.json['want_to_try'], list)