from django.db import models

class Asteroid(models.Model):
    name = models.CharField(max_length=255)
    size = models.FloatField()
    distance = models.FloatField()
    next_pass_date = models.DateField()

# Create your models here.
