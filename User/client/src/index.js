import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Countries from './Countries'
import StartPage from './StartPage'
import CurrencyConvert from './CurrencyConvert'
import { SpeechProvider } from '@speechly/react-client';

ReactDOM.render(
  <SpeechProvider appId="365f2929-4eda-4410-9adc-c4eb0cd05861" language="en-US">
    <StartPage />
  </SpeechProvider>,
  document.getElementById('root')
);
