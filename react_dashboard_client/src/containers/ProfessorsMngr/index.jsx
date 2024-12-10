import React, { useState, useEffect } from "react";
import { PageContainer, Table } from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import ProfessorForm from "../../components/ProfessorForm";
import { getProfessors, addProfessor, updateProfessor, deleteTeacher } from "../../services/api"; // Importa as funções da API

function ProfessorsMngr() {
  const [professors, setProfessors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProfessor, setEditingProfessor] = useState(null);
  const [search, setSearch] = useState("");

  // Carrega os professores ao montar o componente
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getProfessors(); // Busca os professores da API
        setProfessors(data);
      } catch (error) {
        console.error("Erro ao buscar professores:", error);
      }
    };
    fetchTeachers();
  }, []);

  const handleDeleteTeacher = (id) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir este professor?");
    window.location.reload();
    if (confirmDelete) {
       deleteTeacher(id)
	.then(() => {
        setProfessors((professors) => professors.filter((professor) => professor.id !== id));
      })
	 .catch ((error) => {
        console.error("Erro ao excluir professor:", error);
      });
    }
  };
  
  const filteredProfessors = professors.filter((professor) =>
    professor.name.toLowerCase().includes(search.toLowerCase()) || professor.cpf.includes(search)
  );

  return (
    <PageContainer>
      <Header>
        <span>
          Gestão de Professores
          <button onClick={() => setShowModal(true)}>Inserir Professor</button>
        </span>
        <Link to="/">
          <button>Início</button>
        </Link>
      </Header>

      <div>
        <input
          type="text"
          placeholder="Pesquisar por CPF ou nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Table>
          <thead>
            <tr>
              <th>CPF</th>
              <th>Nome</th>
              <th>Especialidade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfessors.map((professor) => (
              <tr key={professor.id}>
                <td>{professor.cpf}</td>
                <td>{professor.name}</td>
                <td>{professor.specialty}</td>
                <td>{professor.status}</td>
                <td>
                  <button onClick={() => {
                    setEditingProfessor(professor);
                    setShowModal(true);
                  }}>Editar</button>
                  <button onClick={() => handleDeleteTeacher(professor.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />

      {showModal && (
        <ProfessorForm
          onClose={() => setShowModal(false)}
          professors={professors}
          setProfessors={setProfessors}
          editingProfessor={editingProfessor}
          setEditingProfessor={setEditingProfessor}
        />
      )}
    </PageContainer>
  );
}

export default ProfessorsMngr;
