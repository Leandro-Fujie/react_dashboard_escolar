import React, { useState, useEffect } from 'react';
import { ModalBackground, ModalContainer, CloseButton } from './styles';
import { addStudent, updateStudent } from '../../services/api'; // Importe as funções da API

export const Modal = ({ onClose, students, setStudents, editingStudent, setEditingStudent }) => {
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birth_date, setBirthDate] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const [statesAndCities] = useState({
    "São Paulo": ["São Paulo", "Campinas", "Santos"],
    "Rio de Janeiro": ["Rio de Janeiro", "Niterói", "Volta Redonda"],
  });

  useEffect(() => {
    if (editingStudent) {
      // Quando o estudante é carregado, preenche os campos com os dados do estudante
      setCpf(editingStudent.cpf || '');
      setName(editingStudent.name || '');
      setSurname(editingStudent.surname || '');
      setBirthDate(editingStudent.birth_date || '');
      setCep(editingStudent.address?.cep || '');
      setAddress(editingStudent.address?.address || '');
      setHouseNumber(editingStudent.address?.houseNumber || '');
      setNeighborhood(editingStudent.address?.neighborhood || '');
      setState(editingStudent.address?.state || '');
      setCity(editingStudent.address?.city || '');
      setPhone(editingStudent.contacts?.phone || '');
      setWhatsapp(editingStudent.contacts?.whatsapp || '');
      setEmail(editingStudent.contacts?.email || '');
    }
  }, [editingStudent]);
  

  const isCpfUnique = (cpf) => {
    return !students.some(student => student.cpf === cpf);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpar erros antes de enviar
  
    // Verificar se os campos obrigatórios estão preenchidos
    if (!cpf || !name || !surname || !whatsapp || !cep || !address || !houseNumber || !neighborhood || !state || !city) {
      setError('Todos os campos obrigatórios devem ser preenchidos!');
      return;
    }
  
    const updatedStudent = {
      id: editingStudent ? editingStudent.id : undefined, 
      cpf,
      name,
      surname,
      birth_date,
        cep,
        address, 
        houseNumber,
        neighborhood,
        state,
        city,
        phone, 
        whatsapp, 
        email 
    };
  
    try {
      console.log('Dados enviados para o servidor:', updatedStudent);
  
      if (editingStudent) {
        const updated = await updateStudent(updatedStudent); 
        setStudents(students.map(student =>
          student.id === updated.id ? updated : student
        ));
      } else {
        const newStudent = await addStudent(updatedStudent);
        setStudents([...students, newStudent]);
      }
  
      window.location.reload(); // Atualiza a página
      setEditingStudent(null);
      onClose(); // Fechar modal
    } catch (error) {
      setError('Erro ao salvar estudante. Tente novamente.');
      console.error(error);
    }
  };  
  
  

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity('');
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <h2>{editingStudent ? 'Editar Estudante' : 'Inserir Estudante'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>CPF *</label>
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              disabled={editingStudent}
              required
            />
          </div>
          <div>
            <label>Nome *</label>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Sobrenome *</label>
            <input
              type="text"
              placeholder="Sobrenome"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Data de Nascimento</label>
            <input
              type="date"
              value={birth_date || ""}  // Usando a variável de estado diretamente
              onChange={(e) => setBirthDate(e.target.value)}  // Atualizando a variável de estado diretamente
            />
          </div>
          <h3>Endereço Domiciliar</h3>
          <div>
            <label>CEP *</label>
            <input
              type="text"
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Logradouro *</label>
            <input
              type="text"
              placeholder="Logradouro"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Número da Casa *</label>
            <input
              type="text"
              placeholder="Número da Casa"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
            />
          </div>
          <div>
            <label>Bairro *</label>
            <input
              type="text"
              placeholder="Bairro"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Estado *</label>
            <select
              value={state}
              onChange={handleStateChange}
              required
            >
              <option value="">Selecione um estado</option>
              {Object.keys(statesAndCities).map((stateName) => (
                <option key={stateName} value={stateName}>{stateName}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Cidade *</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">Selecione uma cidade</option>
              {state && statesAndCities[state].map((cityName) => (
                <option key={cityName} value={cityName}>{cityName}</option>
              ))}
            </select>
          </div>
          <h3>Contatos</h3>
          <div>
            <label>Telefone</label>
            <input
              type="text"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label>Whatsapp *</label>
            <input
              type="text"
              placeholder="Whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Salvar</button>

        </form>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
