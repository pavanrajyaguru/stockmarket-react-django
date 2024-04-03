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
    uname =  post_data["uname"]
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
        if len(user_obj) > 0 :
            if check_password(password,user_obj[0]["password"]):
                response = { "code":1,"msg":"Login Successfull" ,"data":user_obj[0]}
                request.session["id"] = user_obj[0]["id"]
                request.session["name"] = user_obj[0]["name"]
                request.session["email"] = user_obj[0]["email"]
                request.session["gender"] = user_obj[0]["gender"]
                print(request.session.keys())
            else : 
                response = { "code":0,"msg":"Incorrect Email or password"}
            return HttpResponse(json.dumps(response))
        
    return HttpResponse(json.dumps({ "code":0,"msg":"Email and Password not found" }))
 
@csrf_exempt       
def is_login(request):
    
    response = {
        "code" : 0,
        "data" : {}
    }
    print(request.session.keys())
    
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
    
    if request.body == b'':
        post_data = {}
    else:
        post_data = json.loads(request.body)
    start = post_data.get("start",0)
    end = post_data.get("end",10)
    # print(get_bhavcopy("04-06-2021"))
    # events = nse_events()
    # circular = nse_circular(mode="latest")
    # quote = nsetools_get_quote("IBM")
    
    response = positions["data"][int(start):int(end)]
    return HttpResponse(json.dumps(response))


def get_running_status(request):
    return HttpResponse(str(running_status()))

def get_nse_fno_list(request):
    fno_list = fnolist()
    print("fno_list", fno_list)
    # print(nse_eq("JUSTDIAL")['priceInfo']['open'])
    # print(nse_eq("JUSTDIAL")['priceInfo']['intraDayHighLow']['min'])
    # print(nse_eq("JUSTDIAL")['priceInfo']['intraDayHighLow']['max'])
    # print(nse_eq("JUSTDIAL")['priceInfo']['close'])
    return HttpResponse(json.dumps(fno_list),content_type='application/json')


@csrf_exempt
def get_daily_bhav_copy(request):
    
    today = datetime.now()
    weekday = today.weekday()
    
    if weekday == 5:  # Saturday
        adjusted_date = today - timedelta(days=1)
    elif weekday == 6:  # Sunday
        adjusted_date = today - timedelta(days=2)
    else:
        adjusted_date = today
    
    adjusted_date = adjusted_date.strftime("%d-%m-%Y")
    
    post_data = {}
    if request.body != b'' :
        post_data = json.loads(request.body)
        bhavcopy = get_bhavcopy(post_data.get("bhav_date"))
    else : 
        bhavcopy = get_bhavcopy(adjusted_date)
    
    return HttpResponse(json.dumps(bhavcopy.to_json(orient='records')))

# def get_index_history(request):
    
#     # post_data = json.loads(request.body)
    
#     # symbol = post_data["symbol"]
#     # start_date = post_data["start_date"]
#     # end_date = post_data["end_date"]
    
#     respoonse = index_history("NIFTY","24-02-2024","25-03-2024")
#     print("respoonse", respoonse)
    
#     return HttpResponse(json.loads(respoonse))

@csrf_exempt
def add_to_watchlist(request):
    
    post_data = []
    if request.body != b'':
        post_data = json.loads(request.body)
        
        user_id = post_data["user_id"]
        watchlist_name = post_data["watchlist_name"]
        index = post_data["index"]
        
        user_obj = User.objects.get(id = user_id)
        watchlist_obj = Watch_list(user_id = user_obj,index=index,w_name=watchlist_name)
        watchlist_obj.save()
        
        return HttpResponse(json.dumps({"code": 1,"msg" : "Added to watchlist"}))
    
    else:
        return HttpResponse(json.dumps({"code": 0,"msg" : "Error Occoured"}))
        
@csrf_exempt
def get_watchlist(request):
    
    if request.body != b'':
        post_data = json.loads(request.body)
        user_id = post_data["user_id"]
        
        watchlist_obj = Watch_list.objects.filter(user_id = user_id).values()
        
        return HttpResponse(json.dumps(watchlist_obj))
    
    
@csrf_exempt 
def remove_from_watchlist(request):
    
    if request.body == b'':
        return HttpResponse(json.loads({"code":0,"msg":"Error occoured"}))
    else:
        post_data = json.loads(request.body)
        
        user_id = post_data["user_id"]
        watchlist_name = post_data["watchlist_name"]
        index = post_data["index"]
        
        watchlist_obj = Watch_list.objects.get(user_id=user_id,w_name=watchlist_name,index = index)
        watchlist_obj.delete()
        
        return HttpResponse(json.dumps({"code":1,"msg":"Removed from watchlist"}))
    
    
def get_data(request):
    watchlist_obj = Watch_list.objects.filter().order_by('-id').values()
    pprint("watchlist_obj", watchlist_obj)
    return HttpResponse("True")
        