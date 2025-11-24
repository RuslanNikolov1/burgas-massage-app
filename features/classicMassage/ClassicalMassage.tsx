import { Leaf, Heartbeat, ClockCounterClockwise, PersonSimple } from 'phosphor-react'
import styles from './ClassicalMassage.module.scss'

const BENEFITS = [
  {
    title: 'Дълбока релаксация',
    description:
      'Дългите плавни движения извеждат нервната система от стресов режим и позволяват на тялото да се отпусне.',
    icon: Leaf,
  },
  {
    title: 'По-добро кръвообращение',
    description:
      'Стимулира кръвния и лимфния поток, за да достигат повече кислород и хранителни вещества до мускулите.',
    icon: Heartbeat,
  },
  {
    title: 'По-бързо възстановяване',
    description:
      'Освобождава мускулни сраствания и скованост, съкращавайки времето за възстановяване след натоварване.',
    icon: ClockCounterClockwise,
  },
  {
    title: 'Осъзнаване на стойката',
    description:
      'Нежните мобилизации показват дисбаланси и помагат да нагласите стойката си между сесиите.',
    icon: PersonSimple,
  },
]

export function ClassicalMassage() {
  return (
    <section className={styles.classicalMassage} aria-labelledby="classical-massage-title">
      <div className="container">
        <div className={styles.content}>
          <div className={styles.intro}>
            <p className={styles.sectionLabel}>Класически масаж</p>
            <h2 id="classical-massage-title" className="section-title">
              Основата на възстановяващото докосване
            </h2>
            <p>
              Класическият (шведски) масаж комбинира плавни ефльоражни движения, месене и нежни мобилизации в ставите.
              Първо успокоява нервната система, за да омекне тялото и последващата работа да бъде безболезнена. Всяка
              сесия се адаптира спрямо състоянието ви в момента — за заземяване, зареждане или насочено освобождаване на
              упорито напрежение.
            </p>
          </div>

          <div className={styles.benefits} aria-label="Ползи от класическия масаж">
            {BENEFITS.map(benefit => (
              <article key={benefit.title} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>
                    <benefit.icon size={32} color="#d1b272" weight="duotone" aria-hidden />
                  </span>
                  <h3>{benefit.title}</h3>
                </div>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


