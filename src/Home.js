import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import './Home.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); 
  const [openDialog, setOpenDialog] = useState(false); 
  
  const [newEstate, setNewEstate] = useState({
    title: '',
    city: '',
    town: '',
    district: '',
    state: '',
    price: '',
  });
  const [openNewEstateDialog, setOpenNewEstateDialog] = useState(false);


  useEffect(() => {
  
    axios
      .get('http://localhost:8080/api/v1/estate/get-all')
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data); 
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleUpdate = (item) => {
    
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
  
    axios
    .delete(`http://localhost:8080/api/v1/estate/delete-estate/${id}`)
    .then((response) => {
      console.log('Silme başarılı:', response.data);

      
      axios
        .get('http://localhost:8080/api/v1/estate/get-all')
        .then((response) => {
          setData(response.data);
          setFilteredData(response.data);
        })
        .catch((error) => {
          console.error('Tablo güncelleme hatası:', error);
        });
    })
    .catch((error) => {
      console.error('Silme hatası:', error);
      console.log(error.response);
    });
  };

  const handleCloseDialog = () => {
    
    setOpenDialog(false);
  };

  const handleSaveChanges = () => {
   

    const updatedItem = {
      id: selectedItem.id,
      title: selectedItem.title,
      city: selectedItem.city,
      town: selectedItem.town,
      district: selectedItem.district,
      state: selectedItem.state,
      price: selectedItem.price,
    };

    axios
      .put('http://localhost:8080/api/v1/estate/update-estate', updatedItem, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Güncelleme başarılı:', response.data);

        axios
          .get('http://localhost:8080/api/v1/estate/get-all')
          .then((response) => {
            setData(response.data);
            setFilteredData(response.data);
          })
          .catch((error) => {
            console.error('Tablo güncelleme hatası:', error);
          });
      })
      .catch((error) => {
        console.error('Güncelleme hatası:', error);
      });

    setOpenDialog(false);
  };

  const handleInputChange = (event, property) => {
    const value = event.target.value;

  
    setSelectedItem((prevItem) => ({
      ...prevItem,
      [property]: value,
    }));
  };

  const handleSearch = (event) => {
    const searchTerm = (event.target.value || '').toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = data.filter((item) =>
      (item.title || '').toLowerCase().includes(searchTerm) ||
      (item.city || '').toLowerCase().includes(searchTerm) ||
      (item.town || '').toLowerCase().includes(searchTerm) ||
      (item.district || '').toLowerCase().includes(searchTerm) ||
      (item.state || '').toLowerCase().includes(searchTerm) ||
      (item.price || '').toString().toLowerCase().includes(searchTerm)
    );

    setFilteredData(filtered);
  };

  const handleAddNewEstate = () => {
  
    window.location.href = '/add-new-estate';
  };
  return (
    <div className="home-container">
      <h1>Real Estate Data</h1>
      <TextField
        label="Ara"
        variant="outlined"
        onChange={handleSearch}
        value={searchTerm}
        className="search-bar"
      />
       <Button
        variant="contained"
        color="primary"
        onClick={handleAddNewEstate}
        style={{ margin: '50px' }}
      >
        Yeni Emlak Ekle
      </Button>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Town</TableCell>
              <TableCell>District</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.town}</TableCell>
                <TableCell>{item.district}</TableCell>
                <TableCell>{item.state}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell className="action-cell">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleUpdate(item)}
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell className="action-cell">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Güncelleme Formu</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem ? selectedItem.title : ''}
            onChange={(e) => handleInputChange(e, 'title')}
          />
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem ? selectedItem.city : ''}
            onChange={(e) => handleInputChange(e, 'city')}
          />
          <TextField
            label="Town"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem ? selectedItem.town : ''}
            onChange={(e) => handleInputChange(e, 'town')}
          />
          <TextField
            label="District"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem ? selectedItem.district : ''}
            onChange={(e) => handleInputChange(e, 'district')}
          />
          <TextField
            label="State"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem ? selectedItem.state : ''}
            onChange={(e) => handleInputChange(e, 'state')}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem ? selectedItem.price : ''}
            onChange={(e) => handleInputChange(e, 'price')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            İptal
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
