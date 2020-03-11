import React from 'react';

export const SvgPrev = ({ onPrev }) => (
  <svg className="arrowPrev" viewBox="0 0 1024 1024" width={44} height={44} onClick={onPrev}>
    <path
      d="M643.1 843.8c-7.7 0-15.4-2.9-21.2-8.8L320.1 533.2c-11.7-11.7-11.7-30.7 0-42.4L621.9 189c11.7-11.7 30.7-11.7 42.4 0s11.7 30.7 0 42.4L383.8 512l280.5 280.5c11.7 11.7 11.7 30.7 0 42.4-5.9 5.9-13.5 8.9-21.2 8.9z"
      fill="#ffffff"
    />
  </svg>
);
export const SvgNext = ({ onNext }) => (
  <svg className="arrowNext" viewBox="0 0 1024 1024" width={44} height={44} onClick={onNext}>
    <path
      d="M380.9 843.8c-7.7 0-15.4-2.9-21.2-8.8-11.7-11.7-11.7-30.7 0-42.4L640.2 512 359.7 231.5c-11.7-11.7-11.7-30.7 0-42.4s30.7-11.7 42.4 0l301.7 301.8c11.7 11.7 11.7 30.7 0 42.4L402.1 835c-5.8 5.8-13.5 8.8-21.2 8.8z"
      fill="#ffffff"
    />
  </svg>
);
