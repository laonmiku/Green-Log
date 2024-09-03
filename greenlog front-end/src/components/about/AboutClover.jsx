import React from 'react'
import { Row, Col } from 'react-bootstrap'
import aboutcloverImage from './aboutclover.png'

const AboutClover = () => {
    return (
        <Row className='justify-content-center my-5'>
            <Col xs={10} className='d-flex justify-content-center'>
                <img src={aboutcloverImage} alt="clover" style={{ width: '100%', maxWidth: '800px' }} />
            </Col>
        </Row>
    )
}

export default AboutClover
