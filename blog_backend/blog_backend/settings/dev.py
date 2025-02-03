# Development-specific settings

from .base import *

# Override base.py settings for development
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1']