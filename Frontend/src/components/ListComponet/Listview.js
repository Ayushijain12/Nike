import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Divider, Stack, TextField, Button } from '@mui/material';
import PaginationComponent from './PaginationComponent';
import { useDispatch } from 'react-redux';
import { GetRestaurants } from '../../redux/restaurantSlice';
import { useNavigate } from 'react-router-dom';
import {  DeleteRestaurantsbyID } from '../../redux/restaurantSlice';



const ListWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [listData, setListData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleEdit = (item) => {
    navigate(`/edit/restaurant/${item.id}`);
  };

  const handleDelete = async (item) => {
    await dispatch(DeleteRestaurantsbyID(item.id));
    setIsDeleted(true)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(GetRestaurants());
        const response = result.payload;
        setListData(response);
        setFilteredData(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [dispatch, isDeleted]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const newFilteredData = listData.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.street_address.toLowerCase().includes(query) ||
      item.phone.toLowerCase().includes(query) ||
      item.website.toLowerCase().includes(query)
    );

    setFilteredData(newFilteredData);
    setCurrentPage(1); // Reset to first page on search
  };

  const renderListItems = () => {
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return paginatedData.map((item, index) => (
      <React.Fragment key={index}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>
              {item.name.charAt(0).toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'block', marginBottom: '4px' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {'Description: ' + item.description.split(' — ')[0]}
                </Typography>
                <Typography
                  sx={{ display: 'block', marginBottom: '4px' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {'Location: ' + item.street_address.split(' — ')[0]}
                </Typography>
                <Typography
                  sx={{ display: 'block', marginBottom: '4px' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {'Phone: ' + item.phone.split(' — ')[0]}
                </Typography>
                <Typography
                  sx={{ display: 'block', marginBottom: '4px' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {'Email: ' + item.email.split(' — ')[0]}
                </Typography>
                <Typography
                  sx={{ display: 'block' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {'Website: ' + item.website.split(' — ')[0]}
                </Typography>
              </React.Fragment>
            }
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button variant="contained" color="primary" onClick={() => handleEdit(item)}>
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={() => handleDelete(item)}>
              Delete
            </Button>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    ));
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {renderListItems()}
      </List>
      {filteredData.length > itemsPerPage && (
        <Stack spacing={2} sx={{ marginTop: 2 }}>
          <PaginationComponent
            count={totalPages}
            page={currentPage}
            onPageChange={handlePageChange}
          />
        </Stack>
      )}
    </div>
  );
};

export default ListWithPagination;
