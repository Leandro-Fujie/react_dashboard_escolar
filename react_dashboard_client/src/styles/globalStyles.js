import { createGlobalStyle } from "styled-components";

const myGlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #accef1;
    }

    table {
        width: 90%;
        border-collapse: collapse;
        margin-top: 10px;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: center;
    }

    th {
        background-color: #34495E;
        color: white;
    }

    tr:hover {
        background-color: #f5f5f5; /* Cor de fundo ao passar o mouse */
    }

    button {
        background-color: #3498db; /* Azul padrão */
        color: white; /* Texto branco */
        font-size: 1rem; /* Tamanho do texto */
        padding: 10px 20px; /* Espaçamento interno */
        border: none; /* Remove a borda padrão */
        border-radius: 5px; /* Bordas arredondadas */
        cursor: pointer; /* Mostra o cursor como "mãozinha" */
        transition: background-color 0.3s ease; /* Suaviza a mudança de cor */
    }

    button:hover {
        background-color: #2980b9; /* Azul mais escuro no hover */
    }

    button:active {
        background-color: #1e6f9f; /* Azul ainda mais escuro no clique */
    }

    button:disabled {
        background-color: #bdc3c7; /* Cinza quando desabilitado */
        cursor: not-allowed; /* Cursor padrão */
    }

`

export default myGlobalStyles