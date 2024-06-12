import React from 'react';
import '../css/Panel.css';
import Dashboard from './Dashboard';
import Cursos from './Cursos';

const Panel = ({ currentOption, userDNI }) => {
  
  const renderContent = () => {
    switch (currentOption) {
      case 'Dashboard':
        return <Dashboard userDNI={userDNI}/>;
      case 'Cursos':
        return <Cursos />;
      default:
        return <h1>{currentOption}</h1>;
    }
  };

  return (
    <div className="panel">
      {renderContent()}
    </div>
  );
}

export default Panel;
