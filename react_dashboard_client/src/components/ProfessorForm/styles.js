import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

export const ModalHeader = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    font-weight: bold;
  }
  input, select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 10px 20px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
  button[type="submit"] {
    background-color: #4CAF50;
    color: white;
  }
  button[type="button"] {
    background-color: #f44336;
    color: white;
  }
`;
