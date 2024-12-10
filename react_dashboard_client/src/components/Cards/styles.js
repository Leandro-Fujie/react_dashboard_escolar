import styled from "styled-components";

export const Card = styled.div`
    display: grid;
    grid-template-rows: 100px 100px 80px;
    grid-template-areas: 
        "image" 
        "text" 
        "stats";

    font-family: Roboto, sans-serif;
    border-radius: 18px;
    background: white;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    padding: 20px;

    /* Tornar responsivo */
    flex: 1;
    min-width: 250px;
    max-width: 350px;
    height: auto;
    margin: 10px;

    /* Adicionar transição para suavizar o efeito */
    transition: transform 0.8s ease, box-shadow 2s ease;

    /* Efeito hover */
    &:hover {
        transform: scale(1.2);
        box-shadow: 5px 5px 15px rgba(255, 255, 255, 0.8); /* Sombra branca */
    }
`;