import { MyHeader } from "./styles";

function Header({ children }) {
    return (
        <MyHeader>
            {children} 
        </MyHeader>
    );
}

export default Header;
