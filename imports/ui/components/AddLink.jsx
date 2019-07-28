import React from 'react';
import { useInput } from '../hooks/useInput';
import { Col, Row, Button, Container, FormGroup, Label, Form, Input } from 'reactstrap';
import { Meteor } from 'meteor/meteor';

const AddLink = () => {
  const { value: title, bind: bindTitle } = useInput('');
  const { value: url, bind: bindUrl } = useInput('');

  const submitLink = (e) => {
    e.preventDefault();
    Meteor.call('links.insert', title, url);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md="6">
          <h5>Add new link</h5>
          <Form onSubmit={ submitLink }>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" id="title" { ...bindTitle } />
            </FormGroup>
            <FormGroup>
              <Label for="url">Url</Label>
              <Input type="text" id="url" { ...bindUrl } />
            </FormGroup>
            <Button>Add link</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddLink;
