export function scrollToSectionId(sectionId: string, options?: { extraOffsetPx?: number }) {
  if (typeof window === 'undefined') return

  const element = document.getElementById(sectionId)
  if (!element) return

  const header = document.querySelector('header')
  const headerHeight = header instanceof HTMLElement ? header.getBoundingClientRect().height : 0
  const extraOffsetPx = options?.extraOffsetPx ?? 12

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight - extraOffsetPx

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}

