from flask import json, Flask, request
from app import create_app

app = create_app()

def test_get_recipes(client):
    response = client.get('/api/recipes')
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_get_recipe(client):
    response = client.get('/api/recipes/1')
    assert response.status_code == 200
    assert 'id' in response.json

def test_create_recipe(client):
    response = client.post('/api/recipes', json={
        'title': 'Test Recipe',
        'ingredients': 'Test Ingredients',
        'instructions': 'Test Instructions'
    })
    assert response.status_code == 201
    assert response.json['title'] == 'Test Recipe'

def test_update_recipe(client):
    response = client.put('/api/recipes/1', json={
        'title': 'Updated Recipe'
    })
    assert response.status_code == 200
    assert response.json['title'] == 'Updated Recipe'

def test_delete_recipe(client):
    response = client.delete('/api/recipes/1')
    assert response.status_code == 204

def test_toggle_favorite(client):
    response = client.post('/api/recipes/1/favorite')
    assert response.status_code == 200

def test_toggle_want_to_try(client):
    response = client.post('/api/recipes/1/want-to-try')
    assert response.status_code == 200