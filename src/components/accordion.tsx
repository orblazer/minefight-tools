import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export type AccordionProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  open?: boolean
  title: React.ReactNode
  actions?: React.ReactNode
  onChange?: (prevState: Readonly<boolean>, nexState: Readonly<boolean>) => void
}
export default React.forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { open = false, onChange, title, actions, children, ...props },
  ref
) {
  const [isOpen, setOpen] = useState(open)

  function toggleAccordion() {
    if (typeof onChange === 'function') {
      onChange(isOpen, !isOpen)
    }
    setOpen(!isOpen)
  }

  return (
    <div ref={ref} className={`accordion__section${isOpen ? ' accordion--open' : ''}`} {...props}>
      <button type="button" className="accordion" onClick={toggleAccordion}>
        <FontAwesomeIcon icon={isOpen ? 'chevron-down' : 'chevron-right'} />
        <p className="accordion__title" dangerouslySetInnerHTML={{ __html: title || '' }} />
        <div className="accordion__actions">{actions}</div>
      </button>
      <div className="accordion__content">{children}</div>
    </div>
  )
})
