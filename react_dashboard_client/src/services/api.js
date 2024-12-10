// src/services/api.js
const apiUrl = 'http://localhost:5000'; // URL do backend (ajuste se necessário)

export const getStudents = async () => {
  try {
    const response = await fetch(`${apiUrl}/students`);
    if (!response.ok) throw new Error('Erro ao buscar os estudantes');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addStudent = async (student) => {
  try {
    const response = await fetch(`${apiUrl}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error('Erro ao adicionar estudante');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateStudent = async (student) => {
    try {
      const response = await fetch(`${apiUrl}/students/${student.id}`, {  // Mudando de cpf para id
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      if (!response.ok) throw new Error('Erro ao atualizar estudante');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };  

export const deleteStudent = async (cpf) => {
  try {
    const response = await fetch(`${apiUrl}/students/${cpf}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao excluir estudante');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Função para buscar os agendamentos
export const getAppointments = async () => {
    try {
      const response = await fetch(`${apiUrl}/schedules`);
      if (!response.ok) throw new Error('Erro ao buscar os agendamentos');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Função para adicionar um novo agendamento
  export const addAppointment = async (appointment) => {
    try {
      const response = await fetch(`${apiUrl}/schedules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });
      if (!response.ok) throw new Error('Erro ao adicionar agendamento');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Função para atualizar um agendamento existente
  export const updateAppointment = async (appointment) => {
    try {
      const response = await fetch(`${apiUrl}/schedules/${appointment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });
      if (!response.ok) throw new Error('Erro ao atualizar agendamento');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Função para excluir um agendamento
  export const deleteAppointment = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/schedules/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao excluir agendamento');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const getProfessors = async () => {
    try {
      const response = await fetch(`${apiUrl}/teachers`);
      if (!response.ok) throw new Error('Erro ao buscar os professores');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
      throw error;
    }
  };
  
  export const addProfessor = async (professor) => {
    try {
      const response = await fetch(`${apiUrl}/teachers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(professor),
      });
      if (!response.ok) throw new Error('Erro ao adicionar professor');
      return await response.json();
    } catch (error) {
      console.error('Erro ao adicionar professor:', error);
      throw error;
    }
  };
  
  export const updateProfessor = async (professor) => {
    try {
      const response = await fetch(`${apiUrl}/teachers/${professor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(professor),
      });
      if (!response.ok) throw new Error('Erro ao atualizar professor');
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar professor:', error);
      throw error;
    }
  };
  
  // services/api.js
  export const deleteTeacher = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/teachers/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) 
        throw new Error('Falha ao excluir professor');
        return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };