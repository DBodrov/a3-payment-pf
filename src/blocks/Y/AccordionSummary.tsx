import clsx from 'clsx'
import React from 'react'

import {useAccordion} from './Accordion'
import {classes} from './Accordion.classes'

type TProps = React.PropsWithChildren<{expandIcon?: React.ReactNode}>

export function AccordionSummary({children, expandIcon}: TProps) {
  const {expanded, toggle} = useAccordion()

  return (
    <button className={clsx(classes.summary, classes)} onClick={toggle}>
      {children}
      {/* <div className={clsx(classes.expandIcon, expanded && classes.iconExpanded)}>{expandIcon}</div> */}
    </button>
  )
}
