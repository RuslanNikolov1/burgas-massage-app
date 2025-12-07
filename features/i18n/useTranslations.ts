'use client'

import { useState, useEffect, useMemo } from 'react'

type Translations = {
  [key: string]: {
    bg: string
    en: string
  }
}

const translations: Translations = {
  'nav.home': { bg: 'Начало', en: 'Home' },
  'nav.about': { bg: 'За мен', en: 'About' },
  'nav.pricing': { bg: 'Цени', en: 'Pricing' },
  'nav.booking': { bg: 'Резервация', en: 'Booking' },
  'nav.feedbacks': { bg: 'Отзиви', en: 'Reviews' },
  'nav.products': { bg: 'Продукти', en: 'Products' },
  'nav.contact': { bg: 'Контакти', en: 'Contact' },
  'hero.services': {
    bg: 'Масаж в Бургас и региона – Домашен масаж, мини спа и медитация',
    en: 'Massage in Burgas and region – Home massage, mini spa and meditation',
  },
  'hero.cities': {
    bg: 'Давам масажи и в Слънчев бряг, СветиВлас, Несебър, Кошарица, Равда, Поморие, Сарафово',
    en: 'I offer massages also in Sunny Beach, St. Vlas, Nessebar, Kosharitsa, Ravda, Pomorie, Sarafovo',
  },
  'hero.subtitle': { bg: 'Помагат с тревожност, стрес и паник атаки', en: 'Help with anxiety, stress and panic attacks' },
  'hero.motivational': { bg: 'Ръцете носят лечебна сила и топлина, която успокоява душата и лекува тялото. Всяко докосване е изкуство, всяко движение е грижа.', en: 'Your hands carry healing power and warmth that soothes the soul and heals the body. Every touch is art, every movement is care.' },
  'about.title': { bg: 'За мен', en: 'About Me' },
  'about.mission': {
    bg: 'Като масажист и енергиен терапевт, помагам на хората да възстановят вътрешния си баланс и да се освободят от стреса. Работя с професионален холистичен подход, съчетавайки масаж и енергийна терапия за физическо и емоционално благополучие.',
    en: 'As a massage therapist and energy practitioner, I help people restore their inner balance and release stress. I work with a professional holistic approach, combining massage and energy therapy for physical and emotional well-being.'
  },
  'about.mission2': {
    bg: 'Всяка сесия е персонализирана според нуждите на клиента. Създавам безопасно пространство за облекчение от болка, намаляване на стреса и подобряване на здраве и жизненост.',
    en: 'Each session is personalized according to the client\'s needs. I create a safe space for pain relief, stress reduction, and improved health and vitality.'
  },
  'about.mission3': {
    bg: 'Сертифициран съм в класически и терапевтични масажи и постоянно усъвършенствам знанията си. Моята цел е да помогна на всеки клиент да намери своя път към по-добро самочувствие и цялостно здраве.',
    en: 'I am certified in classical and therapeutic massage and continuously improve my knowledge. My goal is to help each client find their path to better well-being and overall health.'
  },
  'about.whatTitle': { bg: 'Какво правя', en: 'What I do' },
  'about.what.items.1': {
    bg: 'Извършвам индивидуални масажни терапии за отпускане на мускулите, подобряване на кръвообращението и намаляване на болката.',
    en: 'I provide individual massage sessions that relax muscles, improve circulation, and ease pain.'
  },
  'about.what.items.2': {
    bg: 'Работя с енергийни практики за хармонизиране на енергийните потоци и освобождаване на блокажи.',
    en: 'I work with energy practices that harmonize the body’s flow and release energetic blockages.'
  },
  'about.what.items.3': {
    bg: 'Създавам лично пространство за спокойствие, регенерация и вътрешна яснота.',
    en: 'I create a personal space for calm, regeneration, and inner clarity.'
  },
  'about.what.items.4': {
    bg: 'Подхождам с внимание, грижа и интуитивно усещане към нуждите на всеки клиент.',
    en: 'I approach every client with attentive care and an intuitive feel for their needs.'
  },
  'about.philosophyTitle': { bg: 'Моята философия', en: 'My philosophy' },
  'about.philosophyDescription': {
    bg: 'Вярвам, че тялото и енергията са тясно свързани. Когато двете работят в хармония, човек се чувства по-здрав, по-спокоен и по-силен. Чрез масаж и енергийна терапия помагам на клиентите си да постигнат това състояние на цялостен баланс.',
    en: 'I believe the body and its energy are deeply connected. When they move in harmony we feel healthier, calmer, and stronger. Through massage and energy therapy I support clients in reaching that state of holistic balance.'
  },
  'classic.label': { bg: 'Класически масаж', en: 'Classical Massage' },
  'classic.heading': { bg: 'Основата на обновяващото докосване', en: 'The Foundation of Restorative Touch' },
  'classic.description': {
    bg: 'Класическият (шведски) масаж комбинира плавни ефльоражни движения, месене и нежни мобилизации в ставите. Първо успокоява нервната система, за да омекне тялото и последващата работа да бъде безболезнена. Всяка сесия се адаптира спрямо състоянието ви в момента — за заземяване, зареждане или насочено освобождаване на упорито напрежение.',
    en: 'Classical (Swedish) massage blends flowing effleurage strokes, kneading, and gentle joint mobilizations. It calms the nervous system first so the body softens and deeper work stays comfortable. Every session is adjusted to how you arrive—grounding, energizing, or focusing on stubborn tension.'
  },
  'classic.bedAlt1': { bg: 'Масажно легло с подредени кърпи', en: 'Massage table with neatly folded towels' },
  'classic.bedAlt2': { bg: 'Подготвено пространство за класически масаж', en: 'Prepared space for a classical massage' },
  'classic.benefits.relaxation.title': { bg: 'Дълбока релаксация', en: 'Deep relaxation' },
  'classic.benefits.relaxation.description': {
    bg: 'Дългите плавни движения извеждат нервната система от стресов режим и позволяват на тялото да се отпусне.',
    en: 'Long, flowing strokes shift the nervous system out of stress mode so the body can truly soften.'
  },
  'classic.benefits.circulation.title': { bg: 'По-добро кръвообращение', en: 'Improved circulation' },
  'classic.benefits.circulation.description': {
    bg: 'Стимулира кръвния и лимфния поток, за да достигат повече кислород и хранителни вещества до мускулите.',
    en: 'Encourages blood and lymph flow so muscles receive more oxygen and nutrients.'
  },
  'classic.benefits.recovery.title': { bg: 'По-бързо възстановяване', en: 'Faster recovery' },
  'classic.benefits.recovery.description': {
    bg: 'Освобождава мускулни сраствания и скованост, съкращавайки времето за възстановяване след натоварване.',
    en: 'Releases adhesions and stiffness, shortening the recovery window after activity.'
  },
  'classic.benefits.posture.title': { bg: 'Осъзнаване на стойката', en: 'Posture awareness' },
  'classic.benefits.posture.description': {
    bg: 'Нежните мобилизации показват дисбаланси и помагат да нагласите стойката си между сесиите.',
    en: 'Gentle mobilizations highlight imbalances so you can adjust your posture between sessions.'
  },
  'chakras.title': { bg: 'Отваряне и балансиране на чакрите', en: 'Opening and Balancing the Chakras' },
  'chakras.intro': {
    bg: 'Отварянето на чакрите се постига чрез медитация, йога, дихателни практики (пранаяма), заземяване и използване на афирмации, етерични масла, музика и цветове. Тези техники подпомагат балансирането на енергийните центрове в тялото, водят до по-дълбоко спокойствие и възвръщане на жизнеността.',
    en: 'Chakra opening comes through meditation, yoga, breathwork (pranayama), grounding, affirmations, essential oils, music, and colors. Combined with mindful daily rituals and intentional rest, these practices keep the body’s energy centers balanced—cultivating calm, clarity, and a deeper sense of purpose in everyday life.'
  },
  'chakras.imageAlt': { bg: 'Илюстрация на чакрите', en: 'Illustration of chakras' },
  'chakras.ariaPractices': { bg: 'Практики за отваряне на чакрите', en: 'Practices for opening the chakras' },
  'chakras.practices.meditation.title': { bg: 'Медитация', en: 'Meditation' },
  'chakras.practices.meditation.description': {
    bg: 'Фокусирайте вниманието си върху всяка чакра, като наблюдавате дишането и усещанията в тялото.',
    en: 'Focus gently on each chakra while observing your breath and noticing subtle shifts in the body, allowing space for whatever arises.'
  },
  'chakras.practices.yoga.title': { bg: 'Йога', en: 'Yoga' },
  'chakras.practices.yoga.description': {
    bg: 'Асани като позата Дърво стабилизират коренната чакра, а нежните извивания активират горните центрове.',
    en: 'Asanas like Tree Pose stabilize the root chakra, while slow twists and backbends open the upper centers without overwhelming the system.'
  },
  'chakras.practices.pranayama.title': { bg: 'Пранаяма', en: 'Pranayama' },
  'chakras.practices.pranayama.description': {
    bg: 'Редуваното дишане през ноздрите и дълбокото коремно дишане успокояват нервната система и балансират чакрите.',
    en: 'Alternate-nostril breathing and deep belly breaths calm the nervous system, balancing each chakra with slow, intentional inhales and exhales.'
  },
  'chakras.practices.grounding.title': { bg: 'Заземяване', en: 'Grounding' },
  'chakras.practices.grounding.description': {
    bg: 'Разходка боси на земята активира коренната чакра и създава чувство на стабилност.',
    en: 'Walking barefoot on the earth, hugging a tree, or simply pausing outdoors activates the root chakra and renews your sense of stability.'
  },
  'chakras.practices.aroma.title': { bg: 'Ароматерапия', en: 'Aromatherapy' },
  'chakras.practices.aroma.description': {
    bg: 'Етерични масла като лавандула за сърдечната чакра или лимон за слънчевия сплит подкрепят хармонията.',
    en: 'Essential oils such as lavender for the heart or lemon for the solar plexus restore harmony and anchor a calming ritual at home.'
  },
  'chakras.practices.music.title': { bg: 'Музика и цветове', en: 'Music & color' },
  'chakras.practices.music.description': {
    bg: 'Бинаурални ритми, звуци и цветотерапия подпомагат релаксацията и изчистването на енергийните блокажи.',
    en: 'Binaural beats, healing sounds, and mindful use of color encourage relaxation, gently clearing energetic blocks layer by layer.'
  },
  'chakras.practices.affirmations.title': { bg: 'Афирмации', en: 'Affirmations' },
  'chakras.practices.affirmations.description': {
    bg: 'Утвърждения като „Аз съм в баланс“ пренасочват ума и подпомагат процеса на отваряне.',
    en: 'Affirmations such as “I am in balance” or “My energy flows freely” retrain the mind and keep the chakra-opening process supported.'
  },
  'pricing.title': { bg: 'Цени и Пакети', en: 'Pricing & Packages' },
  'pricing.duration': { bg: 'Време', en: 'Time' },
  'pricing.price': { bg: 'Цена', en: 'Price' },
  'pricing.rows.single30.duration': { bg: '30 мин', en: '30 min' },
  'pricing.rows.single30.price': { bg: '45 лв', en: '45 BGN' },
  'pricing.rows.single60.duration': { bg: '60 мин', en: '60 min' },
  'pricing.rows.single60.price': { bg: '80 лв', en: '80 BGN' },
  'pricing.rows.single90.duration': { bg: '90 мин', en: '90 min' },
  'pricing.rows.single90.price': { bg: '110 лв', en: '110 BGN' },
  'pricing.rows.relax.duration': { bg: 'Пакет „Релакс“', en: '“Relax” Package' },
  'pricing.rows.relax.package': { bg: '2 x 60 мин', en: '2 x 60 min' },
  'pricing.rows.relax.price': { bg: '140 лв', en: '140 BGN' },
  'pricing.rows.recovery.duration': { bg: 'Пакет „Възстановяване“', en: '“Recovery” Package' },
  'pricing.rows.recovery.package': { bg: '3 x 60 мин', en: '3 x 60 min' },
  'pricing.rows.recovery.price': { bg: '180 лв', en: '180 BGN' },
  'pricing.rows.premium.duration': { bg: 'Пакет „Премиум“', en: '“Premium” Package' },
  'pricing.rows.premium.package': { bg: '4 x 60 мин', en: '4 x 60 min' },
  'pricing.rows.premium.price': { bg: '220 лв', en: '220 BGN' },
  'pricing.rows.meditation.duration': { bg: 'Обновяваща медитация', en: 'Restorative meditation' },
  'pricing.rows.meditation.package': { bg: 'Безплатна практика', en: 'Complimentary session' },
  'pricing.rows.meditation.price': { bg: '0 лв', en: 'Free' },
  'booking.title': { bg: 'Резервирайте час', en: 'Book Your Session' },
  'booking.workingHours': { bg: 'Работно време: 9:00 - 18:00', en: 'Working hours: 9:00 AM - 6:00 PM' },
  'booking.prevMonth': { bg: '← Предишен', en: '← Previous' },
  'booking.nextMonth': { bg: 'Следващ →', en: 'Next →' },
  'booking.prevMonthAria': { bg: 'Предишен месец', en: 'Previous month' },
  'booking.nextMonthAria': { bg: 'Следващ месец', en: 'Next month' },
  'booking.selectDate': { bg: 'Изберете дата', en: 'Select Date' },
  'booking.selectTime': { bg: 'Изберете час', en: 'Select Time' },
  'booking.datesAria': { bg: 'Календар с налични дати за резервация', en: 'Calendar with available booking dates' },
  'booking.timesAria': { bg: 'Налични часове за избраната дата', en: 'Available times for the selected date' },
  'booking.reserveTitle': { bg: 'Вашата резервация', en: 'Your reservation' },
  'booking.reserveHint': { bg: 'Изберете дата и час от календара, за да продължите.', en: 'Pick a date and hour from the calendar to continue.' },
  'booking.selectedSlot': { bg: 'Избран слот', en: 'Selected slot' },
  'booking.reserveButton': { bg: 'Резервирай', en: 'Reserve' },
  'booking.reserveSending': { bg: 'Изпращане...', en: 'Sending...' },
  'booking.reserveSuccess': { bg: 'Заявката е изпратена. Ще се свържа с вас скоро.', en: 'Request sent. I will get back to you shortly.' },
  'booking.reserveError': { bg: 'Неуспешно изпращане. Моля, опитайте отново.', en: 'Could not send request. Please try again.' },
  'booking.nameLabel': { bg: 'Вашето име', en: 'Your name' },
  'booking.namePlaceholder': { bg: 'Въведете име', en: 'Type your name' },
  'booking.phoneLabel': { bg: 'Телефонен номер', en: 'Phone number' },
  'booking.phonePlaceholder': { bg: 'Въведете телефон', en: 'Type your phone number' },
  'feedbacks.title': { bg: 'Отзиви от клиенти', en: 'Client Reviews' },
  'feedbacks.items.1.name': { bg: 'Мария Петрова', en: 'Maria Petrova' },
  'feedbacks.items.1.text': { bg: 'Невероятен опит! Масажът беше много професионален и релаксиращ. Напълно препоръчвам!', en: 'Amazing experience! The massage was professional and deeply relaxing. Highly recommend!' },
  'feedbacks.items.1.date': { bg: '15 Декември 2024', en: '15 December 2024' },
  'feedbacks.items.2.name': { bg: 'Иван Георгиев', en: 'Ivan Georgiev' },
  'feedbacks.items.2.text': { bg: 'Отличен масажист! Помогна ми много с болките в гърба. Определено ще се върна отново.', en: 'Excellent therapist! Helped a lot with my back pain. I will definitely return.' },
  'feedbacks.items.2.date': { bg: '12 Декември 2024', en: '12 December 2024' },
  'feedbacks.items.3.name': { bg: 'Елена Димитрова', en: 'Elena Dimitrova' },
  'feedbacks.items.3.text': { bg: 'Много спокоен и професионален подход. Медитацията беше невероятна. Благодаря!', en: 'Very calm and professional approach. The meditation was incredible. Thank you!' },
  'feedbacks.items.3.date': { bg: '10 Декември 2024', en: '10 December 2024' },
  'feedbacks.items.4.name': { bg: 'Петър Стоянов', en: 'Petar Stoyanov' },
  'feedbacks.items.4.text': { bg: 'Първият ми масаж и беше страхотен! Много релаксиращ и професионален. Препоръчвам!', en: 'My first massage and it was great! Very relaxing and professional. Recommend!' },
  'feedbacks.items.4.date': { bg: '8 Декември 2024', en: '8 December 2024' },
  'feedbacks.items.5.name': { bg: 'Анна Иванова', en: 'Anna Ivanova' },
  'feedbacks.items.5.text': { bg: 'Отлично обслужване и много добър масаж. Помогна ми с тревожността. Благодаря много!', en: 'Excellent service and a great massage. Helped with my anxiety. Many thanks!' },
  'feedbacks.items.5.date': { bg: '5 Декември 2024', en: '5 December 2024' },
  'feedbacks.items.6.name': { bg: 'Димитър Николов', en: 'Dimitar Nikolov' },
  'feedbacks.items.6.text': { bg: 'Професионален масаж и много приятна атмосфера. Определено най-добрият в Бургас!', en: 'Professional massage and a lovely atmosphere. Definitely the best in Burgas!' },
  'feedbacks.items.6.date': { bg: '3 Декември 2024', en: '3 December 2024' },
  'products.title': { bg: 'Масажни продукти', en: 'Massage Products' },
  'products.storeMessage': { bg: 'Онлайн магазинът е в разработка', en: 'Online store under development' },
  'footer.text': { bg: 'Създаден от', en: 'Created by' },
  'products.womanAlt': { bg: 'Жена, наслаждаваща се на релаксиращ масаж', en: 'Woman enjoying a relaxing massage' },
  'products.items.1.name': { bg: 'Ароматерапевтично масло за масаж', en: 'Aromatherapy Massage Oil' },
  'products.items.1.description': { bg: 'Натурално масло с лавандула за релаксация', en: 'Natural lavender oil for deep relaxation' },
  'products.items.1.price': { bg: '45 лв', en: '45 BGN' },
  'products.items.2.name': { bg: 'Масажни камъни', en: 'Massage Stones' },
  'products.items.2.description': { bg: 'Комплект от базалтови камъни за топъл масаж', en: 'Set of basalt stones for hot massages' },
  'products.items.2.price': { bg: '80 лв', en: '80 BGN' },
  'products.items.3.name': { bg: 'Релаксиращ крем за тяло', en: 'Relaxing Body Cream' },
  'products.items.3.description': { bg: 'Крем с ментол и календула за успокояване', en: 'Menthol and calendula cream for soothing care' },
  'products.items.3.price': { bg: '35 лв', en: '35 BGN' },
  'products.items.4.name': { bg: 'Ароматни свещи', en: 'Aromatic Candles' },
  'products.items.4.description': { bg: 'Свещи с естествени аромати за атмосфера', en: 'Candles with natural scents for ambience' },
  'products.items.4.price': { bg: '25 лв', en: '25 BGN' },
  'products.items.5.name': { bg: 'Масажен ролер', en: 'Massage Roller' },
  'products.items.5.description': { bg: 'Дървен ролер за самомасаж', en: 'Wooden roller for self-massage' },
  'products.items.5.price': { bg: '55 лв', en: '55 BGN' },
  'products.items.6.name': { bg: 'Релаксиращ чай комплект', en: 'Relaxing Tea Set' },
  'products.items.6.description': { bg: 'Смес от билки за релаксация и спокойствие', en: 'Herbal blend for relaxation and calm' },
  'products.items.6.price': { bg: '30 лв', en: '30 BGN' },
  'products.buy': { bg: 'В студиото', en: 'In the studio' },
  'contact.title': { bg: 'Свържете се с мен', en: 'Get in Touch' },
  'contact.facebook': { bg: 'Facebook', en: 'Facebook' },
  'contact.instagram': { bg: 'Instagram', en: 'Instagram' },
  'contact.phone': { bg: 'Телефон', en: 'Phone' },
  'contact.messenger': { bg: 'Messenger', en: 'Messenger' },
  'contact.viber': { bg: 'Viber', en: 'Viber' },
  'contact.cashLabel': { bg: 'Моята друга работа', en: 'My other job' },
  'destiny.title': { bg: 'Матрица на съдбата', en: 'Destiny Matrix' },
  'destiny.subtitle': { bg: 'Въведете датата си на раждане и открийте вашата матрица, жизнен път и интерпретации.', en: 'Enter your birth date and discover your matrix, life path and interpretations.' },
  'destiny.calculate': { bg: 'Изчисли', en: 'Calculate' },
  'destiny.reset': { bg: 'Нулиране', en: 'Reset' },
  'destiny.interpretations': { bg: 'Интерпретации на личността', en: 'Personality Interpretations' },
  'destiny.lines': { bg: 'Линии (значения)', en: 'Lines (meanings)' },
  'destiny.exportPNG': { bg: 'Експорт PNG', en: 'Export PNG' },
  'destiny.exportPDF': { bg: 'Експорт PDF', en: 'Export PDF' },
  'destiny.share': { bg: 'Сподели', en: 'Share' },
  'destiny.alertDate': { bg: 'Моля, изберете датата си на раждане.', en: 'Please choose your birth date.' },
  'destiny.datePlaceholder': { bg: 'ДД/ММ/ГГГГ', en: 'DD/MM/YYYY' },
  'destiny.alertCalculate': { bg: 'Моля, изчислете матрицата си първо.', en: 'Please calculate your matrix first.' },
  'destiny.alertCopied': { bg: 'Изображението е копирано в клипборда! Можете да го поставите навсякъде.', en: 'Image copied to clipboard! You can paste it anywhere.' },
  'destiny.interpretations.1': { bg: 'Лидерство, инициатива, независимост, драйв.', en: 'Leadership, initiative, independence, drive.' },
  'destiny.interpretations.2': { bg: 'Сътрудничество, чувствителност, дипломация, партньорство.', en: 'Cooperation, sensitivity, diplomacy, partnership.' },
  'destiny.interpretations.3': { bg: 'Креативност, самовыражение, общителност, оптимизъм.', en: 'Creativity, self-expression, sociability, optimism.' },
  'destiny.interpretations.4': { bg: 'Дисциплина, структура, практичност, надеждност.', en: 'Discipline, structure, practicality, reliability.' },
  'destiny.interpretations.5': { bg: 'Свобода, приключение, разнообразие, любопитство.', en: 'Freedom, adventure, variety, curiosity.' },
  'destiny.interpretations.6': { bg: 'Служение, отговорност, семейство, грижа.', en: 'Service, responsibility, family, nurturing.' },
  'destiny.interpretations.7': { bg: 'Самоанализ, духовност, анализ, мъдрост.', en: 'Introspection, spirituality, analysis, wisdom.' },
  'destiny.interpretations.8': { bg: 'Сила, материално благополучие, авторитет, бизнес.', en: 'Power, material success, authority, business.' },
  'destiny.interpretations.9': { bg: 'Състрадание, идеализъм, хуманитарни грижи.', en: 'Compassion, idealism, humanitarian concerns.' },
  'destiny.lines.horizontal.1': { bg: 'Горен ред (1-2-3): Съзнателно аз, социална роля, непосредствено изражение.', en: 'Top row (1-2-3): Conscious self, social role, immediate expression.' },
  'destiny.lines.horizontal.2': { bg: 'Среден ред (4-5-6): Вътрешни подбуди, емоционален център, практически умения.', en: 'Middle row (4-5-6): Inner drives, emotional center, practical skill.' },
  'destiny.lines.horizontal.3': { bg: 'Долен ред (7-8-9): Подсъзнателни мотиви, жизнена цел, наследство.', en: 'Bottom row (7-8-9): Subconscious motives, life purpose, legacy.' },
  'destiny.lines.vertical.1': { bg: 'Лява колона (1-4-7): Лична идентичност, основи, корени.', en: 'Left column (1-4-7): Personal identity, foundations, roots.' },
  'destiny.lines.vertical.2': { bg: 'Централна колона (2-5-8): Оста на взаимоотношенията, сърце + център на силата.', en: 'Center column (2-5-8): Relationship axis, heart + power center.' },
  'destiny.lines.vertical.3': { bg: 'Дясна колона (3-6-9): Социална проекция, действие, завършване.', en: 'Right column (3-6-9): Social projection, action, completion.' },
  'destiny.lines.diagonal.1': { bg: 'Главен диагонал (1-5-9): Път на личностно развитие (аз → център → наследство).', en: 'Main diagonal (1-5-9): Personal development path (self → center → legacy).' },
  'destiny.lines.diagonal.2': { bg: 'Друг диагонал (3-5-7): Социална/креативна борба, превръщаща се в интеграция.', en: 'Other diagonal (3-5-7): Social/creative struggle turning into integration.' },
  'destiny.lifePathMeanings.1': { bg: 'Лидерство, независимост, оригиналност. Вие сте мотивирани да създавате, инициирате и водите.', en: 'Leadership, independence, originality. You are driven to create, initiate, and lead.' },
  'destiny.lifePathMeanings.2': { bg: 'Дипломация, чувствителност, хармония. Вие сте посредник и строител на мир.', en: 'Diplomacy, sensitivity, harmony. You are a mediator and peace-builder.' },
  'destiny.lifePathMeanings.3': { bg: 'Креативност, изразяване, радост. Вие процъфтявате в комуникацията и художественото изразяване.', en: 'Creativity, expression, joy. You thrive in communication and artistic expression.' },
  'destiny.lifePathMeanings.4': { bg: 'Стабилност, дисциплина, изграждане на основи. Предпочитате структура и дългосрочни цели.', en: 'Stability, discipline, foundation-building. You prefer structure and long-term goals.' },
  'destiny.lifePathMeanings.5': { bg: 'Свобода, приключение, адаптивност. Имате нужда от разнообразие и постоянна промяна.', en: 'Freedom, adventure, adaptability. You need variety and constant change.' },
  'destiny.lifePathMeanings.6': { bg: 'Отговорност, любов, грижа. Вие сте естествен грижовен и защитник.', en: 'Responsibility, love, nurturing. You are a natural caregiver and protector.' },
  'destiny.lifePathMeanings.7': { bg: 'Мъдрост, самоанализ, духовност. Търсите истината и по-дълбоко разбиране.', en: 'Wisdom, introspection, spirituality. You seek truth and deeper understanding.' },
  'destiny.lifePathMeanings.8': { bg: 'Сила, амбиция, успех. Вие сте мотивирани да постигате материално и професионално.', en: 'Power, ambition, success. You are driven to achieve materially and professionally.' },
  'destiny.lifePathMeanings.9': { bg: 'Състрадание, хуманитаризъм, завършване. Вие сте предназначени да помагате на колектива.', en: 'Compassion, humanitarianism, completion. You are meant to help the collective.' },
  'destiny.lifePathMeanings.11': { bg: 'Мастер Интуиция — повишена духовна прозорливост и чувствителност.', en: 'Master Intuition — heightened spiritual insight and sensitivity.' },
  'destiny.lifePathMeanings.22': { bg: 'Мастер Строител — превръщане на идеи в големи, трайни постижения.', en: 'Master Builder — turning ideas into large, lasting achievements.' },
  'destiny.lifePathMeanings.33': { bg: 'Мастер Учител — безусловна любов, изцеление и насоки.', en: 'Master Teacher — unconditional love, healing, and guidance.' },
  'nav.mainNavigation': { bg: 'Основна навигация', en: 'Main navigation' },
  'nav.menuOpen': { bg: 'Отвори меню', en: 'Open menu' },
  'nav.menuClose': { bg: 'Затвори меню', en: 'Close menu' },
  'nav.logoAria': { bg: 'Бургас Масаж - Начална страница', en: 'Burgas Massage - Home page' },
  'destiny.dateOfBirth': { bg: 'Дата на раждане', en: 'Date of birth' },
  'destiny.name': { bg: 'Име', en: 'Name' },
  'destiny.partner1DateOfBirth': { bg: 'Дата на раждане на партньор 1', en: 'Partner 1 date of birth' },
  'destiny.partner2DateOfBirth': { bg: 'Дата на раждане на партньор 2', en: 'Partner 2 date of birth' },
  'destiny.namePlaceholder': { bg: 'Име', en: 'Name' },
  'hero.logoAlt': { bg: 'Бургас Масаж - Професионален масаж и релаксация в Бургас', en: 'Burgas Massage - Professional massage and relaxation in Burgas' },
  'hero.massageAlt': { bg: 'Професионален масажист в Бургас предлагащ домашни масажи, мини спа и медитация услуги', en: 'Professional massage therapist in Burgas offering home massages, mini spa and meditation services' },
  'nav.logoAlt': { bg: 'Бургас Масаж - Професионален масаж и релаксация', en: 'Burgas Massage - Professional massage and relaxation' },
  'contact.meditationAlt': { bg: 'Медитация и релаксация услуги в Бургас за справяне с тревожност и стрес', en: 'Meditation and relaxation services in Burgas for managing anxiety and stress' },
  'destiny.partner1': { bg: 'Партньор 1', en: 'Partner 1' },
  'destiny.partner2': { bg: 'Партньор 2', en: 'Partner 2' },
  'destiny.enterDateAndName': { bg: 'Въведете датата си на раждане и име:', en: 'Enter your date of birth and name:' },
  'destiny.enterDate': { bg: 'Въведете датата си на раждане:', en: 'Enter your date of birth:' },
  'destiny.nameRequired': { bg: 'Името е задължително', en: 'Name is required' },
  'destiny.invalidNameFormat': { bg: 'Невалиден формат на име', en: 'Invalid name format' },
  'destiny.calculationError': { bg: 'Грешка при изчисление. Моля, опитайте отново.', en: 'Calculation error. Please try again.' },
  'destiny.bothDatesRequired': { bg: 'И двете дати са задължителни', en: 'Both dates are required' },
  'destiny.invalidDates': { bg: 'Невалидни дати', en: 'Invalid dates' },
  'destiny.personalCalculation': { bg: 'Лично изчисление', en: 'Personal calculation' },
  'destiny.compatibility': { bg: 'Съвместимост', en: 'Compatibility' },
  'destiny.createChart': { bg: 'създайте вашата матрица', en: 'create your matrix' },
  'destiny.dateOfBirthLabel': { bg: 'Дата на раждане:', en: 'Date of Birth:' },
  'destiny.analysis': { bg: 'Анализ', en: 'Analysis' },
  'destiny.strengthsOverview': { bg: 'Преглед на силните страни', en: 'Strengths Overview' },
  'destiny.challengesOverview': { bg: 'Преглед на предизвикателствата', en: 'Challenges Overview' },
  'destiny.professionalOutlook': { bg: 'Професионална перспектива', en: 'Professional Outlook' },
  'destiny.keyRecommendation': { bg: 'Ключова препоръка', en: 'Key Recommendation' },
  'destiny.yourCompatibility': { bg: 'Вашата съвместимост', en: 'Your compatibility' },
  'destiny.personalPurpose': { bg: 'Лична цел:', en: 'Personal purpose:' },
  'destiny.purposeForSociety': { bg: 'Цел за обществото и рода:', en: 'Purpose for society and genus:' },
  'destiny.openCalendar': { bg: 'Отвори календар', en: 'Open calendar' },
  'destiny.chakraName': { bg: 'Име на чакра', en: 'Chakra name' },
  'destiny.physics': { bg: 'Физика', en: 'Physics' },
  'destiny.energy': { bg: 'Енергия', en: 'Energy' },
  'destiny.emotions': { bg: 'Емоции', en: 'Emotions' },
  'destiny.result': { bg: 'Резултат:', en: 'Result:' },
  'destiny.years': { bg: 'години', en: 'years' },
  'destiny.yearsOld': { bg: 'години', en: 'years old' },
  'destiny.old': { bg: 'години', en: 'old' },
  'destiny.maleGenerationLine': { bg: 'мъжка генерационна линия', en: 'male generation line' },
  'destiny.femaleGenerationLine': { bg: 'женска генерационна линия', en: 'female generation line' },
  'destiny.sky': { bg: 'Небе:', en: 'Sky:' },
  'destiny.earth': { bg: 'Земя:', en: 'Earth:' },
  'destiny.male': { bg: 'М:', en: 'M:' },
  'destiny.female': { bg: 'Ж:', en: 'F:' },
  'destiny.personalPurposeDescription': {
    bg: 'Търсене на душата, баланс на женствените и мъжки качества, способности, умения',
    en: 'Soul searching, balance of feminine and masculine qualities, abilities, skills',
  },
  'destiny.socialPurposeDescription': {
    bg: 'Задачи за рода, резултати и признание в обществото',
    en: 'Tasks for genus, results and recognition in society',
  },
  'destiny.generalPurposeTitle': { bg: 'Обща цел за този живот:', en: 'General purpose for this lifetime:' },
  'destiny.planetaryPurposeTitle': { bg: 'Планетарна цел:', en: 'Planetary purpose:' },
  'destiny.generalPurposeDescription': {
    bg: 'Духовен път, глобална задача, къде е божественото в мен?',
    en: 'Spiritual path, global task, where is the divine in me?',
  },
  'destiny.planetaryPurposeDescription': { bg: 'Глобална цел на душата', en: 'Global soul purpose' },
  'music.relaxingMessage': { bg: 'Можете да пуснете релаксираща музика от тук', en: 'You can play relaxing music from here' },
  
  // Line Analysis Translations
  'destiny.mentalLine': { bg: 'Ментална линия', en: 'Mental Line' },
  'destiny.emotionalLine': { bg: 'Емоционална линия', en: 'Emotional Line' },
  'destiny.characterLine': { bg: 'Характерна линия', en: 'Character Line' },
  'destiny.horizontal': { bg: 'Хоризонтални линии', en: 'Horizontal Lines' },
  'destiny.vertical': { bg: 'Вертикални линии', en: 'Vertical Lines' },
  'destiny.diagonal': { bg: 'Диагонални линии', en: 'Diagonal Lines' },
  'destiny.matrixTitle': { bg: 'Анализ на матрицата', en: 'Matrix Analysis' },
  
  // Line Strength
  'destiny.lineStrength.empty': { bg: 'Празна (голям урок)', en: 'Empty (major lesson)' },
  'destiny.lineStrength.weak': { bg: 'Слаба', en: 'Weak' },
  'destiny.lineStrength.balanced': { bg: 'Балансирана', en: 'Balanced' },
  'destiny.lineStrength.strong': { bg: 'Силна', en: 'Strong' },
  
  // Analysis Labels
  'destiny.presentDigits': { bg: 'Присъстващи цифри', en: 'Present digits' },
  'destiny.missing': { bg: 'Липсващи', en: 'Missing' },
  'destiny.none': { bg: 'Няма', en: 'None' },
  'destiny.strengths': { bg: 'Силни страни', en: 'Strengths' },
  'destiny.weaknesses': { bg: 'Слаби страни', en: 'Weaknesses' },
  'destiny.excessEnergy': { bg: 'Излишна енергия', en: 'Excess Energy' },
  'destiny.behavioralExpression': { bg: 'Поведенческо изражение', en: 'Behavioral Expression' },
  'destiny.karmicLesson': { bg: 'Кармичен урок', en: 'Karmic Lesson' },
  'destiny.recommendation': { bg: 'Препоръка', en: 'Recommendation' },
  'destiny.missingDigits': { bg: 'Липсват цифри', en: 'Missing digits' },
  'destiny.digit': { bg: 'Цифра', en: 'Digit' },
  'destiny.appears': { bg: 'се появява', en: 'appears' },
  'destiny.times': { bg: 'пъти', en: 'times' },
  'destiny.karmicLessonText': { 
    bg: 'Трябва да развиете качествата на цифрите {digits} в {line} линията.', 
    en: 'You need to develop the qualities of digits {digits} in the {line} line.' 
  },
  
  // Recommendations (simplified - will be enhanced)
  'destiny.recommendation.mental': { 
    bg: 'Фокусирайте се върху развиване на мислене, логика и креативност. Използвайте планиране и структуриране.', 
    en: 'Focus on developing thinking, logic, and creativity. Use planning and structuring tools.' 
  },
  'destiny.recommendation.emotional': { 
    bg: 'Работете върху емоционална интелигентност и баланс. Практикувайте граници и асертивност.', 
    en: 'Work on emotional intelligence and balance. Practice boundaries and assertiveness.' 
  },
  'destiny.recommendation.character': { 
    bg: 'Развивайте дисциплина, воля и вътрешна рефлексия. Добавете редовни практики за самоанализ.', 
    en: 'Develop discipline, willpower, and inner reflection. Add regular self-analysis practices.' 
  },
}

const getLanguage = (): 'bg' | 'en' => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('language') as 'bg' | 'en' | null
      return saved || 'bg'
    } catch {
      return 'bg'
    }
  }
  return 'bg'
}

function useLanguageState() {
  const [languageState, setLanguageState] = useState<'bg' | 'en'>(() => getLanguage())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Sync with localStorage on mount (in case it changed)
    const currentLang = getLanguage()
    setLanguageState(currentLang)
  }, [])

  return mounted ? languageState : 'bg'
}

export function useLanguage() {
  return useLanguageState()
}

export function useTranslations() {
  const language = useLanguageState()

  const t = useMemo(() => {
    return (key: string): string => {
      if (!key) {
        return ''
      }
      if (!translations || typeof translations !== 'object') {
        return key
      }
      const translation = translations[key]
      if (!translation || typeof translation !== 'object') {
        return key
      }
      return translation[language] || translation.bg || key
    }
  }, [language])

  return t
}

