from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from nsepython import *
from django.contrib.auth.hashers import make_password, check_password
from .models import *
from pprint import pprint
from datetime import datetime, timedelta
import yfinance as yf


def home(request):
    return render(request,"index.html")

def login(request):
    return render(request,"index.html")
    
def register(request):
    return render(request,"index.html")

def get_index_history(request):
    print("Called")
    return HttpResponse("Hello World")