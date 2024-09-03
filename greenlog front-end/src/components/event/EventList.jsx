import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Image, Link, SimpleGrid, Card, CardBody, Divider, ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';
import camImage from './cam.png'

const EventList = () => {
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(6);
    const [key, setKey] = useState('event_title');
    const [word, setWord] = useState('');
    const [category, setCategory] = useState('');

    const callAPI = async () => {
        const res1 = await axios.get('/crawl/gihoo')
        setList(res1.data)
        console.log(res1.data)
    };

    useEffect(() => {
        callAPI();
    }, []);

    return (
        <ChakraProvider>
            <Box p={5}>
                <Box display="flex" justifyContent="center" my={3}>
                    <img src={camImage} alt="cam" style={{ width: '100%', maxWidth: '1000px' }} />
                </Box>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
                    {list.map((e, index) => (
                        <Card key={index} borderWidth="1px" borderRadius="md" overflow="hidden">
                            <Link href={e.href} isExternal>
                                <Image src={e.img} alt={e.title} />
                            </Link>
                            <CardBody>
                                <Link href={e.href} isExternal>
                                    <Heading size="md">{e.title}</Heading>
                                    <Divider my={2} />
                                    <Text>작성일: {e.date}</Text>
                                </Link>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            </Box>
        </ChakraProvider>
    );
};

export default EventList;
