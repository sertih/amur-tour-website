import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''
    Возвращает список активных туров из базы данных.
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()

    cur.execute(
        "SELECT id, title, type, duration, price, difficulty, img, description, tag "
        "FROM tours WHERE is_active = TRUE ORDER BY id"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    tours = []
    for r in rows:
        tours.append({
            'id': r[0],
            'title': r[1],
            'type': r[2],
            'duration': r[3],
            'price': r[4],
            'difficulty': r[5],
            'img': r[6],
            'description': r[7],
            'tag': r[8]
        })

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'tours': tours}, ensure_ascii=False)
    }
