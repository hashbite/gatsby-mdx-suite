import React from 'react'
import propTypes from 'prop-types'

import ModalTrigger from './components/modal-trigger'
import ModalContent from './components/modal-content'
import ModalWrapper from './components/modal-wrapper'

/**
 * Trigger to open a `<Modal/>`
 *
 * Might displayed as a Link or a CTA component.
 *
 * @example
 *
 * <Section>
 *
 * <Modal triggerTitle="Open Modal" modalTitle="Example modal" triggerAs="CTA">
 *
 * # Modal content
 *
 * Modals can contain any components. Try to avoid filling components like `<Section/>`
 *
 * <Image width="300px" id="randomPictureId" />
 *
 * </Modal>
 *
 * </Section>
 */
export default function Modal({
  modalTitle,
  triggerAs,
  triggerTitle,
  children,
}) {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <ModalTrigger
        renderAsCTA={triggerAs === 'CTA'}
        onClick={openModal}
        title={triggerTitle}
      />
      <ModalWrapper
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={modalTitle}
      >
        <ModalContent closeModal={closeModal}>{children}</ModalContent>
      </ModalWrapper>
    </>
  )
}

Modal.defaultProps = {
  triggerTitle: 'Open Modal',
  triggerAs: 'Link',
  modalTitle: 'Modal',
}

Modal.propTypes = {
  /** The id of the hook. You need this value for `<AnchorHook />` */
  children: propTypes.node.isRequired,
  /** Title of the modal for people with disabilities */
  modalTitle: propTypes.string.isRequired,
  /** Title of the trigger element */
  triggerTitle: propTypes.string.isRequired,
  /** Define how the trigger component should look like */
  triggerAs: propTypes.oneOf(['Link', 'CTA']),
}
