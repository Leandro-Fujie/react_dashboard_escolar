// src/components/AppointmentForm/styles.js
import styled from "styled-components";

// Componente para o container do formulário
export const FormContainer = styled.div`
  position: fixed; /* Fixa o formulário na tela */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

// Componente para os inputs do formulário
export const FormInput = styled.input`
  margin: 5px 0;
  padding: 8px;
  width: 100%;
`;

// Componente para os botões
export const FormButton = styled.button`
  margin: 5px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
