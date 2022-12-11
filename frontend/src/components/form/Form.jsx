import React from "react";
import { useFormik } from 'formik';
import { Container, Navbar, Stack, Form, Row, Col, Button, Card } from 'react-bootstrap';

const FormPage = () => {
    return (
        <Stack gap={5} style={{height: "100vh"}}>
            <Navbar expand="lg" variant="light" bg="light" className='shadow-sm'>
                <Container fluid="md">
                    <Navbar.Brand>
                        <img
                            alt=""
                            src="/chat_nav.svg"
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            />{' '}
                        Chat
                    </Navbar.Brand>
                </Container>
                
            </Navbar>
            <Container fluid className="bg-light h-100">
                <Row className="justify-content-center align-content-center h-100">
                    <Col md="auto" className="col-12 col-md-8 col-xxl-6">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <img
                                alt=""
                                src="/chat_form.png"
                                width="100"
                                height="100"
                                className="d-inline-block align-top"
                                />{' '}
                                <Form className="justify-content-center" style={{padding: "10px"}}>
                                    <h1>Войти</h1>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" placeholder="Введите ник" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Control type="password" placeholder="Пароль" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Войти
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Stack>
    )
}

export default FormPage