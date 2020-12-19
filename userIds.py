#!/usr/bin/env python3 

from authlib.client import OAuth2Session
from pprint import pprint
import sys
import time as t
import json
from datetime import datetime, date, time, timedelta
import datetime
import sys
sys.path.insert(0, '/Users/agardner/bocal/get_hours')
import os

def client():

    client_id = '**REMOVED**'
    client_secret = '**REMOVED**'
    url = "https://api.intra.42.fr"
    session = OAuth2Session(
        client_id,
        client_secret)
    token = session.fetch_token(url+"/oauth/token", grant_type='client_credentials')
    return session

# user_id NEEDS TO BE PASSED FROM intra.js
def get_quests(sesh, user_id):

    page = 1
    sublist = []
    quest_names = []

    main_list = []
    while True:
        raw_results = sesh.get(f"https://api.intra.42.fr/v2/users/{user_id}/quests_users?page={page}")
      
        if raw_results.status_code == 200:
            sublist = raw_results.json()
            
            for x in sublist:
                if x['quest']['name'] == "Common Core":
                    if x['validated_at'] != None:
                        print('Outer Ring of curriculum - They are ready!')
                        return
                    elif x['validated_at'] == None:
                        print('Inner Ring of curriculumn -- Not quite ready...')
                        return

            print('Not on Common Core Curriculum.')
            return

            if sublist == []:
                break
            else:
                main_list += sublist
                page = page + 1
        else:
            break

sesh = client()
get_quests(sesh, sys.argv[1])
