from django.contrib import admin
from .models import CarMake, CarModel

@admin.register(CarMake)
class CarMakeAdmin(admin.ModelAdmin):
    """Admin interface for CarMake"""
    list_display = ['id', 'name', 'description']
    search_fields = ['name', 'description']
    ordering = ['name']
    list_per_page = 20

@admin.register(CarModel)
class CarModelAdmin(admin.ModelAdmin):
    """Admin interface for CarModel"""
    list_display = ['id', 'name', 'car_make', 'type', 'year', 'dealer_id']
    list_filter = ['car_make', 'type', 'year']
    search_fields = ['name', 'car_make__name']
    ordering = ['-year', 'car_make', 'name']
    list_per_page = 20
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('car_make', 'name', 'type')
        }),
        ('Details', {
            'fields': ('year', 'dealer_id')
        }),
    )