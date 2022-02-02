import React from 'react';
import {FramePageLayout} from './styles';

type Props = {children: React.ReactNode};

export function Layout({children}: Props) {
  return (
    <FramePageLayout>
      {children}
    </FramePageLayout>
  )
}
