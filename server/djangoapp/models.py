from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class CarMake(models.Model):
    """Model representing a car manufacturer"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Car Make"
        verbose_name_plural = "Car Makes"
        ordering = ['name']

class CarModel(models.Model):
    """Model representing a specific car model"""
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE, related_name='models')
    name = models.CharField(max_length=100)
    
    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('WAGON', 'Wagon'),
        ('COUPE', 'Coupe'),
        ('HATCHBACK', 'Hatchback'),
        ('TRUCK', 'Truck'),
        ('CONVERTIBLE', 'Convertible'),
        ('VAN', 'Van'),
    ]
    
    type = models.CharField(max_length=15, choices=CAR_TYPES, default='SEDAN')
    year = models.IntegerField(
        validators=[
            MaxValueValidator(2025),
            MinValueValidator(2000)
        ]
    )
    dealer_id = models.IntegerField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.car_make.name} {self.name} ({self.year})"
    
    class Meta:
        verbose_name = "Car Model"
        verbose_name_plural = "Car Models"
        ordering = ['-year', 'car_make', 'name']