import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = '***REMOVED***';
const TELEGRAM_CHAT_ID = '6736852073';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Формируем сообщение
    const message = `
🆕 Новая заявка с сайта ALODA

👤 Имя: ${data.name}
🏢 Компания: ${data.company}
📧 Email: ${data.email}
💬 Telegram: ${data.telegram || 'Не указан'}
📝 Запрос: ${data.message || 'Не указан'}
    `.trim();

    // Отправляем в Telegram
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', result);
      return NextResponse.json(
        { error: 'Ошибка при отправке сообщения' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Заявка отправлена' });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при отправке заявки' },
      { status: 500 }
    );
  }
}
