import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem'; // Importa MenuItem desde Material-UI

const DashboardForm = ({ onSubmit, onCancel, initialCurso, users, estados }) => {
  const [cursoData, setCursoData] = useState({
    titulo: initialCurso ? initialCurso.titulo : '',
    descripcion: initialCurso ? initialCurso.descripcion : '',
    estado_id: initialCurso ? initialCurso.estado_id : '',
    user_id: initialCurso ? initialCurso.user_id : '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cursoData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCursoData({ ...cursoData, [name]: value });
  };


  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            select
            id="user_id"
            label="Usuario"
            name="user_id"
            value={cursoData.user_id}
            onChange={handleChange}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.userFullName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="titulo"
            label="Título"
            name="titulo"
            value={cursoData.titulo}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="descripcion"
            label="Descripción"
            name="descripcion"
            value={cursoData.descripcion}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            select
            id="estado_id"
            label="Estado"
            name="estado_id"
            value={cursoData.estado_id}
            onChange={handleChange}
          >
            {estados.map((estado) => (
              <MenuItem key={estado.id} value={estado.id}>
                {estado.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Guardar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            onClick={onCancel} // Cambiar esto a la función para volver a la lista de Empresas
          >
            Volver a la lista de Cursos
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};


export default DashboardForm;
