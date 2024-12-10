import styled from "styled-components";

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
`;

export const Title = styled.div`
    text-align: center;
    margin: 20px 0;
    font-size: 2rem;
    font-family: Roboto, sans-serif;
    color: #2C3E50;
`;

export const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap; /* Permite que os cards quebrem para novas linhas */
    justify-content: center; /* Centraliza os cards */
    gap: 40px; /* Espaçamento entre os cards */
    padding: 20px;
    width: 100%; /* Garante que o contêiner ocupe toda a largura */
    box-sizing: border-box;
`;

export const AccessButton = styled.button`
    background-color: #3498db; /* Azul vibrante */
    color: white; /* Texto branco */
    font-size: 1rem; /* Tamanho do texto */
    padding: 10px 20px; /* Espaçamento interno */
    border: none; /* Remove a borda */
    border-radius: 5px; /* Bordas arredondadas */
    cursor: pointer; /* Mostra o cursor como "mãozinha" */
    transition: background-color 0.3s ease; /* Suaviza a mudança de cor */

    &:hover {
        background-color: #2980b9; /* Azul mais escuro no hover */
    }

    &:active {
        background-color: #1e6f9f; /* Azul ainda mais escuro no clique */
    }

    &:disabled {
        background-color: #bdc3c7; /* Cinza quando desabilitado */
        cursor: not-allowed; /* Cursor padrão */
    }
`;
