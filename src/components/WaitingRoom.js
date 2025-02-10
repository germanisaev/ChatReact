import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const WaitingRoom = ({ joinChatRoom }) => {
    const [username, setUserName] = useState();
    const [chatroom, setChatRoom] = useState();

    return <Form onSubmit={ e => {
                e.preventDefault();
                joinChatRoom(username, chatroom);
            }}>
                <Row className='px-5 py-5'>
                    <Col sm={12}>
                        <Form.Group>
                            <Form.Control className='mb-2' placeholder='Username' onChange={e => setUserName(e.target.value)}></Form.Control>
                            <Form.Control className='mb-2' placeholder='ChatRoom' onChange={e => setChatRoom(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={12}>
                        <Button variant='success' type='submit'>Join</Button>
                    </Col>
                </Row>
            </Form>;
}

export default WaitingRoom;