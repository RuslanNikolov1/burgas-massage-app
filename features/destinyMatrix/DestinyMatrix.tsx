'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './DestinyMatrix.module.scss'
import {
  createPersonFromDate,
  validateDate,
  formatDate,
  convertDDMMYYYYToISO,
  convertISOToDDMMYYYY,
  formatDateInput,
  calculateLifePath,
  type PersonData,
} from './destiny.utils'
import { Calendar } from '@phosphor-icons/react'
import Image from 'next/image'

type Props = {
  className?: string
}

export default function DestinyMatrix({ className = '' }: Props) {
  const t = useTranslations()

  // Personal calculator state
  const [personalDate, setPersonalDate] = useState<string>('')
  const [personalGender, setPersonalGender] = useState<'male' | 'female' | ''>('')
  const [personalData, setPersonalData] = useState<PersonData | null>(null)
  const [personalError, setPersonalError] = useState<string>('')
  const personalContainerRef = useRef<HTMLDivElement | null>(null)


  // Browser-specific circle radius adjustments (from original style.js)
  useEffect(() => {
    if (!personalData) return

    const isSafari = navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1
    const isIphoneOrIpad = navigator.userAgent.match(/iPhone|iPad|iPod/i)
    const isChrome = navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Safari') > -1

    // Use setTimeout to ensure SVG is rendered
    setTimeout(() => {
      const bigCircles = document.querySelectorAll<SVGCircleElement>(`.${styles.bigCircle}`)
      const mediumCircles = document.querySelectorAll<SVGCircleElement>(`.${styles.mediumCircle}`)
      const smallCircles = document.querySelectorAll<SVGCircleElement>(`.${styles.smallCircle}`)

      if (isSafari || isIphoneOrIpad) {
        bigCircles.forEach((el) => el.setAttribute('r', '27'))
        mediumCircles.forEach((el) => el.setAttribute('r', '21'))
        smallCircles.forEach((el) => el.setAttribute('r', '17'))
      } else if (isChrome) {
        bigCircles.forEach((el) => el.setAttribute('r', '33.5'))
        mediumCircles.forEach((el) => el.setAttribute('r', '24'))
        smallCircles.forEach((el) => el.setAttribute('r', '21'))
      }
    }, 100)
  }, [personalData])

  const handlePersonalCalculate = () => {
    setPersonalError('')
    if (!personalDate) {
      setPersonalError(t('destiny.alertDate'))
      return
    }

    if (!personalGender) {
      setPersonalError(t('destiny.alertGender'))
      return
    }

    // Convert DD/MM/YYYY to ISO format for validation
    const dateISO = convertDDMMYYYYToISO(personalDate)
    if (!dateISO) {
      setPersonalError(t('destiny.alertDate'))
      return
    }

    const dateValidation = validateDate(dateISO)
    if (!dateValidation.valid) {
      setPersonalError(dateValidation.error || t('destiny.alertDate'))
        return
      }

    try {
      const data = createPersonFromDate(dateISO, personalGender)
      setPersonalData(data)
      if (personalContainerRef.current) {
        personalContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } catch (error) {
      setPersonalError(t('destiny.calculationError'))
      console.error(error)
    }
  }

  const handlePersonalReset = () => {
    setPersonalDate('')
    setPersonalGender('')
    setPersonalData(null)
    setPersonalError('')
  }

  return (
    <section className={`${styles.root} ${className}`}>
      <div className={styles.header}>
        <div className={styles.glowWrap}>
          <div className={styles.glow}></div>
      </div>
        <h1 className={styles.title}>{t('destiny.title')}</h1>
        </div>

      <PersonalCalculator
        date={personalDate}
        gender={personalGender}
        data={personalData}
        error={personalError}
        onDateChange={setPersonalDate}
        onGenderChange={setPersonalGender}
        onCalculate={handlePersonalCalculate}
        onReset={handlePersonalReset}
        containerRef={personalContainerRef}
        t={t}
      />
    </section>
  )
}

// Personal Calculator Component
function PersonalCalculator({
  date,
  gender,
  data,
  error,
  onDateChange,
  onGenderChange,
  onCalculate,
  onReset,
  containerRef,
  t,
}: {
  date: string
  gender: 'male' | 'female' | ''
  data: PersonData | null
  error: string
  onDateChange: (date: string) => void
  onGenderChange: (gender: 'male' | 'female' | '') => void
  onCalculate: () => void
  onReset: () => void
  containerRef: React.RefObject<HTMLDivElement>
  t: (key: string) => string
}) {
  const datePickerRef = useRef<HTMLInputElement>(null)
  
  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value)
    onDateChange(formatted)
  }

  const handleCalendarClick = () => {
    datePickerRef.current?.showPicker?.() || datePickerRef.current?.click()
  }

  const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const formatted = convertISOToDDMMYYYY(e.target.value)
      onDateChange(formatted)
    }
  }

  return (
    <>
      <div className={styles.birthdayContainer}>
        <p>{t('destiny.enterDate')}</p>
        <div className={styles.inputsWrapper}>
          <div className={styles.inputWrap}>
            <input
              id="personal-date"
              type="text"
              value={date}
              onChange={handleDateInput}
              placeholder={t('destiny.datePlaceholder')}
              maxLength={10}
              aria-label={t('destiny.dateOfBirth')}
            />
            <input
              ref={datePickerRef}
              type="date"
              onChange={handleDatePickerChange}
              className={styles.hiddenDatePicker}
              aria-label={t('destiny.dateOfBirth')}
            />
            <button
              type="button"
              onClick={handleCalendarClick}
              className={styles.calendarButton}
              aria-label={t('destiny.openCalendar')}
            >
              <Calendar size={20} weight="duotone" />
            </button>
            <div className={styles.starWrap2}>
              <Image
                src="/destiny-matrix-assets/img/starmedium.svg"
                alt=""
                width={46}
                height={46}
                className={styles.starMedium}
              />
            </div>
          </div>
          <div className={styles.inputWrap}>
            <select
              id="personal-gender"
              value={gender}
              onChange={(e) => onGenderChange(e.target.value as 'male' | 'female' | '')}
              className={styles.genderSelect}
              aria-label={t('destiny.gender')}
            >
              <option value="">{t('destiny.selectGender')}</option>
              <option value="male">{t('destiny.male')}</option>
              <option value="female">{t('destiny.female')}</option>
            </select>
          </div>
          <button id="get-the-answer" onClick={onCalculate} className={styles.createButton}>
            {t('destiny.createChart')}
          </button>
        </div>
        {error && <div className={styles.errorOutput}>{error}</div>}
        {/* Decorative stars */}
        <div className={styles.starWrap1}>
          <Image
            src="/destiny-matrix-assets/img/starmedium.svg"
            alt=""
            width={46}
            height={46}
            className={styles.starMedium}
          />
            </div>
        <div className={styles.starWrap4}>
          <Image
            src="/destiny-matrix-assets/img/starlarge.svg"
            alt=""
            width={69}
            height={69}
            className={styles.starLarge}
          />
          </div>
        <div className={styles.starWrap5}>
          <Image
            src="/destiny-matrix-assets/img/starlarge.svg"
            alt=""
            width={69}
            height={69}
            className={styles.starLarge}
          />
      </div>
        <div className={styles.starWrap6}>
          <Image
            src="/destiny-matrix-assets/img/starsmall.svg"
            alt=""
            width={30}
            height={30}
            className={styles.starSmall}
          />
        </div>
        <div className={styles.starWrap7}>
          <Image
            src="/destiny-matrix-assets/img/starsmall.svg"
            alt=""
            width={30}
            height={30}
            className={styles.starSmall}
          />
        </div>
        <div className={styles.starWrap8}>
          <Image
            src="/destiny-matrix-assets/img/starsmall.svg"
            alt=""
            width={30}
            height={30}
            className={styles.starSmall}
          />
        </div>
      </div>

      {data && (
        <div ref={containerRef} className={styles.matrixContainer}>
          <div className={styles.personalCalculator}>
            <p className={styles.smokyWhite}>{t('destiny.personalCalculation')}</p>
          </div>
          <div className={styles.outputPersonalDate}>
            <span className={styles.smokyWhite}>
              <span className={styles.gray}>{t('destiny.dateOfBirthLabel')}</span> {date || ''}
            </span>
          </div>
          <MatrixSVG data={data} t={t} />
          <MatrixAnalysis data={data} date={date} t={t} />
          <ChakraTable data={data} t={t} />
          <PurposesTable data={data} t={t} />
        </div>
      )}
    </>
  )
}

// Matrix SVG Component - This will be a large component
function MatrixSVG({
  data,
  t,
}: {
  data: PersonData
  t: (key: string) => string
}) {
  // This is a placeholder - the full SVG will be added next
  return (
    <div className={styles.pento}>
      <svg viewBox="0 0 680 600" id="matrix" className={styles.matrixSvg}>
        {/* Matrix frame and all points will go here */}
        <g id="matrix-frame">
          {/* Frame elements */}
          <rect className={styles.cls3} x="163.63" y="126.14" width="340.16" height="340.16" />
          <rect
            className={styles.cls3}
            x="227.87"
            y="127.54"
            width="340.16"
            height="340.16"
            transform="translate(-158.13 367.16) rotate(-45)"
          />
          <polygon
            className={styles.cls4}
            points="333.7 7.76 537.64 92.28 622.17 296.22 537.64 501.16 333.7 584.68 129.76 500.16 45.24 296.22 129.76 92.28 333.7 7.76"
          />
          <line className={styles.cls3} x1="333.7" y1="27.76" x2="333.7" y2="564.68" />
          <line className={styles.cls3} x1="65.24" y1="296.22" x2="602.17" y2="296.22" />

          {/* Male and female generation lines */}
          <g>
            <line className={styles.cls5} x1="442" y1="405" x2="226" y2="189" />
            <polygon className={styles.cls6} points="441 402 439 404 442 405 441 402" />
            <polygon className={styles.cls6} points="226 189 229 190 227 192 226 189" />
          </g>
          <g>
            <line className={styles.cls7} x1="442" y1="189" x2="226" y2="405" />
            <polygon className={styles.cls8} points="442 189 439 190 441 192 442 189" />
            <polygon className={styles.cls8} points="226 405 227 402 229 404 226 405" />
          </g>
          <line className={styles.cls18} x1="502" y1="297" x2="335" y2="465" />
          <text className={styles.cls44} transform="translate(238.77 188.48) rotate(45)">
            {t('destiny.maleGenerationLine')}
          </text>
          <text className={styles.cls44} transform="translate(351.7 264.98) rotate(-45)">
            {t('destiny.femaleGenerationLine')}
          </text>

          {/* Heart symbol */}
          <g transform="translate(100, 100)">
            <image
              href="/destiny-matrix-assets/img/blue_crayola.svg"
              width="20"
              height="20"
              x="0"
              y="0"
            />
          </g>

          {/* Dollar sign */}
          <g transform="translate(410, 345)">
            <text className={styles.cls56}>$</text>
          </g>
        </g>

        {/* Points will be rendered here */}
        {data && 'points' in data && (
          <PointsBasic points={data.points} />
        )}

        {/* Years points */}
        {data && 'years' in data && <YearsPoints years={data.years} t={t} />}
      </svg>
    </div>
  )
}

// Points Basic Component for Personal Calculator
function PointsBasic({ points }: { points: PersonData['points'] }) {
  return (
    <g id="points-basic">
      {/* Main points (a, b, c, d, e) */}
      <circle className={`${styles.cls10} ${styles.bigCircle}`} cx="79.2" cy="297" r="32.5" />
      <text className={`${styles.cls54} ${styles.matrixValuePoint}`} transform="translate(79.2 299)">
        {points.apoint}
      </text>

      <circle className={`${styles.cls10} ${styles.bigCircle}`} cx="333.7" cy="42" r="32.5" />
      <text className={`${styles.cls54} ${styles.matrixValuePoint}`} transform="translate(333.7 42)">
        {points.bpoint}
      </text>

      <circle className={`${styles.cls19} ${styles.bigCircle}`} cx="587.13" cy="297" r="32.5" />
      <text className={`${styles.cls54} ${styles.matrixValuePoint}`} transform="translate(587.4 299)">
        {points.cpoint}
      </text>

      <circle className={`${styles.cls19} ${styles.bigCircle}`} cx="332.7" cy="554" r="32.5" />
      <text className={`${styles.cls54} ${styles.matrixValuePoint}`} transform="translate(332.7 557)">
        {points.dpoint}
      </text>

      <circle className={`${styles.cls25} ${styles.bigCircle}`} cx="334" cy="297" r="32.5" />
      <text className={`${styles.cls55} ${styles.matrixValuePoint}`} transform="translate(334 299)">
        {points.epoint}
      </text>

      {/* Additional points - f, g, h, i */}
      <circle className={`${styles.cls24} ${styles.bigCircle}`} cx="151" cy="114.22" r="32.5" />
      <text className={`${styles.cls55} ${styles.matrixValuePoint}`} transform="translate(151 115)">
        {points.fpoint}
      </text>

      <circle className={`${styles.cls24} ${styles.bigCircle}`} cx="515.1" cy="114.22" r="32.5" />
      <text className={`${styles.cls55} ${styles.matrixValuePoint}`} transform="translate(515.1 115)">
        {points.gpoint}
      </text>

      <circle className={`${styles.cls24} ${styles.bigCircle}`} cx="514.1" cy="479.62" r="32.5" />
      <text className={`${styles.cls55} ${styles.matrixValuePoint}`} transform="translate(514.1 481)">
        {points.ipoint}
      </text>

      <circle className={`${styles.cls24} ${styles.bigCircle}`} cx="153" cy="479.62" r="32.5" />
      <text className={`${styles.cls55} ${styles.matrixValuePoint}`} transform="translate(153 481)">
        {points.hpoint}
      </text>

      {/* Small circles - j, n, l, k, m, s, t */}
      <circle className={`${styles.cls22} ${styles.smallCircle}`} cx="332.59" cy="466" r="20" />
      <text className={`${styles.cls57} ${styles.matrixValuePoint}`} transform="translate(332.69 466)">
        {points.jpoint}
      </text>

      <circle className={`${styles.cls22} ${styles.smallCircle}`} cx="500" cy="297" r="20" />
      <text className={`${styles.cls57} ${styles.matrixValuePoint}`} transform="translate(500 299)">
        {points.npoint}
      </text>

      <circle className={`${styles.cls21} ${styles.smallCircle}`} cx="418.18" cy="380.69" r="20" />
      <text className={`${styles.cls58} ${styles.matrixValuePoint}`} transform="translate(418.18 382)">
        {points.lpoint}
      </text>

      <circle className={`${styles.cls21} ${styles.smallCircle}`} cx="375" cy="424" r="20" />
      <text className={`${styles.cls58} ${styles.matrixValuePoint}`} transform="translate(375 426)">
        {points.kpoint}
      </text>

      <circle className={`${styles.cls21} ${styles.smallCircle}`} cx="461" cy="338" r="20" />
      <text className={`${styles.cls58} ${styles.matrixValuePoint}`} transform="translate(461 338)">
        {points.mpoint}
      </text>

      <circle className={`${styles.cls15} ${styles.smallCircle}`} cx="165.61" cy="297" r="20" />
      <text className={`${styles.cls58} ${styles.matrixValuePoint}`} transform="translate(165.61 299)">
        {points.spoint}
      </text>

      <circle className={`${styles.cls15} ${styles.smallCircle}`} cx="333.7" cy="129" r="20" />
      <text className={`${styles.cls58} ${styles.matrixValuePoint}`} transform="translate(333.7 131)">
        {points.tpoint}
      </text>

      {/* Medium circles - o, p, r, q */}
      <circle className={`${styles.cls13} ${styles.mediumCircle}`} cx="127.11" cy="297" r="23" />
      <text className={`${styles.cls59} ${styles.matrixValuePoint}`} transform="translate(127.11 299)">
        {points.opoint}
      </text>

      <circle className={`${styles.cls13} ${styles.mediumCircle}`} cx="333.7" cy="90.62" r="23" />
      <text className={`${styles.cls59} ${styles.matrixValuePoint}`} transform="translate(333.7 92)">
        {points.ppoint}
      </text>

      <circle className={`${styles.cls23} ${styles.mediumCircle}`} cx="333" cy="505" r="23" />
      <text className={`${styles.cls60} ${styles.matrixValuePoint}`} transform="translate(333 505)">
        {points.rpoint}
      </text>

      <circle className={`${styles.cls23} ${styles.mediumCircle}`} cx="538.5" cy="297" r="23" />
      <text className={`${styles.cls60} ${styles.matrixValuePoint}`} transform="translate(538.5 299)">
        {points.qpoint}
      </text>

      {/* Additional small circles - w, x, v, u */}
      <circle className={`${styles.cls26} ${styles.smallCircle}`} cx="245.26" cy="297" r="20" />
      <text className={`${styles.cls58} ${styles.matrixValuePoint}`} transform="translate(245.26 299)">
        {points.wpoint}
      </text>

      <circle className={`${styles.cls26} ${styles.smallCircle}`} cx="333.7" cy="203" r="20" />
      <text className={`${styles.cls58} ${styles.matrixValuePoint}`} transform="translate(333.7 204)">
        {points.xpoint}
      </text>

      <circle className={`${styles.cls21} ${styles.smallCircle}`} cx="420.54" cy="297" r="20" />
      <text className={`${styles.cls58} ${styles.matrixValuePoint}`} transform="translate(420.54 299)">
        {points.vpoint}
      </text>

      <circle className={`${styles.cls23} ${styles.mediumCircle}`} cx="382" cy="297" r="23" />
      <text className={`${styles.cls60} ${styles.matrixValuePoint}`} transform="translate(382 299)">
        {points.upoint}
      </text>

      {/* f1, f2, g1, g2, i1, i2, h1, h2 */}
      <circle className={`${styles.cls21} ${styles.smallCircle}`} cx="212" cy="175.93" r="20" />
      <text className={`${styles.cls58} ${styles.matrixValuePoint}`} transform="translate(212 179)">
        {points.f2point}
      </text>

      <circle className={`${styles.cls23} ${styles.mediumCircle}`} cx="184.71" cy="149.53" r="23" />
      <text className={`${styles.cls60} ${styles.matrixValuePoint}`} transform="translate(184.71 151)">
        {points.f1point}
      </text>

      <circle className={`${styles.cls21} ${styles.smallCircle}`} cx="455.4" cy="177.53" r="20" />
      <text className={`${styles.cls58} ${styles.matrixValuePoint}`} transform="translate(455.4 179)">
        {points.g2point}
      </text>

      <circle className={`${styles.cls23} ${styles.mediumCircle}`} cx="480.79" cy="149.13" r="23" />
      <text className={`${styles.cls60} ${styles.matrixValuePoint}`} transform="translate(480.79 151)">
        {points.g1point}
      </text>

      <circle className={`${styles.cls21} ${styles.smallCircle}`} cx="454.4" cy="416.91" r="20" />
      <text className={`${styles.cls58} ${styles.matrixValuePoint}`} transform="translate(454.4 416.91)">
        {points.i2point}
      </text>

      <circle className={`${styles.cls23} ${styles.mediumCircle}`} cx="479.79" cy="445.31" r="23" />
      <text className={`${styles.cls60} ${styles.matrixValuePoint}`} transform="translate(479.79 447)">
        {points.i1point}
      </text>

      <circle className={`${styles.cls21} ${styles.smallCircle}`} cx="215" cy="419" r="20" />
      <text className={`${styles.cls58} ${styles.matrixValuePoint}`} transform="translate(215 419)">
        {points.h2point}
      </text>

      <circle className={`${styles.cls23} ${styles.mediumCircle}`} cx="188.71" cy="446.7" r="23" />
      <text className={`${styles.cls60} ${styles.matrixValuePoint}`} transform="translate(188.71 447)">
        {points.h1point}
      </text>
    </g>
  )
}

// Years Points Component
function YearsPoints({ years, t }: { years: PersonData['years']; t: (key: string) => string }) {
  return (
    <g id="points-years">
      {/* Major year labels (0, 10, 20, 30, 40, 50, 60, 70) */}
      <text className={styles.cls28} transform="translate(20 295)">
        0
        <tspan x="-10" y="10">{t('destiny.years')}</tspan>
        <tspan x="-4" y="20">{t('destiny.old')}</tspan>
      </text>
      <text className={styles.cls28} transform="translate(100 70)">
        10
        <tspan x="-8" y="10">{t('destiny.years')}</tspan>
        <tspan x="-2" y="20">{t('destiny.old')}</tspan>
      </text>
      <text className={styles.cls28} transform="translate(330 20)">
        20
        <tspan x="-8" y="10">{t('destiny.years')}</tspan>
        <tspan x="-2" y="20">{t('destiny.old')}</tspan>
      </text>
      <text className={styles.cls28} transform="translate(550 70)">
        30
        <tspan x="-8" y="10">{t('destiny.years')}</tspan>
        <tspan x="-2" y="20">{t('destiny.old')}</tspan>
      </text>
      <text className={styles.cls28} transform="translate(638 295)">
        40
        <tspan x="-8" y="10">{t('destiny.years')}</tspan>
        <tspan x="-2" y="20">{t('destiny.old')}</tspan>
      </text>
      <text className={styles.cls28} transform="translate(550 515)">
        50
        <tspan x="-8" y="10">{t('destiny.years')}</tspan>
        <tspan x="-2" y="20">{t('destiny.old')}</tspan>
      </text>
      <text className={styles.cls28} transform="translate(328 580)">
        60
        <tspan x="-8" y="10">{t('destiny.years')}</tspan>
        <tspan x="-2" y="20">{t('destiny.old')}</tspan>
      </text>
      <text className={styles.cls28} transform="translate(100 515)">
        70
        <tspan x="-8" y="10">{t('destiny.years')}</tspan>
        <tspan x="-2" y="20">{t('destiny.old')}</tspan>
      </text>

      {/* Intermediate year labels (5, 15, 25, 35, 45, 55, 65, 75) */}
      <text className={styles.cls29} transform="translate(97.49 198.76)">
        5
        <tspan className={styles.cls43} x="8.34" y="-6">{t('destiny.years')}</tspan>
        <tspan className={styles.cls43} x="8.34" y="0">{t('destiny.old')}</tspan>
      </text>
      <text className={styles.cls29} transform="translate(232.22 66.42)">
        15
        <tspan className={styles.cls43} x="13.9" y="-6">{t('destiny.years')}</tspan>
        <tspan className={styles.cls43} x="13.9" y="0">{t('destiny.old')}</tspan>
      </text>
      <text className={styles.cls29} transform="translate(405.8 67.22)">
        25
        <tspan className={styles.cls43} x="14.9" y="-6">{t('destiny.years')}</tspan>
        <tspan className={styles.cls43} x="14.9" y="0">{t('destiny.old')}</tspan>
      </text>
      <text className={styles.cls29} transform="translate(540.55 204.76)">
        35
        <tspan className={styles.cls43} x="14.9" y="-6">{t('destiny.years')}</tspan>
        <tspan className={styles.cls43} x="14.9" y="0">{t('destiny.old')}</tspan>
      </text>
      <text className={styles.cls29} transform="translate(542.76 402.12)">
        45
        <tspan className={styles.cls43} x="14.9" y="-6">{t('destiny.years')}</tspan>
        <tspan className={styles.cls43} x="14.9" y="0">{t('destiny.old')}</tspan>
      </text>
      <text className={styles.cls29} transform="translate(403.8 539.38)">
        55
        <tspan className={styles.cls43} x="14.9" y="-6">{t('destiny.years')}</tspan>
        <tspan className={styles.cls43} x="14.9" y="0">{t('destiny.old')}</tspan>
      </text>
      <text className={styles.cls29} transform="translate(235.6 539.38)">
        65
        <tspan className={styles.cls43} x="14.9" y="-6">{t('destiny.years')}</tspan>
        <tspan className={styles.cls43} x="14.9" y="0">{t('destiny.old')}</tspan>
      </text>
      <text className={styles.cls29} transform="translate(97.69 400.12)">
        75
        <tspan className={styles.cls43} x="14.9" y="-6">{t('destiny.years')}</tspan>
        <tspan className={styles.cls43} x="14.9" y="0">{t('destiny.old')}</tspan>
      </text>

      {/* Age range labels */}
      <text className={styles.cls61} transform="translate(71.7 252.94)">1-2,5</text>
      <text className={styles.cls61} transform="translate(79.14 234.61)">2,5-3,5</text>
      <text className={styles.cls61} transform="translate(86.39 216.23)">3,5-4</text>
      <text className={styles.cls61} transform="translate(102.39 179.23)">6-7,5</text>
      <text className={styles.cls61} transform="translate(109.39 160.23)">7,5-8,5</text>
      <text className={styles.cls61} transform="translate(117.39 143.23)">8,5-9</text>
      <text className={styles.cls61} transform="translate(176.55 85.51)">11-12,5</text>
      <text className={styles.cls61} transform="translate(195.09 77.79)">12,5-13,5</text>
      <text className={styles.cls61} transform="translate(214.38 70.22)">13,5-14</text>
      <text className={styles.cls61} transform="translate(250.51 54.83)">16-17,5</text>
      <text className={styles.cls61} transform="translate(268.88 47.18)">17,5-18,5</text>
      <text className={styles.cls61} transform="translate(287.83 39.52)">18,5-19</text>
      <text className={styles.cls61} transform="translate(360 38.52)">21-22,5</text>
      <text className={styles.cls61} transform="translate(372.75 47.17)">22,5-23,5</text>
      <text className={styles.cls61} transform="translate(397.13 54.83)">23,5-24</text>
      <text className={styles.cls61} transform="translate(433.01 70.14)">26-27,5</text>
      <text className={styles.cls61} transform="translate(448.01 77.79)">27,5-28,5</text>
      <text className={styles.cls61} transform="translate(469.26 85.51)">28,5-29</text>
      <text className={styles.cls61} transform="translate(528.75 146.23)">31-32,5</text>
      <text className={styles.cls61} transform="translate(529.12 163.23)">32,5-33,5</text>
      <text className={styles.cls61} transform="translate(543.78 182.23)">33,5-34</text>
      <text className={styles.cls61} transform="translate(558.77 219.23)">36-37,5</text>
      <text className={styles.cls61} transform="translate(560.77 237.61)">37,5-38,5</text>
      <text className={styles.cls61} transform="translate(573.07 255.94)">38,5-39</text>
      <text className={styles.cls61} transform="translate(572.49 345.82)">41-42,5</text>
      <text className={styles.cls61} transform="translate(558.89 363.52)">42,5-43,5</text>
      <text className={styles.cls61} transform="translate(557.3 382.28)">43,5-44</text>
      <text className={styles.cls61} transform="translate(541.66 419.27)">46-47,5</text>
      <text className={styles.cls61} transform="translate(528.32 437.69)">47,5-48,5</text>
      <text className={styles.cls61} transform="translate(526.7 456.08)">48,5-49</text>
      <text className={styles.cls61} transform="translate(358.55 560.01)">58,5-59</text>
      <text className={styles.cls61} transform="translate(369.09 552.29)">57,5-58,5</text>
      <text className={styles.cls61} transform="translate(387.38 545.68)">56-57,5</text>
      <text className={styles.cls61} transform="translate(430.51 529.33)">53,5-54</text>
      <text className={styles.cls61} transform="translate(441.88 522.68)">52,5-53,5</text>
      <text className={styles.cls61} transform="translate(463.83 515.02)">51-52,5</text>
      <text className={styles.cls61} transform="translate(178 514.02)">68,5-69</text>
      <text className={styles.cls61} transform="translate(196.75 521.67)">67,5-68,5</text>
      <text className={styles.cls61} transform="translate(215.13 529.33)">66-67,5</text>
      <text className={styles.cls61} transform="translate(254.01 545.68)">63,5-64</text>
      <text className={styles.cls61} transform="translate(271.01 552.29)">62,5-63,5</text>
      <text className={styles.cls61} transform="translate(285.26 559.01)">61-62,5</text>
      <text className={styles.cls61} transform="translate(73.75 343.82)">78,5-79</text>
      <text className={styles.cls61} transform="translate(81.12 361.52)">77,5-78,5</text>
      <text className={styles.cls61} transform="translate(88.78 380.28)">76-77,5</text>
      <text className={styles.cls61} transform="translate(103.77 417.27)">73,5-74</text>
      <text className={styles.cls61} transform="translate(111.77 435.69)">72,5-73,5</text>
      <text className={styles.cls61} transform="translate(119.07 454.08)">71-72,5</text>

      {/* Year value points along the paths (af, fb, bg, gc, ci, id, dh, ha) */}
      {/* af line */}
      <text className={styles.cls33} transform="translate(52 246) rotate(-67.5)">
        {years.af2point}
      </text>
      <text className={styles.cls33} transform="translate(60 227.5) rotate(-67.5)">
        {years.af1point}
      </text>
      <text className={styles.cls33} transform="translate(68 209) rotate(-67.5)">
        {years.af3point}
      </text>
      <text className={styles.cls33} transform="translate(76 190.5) rotate(-67.5)">
        {years.afpoint}
      </text>
      <text className={styles.cls33} transform="translate(82 172.5) rotate(-67.5)">
        {years.af5point}
      </text>
      <text className={styles.cls33} transform="translate(90 154) rotate(-67.5)">
        {years.af4point}
      </text>
      <text className={styles.cls33} transform="translate(98 135.5) rotate(-67.5)">
        {years.af6point}
      </text>

      {/* fb line */}
      <text className={styles.cls33} transform="translate(169 63) rotate(-22.5)">
        {years.fb2point}
      </text>
      <text className={styles.cls33} transform="translate(188 55) rotate(-22.5)">
        {years.fb1point}
      </text>
      <text className={styles.cls33} transform="translate(206 47) rotate(-22.5)">
        {years.fb3point}
      </text>
      <text className={styles.cls33} transform="translate(224 39) rotate(-22.5)">
        {years.fbpoint}
      </text>
      <text className={styles.cls33} transform="translate(243 31) rotate(-22.5)">
        {years.fb5point}
      </text>
      <text className={styles.cls33} transform="translate(261 23.5) rotate(-22.5)">
        {years.fb4point}
      </text>
      <text className={styles.cls33} transform="translate(280 16) rotate(-22.5)">
        {years.fb6point}
      </text>

      {/* bg line */}
      <text className={styles.cls33} transform="translate(388 16) rotate(22.5)">
        {years.bg2point}
      </text>
      <text className={styles.cls33} transform="translate(407 24) rotate(22.5)">
        {years.bg1point}
      </text>
      <text className={styles.cls33} transform="translate(426 32) rotate(22.5)">
        {years.bg3point}
      </text>
      <text className={styles.cls33} transform="translate(444 40) rotate(22.5)">
        {years.bgpoint}
      </text>
      <text className={styles.cls33} transform="translate(463 48) rotate(22.5)">
        {years.bg5point}
      </text>
      <text className={styles.cls33} transform="translate(481 55) rotate(22.5)">
        {years.bg4point}
      </text>
      <text className={styles.cls33} transform="translate(500 63) rotate(22.5)">
        {years.bg6point}
      </text>

      {/* gc line */}
      <text className={styles.cls33} transform="translate(570 135) rotate(67.5)">
        {years.gc2point}
      </text>
      <text className={styles.cls33} transform="translate(578 153.5) rotate(67.5)">
        {years.gc1point}
      </text>
      <text className={styles.cls33} transform="translate(586 172) rotate(67.5)">
        {years.gc3point}
      </text>
      <text className={styles.cls33} transform="translate(594 190.5) rotate(67.5)">
        {years.gcpoint}
      </text>
      <text className={styles.cls33} transform="translate(602 209) rotate(67.5)">
        {years.gc5point}
      </text>
      <text className={styles.cls33} transform="translate(610 227.5) rotate(67.5)">
        {years.gc4point}
      </text>
      <text className={styles.cls33} transform="translate(618 246) rotate(67.5)">
        {years.gc6point}
      </text>

      {/* ci line */}
      <text className={styles.cls33} transform="translate(615 348) rotate(-67.5)">
        {years.ci2point}
      </text>
      <text className={styles.cls33} transform="translate(607 367) rotate(-67.5)">
        {years.ci1point}
      </text>
      <text className={styles.cls33} transform="translate(599 385.5) rotate(-67.5)">
        {years.ci3point}
      </text>
      <text className={styles.cls33} transform="translate(591 404) rotate(-67.5)">
        {years.cipoint}
      </text>
      <text className={styles.cls33} transform="translate(583 422.5) rotate(-67.5)">
        {years.ci5point}
      </text>
      <text className={styles.cls33} transform="translate(575 441) rotate(-67.5)">
        {years.ci4point}
      </text>
      <text className={styles.cls33} transform="translate(567 459.5) rotate(-67.5)">
        {years.ci6point}
      </text>

      {/* id line */}
      <text className={styles.cls33} transform="translate(496 532) rotate(-22.5)">
        {years.id2point}
      </text>
      <text className={styles.cls33} transform="translate(477.5 540) rotate(-22.5)">
        {years.id1point}
      </text>
      <text className={styles.cls33} transform="translate(459.5 548) rotate(-22.5)">
        {years.id3point}
      </text>
      <text className={styles.cls33} transform="translate(441 555.5) rotate(-22.5)">
        {years.idpoint}
      </text>
      <text className={styles.cls33} transform="translate(422.5 563) rotate(-22.5)">
        {years.id5point}
      </text>
      <text className={styles.cls33} transform="translate(404 571) rotate(-22.5)">
        {years.id4point}
      </text>
      <text className={styles.cls33} transform="translate(385 578.5) rotate(-22.5)">
        {years.id6point}
      </text>

      {/* dh line */}
      <text className={styles.cls33} transform="translate(282 578.5) rotate(22.5)">
        {years.dh2point}
      </text>
      <text className={styles.cls33} transform="translate(263.5 571) rotate(22.5)">
        {years.dh1point}
      </text>
      <text className={styles.cls33} transform="translate(244.5 563) rotate(22.5)">
        {years.dh3point}
      </text>
      <text className={styles.cls33} transform="translate(226 555.5) rotate(22.5)">
        {years.dhpoint}
      </text>
      <text className={styles.cls33} transform="translate(207 548) rotate(22.5)">
        {years.dh5point}
      </text>
      <text className={styles.cls33} transform="translate(188.5 540) rotate(22.5)">
        {years.dh4point}
      </text>
      <text className={styles.cls33} transform="translate(170 532) rotate(22.5)">
        {years.dh6point}
      </text>

      {/* ha line */}
      <text className={styles.cls33} transform="translate(97 459) rotate(67.5)">
        {years.ha2point}
      </text>
      <text className={styles.cls33} transform="translate(89 441) rotate(67.5)">
        {years.ha1point}
      </text>
      <text className={styles.cls33} transform="translate(81 423) rotate(67.5)">
        {years.ha3point}
      </text>
      <text className={styles.cls33} transform="translate(73 405) rotate(67.5)">
        {years.hapoint}
      </text>
      <text className={styles.cls33} transform="translate(65 386.5) rotate(67.5)">
        {years.ha5point}
      </text>
      <text className={styles.cls33} transform="translate(57 368) rotate(67.5)">
        {years.ha4point}
      </text>
      <text className={styles.cls33} transform="translate(49 349.5) rotate(67.5)">
        {years.ha6point}
      </text>
    </g>
  )
}

// Chakra Table Component
function ChakraTable({ data, t }: { data: PersonData; t: (key: string) => string }) {
  const resultPhysics = data.chartHeart.sahphysics + data.chartHeart.ajphysics + data.chartHeart.vishphysics + data.chartHeart.anahphysics + data.chartHeart.manphysics + data.chartHeart.svadphysics + data.chartHeart.mulphysics
  const resultEnergy = data.chartHeart.sahenergy + data.chartHeart.ajenergy + data.chartHeart.vishenergy + data.chartHeart.anahenergy + data.chartHeart.manenergy + data.chartHeart.svadenergy + data.chartHeart.mulenergy
  const resultEmotions = data.chartHeart.sahemotions + data.chartHeart.ajemotions + data.chartHeart.vishemotions + data.chartHeart.anahemotions + data.chartHeart.manemotions + data.chartHeart.svademotions + data.chartHeart.mulemotions

  // Helper function to reduce numbers
  const reduce = (n: number) => {
    let num = n
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = (num % 10) + Math.floor(num / 10)
    }
    return num
  }

  return (
    <div id="chakra-table" className={styles.chakraTableContainer}>
      <div className={styles.glowWrap} style={{ zIndex: -1 }}>
        <div className={styles.glow2}></div>
      </div>
      <table className={styles.chakraTable}>
        <thead>
          <tr className={styles.chakraTableHeader}>
            <th className={`${styles.chakraName} ${styles.chakraNameRadiusLeft}`}>{t('destiny.chakraName')}</th>
            <th className={styles.chakraTd}>{t('destiny.physics')}</th>
            <th className={styles.chakraTd}>{t('destiny.energy')}</th>
            <th className={`${styles.chakraTd} ${styles.chakraNameRadiusRight}`}>{t('destiny.emotions')}</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.chakraTr}>
            <td className={`${styles.chakraName} ${styles.chakraNameLeft}`}>
              <span className={styles.chakraNameFlex} id="circle-sahastrara">
                Sahastrara
              </span>
            </td>
            <td className={styles.chakraTd}>{data.chartHeart.sahphysics}</td>
            <td className={styles.chakraTd}>{data.chartHeart.sahenergy}</td>
            <td className={styles.chakraTd}>{data.chartHeart.sahemotions}</td>
          </tr>
          <tr className={styles.chakraTr}>
            <td className={`${styles.chakraName} ${styles.chakraNameLeft}`}>
              <span className={styles.chakraNameFlex} id="circle-ajna">
                Ajna
              </span>
            </td>
            <td className={styles.chakraTd}>{data.chartHeart.ajphysics}</td>
            <td className={styles.chakraTd}>{data.chartHeart.ajenergy}</td>
            <td className={styles.chakraTd}>{data.chartHeart.ajemotions}</td>
          </tr>
          <tr className={styles.chakraTr}>
            <td className={`${styles.chakraName} ${styles.chakraNameLeft}`}>
              <span className={styles.chakraNameFlex} id="circle-vishuddha">
                Vishuddha
              </span>
            </td>
            <td className={styles.chakraTd}>{data.chartHeart.vishphysics}</td>
            <td className={styles.chakraTd}>{data.chartHeart.vishenergy}</td>
            <td className={styles.chakraTd}>{data.chartHeart.vishemotions}</td>
          </tr>
          <tr className={styles.chakraTr}>
            <td className={`${styles.chakraName} ${styles.chakraNameLeft}`}>
              <span className={styles.chakraNameFlex} id="circle-anahata">
                Anahata
              </span>
            </td>
            <td className={styles.chakraTd}>{data.chartHeart.anahphysics}</td>
            <td className={styles.chakraTd}>{data.chartHeart.anahenergy}</td>
            <td className={styles.chakraTd}>{data.chartHeart.anahemotions}</td>
          </tr>
          <tr className={styles.chakraTr}>
            <td className={`${styles.chakraName} ${styles.chakraNameLeft}`}>
              <span className={styles.chakraNameFlex} id="circle-manipura">
                Manipura
              </span>
            </td>
            <td className={styles.chakraTd}>{data.chartHeart.manphysics}</td>
            <td className={styles.chakraTd}>{data.chartHeart.manenergy}</td>
            <td className={styles.chakraTd}>{data.chartHeart.manemotions}</td>
          </tr>
          <tr className={styles.chakraTr}>
            <td className={`${styles.chakraName} ${styles.chakraNameLeft}`}>
              <span className={styles.chakraNameFlex} id="circle-svadhishtana">
                Svadhishtana
              </span>
            </td>
            <td className={styles.chakraTd}>{data.chartHeart.svadphysics}</td>
            <td className={styles.chakraTd}>{data.chartHeart.svadenergy}</td>
            <td className={styles.chakraTd}>{data.chartHeart.svademotions}</td>
          </tr>
          <tr className={`${styles.chakraTr} ${styles.chakraNameBottom}`}>
            <td
              className={`${styles.chakraName} ${styles.chakraNameLeft}`}
              style={{ borderBottomLeftRadius: '10px' }}
            >
              <span className={styles.chakraNameFlex} id="circle-muladhara">
                Muladhara
              </span>
            </td>
            <td className={styles.chakraTd}>{data.chartHeart.mulphysics}</td>
            <td className={styles.chakraTd}>{data.chartHeart.mulenergy}</td>
            <td className={`${styles.chakraTd} ${styles.chakraNameRadiusRightBottom2}`}>
              {data.chartHeart.mulemotions}
            </td>
          </tr>
          <tr style={{ height: '20px' }}></tr>
          <tr className={`${styles.chakraTr} ${styles.chakraNameBottom} ${styles.chakraNameTop}`}>
            <td className={styles.chakraNameRadiusLeftBottom}>Result:</td>
            <td className={styles.chakraTd}>{reduce(resultPhysics)}</td>
            <td className={styles.chakraTd}>{reduce(resultEnergy)}</td>
            <td className={`${styles.chakraTd} ${styles.chakraNameRadiusRightBottom}`}>
              {reduce(resultEmotions)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

// Matrix Analysis Component
function MatrixAnalysis({ data, date, t }: { data: PersonData; date: string; t: (key: string) => string }) {
  // Calculate life path from date
  const getLifePath = (): number => {
    if (!date) return 0
    const parts = date.split('/')
    if (parts.length !== 3) return 0
    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10)
    const year = parseInt(parts[2], 10)
    if (isNaN(day) || isNaN(month) || isNaN(year)) return 0
    return calculateLifePath(day, month, year)
  }

  const lifePath = getLifePath()
  const getInterpretation = (num: number): string => {
    if (num >= 1 && num <= 9) {
      return t(`destiny.interpretations.${num}`)
    }
    if (num === 11) return t('destiny.lifePathMeanings.11')
    if (num === 22) return t('destiny.lifePathMeanings.22')
    if (num === 33) return t('destiny.lifePathMeanings.33')
    return ''
  }

  // Get unique numbers from key points for analysis
  const keyNumbers = [
    data.points.apoint,
    data.points.bpoint,
    data.points.cpoint,
    data.points.dpoint,
    data.points.epoint,
  ].filter((num, index, self) => self.indexOf(num) === index) // Get unique numbers

  return (
    <div className={styles.analysisContainer}>
      <h3 className={styles.analysisTitle}>{t('destiny.interpretations')}</h3>
      
      {lifePath > 0 && (
        <div className={styles.analysisSection}>
          <h4 className={styles.analysisSubtitle}>
            {t('destiny.lifePath')}: {lifePath}
          </h4>
          <p className={styles.analysisText}>
            {lifePath >= 1 && lifePath <= 9
              ? t(`destiny.lifePathMeanings.${lifePath}`)
              : lifePath === 11
              ? t('destiny.lifePathMeanings.11')
              : lifePath === 22
              ? t('destiny.lifePathMeanings.22')
              : lifePath === 33
              ? t('destiny.lifePathMeanings.33')
              : ''}
          </p>
        </div>
      )}

      <div className={styles.analysisSection}>
        <h4 className={styles.analysisSubtitle}>{t('destiny.matrixTitle')}</h4>
        <div className={styles.interpretationsList}>
          {keyNumbers.map((num) => {
            const interpretation = getInterpretation(num)
            if (!interpretation) return null
            return (
              <div key={num} className={styles.interpretationItem}>
                <span className={styles.interpretationNumber}>{num}:</span>
                <span className={styles.interpretationText}>{interpretation}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.analysisSection}>
        <h4 className={styles.analysisSubtitle}>{t('destiny.lines')}</h4>
        <div className={styles.linesList}>
          <div className={styles.lineItem}>
            <strong>{t('destiny.horizontal')}:</strong>
            <ul>
              <li>{t('destiny.lines.horizontal.1')}</li>
              <li>{t('destiny.lines.horizontal.2')}</li>
              <li>{t('destiny.lines.horizontal.3')}</li>
            </ul>
          </div>
          <div className={styles.lineItem}>
            <strong>{t('destiny.vertical')}:</strong>
            <ul>
              <li>{t('destiny.lines.vertical.1')}</li>
              <li>{t('destiny.lines.vertical.2')}</li>
              <li>{t('destiny.lines.vertical.3')}</li>
            </ul>
          </div>
          <div className={styles.lineItem}>
            <strong>{t('destiny.diagonal')}:</strong>
            <ul>
              <li>{t('destiny.lines.diagonal.1')}</li>
              <li>{t('destiny.lines.diagonal.2')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Purposes Table Component
function PurposesTable({ data, t }: { data: PersonData; t: (key: string) => string }) {
  return (
    <div className={styles.infoTxt}>
      <table id="purposes" className={styles.purposesTable}>
        <tbody>
          <tr className={styles.purposesTop}>
            <td colSpan={4} className={styles.tablePaddingTop}>
              <Image
                src="/destiny-matrix-assets/img/compatibilityStar.svg"
                alt=""
                width={50}
                height={50}
              />
            </td>
            <td width="10%"></td>
            <td colSpan={4} className={styles.tablePaddingTop}>
              <Image
                src="/destiny-matrix-assets/img/compatibilityStar.svg"
                alt=""
                width={50}
                height={50}
              />
            </td>
          </tr>
          <tr className={styles.smokyWhite2}>
            <td colSpan={4}>
              <h3>
                <b>{t('destiny.personalPurpose')}</b>
              </h3>
            </td>
            <td width="10%"></td>
            <td colSpan={4}>
              <h3>
                <b>{t('destiny.purposeForSociety')}</b>
              </h3>
            </td>
          </tr>
          <tr style={{ height: '5px' }}>
            <td></td>
          </tr>
          <tr className={styles.fontSize16}>
            <td colSpan={4} className={styles.tablePadding}>
              {t('destiny.personalPurposeDescription')}
            </td>
            <td width="6%"></td>
            <td colSpan={4} className={styles.tablePadding}>
              {t('destiny.socialPurposeDescription')}
            </td>
          </tr>
          <tr style={{ height: '5px' }}>
            <td></td>
          </tr>
          <tr className={styles.fontSize18} style={{ position: 'relative' }}>
            <td>{t('destiny.sky')}</td>
            <td>
              <span id="skypoint" className={styles.baseCircle}>
                {data.purposes.skypoint}
              </span>
            </td>
            <td rowSpan={2}>
              <svg width="45" height="61" viewBox="0 0 45 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.422852 1.06299H21.6661V60.0719H0.422852" stroke="#F9F9F8" strokeWidth="1.18018" />
                <path d="M44.68 30.5674H21.6665" stroke="#F9F9F8" strokeWidth="1.18018" />
              </svg>
            </td>
            <td rowSpan={2}>
              <span id="perspurpose" className={styles.baseCircle}>
                {data.purposes.perspurpose}
              </span>
            </td>
            <td></td>
            <td>{t('destiny.male')}</td>
            <td>
              <span id="malepoint" className={styles.baseCircle}>
                {data.purposes.malepoint}
              </span>
            </td>
            <td rowSpan={2}>
              <svg width="45" height="61" viewBox="0 0 45 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.422852 1.06299H21.6661V60.0719H0.422852" stroke="#F9F9F8" strokeWidth="1.18018" />
                <path d="M44.68 30.5674H21.6665" stroke="#F9F9F8" strokeWidth="1.18018" />
              </svg>
            </td>
            <td rowSpan={2}>
              <span id="socialpurpose" className={styles.baseCircle}>
                {data.purposes.socialpurpose}
              </span>
            </td>
          </tr>
          <tr className={styles.fontSize18}>
            <td>{t('destiny.earth')}</td>
            <td>
              <span id="earthpoint" className={styles.baseCircle}>
                {data.purposes.earthpoint}
              </span>
            </td>
            <td></td>
            <td>{t('destiny.female')}</td>
            <td>
              <span id="femalepoint" className={styles.baseCircle}>
                {data.purposes.femalepoint}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ height: '35px' }}></td>
          </tr>
          <tr className={styles.purposesTop}>
            <td colSpan={4} className={styles.tablePaddingTop}>
              <Image
                src="/destiny-matrix-assets/img/compatibilityStar.svg"
                alt=""
                width={50}
                height={50}
              />
            </td>
            <td width="10%"></td>
            <td colSpan={4} className={styles.tablePaddingTop}>
              <Image
                src="/destiny-matrix-assets/img/compatibilityStar.svg"
                alt=""
                width={50}
                height={50}
              />
            </td>
          </tr>
          <tr className={styles.smokyWhite2}>
            <td colSpan={4}>
              <h3>{t('destiny.generalPurposeTitle')}</h3>
            </td>
            <td></td>
            <td colSpan={4}>
              <h3>{t('destiny.planetaryPurposeTitle')}</h3>
            </td>
          </tr>
          <tr style={{ height: '5px' }}>
            <td></td>
          </tr>
          <tr className={styles.trade}>
            <td colSpan={4} className={`${styles.tablePadding} ${styles.fontSize16}`}>
              {t('destiny.generalPurposeDescription')}
            </td>
            <td></td>
            <td colSpan={4} className={styles.tablePadding}>
              {t('destiny.planetaryPurposeDescription')}
            </td>
          </tr>
          <tr>
            <td colSpan={9} style={{ height: '10px' }}></td>
          </tr>
          <tr className={styles.fontSize18}>
            <td colSpan={4} id="blom" style={{ textAlign: 'right' }}>
              <span id="generalpurpose" className={styles.baseCircle}>
                {data.purposes.generalpurpose}
              </span>
            </td>
            <td></td>
            <td colSpan={4} id="blom2" style={{ textAlign: 'right' }}>
              <span id="planetarypurpose" className={styles.baseCircle}>
                {data.purposes.planetarypurpose}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

