import json
import os
import base64
import uuid
import hmac
import hashlib
import datetime
from urllib.request import urlopen, Request
from urllib.error import HTTPError

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
}

def sign(key, msg):
    return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()

def get_signature_key(key, date_stamp, region, service):
    k_date = sign(('AWS4' + key).encode('utf-8'), date_stamp)
    k_region = sign(k_date, region)
    k_service = sign(k_region, service)
    k_signing = sign(k_service, 'aws4_request')
    return k_signing

def s3_put(key, body, content_type, access_key, secret_key):
    endpoint = 'https://bucket.poehali.dev'
    bucket = 'files'
    region = 'us-east-1'
    service = 's3'

    now = datetime.datetime.utcnow()
    amz_date = now.strftime('%Y%m%dT%H%M%SZ')
    date_stamp = now.strftime('%Y%m%d')

    host = 'bucket.poehali.dev'
    canonical_uri = f'/{bucket}/{key}'
    canonical_querystring = ''

    payload_hash = hashlib.sha256(body).hexdigest()

    canonical_headers = (
        f'content-type:{content_type}\n'
        f'host:{host}\n'
        f'x-amz-content-sha256:{payload_hash}\n'
        f'x-amz-date:{amz_date}\n'
    )
    signed_headers = 'content-type;host;x-amz-content-sha256;x-amz-date'

    canonical_request = '\n'.join([
        'PUT', canonical_uri, canonical_querystring,
        canonical_headers, signed_headers, payload_hash
    ])

    credential_scope = f'{date_stamp}/{region}/{service}/aws4_request'
    string_to_sign = '\n'.join([
        'AWS4-HMAC-SHA256', amz_date, credential_scope,
        hashlib.sha256(canonical_request.encode('utf-8')).hexdigest()
    ])

    signing_key = get_signature_key(secret_key, date_stamp, region, service)
    signature = hmac.new(signing_key, string_to_sign.encode('utf-8'), hashlib.sha256).hexdigest()

    authorization = (
        f'AWS4-HMAC-SHA256 Credential={access_key}/{credential_scope}, '
        f'SignedHeaders={signed_headers}, Signature={signature}'
    )

    url = f'{endpoint}/{bucket}/{key}'
    req = Request(url, data=body, method='PUT')
    req.add_header('Host', host)
    req.add_header('Content-Type', content_type)
    req.add_header('x-amz-date', amz_date)
    req.add_header('x-amz-content-sha256', payload_hash)
    req.add_header('Authorization', authorization)

    try:
        with urlopen(req) as resp:
            return resp.status
    except HTTPError as e:
        raise Exception(f'S3 upload failed: {e.code} {e.read()}')

def handler(event: dict, context) -> dict:
    """Загрузка фото в галерею сайта через S3"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    body = json.loads(event.get('body', '{}'))
    image_data = body.get('image')
    label = body.get('label', 'Фото галереи')
    slot_index = body.get('slot_index', 0)

    if not image_data:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Нет изображения'})
        }

    if ',' in image_data:
        header, image_data = image_data.split(',', 1)
        content_type = header.split(':')[1].split(';')[0] if ':' in header else 'image/jpeg'
    else:
        content_type = 'image/jpeg'

    ext = content_type.split('/')[-1].replace('jpeg', 'jpg')
    file_key = f"gallery/slot_{slot_index}_{uuid.uuid4().hex[:8]}.{ext}"
    image_bytes = base64.b64decode(image_data)

    access_key = os.environ['AWS_ACCESS_KEY_ID']
    secret_key = os.environ['AWS_SECRET_ACCESS_KEY']

    s3_put(file_key, image_bytes, content_type, access_key, secret_key)

    cdn_url = f"https://cdn.poehali.dev/projects/{access_key}/files/{file_key}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'url': cdn_url, 'label': label, 'slot_index': slot_index})
    }
