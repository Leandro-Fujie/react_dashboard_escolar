import styled from "styled-components";

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
`;

export const Table = styled.table`
    width: 90%; /* Largura da tabela */
    margin: 0 auto; /* Isso vai centralizar a tabela */
    border-collapse: collapse;
    margin-top: 10px;

    button {
        padding: 5px 10px;
        margin: 0 5px;
        background-color: #1ABC9C;
        border: none;
        color: white;
        cursor: pointer;

        &:hover {
            background-color: #16A085;
        }
    }
`;
