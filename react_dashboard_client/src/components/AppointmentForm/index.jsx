import React, { useState, useEffect } from "react";  // Corrigido: agora inclui o useEffect
import { FormContainer, FormInput, FormButton } from "./styles"; // Importando os componentes de estilo

const AppointmentForm = ({ appointment, onSave, onCancel, students, teachers }) => {
  const [form, setForm] = useState(
    appointment || { date: "", time: "", student_id: "", teacher_id: "", content: "" }
  );

  useEffect(() => {
    if (appointment) {
      setForm(appointment); // Atualizar os campos quando o agendamento for editado
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.time || !form.student_id || !form.teacher_id || !form.content) {
      alert("Todos os campos são obrigatórios!");
      return;
    }
    onSave(form); // Envia o agendamento para ser salvo
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Data:</label>
          <FormInput
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hora:</label>
          <FormInput
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Estudante:</label>
          <select name="student_id" value={form.student_id} onChange={handleChange} required>
            <option value="">Selecione um estudante</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Professor:</label>
          <select name="teacher_id" value={form.teacher_id} onChange={handleChange} required>
            <option value="">Selecione um professor</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Conteúdo:</label>
          <FormInput
            type="text"
            name="content"
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormButton type="submit">Salvar</FormButton>
          <FormButton type="button" onClick={onCancel}>Cancelar</FormButton>
        </div>
      </form>
    </FormContainer>
  );
};

export default AppointmentForm;
