import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from './apiConstants'; // Asegúrate de que este archivo exista y esté correctamente configurado
import CursoForm from './DashboardForm'; // Asegúrate de que el componente CursoForm exista
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

const Dashboard = ({ userDNI }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [Dashboard, setDashboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const DashboardResponse = await axios.get(`${API_BASE_URL}/cursos/showByRut/`+userDNI);
        const usuariosResponse = await axios.get(`${API_BASE_URL}/users`);
        const estadosResponse = await axios.get(`${API_BASE_URL}/estados`);

        const DashboardData = DashboardResponse.data;
        const usuariosData = usuariosResponse.data;
        setUsers(usuariosData);
        const estadosData = estadosResponse.data;
        setEstados(estadosData);
        
        const combinedData = DashboardData.map(curso => {
          const user = usuariosData.find(user => user.id === curso.user_id);
          const estado = estadosData.find(estado => estado.id === curso.estado_id);
          return {
            ...curso,
            userFullName: user ? `${user.userFullName}` : 'Usuario desconocido',
            estadoNombre: estado ? estado.nombre : 'Desconocido'
          };
        });

        setDashboard(combinedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [userDNI]); // Asegúrate de que el efecto se dispare cuando `userDNI` cambie

  const deleteCurso = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/cursos/${id}`);
      if (response.status === 200) {
        setDashboard(Dashboard.filter(curso => curso.id !== id));
        console.log('Curso eliminado exitosamente');
      } else {
        console.error('Error al eliminar el curso:', response.data);
      }
    } catch (error) {
      console.error('Error durante la eliminación:', error);
    }
  };

  const addCurso = async (cursoData) => {
    try {
      const url = selectedCurso ? `${API_BASE_URL}/cursos/${selectedCurso.id}` : `${API_BASE_URL}/cursos`;
      const method = selectedCurso ? 'PUT' : 'POST';

      const response = await axios({
        method,
        url,
        data: cursoData,
      });

      if (response.status === 200 || response.status === 201) {
        const updatedCurso = response.data;

        const DashboardResponse = await axios.get(`${API_BASE_URL}/cursos/showByRut/`+userDNI);
        const usuariosResponse = await axios.get(`${API_BASE_URL}/users`);
        const estadosResponse = await axios.get(`${API_BASE_URL}/estados`);

        const DashboardData = DashboardResponse.data;
        const usuariosData = usuariosResponse.data;
        setUsers(usuariosData);
        const estadosData = estadosResponse.data;
        setEstados(estadosData);
        
        const combinedData = DashboardData.map(curso => {
          const user = usuariosData.find(user => user.id === curso.user_id);
          const estado = estadosData.find(estado => estado.id === curso.estado_id);
          return {
            ...curso,
            userFullName: user ? `${user.userFullName}` : 'Usuario desconocido',
            estadoNombre: estado ? estado.nombre : 'Desconocido'
          };
        });

        setDashboard(combinedData);

        setShowForm(false);
        setSelectedCurso(null);
        console.log(selectedCurso ? 'Curso actualizado exitosamente' : 'Curso agregado exitosamente');
      } else {
        console.error(selectedCurso ? 'Error al actualizar el curso:' : 'Error al agregar el curso:', response.data);
      }
    } catch (error) {
      console.error(selectedCurso ? 'Error durante la actualización:' : 'Error durante la creación:', error);
    }
  };

  const editCurso = (curso) => {
    setSelectedCurso(curso);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedCurso(null);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container Dashboard">
      <h3>Visualización de Cursos</h3>
      <div className="d-flex justify-content-between mb-3">
        {/* <div></div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(true)}
        >
          Agregar Curso
        </Button> */}
      </div>
      {showForm ? (
        <CursoForm
          onSubmit={addCurso}
          initialCurso={selectedCurso}
          users={users}
          estados={estados}
          onCancel={handleCancel}
        />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nombre Usuario</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Dashboard.map((curso) => (
                <TableRow key={curso.id}>
                  <TableCell>{curso.id}</TableCell>
                  <TableCell>{curso.userFullName}</TableCell>
                  <TableCell>{curso.titulo}</TableCell>
                  <TableCell>{curso.descripcion}</TableCell>
                  <TableCell>{curso.estadoNombre}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => editCurso(curso)} startIcon={<EditIcon />}>Editar</Button>
                    <Button variant="contained" color="secondary" onClick={() => deleteCurso(curso.id)} startIcon={<DeleteIcon />}>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Dashboard;
