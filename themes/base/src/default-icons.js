import React from 'react'

// Basic pictograms via from https://heroicons.dev/
import Check from 'heroicons/solid/check.svg'
import Star from 'heroicons/solid/star.svg'
import Phone from 'heroicons/solid/phone.svg'
import Mail from 'heroicons/solid/mail.svg'
import Close from 'heroicons/solid/x.svg'
import ChevronRight from 'heroicons/outline/chevron-right.svg'
import ChevronLeft from 'heroicons/outline/chevron-left.svg'
import Menu from 'heroicons/outline/menu.svg'
import Cog from 'heroicons/solid/cog.svg'
import Chart from 'heroicons/solid/chart-square-bar.svg'

// Brand logos via https://simpleicons.org/ & https://react-icons.github.io/react-icons/
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiYoutube,
  SiTwitter,
  SiVimeo,
} from 'react-icons/si'

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
    close: { icon: Close },
    next: { icon: ChevronRight },
    previous: { icon: ChevronLeft },
    menu: { icon: Menu },
    settings: { icon: Cog },
    phone: { icon: Phone },
    mail: { icon: Mail },
    facebook: { icon: SiFacebook },
    instagram: { icon: SiInstagram },
    youtube: { icon: SiYoutube },
    linkedin: { icon: SiLinkedin },
    twitter: { icon: SiTwitter },
    vimeo: { icon: SiVimeo },
    matomo: { icon: Chart },
    'flag-de': { icon: FlagDe },
    'flag-en-US': { icon: FlagEn },
  })
)
