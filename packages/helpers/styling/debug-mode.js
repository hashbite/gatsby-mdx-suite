import { css } from '@emotion/react'
import tw from 'twin.macro'

const debugMode = ({
  type = 'outline',
  labelPseudoClass = 'before',
  labelPosition = 'inside',
  color,
  title,
}) => css`
  .debug & {
    ${type}: 1px solid ${color};

    ${title &&
    css`
      ${tw`relative`}

      ::${labelPseudoClass} {
        content: '${title}';
        background: ${color};

        ${tw`
          text-white text-xs
          absolute px-1 z-50
          `}

        ${labelPosition === 'inside' && tw`top-0 left-0 rounded-b`}
        ${labelPosition === 'outside' &&
        css`
          ${tw`top-0 rounded-t`}
          left: -1px;
          transform: translateY(-100%);
        `}
        ${labelPosition === 'sideways' &&
        css`
          ${tw`left-0 rounded-t`}
          top: -1px;
          transform: rotate(-90deg) translate(-100%, -100%);
          transform-origin: top left;
        `}
      }
    `}
  }
`

export default debugMode
