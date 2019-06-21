import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/style.css';

import Home from './components/Home';

const renderApplication = () => {
  ReactDOM.render(
    <Home /> ,
    document.querySelector('#root')
  );
}

renderApplication();

if (module.hot) {
  module.hot.accept("./components/Home", () => {
    renderApplication();
  });
}
