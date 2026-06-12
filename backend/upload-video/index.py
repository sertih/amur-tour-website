import os
import requests
import boto3


def handler(event: dict, context) -> dict:
    """Скачивает видео по URL и загружает в S3 хранилище проекта"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    import json
    body = json.loads(event.get('body') or '{}')
    url = body.get('url')
    filename = body.get('filename', 'video.mp4')

    response = requests.get(url, stream=True, timeout=120)
    response.raise_for_status()

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    s3.put_object(
        Bucket='files',
        Key=f'videos/{filename}',
        Body=response.content,
        ContentType='video/mp4'
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/videos/{filename}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'url': cdn_url})
    }
