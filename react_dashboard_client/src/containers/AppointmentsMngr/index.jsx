import React, { useState, useEffect } from "react";
import AppointmentForm from "../../components/AppointmentForm";
import { PageContainer, Table } from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from "react-router-dom";
import axios from "axios"; // Importando o axios para fazer requisições HTTP

const AppointmentsMngr = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [searchDate, setSearchDate] = useState("");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // Função para buscar agendamentos do backend
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/schedules");
      setAppointments(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  // Função para buscar estudantes
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Erro ao buscar estudantes:", error);
    }
  };

  // Função para buscar professores
  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
    }
  };

  // Efeito para carregar os dados iniciais
  useEffect(() => {
    fetchAppointments();
    fetchStudents();
    fetchTeachers();
  }, []);

  // Função para formatar a data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  // Função para formatar a hora
  const formatTime = (timeString) => {
    return timeString.substring(0, 5); // Supondo formato 'HH:mm:ss', retorna 'HH:mm'
  };

  // Filtrar agendamentos por data
  const filteredAppointments = appointments.filter((appt) =>
    appt.schedule_date.includes(searchDate)
  );

  // Adicionar novo agendamento
  const handleAddAppointment = () => {
    setSelectedAppointment(null);
    setFormVisible(true);
  };

  // Editar agendamento
  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setFormVisible(true);
  };

  // Excluir agendamento
  const handleDeleteAppointment = async (id) => {
    if (window.confirm("Deseja realmente cancelar este agendamento?")) {
      try {
        await axios.delete(`http://localhost:5000/schedules/${id}`);
        fetchAppointments();
      } catch (error) {
        console.error("Erro ao cancelar agendamento:", error);
      }
    }
  };

  // Salvar agendamento
  const handleSaveAppointment = async (appointment) => {
    const newAppointment = {
      schedule_date: appointment.date,
      schedule_time: appointment.time,
      student_id: appointment.student_id,
      teacher_id: appointment.teacher_id,
      content: appointment.content,
    };

    try {
      if (appointment.id) {
        await axios.put(`http://localhost:5000/schedules/${appointment.id}`, newAppointment);
      } else {
        await axios.post("http://localhost:5000/schedules", newAppointment);
      }
      setFormVisible(false);
      fetchAppointments();
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);
    }
  };

  return (
    <PageContainer>
      <Header>
        <span>
          Gestão de Agendamentos
          <button onClick={handleAddAppointment}>Novo Agendamento</button>
        </span>
        <Link to="/">
          <button>Início</button>
        </Link>
      </Header>

      <div>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>

      <Table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora</th>
            <th>Estudante</th>
            <th>Professor</th>
            <th>Conteúdo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appt) => (
            <tr key={appt.id}>
              <td>{formatDate(appt.schedule_date)}</td>
              <td>{formatTime(appt.schedule_time)}</td>
              <td>{appt.student.name}</td>
              <td>{appt.teacher.name}</td>
              <td>{appt.content}</td>
              <td>
                <button onClick={() => handleEditAppointment(appt)}>Editar</button>
                <button onClick={() => handleDeleteAppointment(appt.id)}>Cancelar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isFormVisible && (
        <AppointmentForm
          appointment={selectedAppointment}
          onSave={handleSaveAppointment}
          onCancel={() => setFormVisible(false)}
          students={students}
          teachers={teachers}
        />
      )}
      <Footer />
    </PageContainer>
  );
};

export default AppointmentsMngr;
