import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const getPreferredLanguageFromHeader = (acceptLanguage: string | null): 'bg' | 'en' | 'ru' => {
  if (!acceptLanguage) {
    return 'bg'
  }

  const normalized = acceptLanguage.toLowerCase()

  if (normalized.includes('bg')) {
    return 'bg'
  }

  if (normalized.includes('ru')) {
    return 'ru'
  }

  if (normalized.includes('en')) {
    return 'en'
  }

  return 'bg'
}

export default async function RootPage() {
  const headerList = await headers()
  const acceptLanguage = headerList.get('accept-language')
  const lang = getPreferredLanguageFromHeader(acceptLanguage)

  redirect(`/${lang}`)
}

