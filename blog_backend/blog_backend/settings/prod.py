# Production-specific settings

from .base import *

# Override base.py settings for production
DEBUG = False
ALLOWED_HOSTS = ['api.universityforeveryone.com']