from django.shortcuts import render
from django.http import JsonResponse
from .models import Asteroid
import requests
from django.http import JsonResponse


def get_asteroids(request):
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')
    api_key = 'C19kqwt7QP6bxW07ckplyYYedRVjrpAOiuaagRbB'

    # Make a request to the NASA API
    response = requests.get(
        f'https://api.nasa.gov/neo/rest/v1/feed?start_date={start_date}&end_date={end_date}&api_key={api_key}'
    )
    data = response.json()
    print(data)

    # Extract asteroid data from the response
    asteroid_list = []
    near_earth_objects = data['near_earth_objects']
    for date in near_earth_objects:
        for asteroid in near_earth_objects[date]:
            asteroid_info = {
                'id': asteroid['id'],
                'name': asteroid['name'],
                'neo_reference_id': asteroid['neo_reference_id'],
                'absolute_magnitude_h': asteroid['absolute_magnitude_h'],
                'is_potentially_hazardous_asteroid': asteroid['is_potentially_hazardous_asteroid'],
                # Add more fields as needed
            }
            asteroid_list.append(asteroid_info)

    return JsonResponse({'asteroids': asteroid_list})