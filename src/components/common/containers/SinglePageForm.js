import React from "react";
import FullPage from "./FullPage";
import { Row, Col, Container, Form } from "reactstrap";

const SinglePageForm = ({ children }) => (
  <FullPage>
    <Container>
      <Row>
        <Col sm="12" lg={{ size: 8, offset: 2 }}>
          <Form>{children}</Form>
        </Col>
      </Row>
    </Container>
  </FullPage>
);

export default SinglePageForm;
