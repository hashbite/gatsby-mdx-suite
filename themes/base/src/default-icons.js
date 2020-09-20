import React from 'react'

// Basic pictograms via from https://heroicons.dev/
import Check from 'heroicons/solid/check.svg'
import Star from 'heroicons/solid/star.svg'
import Phone from 'heroicons/solid/phone.svg'
import Mail from 'heroicons/solid/mail.svg'

// Brand logos via https://simpleicons.org/
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
} from '@icons-pack/react-simple-icons'

// Country flags via https://flagicons.lipis.dev/
import FlagDe from 'flag-icon-css/flags/4x3/de.svg'
import FlagEn from 'flag-icon-css/flags/4x3/gb.svg'

// Custom icons
const Dot = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="6" fill="currentColor" />
  </svg>
)

const Circle = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" />
  </svg>
)

export default new Map(
  Object.entries({
    check: { icon: Check, scale: 1.2 },
    circle: { icon: Circle },
    dot: { icon: Dot },
    dotSmall: { icon: Dot, scale: 0.6 },
    star: { icon: Star },
    phone: { icon: Phone },
    mail: { icon: Mail },
    facebook: { icon: Facebook },
    instagram: { icon: Instagram },
    youtube: { icon: Youtube },
    linkedin: { icon: Linkedin },
    twitter: { icon: Twitter },
    'flag-de': { icon: FlagDe },
    'flag-en-US': { icon: FlagEn },
  })
)
