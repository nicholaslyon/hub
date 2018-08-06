import React from 'react';
import ReactDOM from 'react-dom';

import Notes from './components/Notes';
// import registerServiceWorker from './javascript/service-workers/registerServiceWorker';

ReactDOM.render(
  <Notes />,
  document.querySelector('[data-js-notes]')
);

// registerServiceWorker();
