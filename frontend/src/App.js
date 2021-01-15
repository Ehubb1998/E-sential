import React from 'react';
import { useSelector } from 'react-redux';

const App = (props) => {
  const token = useSelector(state => state.token);
  return (
    <h1 style={{ backgroundColor: "black", color: "white" }}>E-sential Coming Soon!</h1>
  );
}

export default App;
