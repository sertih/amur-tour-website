import json
import os
import hashlib
import psycopg2


def check_auth(event: dict) -> bool:
    headers = event.get('headers') or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
    admin_password = os.environ.get('ADMIN_PASSWORD', '')
    if not admin_password or not token:
        return False
    expected = hashlib.sha256(admin_password.encode()).hexdigest()
    return token == expected


def handler(event: dict, context) -> dict:
    '''
    Управление турами: создание, изменение, удаление.
    Требует заголовок X-Auth-Token с токеном администратора.
    '''
    method = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
        'Access-Control-Max-Age': '86400'
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    headers = {'Content-Type': 'application/json', **cors_headers}

    if method == 'POST':
        body_preview = json.loads(event.get('body') or '{}')
        if body_preview.get('action') == 'login':
            password = body_preview.get('password', '')
            admin_password = os.environ.get('ADMIN_PASSWORD', '')
            if not admin_password or password != admin_password:
                return {
                    'statusCode': 401,
                    'headers': headers,
                    'body': json.dumps({'error': 'Неверный пароль'}, ensure_ascii=False)
                }
            token = hashlib.sha256(admin_password.encode()).hexdigest()
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'token': token}, ensure_ascii=False)}

    if not check_auth(event):
        return {
            'statusCode': 401,
            'headers': headers,
            'body': json.dumps({'error': 'Не авторизован'}, ensure_ascii=False)
        }

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()

    try:
        if method == 'POST':
            body = json.loads(event.get('body') or '{}')
            cur.execute(
                "INSERT INTO tours (title, type, duration, price, difficulty, img, description, tag, is_active) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
                (
                    body.get('title', ''),
                    body.get('type', ''),
                    int(body.get('duration', 0)),
                    int(body.get('price', 0)),
                    body.get('difficulty', ''),
                    body.get('img', ''),
                    body.get('description', ''),
                    body.get('tag', ''),
                    bool(body.get('is_active', True))
                )
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'id': new_id}, ensure_ascii=False)}

        if method == 'PUT':
            body = json.loads(event.get('body') or '{}')
            tour_id = int(body.get('id'))
            cur.execute(
                "UPDATE tours SET title=%s, type=%s, duration=%s, price=%s, difficulty=%s, "
                "img=%s, description=%s, tag=%s, is_active=%s, updated_at=NOW() WHERE id=%s",
                (
                    body.get('title', ''),
                    body.get('type', ''),
                    int(body.get('duration', 0)),
                    int(body.get('price', 0)),
                    body.get('difficulty', ''),
                    body.get('img', ''),
                    body.get('description', ''),
                    body.get('tag', ''),
                    bool(body.get('is_active', True)),
                    tour_id
                )
            )
            conn.commit()
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True})}

        if method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            tour_id = int(params.get('id', 0))
            cur.execute("DELETE FROM tours WHERE id=%s", (tour_id,))
            conn.commit()
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True})}

        if method == 'GET':
            cur.execute(
                "SELECT id, title, type, duration, price, difficulty, img, description, tag, is_active "
                "FROM tours ORDER BY id"
            )
            rows = cur.fetchall()
            tours = [
                {
                    'id': r[0], 'title': r[1], 'type': r[2], 'duration': r[3],
                    'price': r[4], 'difficulty': r[5], 'img': r[6],
                    'description': r[7], 'tag': r[8], 'is_active': r[9]
                }
                for r in rows
            ]
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'tours': tours}, ensure_ascii=False)}

        return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}
    finally:
        cur.close()
        conn.close()