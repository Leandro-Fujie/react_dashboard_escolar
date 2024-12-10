import styled from "styled-components";

export const MyFooter = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2C3E50;
    color: white;
    padding: 10px 20px;
    font-size: 0.9rem;
    font-family: Roboto, sans-serif;

    nav {
        display: flex;
        gap: 15px;

        a {
            text-decoration: none;
            color: white;
            transition: color 0.3s;

            &:hover {
                color: #1ABC9C;
            }
        }
    }
`;