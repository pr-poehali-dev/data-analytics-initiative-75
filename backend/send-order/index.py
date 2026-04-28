import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    '''
    Принимает заявку с формы сайта и отправляет её на почту danilAkz@yandex.ru
    Args: event - dict with httpMethod, body (JSON: name, phone, email, objectType, message)
    Returns: HTTP response с результатом отправки заявки
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    try:
        body_data = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid JSON'})
        }

    name = body_data.get('name', '').strip()
    phone = body_data.get('phone', '').strip()
    email = body_data.get('email', '').strip()
    object_type = body_data.get('objectType', '').strip()
    message = body_data.get('message', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Name and phone required'})
        }

    object_types_map = {
        'residential': 'Жилое здание',
        'commercial': 'Общественный/коммерческий объект',
        'industrial': 'Промышленный объект',
        'reconstruction': 'Реконструкция/капремонт',
        'other': 'Другое'
    }
    object_type_label = object_types_map.get(object_type, object_type or 'не указано')

    smtp_password = os.environ.get('YANDEX_SMTP_PASSWORD', '')
    sender_email = 'danilAkz@yandex.ru'
    recipient_email = 'danilAkz@yandex.ru'

    if not smtp_password:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'SMTP password not configured'})
        }

    subject = f'Новая заявка с сайта — {name}'
    text_body = (
        f'Новая заявка с сайта «Путь Будущего»\n\n'
        f'Имя: {name}\n'
        f'Телефон: {phone}\n'
        f'Email: {email or "не указан"}\n'
        f'Тип объекта: {object_type_label}\n\n'
        f'Описание задачи:\n{message or "не указано"}\n'
    )

    html_body = f'''
    <html><body style="font-family: Arial, sans-serif; color: #222;">
      <h2 style="color: #FB923C;">Новая заявка с сайта «Путь Будущего»</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 8px; font-weight: bold; width: 160px;">Имя:</td><td style="padding: 8px;">{name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Телефон:</td><td style="padding: 8px;"><a href="tel:{phone}">{phone}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">{email or "не указан"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Тип объекта:</td><td style="padding: 8px;">{object_type_label}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Описание:</td><td style="padding: 8px; white-space: pre-wrap;">{message or "не указано"}</td></tr>
      </table>
    </body></html>
    '''

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = recipient_email
    if email:
        msg['Reply-To'] = email
    msg.attach(MIMEText(text_body, 'plain', 'utf-8'))
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    try:
        with smtplib.SMTP_SSL('smtp.yandex.ru', 465, timeout=15) as server:
            server.login(sender_email, smtp_password)
            server.sendmail(sender_email, [recipient_email], msg.as_string())
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Mail sending failed: {str(e)}'})
        }

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
    }
