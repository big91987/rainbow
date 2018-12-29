from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from django.core import serializers
from view.models import Book
from view.models import Test_info
# Create your views here.
#  定义各种restful接口
@require_http_methods(["GET"])
def add_book(request):
    response = {}
    try:
        book = Book(book_name=request.GET.get('book_name'))
        book.save()
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)

@require_http_methods(["GET"])
def show_books(request):
    response = {}
    try:
        books = Book.objects.filter()
        response['list']  = json.loads(serializers.serialize("json", books))
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)


@require_http_methods(["GET"])
def show_test_infos(request):
    response = {}
    try:
        test_infos = Test_info.objects.filter()
        response['list']  = json.loads(serializers.serialize("json", test_infos))
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)

@require_http_methods(["GET"])
def query_test_info(request):
    response = {}
    try:
        test_infos = Test_info.objects.filter(
          test_name     = request.GET.get('test_name'),
          test_type     = request.GET.get('test_type'),
          sub_id        = int(request.GET.get('sub_id')),
          device_type   = request.GET.get('device_type'),
        )
        response['list']  = json.loads(serializers.serialize("json", test_infos))
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)

@require_http_methods(["GET"])
def list_test(request):
    response = {}
    try:
        test_infos = Test_info.objects.values(
          'test_name','test_type', 'device_type', 'sub_id'
        ).distinct()

        response['list'] = list(test_infos)
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)

@require_http_methods(["GET"])
def add_test_info(request):
    response = {}
    try:
        test_info = Test_info(
          test_name     = request.GET.get('test_name'),
          test_type     = request.GET.get('test_type'),
          sub_id        = int(request.GET.get('sub_id')),
          device_type   = request.GET.get('device_type'),
          value_param   = request.GET.get('value_param'),
          seed          = int(request.GET.get('seed')),
          mae           = float(request.GET.get('mae')),
          mse           = float(request.GET.get('mse')),
          mae_threshold = float(request.GET.get('mae_threshold')),
          mse_threshold = float(request.GET.get('mse_threshold')),
          hardware_time = float(request.GET.get('hardware_time'))
        )
        test_info.save()

        test_name = request.GET.get('test_name'),
        test_type = request.GET.get('test_type'),
        sub_id = request.GET.get('sub_id'),
        device_type = request.GET.get('device_type'),
        value_param = request.GET.get('value_param'),
        seed = request.GET.get('seed'),
        mae = request.GET.get('mae'),
        mse = request.GET.get('mse'),
        mae_threshold = request.GET.get('mae_threshold'),
        mse_threshold = request.GET.get('mse_threshold'),
        hardware_time = request.GET.get('hardware_time')

        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception as e:
        response['msg'] = str(e) + str(request.GET)
        response['error_num'] = 1

    return JsonResponse(response)

def view(request):
  return render(request, 'index.html')
