from django.shortcuts import render
from django.http import JsonResponse
import requests
from django.http import JsonResponse
import os
from groq import Groq # Official Groq API Python package


os.environ["OPENAI_API_BASE"] = 'https://api.groq.com/openai/v1'
os.environ["OPENAI_MODEL_NAME"] = 'llama3-8b-8192'
os.environ["OPENAI_API_KEY"] = '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'

client = Groq(
    api_key="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",
)


def GetDescription(resquest):
    question = resquest.GET.get('name')
    if len(question) :
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": f"You are an Ai expert in asteroid, your job is to give a description of the asteroid you are being ask",
                    #"content": "You are helpful memory recorder. Write outputs in JSON schema.\n",
                    #f" The JSON object must use the schema: {json.dumps(my_schema.model_json_schema(), indent=1)}",
                },
                {
                    "role": "user",
                    "content": f"give me a short 10 line description of asteroid {question}",
                }
            ],
            model="llama3-70b-8192",
            response_format={"type": "text"},
        )
        text = chat_completion.choices[0].message.content
        return JsonResponse({'description': text})


def get_asteroids(request):
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')
    api_key = 'C19kqwt7QP6bxW07ckplyYYedRVjrpAOiuaagRbB'

    # Make a request to the NASA API
    response = requests.get(
        f'https://api.nasa.gov/neo/rest/v1/feed?start_date={start_date}&end_date={end_date}&api_key={api_key}'
    )
    data = response.json()

    # Extract asteroid data from the response
    asteroid_list = []
    near_earth_objects = data['near_earth_objects']
    for date in near_earth_objects:
        for asteroid in near_earth_objects[date]:
            asteroid_info = {}
            for info in asteroid:
                asteroid_info[str(info)] = asteroid[info] 
            asteroid_list.append(asteroid_info)

    return JsonResponse({'asteroids': asteroid_list})