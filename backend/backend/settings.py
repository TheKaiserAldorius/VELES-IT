import os
from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-px7^8m+e1v9b*!rrzed#tfzjtubhplmz%4v(spw*rrjlun9xqr'
DEBUG = True
ALLOWED_HOSTS = ['*']  # В production замените на конкретные домены

# Установленные приложения
INSTALLED_APPS = [
    # Стандартные Django приложения
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Сторонние приложения
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt',
    'admin_interface',  # Должно быть перед 'django.contrib.admin'
    'colorfield',       # Зависимость для admin_interface
    
    # Локальные приложения
    'telegram_form',
    'user_profile',
    'academy',
    'trello_abacus',  # Убрали .apps.TrelloAbacusConfig, так как это дублирование
]

# Исправленный порядок middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS middleware должен быть как можно выше
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Настройка кастомной админки
try:
    from trello_abacus.admin import admin_site
    ADMIN_SITE = admin_site
except ImportError:
    ADMIN_SITE = None

ROOT_URLCONF = 'backend.urls'

# Исправленные настройки шаблонов (убрали дублирование)
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, '../frontend/build'),  # Для React
            os.path.join(BASE_DIR, 'templates'),          # Кастомные шаблоны
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# База данных (SQLite для разработки)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Валидаторы паролей
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Локализация
LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_TZ = True

# Статические файлы
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
    os.path.join(BASE_DIR, '../frontend/build/static'),
]

# Медиа файлы
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Настройки CORS
CORS_ALLOW_ALL_ORIGINS = True  # Только для разработки!
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_METHODS = [
    'GET',
    'POST',
    'OPTIONS',
    'PATCH',
]

# Настройки REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.FormParser',
    ],
}

# Настройки JWT
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,
}

# Настройки Telegram
TELEGRAM_BOT_TOKEN = '7836391314:AAEH2IedyXcNKYpdnjeIWhSsh6GAINNEW-4'
TELEGRAM_CHAT_ID = '-1002632439429'

# API ключи (рекомендуется использовать переменные окружения в production)
TRELLO_API_KEY = "ea5b03ece4ac7fa0b2e979d6a474a9fa"
TRELLO_API_TOKEN = "ATTAcafce86412b8b74e0e2f61adf06fe674bbc60af332ae90a81300a71d4443b44949004115"
TRELLO_BOARD_ID = "cnjWPZl4"
ABACUS_API_KEY = "s2_9cdacf98f9b9449d871e7cfce9eea54a"
ABACUS_API_URL = "https://api.abacus.ai/v1/chat"

# Настройки AWS (раскомментируйтеемм потоим)
# AWS_ACCESS_KEY_ID = 'ваш-access-key'
# AWS_SECRET_ACCESS_KEY = 'ваш-secret-key'
# AWS_STORAGE_BUCKET_NAME = 'ваш-bucket'
# AWS_S3_REGION_NAME = 'eu-west-1'
# AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
# DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'