import React from 'react'

// Basic pictograms via from https://heroicons.dev/
import { HiCheck } from '@react-icons/all-files/hi/HiCheck'
import { HiStar } from '@react-icons/all-files/hi/HiStar'
import { HiPhone } from '@react-icons/all-files/hi/HiPhone'
import { HiMail } from '@react-icons/all-files/hi/HiMail'
import { HiClose } from '@react-icons/all-files/hi/HiX'
import { HiChevronRight } from '@react-icons/all-files/hi/HiChevronRight'
import { HiChevronLeft } from '@react-icons/all-files/hi/HiChevronLeft'
import { HiMenu } from '@react-icons/all-files/hi/HiMenu'
import { HiCog } from '@react-icons/all-files/hi/HiCog'
import { HiExternalLink } from '@react-icons/all-files/hi/HiExternalLink'
import { HiOutlineSwitchHorizontal } from '@react-icons/all-files/hi/HiOutlineSwitchHorizontal'

// Brand logos via https://simpleicons.org/
import { SiFacebook } from '@react-icons/all-files/si/SiFacebook'
import { SiInstagram } from '@react-icons/all-files/si/SiInstagram'
import { SiLinkedin } from '@react-icons/all-files/si/SiLinkedin'
import { SiYoutube } from '@react-icons/all-files/si/SiYoutube'
import { SiTwitter } from '@react-icons/all-files/si/SiTwitter'
import { SiVimeo } from '@react-icons/all-files/si/SiVimeo'

import { BsArrowRepeat } from '@react-icons/all-files/bs/BsArrowRepeat'
import { BsCodeSlash } from '@react-icons/all-files/bs/BsCodeSlash'

import { MdContentPaste } from '@react-icons/all-files/md/MdContentPaste'

import { AiOutlineDelete } from '@react-icons/all-files/ai/AiOutlineDelete'
import { AiOutlineInfoCircle } from '@react-icons/all-files/ai/AiOutlineInfoCircle'
import { AiOutlineLock } from '@react-icons/all-files/ai/AiOutlineLock'
import { AiOutlineQuestionCircle } from '@react-icons/all-files/ai/AiOutlineQuestionCircle'
import { AiOutlineUnlock } from '@react-icons/all-files/ai/AiOutlineUnlock'
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch'

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
    check: { icon: HiCheck, scale: 1.2 },
    circle: { icon: Circle },
    dot: { icon: Dot },
    dotSmall: { icon: Dot, scale: 0.6 },
    star: { icon: HiStar },
    close: { icon: HiClose },
    next: { icon: HiChevronRight },
    previous: { icon: HiChevronLeft },
    menu: { icon: HiMenu },
    settings: { icon: HiCog },
    'external-link': { icon: HiExternalLink },
    repeat: { icon: BsArrowRepeat },
    search: { icon: AiOutlineSearch },
    lock: { icon: AiOutlineLock },
    unlock: { icon: AiOutlineUnlock },
    code: { icon: BsCodeSlash },
    trash: { icon: AiOutlineDelete },
    question: { icon: AiOutlineQuestionCircle },
    info: { icon: AiOutlineInfoCircle },
    snippets: { icon: MdContentPaste },
    switch: { icon: HiOutlineSwitchHorizontal },
    phone: { icon: HiPhone },
    mail: { icon: HiMail },
    facebook: { icon: SiFacebook },
    instagram: { icon: SiInstagram },
    youtube: { icon: SiYoutube },
    linkedin: { icon: SiLinkedin },
    twitter: { icon: SiTwitter },
    vimeo: { icon: SiVimeo },
    'flag-de': { icon: FlagDe },
    'flag-en-US': { icon: FlagEn },
  })
)
