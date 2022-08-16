import React from 'react';
import RouteBrowser from '../routes/RouteBrowser';

/* styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';
import DataProvider from '../context/DataProvider';
import Notify from './components/Notify';

function App() {
  return (
    <div id="container_app">
      <DataProvider>
        <Notify />
        <RouteBrowser />
      </DataProvider>
    </div>
  );
}

export default App;
