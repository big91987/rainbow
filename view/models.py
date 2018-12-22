# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Book(models.Model):
    book_name = models.CharField(max_length=64)
    add_time = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.book_name

class Test_info(models.Model):
  test_name     = models.CharField(max_length=60)
  test_type     = models.CharField(max_length=30)
  sub_id        = models.IntegerField(max_length=11)
  device_type   = models.CharField(max_length=10)
  timestamp     = models.DateTimeField(auto_now_add=True)
  value_param   = models.CharField(max_length=100)
  seed          = models.IntegerField(max_length=11)
  mae           = models.FloatField()
  mse           = models.FloatField()
  mae_threshold = models.FloatField()
  mse_threshold = models.FloatField()
  hardware_time = models.FloatField()

  def __unicode__(self):
      return \
          '<-test_name = {}, test_type = {}, sub_id = {}, device_type = {}->'.format(
            self.test_name, self.test_type, self.sub_id, self.device_type)



