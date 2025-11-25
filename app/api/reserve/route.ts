import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { date, time, name } = await request.json()

    if (!date || !time || !name) {
      return NextResponse.json({ error: 'Missing reservation data' }, { status: 400 })
    }

    const targetEmail = process.env.BOOKING_TARGET_EMAIL || 'ruslannikolov1@gmail.com'

    const dateLabel = new Date(date).toLocaleDateString('bg-BG', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const subject = `Нова заявка за резервация - ${dateLabel} ${time}`
    const payload = {
      _subject: subject,
      Name: name,
      Date: dateLabel,
      Time: time,
      Message: `Име: ${name}\nДата: ${dateLabel}\nЧас: ${time}`,
    }

    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Failed to send reservation via formsubmit:', text)
      throw new Error('Form submission failed')
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to send reservation email', error)
    return NextResponse.json({ error: 'Unable to send email' }, { status: 500 })
  }
}

