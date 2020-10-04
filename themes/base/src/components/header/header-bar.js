import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import tw from 'twin.macro'

import NavigationDesktop from './navigation-desktop'
import NavigationMobile from './navigation-mobile'

const MenuShowAnimation = keyframes`
  from {
    transform: translate3d(0, -100%, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`

const MenuHideAnimation = keyframes`
  from {
    ${tw`fixed top-0 left-0 right-0 bg-rootBackground`}
    transform: translate3d(0, 0, 0);
  }

  to {
    ${tw`fixed top-0 left-0 right-0 bg-rootBackground`}
    transform: translate3d(0, -100%, 0);
  }
`

const HeaderBarWrapper = styled.div(
  ({
    headerPassed,
    headerVisibleAgain,
    isNavigationTransparent,
    menuOpen,
    theme,
  }) => css`
    ${tw`
      flex-none
      relative z-50
      shadow-xl
      `}
    ${!isNavigationTransparent
      ? css`
          ${tw`bg-rootBackground text-text`}
        `
      : css`
          ${tw`text-white`}
          background: rgba(0,0,0,0.1);
        `};

    ${menuOpen &&
    css`
      ${tw`bg-rootBackground text-text`}
    `}

    ${headerPassed &&
    css`
      ${tw`fixed top-0 left-0 right-0 bg-rootBackground text-text shadow-xl`}
      animation: 0.45s ${MenuShowAnimation} ease-out;
      animation-fill-mode: both;
    `}

    ${headerVisibleAgain &&
    css`
      animation: 0.3s ${MenuHideAnimation} ease-in;
    `}
  `
)

const HeaderBar = ({
  headerPassed,
  headerVisibleAgain,
  menuOpen,
  isNavigationTransparent,
  setMenuOpen,
}) => {
  return (
    <HeaderBarWrapper
      isNavigationTransparent={isNavigationTransparent}
      headerPassed={headerPassed}
      headerVisibleAgain={headerVisibleAgain}
      menuOpen={menuOpen}
    >
      <NavigationDesktop isNavigationTransparent={isNavigationTransparent} />
      <NavigationMobile
        isNavigationTransparent={isNavigationTransparent}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </HeaderBarWrapper>
  )
}

HeaderBar.defaultProps = {
  headerPassed: false,
  headerVisibleAgain: false,
  menuOpen: false,
  isNavigationTransparent: false,
}

HeaderBar.propTypes = {
  headerPassed: propTypes.bool,
  headerVisibleAgain: propTypes.bool,
  menuOpen: propTypes.bool,
  isNavigationTransparent: propTypes.bool,
  setMenuOpen: propTypes.func,
}

export default HeaderBar
