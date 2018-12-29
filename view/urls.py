from django.conf.urls import url, include
from django.conf import settings
#import views
from view import views as view_views

urlpatterns = [
    url(r'api/add_book$', view_views.add_book, ),
    url(r'api/show_books$', view_views.show_books, ),
    url(r'api/add_test_info$', view_views.add_test_info),
    url(r'api/show_test_infos$', view_views.show_test_infos),
    url(r'api/query_test_info$', view_views.query_test_info),
    url(r'api/list_test$', view_views.list_test),
    url(r'', view_views.view),
]

