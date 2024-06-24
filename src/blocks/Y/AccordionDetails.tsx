import clsx from 'clsx'
import React from 'react'

import {useAccordion} from './Accordion'
import {classes as accordionClasses} from './Accordion.classes'

type TProps = React.PropsWithChildren<{classes?: React.CSSProperties}>

export function AccordionDetails({classes, children}: TProps) {
  const {expanded, isPending} = useAccordion()
  const detailsRef = React.useRef<HTMLElement>(null)
  console.log(isPending)
  React.useEffect(() => {
    const el = detailsRef?.current
    if (expanded && !isPending) {
      el?.setAttribute('style', 'max-height:200px')
    } else if(!expanded && !isPending) {
      el?.setAttribute('style', 'max-height:0px')
    }
  }, [expanded, isPending])
  return <section ref={detailsRef} className={clsx(accordionClasses.details, classes)}>{children}</section>
}
