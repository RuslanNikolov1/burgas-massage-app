import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { date, time, name, phone } = await request.json()

    if (!date || !time || !name || !phone) {
      return NextResponse.json({ error: 'Missing reservation data' }, { status: 400 })
    }

    const targetEmail = process.env.BOOKING_TARGET_EMAIL || 'ruslannikolov1@gmail.com'
    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL

    if (!apiKey || !fromEmail) {
      console.error('Resend configuration missing RESEND_API_KEY or RESEND_FROM_EMAIL')
      return NextResponse.json({ error: 'Email is not configured' }, { status: 500 })
    }

    const dateLabel = new Date(date).toLocaleDateString('bg-BG', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const subject = `Нова заявка за резервация - ${dateLabel} ${time}`
    const textBody = `Име: ${name}\nТелефон: ${phone}\nДата: ${dateLabel}\nЧас: ${time}`
    const htmlBody = `
      <h2>Нова заявка за резервация</h2>
      <p><strong>Име:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Дата:</strong> ${dateLabel}</p>
      <p><strong>Час:</strong> ${time}</p>
      <p>Моля, свържете се с клиента, за да потвърдите.</p>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [targetEmail],
        subject,
        text: textBody,
        html: htmlBody,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Failed to send reservation via Resend:', text)
      throw new Error('Email sending failed')
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to send reservation email', error)
    return NextResponse.json({ error: 'Unable to send email' }, { status: 500 })
  }
}

