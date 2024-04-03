from django.urls import include, path
from . import views

urlpatterns = [
    path("",views.home),
    path("dashboard/",views.home),
    
    # path("login",views.login),
    # path("register",views.register),
    path("auth_user",views.auth_user),
    path("register_action",views.register_action),
    path("is_login",views.is_login),
    path("logout",views.logout),
    
    path("get_indices",views.get_indices),
    path("get_index_history",views.get_index_history),
    path("get_running_status",views.get_running_status),
    # path("overview",views.overview),
    # path("get_overview/<index>/",views.get_overview),
    path("get_daily_bhav_copy",views.get_daily_bhav_copy),
    # path("get_chart_data",views.get_chart_data),
    path("get_nse_fno_list",views.get_nse_fno_list),
    path("add_to_watchlist",views.add_to_watchlist),
    path("get_watchlist",views.get_watchlist),
    path("get_data",views.get_data),
    
]