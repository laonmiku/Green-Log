import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SeoulMap from '../../common/useful/SeoulMap';
import carImage from './car.png';
import { List, ListItem, ListItemText, ListItemButton, Typography, Pagination, Paper, Box, Container, Chip } from '@mui/material';

const CarSpot = () => {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page
    const pagesToShow = 10; // Number of page numbers to display

    useEffect(() => {
        const callAPI = async () => {
            try {
                const res = await axios.get("/api/carspot");
                setLocations(res.data.DATA);
                console.log(res.data.DATA);
            } catch (error) {
                console.error('API 호출 중 오류가 발생했습니다:', error);
            }
        };

        callAPI();
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = locations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(locations.length / itemsPerPage);

    // Determine the range of pages to display
    const getPaginationRange = () => {
        const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

        return { startPage, endPage };
    };

    const { startPage, endPage } = getPaginationRange();

    // Handlers for pagination
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <img src={carImage} alt="car" style={{ width: '100%', maxWidth: '1000px' }} />
            </div>
            <Container sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>

                <div style={{ flex: 2 }}>
                    {locations.length > 0 ? (
                        <SeoulMap locations={locations} selectedLocation={selectedLocation} onSelectLocation={setSelectedLocation} />
                    ) : (
                        <Typography variant="h6">데이터를 불러오는 중입니다...</Typography>
                    )}
                </div>
                <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                    <Typography variant="h5" gutterBottom>전기차 주차장 목록</Typography>
                    <Paper sx={{ padding: '1rem' }}>
                        <List>
                            {currentItems.map((location, index) => (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <ListItemButton
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => setSelectedLocation(location)}
                                            sx={{ borderRadius: 2, px: 2, py: 1, display: 'flex', alignItems: 'center' }}
                                        >
                                            <Chip
                                                label="길찾기"
                                                color="primary"
                                                sx={{ marginLeft: 2 }} // Space between button and chip
                                            />
                                        </ListItemButton>
                                    }
                                >
                                    <ListItemText
                                        primary={location.str_pnt_name}
                                        secondary={`${location.addr} (${location.lat}, ${location.lot})`}
                                        sx={{ marginRight: 2 }} // Space between text and button
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            variant="outlined"
                            shape="rounded"
                        />
                    </Box>
                </div>
            </Container>
        </>
    );
}

export default CarSpot;
