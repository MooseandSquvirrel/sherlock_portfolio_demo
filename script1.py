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
    client_id = os.environ.get('FT_ID')
    client_secret = os.environ.get('FT_SECRET')
    url = "https://api.intra.42.fr"
    session = OAuth2Session(
        client_id,
        client_secret)
    token = session.fetch_token(url+"/oauth/token", grant_type='client_credentials')
    return session