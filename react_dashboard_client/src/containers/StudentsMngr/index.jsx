import React, { useState, useEffect } from 'react';
import { PageContainer, Table } from './styles';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Link } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { getStudents, addStudent, updateStudent, deleteStudent } from '../../services/api'; // Importando as funções da API

function StudentsMngr() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [search, setSearch] = useState("");

  // Buscar estudantes ao carregar a página
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents(); // Requisição para buscar os estudantes
        setStudents(data);
      } catch (error) {
        console.error("Erro ao buscar estudantes:", error);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStudent(null);
  };

  const sortedStudents = [...filteredStudents].sort((a, b) => a.name.localeCompare(b.name));

  // Função para excluir o estudante
  const handleDelete = (id) => {
    // Exibe a caixa de diálogo de confirmação
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir este estudante?');
    window.location.reload();
    if (confirmDelete) {
      // Se o usuário confirmar, realiza a exclusão
      deleteStudent(id)
        .then(() => {
          // Atualiza o estado ou lista de estudantes após a exclusão
          setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
        })
        .catch((error) => {
          console.error('Erro ao excluir estudante:', error);
        });
    }
  };
  
  

  const handleAddStudent = async (student) => {
    try {
      const newStudent = await addStudent(student); // Requisição para adicionar estudante
      setStudents([...students, newStudent]);
    } catch (error) {
      console.error("Erro ao adicionar estudante:", error);
    }
  };

  const handleUpdateStudent = async (student) => {
    try {
      const updatedStudent = await updateStudent(student, student.id);
      setStudents(students.map(s => (s.id === student.id ? updatedStudent : s)));
    } catch (error) {
      console.error("Erro ao atualizar estudante:", error);
    }
  };
  
  

  return (
    <PageContainer>
      <Header>
        <span>Gestão de Estudantes
          <button onClick={() => setShowModal(true)}>Inserir Estudante</button>
        </span>
        <Link to="/">
          <button>Início</button>
        </Link>
      </Header>

      <div>
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Whatsapp</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>
                <a href={`https://api.whatsapp.com/send/?phone=55${student.whatsapp ? student.whatsapp.replace(/\D/g, '') : ''}`} target="_blank" rel="noopener noreferrer">
                  {student.whatsapp}
                </a>
                </td>
                <td>
                  <button onClick={() => handleEditStudent(student)}>Editar</button>
                  <button onClick={() => handleDelete(student.id)}>Excluir</button>
                  <Link to="/schedules">
                    <button>Agendar</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
      {showModal && (
        <Modal
          onClose={handleCloseModal}
          students={students}
          setStudents={setStudents}
          editingStudent={editingStudent}
          setEditingStudent={setEditingStudent}
          onAddStudent={handleAddStudent} // Passando a função de adicionar
          onUpdateStudent={handleUpdateStudent} // Passando a função de atualizar
        />
      )}
    </PageContainer>
  );
}

export default StudentsMngr;

