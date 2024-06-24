import clsx from 'clsx'
import React from 'react'

import {classes as accordionCss} from './Accordion.classes'

type TProps = React.PropsWithChildren<{
  classes?: React.CSSProperties
  onChange?: (e?: React.PointerEvent<HTMLButtonElement>, expanded?: boolean) => void
}>

type TAccordionContext = {
  expanded: boolean
  isPending?: boolean
  toggle: (e?: React.PointerEvent<HTMLButtonElement>) => void
}

const noop = () => {}

const AccordionContext = React.createContext<TAccordionContext>({
  expanded: false,
  toggle: noop
})

export function Accordion({children, classes}: TProps) {
  const [expanded, setExpanded] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()

  const toggle = React.useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    startTransition(() => {
      setExpanded(!expanded)
    })
  }, [expanded])

  const ctx = React.useMemo<TAccordionContext>(() => ({expanded, toggle, isPending}), [expanded, isPending, toggle])

  return (
    <section className={clsx(accordionCss.accordion, classes)}>
      <AccordionContext.Provider value={ctx}>{children}</AccordionContext.Provider>
    </section>
  )
}

export function useAccordion() {
  const context = React.useContext(AccordionContext)
  return context
}
