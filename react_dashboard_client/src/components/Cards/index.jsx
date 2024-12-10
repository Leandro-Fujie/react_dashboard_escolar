import { Card } from "./styles";
import { Link } from "react-router-dom"; // Importando o Link

function Cards({ children }) {
    return (
        <Card>
            {children} 
        </Card>
    );
}

export default Cards;
