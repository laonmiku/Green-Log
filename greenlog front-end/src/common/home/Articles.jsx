import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, Divider, Typography, Box } from '@mui/material';

const Articles = () => {
    const [list, setList] = useState([]);

    const callAPI = async () => {
        try {
            const res = await axios.get("/crawl/hkbs");
            setList(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        callAPI();
    }, []);

    return (
        <div className='mt-5'>
          <Box>
                <img
                    src="/images/news.png"  
                    alt="환경 주요 뉴스"
                    style={{
                        width: '100%',
                        maxWidth: '300px',
                        height: 'auto',
                        display: 'block',
                        margin: '0 auto'
                    }}
                />
            </Box>
            <List>
                {list.map((art, index) => (
                    <div key={index}>
                        <ListItem button component="a" href={art.link}>
                            <Typography variant="body2" style={{ fontSize: '0.75rem' }}>
                                {art.title}
                            </Typography>
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        </div>
    );
};

export default Articles;
