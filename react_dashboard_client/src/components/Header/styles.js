import styled from "styled-components";

export const MyHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #34495E;
    color: white;
    padding: 10px 20px;
    font-size: 1rem;
    font-family: Roboto, sans-serif;

    span {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px; /* Adiciona espaçamento entre o texto e o botão */
    }
`;
