import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { date, time, name, phone } = await request.json()

    if (!date || !time || !name || !phone) {
      return NextResponse.json({ error: 'Missing reservation data' }, { status: 400 })
    }

    const targetEmail = process.env.NEXT_PUBLIC_BOOKING_TARGET_EMAIL || 'ivanvelichkov13@gmail.com'
    // Use server-only env vars (without NEXT_PUBLIC_) for sensitive data like API keys
    // Falls back to NEXT_PUBLIC_ vars for backwards compatibility, but prefer RESEND_API_KEY
    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL

    if (!apiKey || !fromEmail) {
      console.error('Resend configuration missing. Set RESEND_API_KEY and RESEND_FROM_EMAIL (or NEXT_PUBLIC_ versions for backwards compatibility)')
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

