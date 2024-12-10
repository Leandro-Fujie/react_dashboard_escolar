import React, { useState, useEffect } from "react";
import { ModalOverlay, ModalContainer, ModalHeader, FormGroup, ButtonGroup } from "./styles";
import { addProfessor, updateProfessor } from "../../services/api"; // Importa as funções da API

const ProfessorForm = ({ onClose, professors, setProfessors, editingProfessor, setEditingProfessor }) => {
  const [form, setForm] = useState({
    cpf: "",
    name: "",
    surname: "",  // Adiciona o campo sobrenome
    specialty: "",
    status: "ativo",
  });

  useEffect(() => {
    if (editingProfessor) {
      setForm(editingProfessor); // Preenche o formulário com os dados para edição
    }
  }, [editingProfessor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Verifica se o campo é o 'status' e converte o valor para booleano
    if (name === "status") {
      setForm((prev) => ({
        ...prev,
        [name]: value === "ativo",  // "ativo" se torna true e "inativo" se torna false
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  

  const cleanCPF = (cpf) => cpf.replace(/[^\d]/g, ""); // Limpa o CPF de caracteres não numéricos

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
  
    if (!form.name || !form.cpf || !form.specialty) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
  
    try {
      const formData = {
        ...form,
        status: form.status, // Já está como booleano
      };
  
      if (editingProfessor) {
        const updatedProfessor = await updateProfessor(editingProfessor.id, formData);
        setProfessors(professors.map((prof) => (prof.id === updatedProfessor.id ? updatedProfessor : prof)));
      } else {
        const newProfessor = await addProfessor(formData);
        setProfessors([...professors, newProfessor]);
      }
      onClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao salvar professor:", error);
    }
  };
  

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>{editingProfessor ? "Editar Professor" : "Cadastrar Professor"}</ModalHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>CPF:</label>
            <input
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              required
              readOnly={!!editingProfessor}
            />
          </FormGroup>
          <FormGroup>
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Sobrenome:</label>
            <input
              type="text"
              name="surname"
              value={form.surname}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Especialidade:</label>
            <input
              type="text"
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Status:</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </FormGroup>
          <ButtonGroup>
            <button type="submit">{editingProfessor ? "Salvar" : "Cadastrar"}</button>
            <button type="button" onClick={onClose}>Fechar</button>
          </ButtonGroup>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProfessorForm;
