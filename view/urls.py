from django.conf.urls import url, include
#import views
from view import views as view_views

urlpatterns = [
    url(r'add_book$', view_views.add_book, ),
    url(r'show_books$', view_views.show_books, ),
    url(r'add_test_info$', view_views.add_test_info),
    url(r'show_test_infos$', view_views.show_test_infos),
    url(r'query_test_info$', view_views.query_test_info),
]

