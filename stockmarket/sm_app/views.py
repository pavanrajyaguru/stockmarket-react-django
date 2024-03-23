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

@csrf_exempt
def register_action(request):
    post_data = json.loads(request.body)
    uname =  post_data["username"]
    email = post_data["email"]
    password = make_password(post_data["password"])
    gender = post_data["gender"]
    
    user_obj = User.objects.filter(email = email).values()
    if len(user_obj) > 0:
        return HttpResponse("Email already exist!")
    else :
        user_obj = User(name = uname,email = email,password = password,gender = gender)
        user_obj.save()
        return HttpResponse("User saved successfully!")

@csrf_exempt
def auth_user(request):
    post_data = json.loads(request.body)
    email = post_data["email"]
    password = post_data["password"]

    if email != None and password != None:
        user_obj = User.objects.filter(email = email).values()
        print(user_obj[0],"user")
        if len(user_obj) > 0 :
            if check_password(password,user_obj[0]["password"]):
                response = { "code":1,"msg":"Login Successfull" ,"data":user_obj[0]}
                request.session["id"] = user_obj[0]["id"]
                request.session["name"] = user_obj[0]["name"]
                request.session["email"] = user_obj[0]["email"]
                request.session["gender"] = user_obj[0]["gender"]
            else : 
                response = { "code":0,"msg":"Incorrect Email or password"}
            return HttpResponse(json.dumps(response))
        
    return HttpResponse(json.dumps({ "code":0,"msg":"Email and Password not found" }))
        
def is_login(request):
    
    response = {
        "code" : 0,
        "data" : {}
    }
    
    if "id" in request.session:
        response["code"] = 1
        response["data"]["id"] = request.session["id"]
        response["data"]["name"] = request.session["name"]
        response["data"]["email"] = request.session["email"]
        response["data"]["gender"] = request.session["gender"]
    
    return HttpResponse(json.dumps(response))


    
def logout(request):
    try:
        del request.session['id']
        del request.session['name']
        del request.session['email']
        del request.session['gender']
    except KeyError:
        pass
    return HttpResponse("Logout Successfull")


@csrf_exempt
def get_indices(request):
    positions = nsefetch('https://www.nseindia.com/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O')
    post_data = json.loads(request.body)
    start = post_data.get("start",0)
    end = post_data.get("end",10)
    print(get_bhavcopy("04-06-2021"))
    # events = nse_events()
    # circular = nse_circular(mode="latest")
    # quote = nsetools_get_quote("IBM")
    
    response = positions["data"][int(start):int(end)]
    return HttpResponse(json.dumps(response))


def get_running_status(request):
    return HttpResponse(str(running_status()))