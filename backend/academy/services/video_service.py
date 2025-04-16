# services/video_service.py
import boto3
from django.conf import settings

def generate_video_url(video_key):
    s3 = boto3.client('s3', region_name='eu-west-1')
    return s3.generate_presigned_url(
        'get_object',
        Params={'Bucket': settings.AWS_STORAGE_BUCKET_NAME, 'Key': video_key},
        ExpiresIn=3600  # Ссылка на 1 час
    )