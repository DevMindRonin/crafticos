"use client";
import { useSession } from "next-auth/react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { US_STATES } from "@/constants/dashboard";

const MyAccount = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="mb-5">My account</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              placeholder={session?.user.email}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              placeholder="Set new password"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control size="lg" placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control size="lg" placeholder="Bershire 45 LA." />
        </Form.Group>

        <Row className="mb-5">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control size="lg" placeholder="Los Angeles" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select size="lg" defaultValue="Choose...">
              <option>Choose...</option>

              {US_STATES.map((one, i) => (
                <option key={i}>{one}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control size="lg" />
          </Form.Group>
        </Row>

        {/* <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}

        <Button size="lg" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default MyAccount;
