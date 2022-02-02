import React from 'react';
import {TPaymentSystemProps} from './types';

export function Visa(): JSX.Element {
  return (
    <svg width="76" height="30" viewBox="0 0 39 12">
      <path
        fill="#171f64"
        fillRule="evenodd"
        d="M0.039,0.238H4.934s1.4-.107,1.618.95,1.421,6.97,1.421,6.97L11.092,0.2l3.316,0.04L9.434,11.8H6.118L3.355,1.822S3.357,1.586.039,0.238Zm15.671-.119-1.974,11.6h3.118l1.974-11.6m0.513,8.713-0.474,2.574c4.108,1.278,8.262.464,8.921-2.574,0.429-1.979-.481-2.861-2.329-3.842C24.9,4.694,22.928,4,23.605,3.01a2.252,2.252,0,0,1,1.46-.594,5.605,5.605,0,0,1,2.842.594l0.434-2.5a7.54,7.54,0,0,0-6.237.317,3.487,3.487,0,0,0-1.816,2.3c-0.381,1.55.451,2.713,2.092,3.564,1.011,0.524,3.844,1.74,1.026,2.851C23.408,9.545,22.168,9.961,19.342,8.832Zm8.329,3.01L32.447,0.99A1.41,1.41,0,0,1,33.79.238c1.038-.013,2.645,0,2.645,0L39,11.842H36.079L35.684,10.1H31.658l-0.671,1.743H27.671Zm4.855-4.119,1.7-4.4,0.947,4.4H32.526Z"
      />
    </svg>
  );
}

export function Maestro(): JSX.Element {
  return (
    <svg width="47" height="30" viewBox="0 0 39 24">
      <circle fill="#eb001b" cx="12" cy="12" r="12" />
      <circle fill="#0099df" cx="27" cy="12" r="12" />
      <path
        fill="#6c6bbd"
        d="M14.93,12A11.957,11.957,0,0,1,19.5,2.6a11.956,11.956,0,0,1,0,18.8A11.957,11.957,0,0,1,14.93,12Z"
      />
    </svg>
  );
}

export function MasterCard(): JSX.Element {
  return (
    <svg width="48" height="30" viewBox="0 0 39 24">
      <circle fill="#eb001b" cx="12" cy="12" r="12" />
      <circle fill="#f79e1b" cx="27" cy="12" r="12" />
      <path
        fill="#ff5f00"
        d="M14.93,12A11.957,11.957,0,0,1,19.5,2.6a11.956,11.956,0,0,1,0,18.8A11.957,11.957,0,0,1,14.93,12Z"
      />
    </svg>
  );
}

export function Mir(): JSX.Element {
  return (
    <svg width="75" height="30" viewBox="0 0 42 12">
      <path
        fill="#4db45e"
        d="M3.738,12V4.4L6.23,12H8.774l2.544-7.546V12h3.738V0h-3.79A2.342,2.342,0,0,0,9.189,1.729C8.7,3.406,7.528,7.389,7.528,7.389L5.918,1.939A2.412,2.412,0,0,0,3.53,0C1.48-.026,0,0,0,0V12H3.738ZM16.665,0V12h2.959a2.172,2.172,0,0,0,2.232-1.31c0.771-1.56,2.907-6.445,2.907-6.445V12H28.5V0H25.231a1.922,1.922,0,0,0-1.869,1.258C22.67,2.673,20.4,7.441,20.4,7.441V0m9.76,5.45V12H33.9V8.175h3.894A4.166,4.166,0,0,0,41.74,5.45H30.163Z"
      />
      <path fill="#00b4e6" d="M29.644,0a5.923,5.923,0,0,0,5.918,4.926H42S42.848,0,37.38,0H29.644Z" />
    </svg>
  );
}

export function PaymentSystem(props: TPaymentSystemProps) {
  const {system} = props;
  switch (system) {
    case 'All':
    default:
      return (
        <div css={{display: 'flex', gap: 10}}>
          <Visa />
          <Maestro />
          <MasterCard />
          <Mir />
        </div>
      );
    case 'Visa': {
      return (
        <div css={{display: 'flex', gap: 10}}>
          <Visa />
        </div>
      )
    }
    case 'Maestro': {
      return (
        <div css={{display: 'flex', gap: 10}}>
          <Maestro />
        </div>
      )
    }
    case 'MasterCard': {
      return (
        <div css={{display: 'flex', gap: 10}}>
          <MasterCard />
        </div>
      )
    }
    case 'Mir': {
      return (
        <div css={{display: 'flex', gap: 10}}>
          <Mir />
        </div>
      )
    }
  }
}
