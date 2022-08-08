import React from 'react';
import RouteBrowser from '../routes/RouteBrowser';

/* styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';
import DataProvider from '../context/DataProvider';

function App() {
  return (
    <div id="container_app">
      <DataProvider>
        <RouteBrowser />
      </DataProvider>
    </div>
  );
}

export default App;
