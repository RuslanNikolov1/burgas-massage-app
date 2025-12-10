'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause } from '@phosphor-icons/react'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './MusicPlayer.module.scss'

export function MusicPlayer() {
  const t = useTranslations()
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Create audio element
    audioRef.current = new Audio('/massage-music-final.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.5 // Set volume to 50%

    // Handle audio events
    const audio = audioRef.current
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      audio.src = ''
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error)
      })
    }
  }

  return (
    <button
      type="button"
      className={styles.musicButton}
      onClick={togglePlay}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      aria-pressed={isPlaying}
    >
      {isPlaying ? (
        <Pause size={20} weight="fill" />
      ) : (
        <Play size={20} weight="fill" />
      )}
    </button>
  )
}









