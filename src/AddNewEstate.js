import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Paper, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // react-router-dom eklenmiş

const EstateForm = () => {
    const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    city: '',
    town: '',
    district: '',
    state: '',
    price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddEstate = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/estate/add-estate', formData);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error adding estate:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h4" gutterBottom>
          Add New Estate
        </Typography>
        <form>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            label="City"
            name="city"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            label="Town"
            name="town"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            label="District"
            name="district"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            label="State"
            name="state"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            label="Price"
            name="price"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleInputChange}
          />
          <Button variant="contained" color="primary" onClick={handleAddEstate}>
            Add Estate
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EstateForm;
