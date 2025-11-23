'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from '@/features/i18n/useTranslations'
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

export function Booking() {
  const t = useTranslations()
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')

  const getAvailableDates = () => {
    const dates: string[] = []
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Exclude weekends
        dates.push(date.toISOString().split('T')[0])
      }
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

  const availableDates = getAvailableDates()

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
              <h3 className={styles.calendarTitle}>Изберете дата / Select Date</h3>
              <div className={styles.datesGrid}>
                {availableDates.map((date) => {
                  const dateObj = new Date(date)
                  const isSelected = selectedDate === date
                  const isToday = date === new Date().toISOString().split('T')[0]
                  
                  return (
                    <button
                      key={date}
                      type="button"
                      className={`${styles.dateButton} ${isSelected ? styles.selected : ''} ${isToday ? styles.today : ''}`}
                      onClick={() => setSelectedDate(date)}
                    >
                      <span className={styles.day}>{dateObj.getDate()}</span>
                      <span className={styles.month}>
                        {dateObj.toLocaleDateString('bg-BG', { month: 'short' })}
                      </span>
                    </button>
                  )
                })}
              </div>
              
              {selectedDate && (
                <div className={styles.timesSection}>
                  <h4 className={styles.timesTitle}>Изберете час / Select Time</h4>
                  <div className={styles.timesGrid}>
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
              alt="Massage bed"
              width={500}
              height={300}
              className={styles.image}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

