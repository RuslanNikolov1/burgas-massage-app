import Image from 'next/image'
import {
  FlowerLotus,
  PersonSimpleWalk,
  Wind,
  Tree,
  DropHalf,
  MusicNotes,
  Quotes,
} from 'phosphor-react'
import styles from './Chakras.module.scss'

const iconColor = '#d1b272'

const PRACTICES = [
  {
    title: 'Медитация',
    description:
      'Фокусирайте вниманието си върху всяка чакра, като наблюдавате дишането и усещанията в тялото.',
    icon: FlowerLotus,
  },
  {
    title: 'Йога',
    description:
      'Асани като позата Дърво стабилизират коренната чакра, а нежните извивания активират горните центрове.',
    icon: PersonSimpleWalk,
  },
  {
    title: 'Пранаяма',
    description:
      'Редуваното дишане през ноздрите и дълбокото коремно дишане успокояват нервната система и балансират чакрите.',
    icon: Wind,
  },
  {
    title: 'Заземяване',
    description: 'Разходка боси на земята активира коренната чакра и създава чувство на стабилност.',
    icon: Tree,
  },
  {
    title: 'Ароматерапия',
    description:
      'Етерични масла като лавандула за сърдечната чакра или лимон за слънчевия сплит подкрепят хармонията.',
    icon: DropHalf,
  },
  {
    title: 'Музика и цветове',
    description:
      'Бинаурални ритми, звуци и цветотерапия подпомагат релаксацията и изчистването на енергийните блокажи.',
    icon: MusicNotes,
  },
  {
    title: 'Афирмации',
    description: 'Утвърждения като „Аз съм в баланс“ пренасочват ума и подпомагат процеса на отваряне.',
    icon: Quotes,
  },
]

export function Chakras() {
  return (
    <section className={styles.chakras} aria-labelledby="chakras-title">
      <div className="container">
        <div className={styles.imageWrapper}>
          <Image
            src="/chakras.jpg"
            alt="Илюстрация на чакрите"
            width={360}
            height={360}
            className={styles.image}
            sizes="(max-width: 768px) 60vw, 360px"
          />
        </div>

        <header className={styles.header}>
          <h2 id="chakras-title" className="section-title">
            Отваряне и балансиране на чакрите
          </h2>
        </header>

        <p className={styles.intro}>
          Отварянето на чакрите се постига чрез медитация, йога, дихателни практики (пранаяма), заземяване и
          използване на афирмации, етерични масла, музика и цветове. Тези техники подпомагат балансирането на
          енергийните центрове в тялото, водят до по-дълбоко спокойствие и възвръщане на жизнеността.
        </p>

        <div className={styles.grid} aria-label="Практики за отваряне на чакрите">
          {PRACTICES.map(practice => (
            <article key={practice.title} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>
                  <practice.icon size={32} color={iconColor} weight="duotone" aria-hidden />
                </span>
                <h3>{practice.title}</h3>
              </div>
              <p>{practice.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


