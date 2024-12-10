import { MyFooter } from "./styles";

function Footer() {
    return (
        <MyFooter>
            <span>@ 2024 Gestão de Estudantes</span>
                <nav>
                    <a href="#contato">Contato</a>
                    <a href="#termos">Termos de Serviço</a>
                    <a href="#privacidade">Política de Privacidade</a>
                </nav>
        </MyFooter>
    );
}

export default Footer;
