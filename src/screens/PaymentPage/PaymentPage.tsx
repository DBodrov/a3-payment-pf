import React from 'react';
import {Footer, PageLayout} from '@/layouts';
import {PaymentInfo} from './PaymentInfo';
import {PaySection} from './PaySection';
import {Accordion, AccordionDetails, AccordionSummary} from '@/blocks/Y';

export function PaymentPage() {
  return (
    <div css={{display: 'flex', flexFlow: 'column nowrap'}}>
      <PageLayout>
        <Accordion>
          <AccordionSummary>
            <div>Title here</div>
          </AccordionSummary>
          <AccordionDetails>
            {[{title: '123', subtitle: 'some text'}, {title: '1230', subtitle: 'some text'}].map(item =>
              'title' in item ? (
                <span key={item.title} title={item.subtitle}>
                  {item.title}
                </span>
              ) : null,
            )}
          </AccordionDetails>
        </Accordion>
        <PaymentInfo />
        <PaySection />
      </PageLayout>
      <Footer />
    </div>
  );
}
