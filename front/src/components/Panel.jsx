import React from 'react';
import '../css/Panel.css';
import Dashboard from './Dashboard'; // Asegúrate de importar correctamente el componente LiquidacionesToPdf
import Cursos from './Cursos'; // Asegúrate de importar correctamente el componente LiquidacionesToPdf

const Panel = ({ currentOption }) => {
  const renderContent = () => {
    switch (currentOption) {
      case 'Dashboard':
        return <Dashboard />;
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