'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations, useLanguage } from '@/features/i18n/useTranslations'
import styles from './Booking.module.scss'

// Mock booked times - format: "YYYY-MM-DD HH:MM"
const bookedTimes = [
  '2024-12-20 10:00',
  '2024-12-20 14:00',
  '2024-12-21 11:00',
  '2024-12-21 15:00',
  '2024-12-22 09:00',
  '2024-12-22 13:00',
  '2024-12-23 10:00',
  '2024-12-23 16:00',
]

const workingHours = Array.from({ length: 9 }, (_, i) => i + 9) // 9 to 17
const MAX_MONTH_OFFSET = 5

export function Booking() {
  const t = useTranslations()
  const language = useLanguage()
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [monthOffset, setMonthOffset] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')

  const today = useMemo(() => new Date(), [])
  const normalizedToday = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    [today]
  )

  const getAvailableDates = (startMonthDate: Date) => {
    const dates: Array<{
      date: string
      offset: number
      isOutsideViewMonth: boolean
    }> = []

    const cursor = new Date(startMonthDate)
    if (cursor < normalizedToday) {
      cursor.setFullYear(normalizedToday.getFullYear(), normalizedToday.getMonth(), normalizedToday.getDate())
    }

    while (dates.length < 30) {
      const monthDiff =
        (cursor.getFullYear() - today.getFullYear()) * 12 + (cursor.getMonth() - today.getMonth())

      if (monthDiff > MAX_MONTH_OFFSET) {
        break
      }

      const isWeekend = cursor.getDay() === 0 || cursor.getDay() === 6
      if (!isWeekend) {
        dates.push({
          date: cursor.toISOString().split('T')[0],
          offset: monthDiff,
          isOutsideViewMonth:
            cursor.getMonth() !== startMonthDate.getMonth() ||
            cursor.getFullYear() !== startMonthDate.getFullYear(),
        })
      }

      cursor.setDate(cursor.getDate() + 1)
    }

    return dates
  }

  const getAvailableTimes = (date: string) => {
    return workingHours.filter(hour => {
      const timeString = `${date} ${hour.toString().padStart(2, '0')}:00`
      return !bookedTimes.includes(timeString)
    })
  }


  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const currentMonthDate = useMemo(
    () => new Date(today.getFullYear(), today.getMonth() + monthOffset, 1),
    [today, monthOffset]
  )

  const availableDates = useMemo(
    () => getAvailableDates(currentMonthDate),
    [currentMonthDate]
  )

  useEffect(() => {
    if (!availableDates.some(({ date }) => date === selectedDate)) {
      setSelectedDate('')
      setSelectedTime('')
    }
  }, [availableDates, selectedDate])

  const handleDateSelect = (date: string, offset: number) => {
    setSelectedDate(date)
    setSelectedTime('')
    setClientName('')
    setClientPhone('')
    setSubmissionStatus('idle')
    if (offset !== monthOffset) {
      setMonthOffset(offset)
    }
  }

  useEffect(() => {
    setSubmissionStatus('idle')
    setClientName('')
    setClientPhone('')
  }, [selectedTime])

  const handleReservation = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    if (!selectedDate || !selectedTime || !clientName.trim() || !clientPhone.trim()) return
    setIsSubmitting(true)
    setSubmissionStatus('idle')
    try {
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          name: clientName.trim(),
          phone: clientPhone.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Reservation failed')
      }

      setSubmissionStatus('success')
    } catch (error) {
      console.error(error)
      setSubmissionStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const locale = language === 'bg' ? 'bg-BG' : 'en-US'
  const formattedSelectedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : ''

  return (
    <section id="booking" className={styles.booking}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('booking.title')}
        </motion.h2>
        
        <p className={styles.workingHours}>{t('booking.workingHours')}</p>
        
        <div className={styles.content}>
          <motion.div
            className={styles.calendarWrapper}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.calendar}>
              <div className={styles.monthNav}>
                <div className={styles.monthLabel}>
                  {currentMonthDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
                </div>
                <div className={styles.navButtons}>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={() => setMonthOffset(prev => Math.max(0, prev - 1))}
                    disabled={monthOffset === 0}
                    aria-label={t('booking.prevMonthAria')}
                  >
                    {t('booking.prevMonth')}
                  </button>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={() => setMonthOffset(prev => Math.min(MAX_MONTH_OFFSET, prev + 1))}
                    disabled={monthOffset === MAX_MONTH_OFFSET}
                    aria-label={t('booking.nextMonthAria')}
                  >
                    {t('booking.nextMonth')}
                  </button>
                </div>
              </div>

              <h3 className={styles.calendarTitle}>{t('booking.selectDate')}</h3>
              <div className={styles.datesGrid} aria-label={t('booking.datesAria')}>
                {availableDates.map(({ date, isOutsideViewMonth, offset }) => {
                  const dateObj = new Date(date)
                  const isSelected = selectedDate === date
                  const isToday = date === new Date().toISOString().split('T')[0]
                  
                  return (
                    <button
                      key={date}
                      type="button"
                      className={`${styles.dateButton} ${isSelected ? styles.selected : ''} ${isToday ? styles.today : ''} ${isOutsideViewMonth ? styles.outsideMonth : ''}`}
                      onClick={() => handleDateSelect(date, offset)}
                    >
                      <span className={styles.day}>{dateObj.getDate()}</span>
                      <span className={styles.month}>
                        {dateObj.toLocaleDateString(locale, { month: 'short' })}
                      </span>
                    </button>
                  )
                })}
              </div>
              
              {selectedDate && (
                <div className={styles.timesSection}>
                  <h4 className={styles.timesTitle}>{t('booking.selectTime')}</h4>
                  <div className={styles.timesGrid} aria-label={t('booking.timesAria')}>
                    {getAvailableTimes(selectedDate).map((hour) => {
                      const timeValue = `${hour}:00`
                      const isSelected = selectedTime === timeValue
                      return (
                        <button
                          key={hour}
                          type="button"
                          className={`${styles.timeButton} ${isSelected ? styles.selected : ''}`}
                          onClick={() => handleTimeSelect(timeValue)}
                        >
                          {hour}:00
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/bed.png"
              alt="Професионално масажно легло за домашни масажи и релаксация в Бургас"
              width={500}
              height={300}
              className={styles.image}
            />
          </motion.div>
        </div>

        {selectedDate && selectedTime && (
          <form className={styles.reservationForm} onSubmit={handleReservation}>
            <h3 className={styles.formHeading}>{t('booking.reserveTitle')}</h3>
            <p className={styles.formSummary}>
              {t('booking.selectedSlot')}: {formattedSelectedDate} · {selectedTime}
            </p>
            <div className={styles.formRow}>
              <label htmlFor="booking-name" className={styles.formLabel}>
                {t('booking.nameLabel')}
              </label>
              <input
                id="booking-name"
                type="text"
                className={styles.formInput}
                value={clientName}
                placeholder={t('booking.namePlaceholder')}
                onChange={event => {
                  setClientName(event.target.value)
                  setSubmissionStatus('idle')
                }}
                required
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="booking-phone" className={styles.formLabel}>
                {t('booking.phoneLabel')}
              </label>
              <input
                id="booking-phone"
                type="tel"
                className={styles.formInput}
                value={clientPhone}
                placeholder={t('booking.phonePlaceholder')}
                onChange={event => {
                  setClientPhone(event.target.value)
                  setSubmissionStatus('idle')
                }}
                required
              />
            </div>
            <button
              type="submit"
              className={styles.formButton}
              disabled={isSubmitting || !clientName.trim() || !clientPhone.trim()}
            >
              {isSubmitting ? t('booking.reserveSending') : t('booking.reserveButton')}
            </button>

            {submissionStatus === 'success' && (
              <p className={`${styles.statusMessage} ${styles.statusSuccess}`}>{t('booking.reserveSuccess')}</p>
            )}
            {submissionStatus === 'error' && (
              <p className={`${styles.statusMessage} ${styles.statusError}`}>{t('booking.reserveError')}</p>
            )}
            {submissionStatus === 'idle' && (
              <p className={styles.statusMessage}>{t('booking.reserveHint')}</p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}

