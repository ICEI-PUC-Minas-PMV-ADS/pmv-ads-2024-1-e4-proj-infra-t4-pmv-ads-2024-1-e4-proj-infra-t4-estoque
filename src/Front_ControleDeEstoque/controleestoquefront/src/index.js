import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import EstoqueDeProdutos from './EstoqueDeProdutos';
import Menu from './menu_horizontal/Menu.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Menu></Menu>
    <EstoqueDeProdutos />
  </React.StrictMode>
);