import { PageContainer, Title, CardContainer, AccessButton } from './styles';
import { Link } from "react-router-dom"; // Importando o Link
import Cards from '../../components/Cards';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Home() {
    return (
        <PageContainer>
            <Header>
                <span>Bem-vindo, Admin</span>
                <span>Olá, Admin</span>
            </Header>
            <div>
                <Title>
                    <h2>Dashboard</h2>
                </Title>
                <CardContainer>
                    <Cards>
                        <h2>Gestão Agendamento de Estudantes</h2>
                        <p>Visualize os horários dos estudantes.</p>
                        {/* Usando Link para navegar para Gestão de Estudantes */}
                        <Link to="/students">
                        <AccessButton>Acessar</AccessButton>
                        </Link>
                    </Cards>
                    <Cards>
                        <h2>Gestão de Agendamentos</h2>
                        <p>Visualize e gerencie perfis de professores.</p>
                        {/* Usando Link para navegar para Gestão de Estudantes */}
                        <Link to="/schedules">
                        <AccessButton>Acessar</AccessButton>
                        </Link>
                    </Cards>
                    <Cards>
                        <h2>Gestão de Professores</h2>
                        <p>Gerencie registros e informações dos estudantes.</p>
                        <Link to="/professors">
                        <AccessButton>Acessar</AccessButton>
                        </Link>
                    </Cards>
                </CardContainer>
            </div>
            <Footer></Footer>
        </PageContainer>
    );
}

export default Home;