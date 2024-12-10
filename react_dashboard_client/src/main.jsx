import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Mantém o BrowserRouter aqui
import MyGlobalStyles from './styles/globalStyles';
import App from './App'; // O componente App agora irá controlar as rotas

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* Apenas uma vez, no topo da aplicação */}
      <MyGlobalStyles />
      <App />  {/* O App agora será o ponto central para as rotas */}
    </BrowserRouter>
  </StrictMode>,
);
