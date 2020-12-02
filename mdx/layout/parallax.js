import React, { useState, useMemo, useCallback } from 'react'
import propTypes from 'prop-types'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useBreakpoint } from '@gatsby-mdx-suite/helpers/hooks/use-breakpoint'

gsap.registerPlugin(ScrollTrigger)

// @todo seems like rerenders in the playground still cause instance duplication/overflows
function killScrollTrigger(instance) {
  if (!instance) {
    return
  }
  if (instance.scrollTrigger) {
    instance.scrollTrigger.kill()
  }
  instance.kill()
}

const Parallax = ({ children, till, from, yDistance, markers }) => {
  const activeBreakpoints = useBreakpoint()
  const [instance, setInstance] = useState(null)

  const effectActive = useMemo(() => {
    if (
      (!till && !from) ||
      (till && !activeBreakpoints[till]) ||
      (from && activeBreakpoints[from])
    ) {
      return true
    }

    killScrollTrigger(instance)

    return false
  }, [till, from, activeBreakpoints, instance])

  const [transformStart, transformEnd] = useMemo(
    () => [
      effectActive ? `translateY(${yDistance})` : '',
      effectActive ? `translateY(-${yDistance})` : '',
    ],
    [yDistance, effectActive]
  )

  const initScrollTrigger = useCallback(
    (node) => {
      if (!node || !effectActive) {
        return
      }

      const positionParent = node.closest('section,#___gatsby')

      const gsapInstance = gsap
        .timeline({
          scrollTrigger: {
            trigger: positionParent,
            scrub: true,
            markers,
            start: `top center`,
            end: `bottom center`,
            invalidateOnRefresh: true,
          },
        })
        .to(node, {
          transform: transformEnd,
        })

      setInstance((i) => {
        killScrollTrigger(i)
        return gsapInstance
      })

      return () => killScrollTrigger(gsapInstance)
    },
    [effectActive, transformEnd, markers]
  )

  const styledChild = useMemo(() => {
    const count = React.Children.count(children)
    let wrappedChildren = children

    if (
      typeof children === 'string' ||
      !count ||
      count > 1 ||
      typeof children?.type?.render === 'function'
    ) {
      wrappedChildren = <div>{children}</div>
    }

    return React.cloneElement(wrappedChildren, {
      style: { transform: transformStart },
      ref: initScrollTrigger,
    })
  }, [children, transformStart, initScrollTrigger])

  return <>{styledChild}</>
}

Parallax.defaultProps = {
  yDistance: '50%',
  from: 'sm',
  markers: false,
}

Parallax.propTypes = {
  children: propTypes.node.isRequired,
  /** Distance the component will travel parallax on the Y-axis. Usually a value between 25% and 100% */
  yDistance: propTypes.string,
  /** Add the debug attribute to render markers to debug the parallax animation */
  markers: propTypes.bool,
}

export default Parallax
