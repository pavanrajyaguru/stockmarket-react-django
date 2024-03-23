from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True,verbose_name="ID")
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=150)
    gender = models.CharField(max_length=50)
    
class Watch_list(models.Model):
    user_id = models.ForeignKey("User", verbose_name=("user_id"), on_delete=models.CASCADE)
    index = models.CharField(max_length=255)
    w_name = models.CharField(max_length=100)
    date_modified = models.DateTimeField(auto_now=True)
