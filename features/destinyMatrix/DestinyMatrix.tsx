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
      const data = createPersonFromDate(dateISO)
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
    setPersonalData(null)
    setPersonalError('')
  }

  return (
    <section id="destiny-matrix" className={`${styles.root} ${className}`}>
      <div className={styles.header}>
        <div className={styles.glowWrap}>
          <div className={styles.glow}></div>
      </div>
        <h1 className={styles.title}>{t('destiny.title')}</h1>
        </div>

      <PersonalCalculator
        date={personalDate}
        data={personalData}
        error={personalError}
        onDateChange={setPersonalDate}
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
  data,
  error,
  onDateChange,
  onCalculate,
  onReset,
  containerRef,
  t,
}: {
  date: string
  data: PersonData | null
  error: string
  onDateChange: (date: string) => void
  onCalculate: () => void
  onReset: () => void
  containerRef: React.RefObject<HTMLDivElement | null>
  t: (key: string) => string
}) {
  const datePickerRef = useRef<HTMLInputElement>(null)
  const dateInputRef = useRef<HTMLInputElement>(null)
  const formatGuideRef = useRef<HTMLSpanElement>(null)
  
  // Update format guide position based on typed text width
  useEffect(() => {
    if (date && dateInputRef.current && formatGuideRef.current) {
      // Create a temporary span to measure the typed text width
      const measureSpan = document.createElement('span')
      measureSpan.style.visibility = 'hidden'
      measureSpan.style.position = 'absolute'
      measureSpan.style.fontFamily = getComputedStyle(dateInputRef.current).fontFamily
      measureSpan.style.fontSize = getComputedStyle(dateInputRef.current).fontSize
      measureSpan.textContent = date
      document.body.appendChild(measureSpan)
      const width = measureSpan.offsetWidth
      document.body.removeChild(measureSpan)
      
      // Position the format guide after the typed text
      const padding = parseFloat(getComputedStyle(dateInputRef.current).paddingLeft) || 0
      formatGuideRef.current.style.left = `${padding + width}px`
    } else if (formatGuideRef.current) {
      // Reset position when empty
      formatGuideRef.current.style.left = ''
    }
  }, [date])
  
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

  // Generate dynamic placeholder based on current input
  const getDynamicPlaceholder = (): string => {
    if (!date) return t('destiny.datePlaceholder')
    
    const parts = date.split('/')
    if (parts.length === 1 && parts[0].length > 0) {
      // Only day entered: show "/MM/YYYY" after the typed day
      return '/MM/YYYY'
    } else if (parts.length === 2 && parts[1].length > 0) {
      // Day and month entered: show "/YYYY" after the typed date
      return '/YYYY'
    }
    // Full date entered - don't show placeholder
    return ''
  }

  return (
    <>
      <div className={styles.birthdayContainer}>
        <p>{t('destiny.enterDate')}</p>
        <div className={styles.inputsWrapper}>
          <div className={styles.inputsRow}>
            <div className={styles.inputWrap}>
              <div className={styles.dateInputWrapper}>
                <input
                  ref={dateInputRef}
                  id="personal-date"
                  type="text"
                  value={date}
                  onChange={handleDateInput}
                  placeholder=""
                  maxLength={10}
                  aria-label={t('destiny.dateOfBirth')}
                  className={styles.dateInput}
                  data-has-value={!!date}
                />
                <span 
                  ref={formatGuideRef}
                  className={styles.dateFormatGuide} 
                  data-has-value={!!date}
                >
                  {getDynamicPlaceholder()}
                </span>
              </div>
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
                <Calendar size={24} weight="duotone" />
              </button>
            </div>
            <button id="get-the-answer" onClick={onCalculate} className={styles.createButton}>
              {t('destiny.createChart')}
            </button>
          </div>
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
      <text className={styles.cls28} transform="translate(10 295)">
        0
        <tspan x="-15" y="10">{t('destiny.years')}</tspan>
      </text>
      <text className={styles.cls28} transform="translate(85 70)">
        10
        <tspan x="-12" y="10">{t('destiny.years')}</tspan>
      </text>
      <text className={styles.cls28} transform="translate(315 10)">
        20
        <tspan x="-12" y="10">{t('destiny.years')}</tspan>
      </text>
      <text className={styles.cls28} transform="translate(535 70)">
        30
        <tspan x="-12" y="10">{t('destiny.years')}</tspan>
      </text>
      <text className={styles.cls28} transform="translate(625 295)">
        40
        <tspan x="-12" y="10">{t('destiny.years')}</tspan>
      </text>
      <text className={styles.cls28} transform="translate(535 515)">
        50
        <tspan x="-12" y="10">{t('destiny.years')}</tspan>
      </text>
      <text className={styles.cls28} transform="translate(315 575)">
        60
        <tspan x="-12" y="10">{t('destiny.years')}</tspan>
      </text>
      <text className={styles.cls28} transform="translate(85 515)">
        70
        <tspan x="-12" y="10">{t('destiny.years')}</tspan>
      </text>

      {/* Intermediate year labels (5, 15, 25, 35, 45, 55, 65, 75) */}
      <text className={styles.cls29} transform="translate(82.49 198.76)">
        5
        <tspan className={styles.cls43} x="15" y="-3">{t('destiny.years')}</tspan>
      </text>
      <text className={styles.cls29} transform="translate(217.22 66.42)">
        15
        <tspan className={styles.cls43} x="20" y="-3">{t('destiny.years')}</tspan>
      </text>
      <text className={styles.cls29} transform="translate(390.8 67.22)">
        25
        <tspan className={styles.cls43} x="22" y="-3">{t('destiny.years')}</tspan>
      </text>
      <text className={styles.cls29} transform="translate(525.55 204.76)">
        35
        <tspan className={styles.cls43} x="22" y="-3">{t('destiny.years')}</tspan>
      </text>
      <text className={styles.cls29} transform="translate(527.76 402.12)">
        45
        <tspan className={styles.cls43} x="22" y="-3">{t('destiny.years')}</tspan>
      </text>
      <text className={styles.cls29} transform="translate(388.8 539.38)">
        55
        <tspan className={styles.cls43} x="22" y="-3">{t('destiny.years')}</tspan>
      </text>
      <text className={styles.cls29} transform="translate(220.6 539.38)">
        65
        <tspan className={styles.cls43} x="22" y="-3">{t('destiny.years')}</tspan>
      </text>
      <text className={styles.cls29} transform="translate(82.69 400.12)">
        75
        <tspan className={styles.cls43} x="22" y="-3">{t('destiny.years')}</tspan>
      </text>

      {/* Age range labels - pushed further from matrix center (333, 299) by factor of 1.2 */}
      <text className={styles.cls61} transform="translate(58.16 250.53)">1-2,5</text>
      <text className={styles.cls61} transform="translate(64.03 231.33)">2,5-3,5</text>
      <text className={styles.cls61} transform="translate(69.67 212.08)">3,5-4</text>
      <text className={styles.cls61} transform="translate(80.87 173.08)">6-7,5</text>
      <text className={styles.cls61} transform="translate(86.87 153.08)">7,5-8,5</text>
      <text className={styles.cls61} transform="translate(93.87 135.08)">8,5-9</text>
      <text className={styles.cls61} transform="translate(146.04 76.41)">11-12,5</text>
      <text className={styles.cls61} transform="translate(163.09 68.35)">12,5-13,5</text>
      <text className={styles.cls61} transform="translate(180.86 60.66)">13,5-14</text>
      <text className={styles.cls61} transform="translate(213.21 44.40)">16-17,5</text>
      <text className={styles.cls61} transform="translate(230.26 36.42)">17,5-18,5</text>
      <text className={styles.cls61} transform="translate(247.80 28.42)">18,5-19</text>
      <text className={styles.cls61} transform="translate(315.40 27.42)">21-22,5</text>
      <text className={styles.cls61} transform="translate(327.30 35.80)">22,5-23,5</text>
      <text className={styles.cls61} transform="translate(350.56 43.40)">23,5-24</text>
      <text className={styles.cls61} transform="translate(385.01 58.17)">26-27,5</text>
      <text className={styles.cls61} transform="translate(399.01 65.55)">27,5-28,5</text>
      <text className={styles.cls61} transform="translate(419.31 72.41)">28,5-29</text>
      <text className={styles.cls61} transform="translate(476.40 131.08)">31-32,5</text>
      <text className={styles.cls61} transform="translate(476.74 147.08)">32,5-33,5</text>
      <text className={styles.cls61} transform="translate(490.34 164.88)">33,5-34</text>
      <text className={styles.cls61} transform="translate(504.12 200.08)">36-37,5</text>
      <text className={styles.cls61} transform="translate(505.92 217.93)">37,5-38,5</text>
      <text className={styles.cls61} transform="translate(517.68 235.13)">38,5-39</text>
      <text className={styles.cls61} transform="translate(517.19 323.18)">41-42,5</text>
      <text className={styles.cls61} transform="translate(504.07 340.22)">42,5-43,5</text>
      <text className={styles.cls61} transform="translate(502.76 358.94)">43,5-44</text>
      <text className={styles.cls61} transform="translate(488.39 394.12)">46-47,5</text>
      <text className={styles.cls61} transform="translate(475.78 411.83)">47,5-48,5</text>
      <text className={styles.cls61} transform="translate(474.44 430.10)">48,5-49</text>
      <text className={styles.cls61} transform="translate(313.66 531.81)">58,5-59</text>
      <text className={styles.cls61} transform="translate(323.31 523.75)">57,5-58,5</text>
      <text className={styles.cls61} transform="translate(340.26 516.42)">56-57,5</text>
      <text className={styles.cls61} transform="translate(380.21 499.20)">53,5-54</text>
      <text className={styles.cls61} transform="translate(390.66 492.22)">52,5-53,5</text>
      <text className={styles.cls61} transform="translate(410.60 484.02)">51-52,5</text>
      <text className={styles.cls61} transform="translate(127.20 492.82)">68,5-69</text>
      <text className={styles.cls61} transform="translate(145.30 499.60)">67,5-68,5</text>
      <text className={styles.cls61} transform="translate(163.16 506.20)">66-67,5</text>
      <text className={styles.cls61} transform="translate(201.21 521.42)">63,5-64</text>
      <text className={styles.cls61} transform="translate(217.41 527.75)">62,5-63,5</text>
      <text className={styles.cls61} transform="translate(230.71 533.81)">61-62,5</text>
      <text className={styles.cls61} transform="translate(60.50 332.58)">78,5-79</text>
      <text className={styles.cls61} transform="translate(67.14 349.82)">77,5-78,5</text>
      <text className={styles.cls61} transform="translate(74.14 366.94)">76-77,5</text>
      <text className={styles.cls61} transform="translate(88.52 402.12)">73,5-74</text>
      <text className={styles.cls61} transform="translate(95.92 419.83)">72,5-73,5</text>
      <text className={styles.cls61} transform="translate(102.88 437.10)">71-72,5</text>

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
