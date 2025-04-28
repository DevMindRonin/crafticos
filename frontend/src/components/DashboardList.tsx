"use client";
import { useSession } from "next-auth/react";
import mainPicture from "../../public/images/jajaobrazek.png";
import { SIZE } from "@/constants/dashboard";
import { Card, Row, Col, Image } from "react-bootstrap";
import {
  Alarm,
  ArrowRight,
  Alexa,
  Archive,
  FileBarGraph,
  VectorPen,
} from "react-bootstrap-icons";

const DashboardList = () => {
  const { data: session } = useSession();
  return (
    <div>
      <div className="p-4">
        <Row className="pb-5">
          <Col md={2}>
            <Image
              alt="Front picture"
              src={mainPicture.src}
              roundedCircle
              width={150}
              height={150}
            />
          </Col>
          <Col className="d-flex flex-column justify-content-center">
            <h3 className="">My account</h3>
            <h1 className="lh-1">{session?.user.name}</h1>
          </Col>
        </Row>

        {/* První řádek - 2 karty vedle sebe */}
        <Row className="justify-content-center">
          <Col md={6} className="mb-3">
            <Card className="h-100 bg-light p-5" style={{ border: "none" }}>
              <Row className="justify-content-center">
                <Col md={4} className="text-center">
                  <Alarm size={SIZE.icons} />
                </Col>
                <Col md={8}>
                  <Card.Title>Daily Workout</Card.Title>
                  <Card.Text>
                    Oorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsa harum veritatis quam, saepe id porro, tempora
                    aspernatur iure sunt illo quis molestias animi excepturi
                    recusandae commodi vel explicabo voluptates. Obcaecati!
                  </Card.Text>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card className="h-100 bg-light p-5" style={{ border: "none" }}>
              <Row className="justify-content-center">
                <Col md={4} className="text-center">
                  <ArrowRight size={SIZE.icons} />
                </Col>
                <Col md={8}>
                  <Card.Title>Progress Tracker</Card.Title>
                  <Card.Text>Vel explicabo voluptates</Card.Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Druhý řádek - další 2 karty pod nimi */}
        <Row className="justify-content-center">
          <Col md={6} className="mb-3">
            <Card className="h-100 bg-light p-5" style={{ border: "none" }}>
              <Row className="justify-content-center">
                <Col md={4} className="text-center">
                  <Alexa size={SIZE.icons} />
                </Col>
                <Col md={8}>
                  <Card.Title>Upcoming Sessions</Card.Title>
                  <Card.Text>
                    {" "}
                    elit. Ipsa harum veritatis quam, saepe id porro, tempora
                    aspernatur iure sunt illo quis molestias animi excepturi
                    recusandae commodi vel explicabo voluptates. Obcaecati!
                  </Card.Text>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card className="h-100 bg-light p-5" style={{ border: "none" }}>
              <Row className="justify-content-center">
                <Col md={4} className="text-center">
                  <Archive size={SIZE.icons} />
                </Col>
                <Col md={8}>
                  <Card.Title>Community Updates</Card.Title>
                  <Card.Text>No information.</Card.Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        {/* tŘETÍ řádek - další 2 karty pod nimi */}
        <Row className="justify-content-center">
          <Col md={6} className="mb-3">
            <Card className="h-100 bg-light p-3" style={{ border: "none" }}>
              <Row className="justify-content-center">
                <Col md={4} className="text-center">
                  <FileBarGraph size={SIZE.icons} />
                </Col>
                <Col md={8}>
                  <Card.Title>Upcoming Sessions</Card.Title>
                  <Card.Text>Download more info.</Card.Text>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card className="h-100 bg-light p-3" style={{ border: "none" }}>
              <Row className="justify-content-center">
                <Col md={4} className="text-center">
                  <VectorPen size={SIZE.icons} />
                </Col>
                <Col md={8}>
                  <Card.Title>Community Updates</Card.Title>
                  <Card.Text>
                    Dolor, sit amet consectetur adipisicing elit. Itaque,
                    voluptatum dignissimos tempore exercitationem nisi nemo
                    harum minus saepe porro cupiditate cum beatae, pariatur
                    assumenda veritatis sit sapiente delectus laudantium
                    perferendis!{" "}
                  </Card.Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashboardList;

{
  /* cards: https://react-bootstrap.netlify.app/docs/components/cards */
}
{
  /* // images : https://react-bootstrap.netlify.app/docs/components/images */
}
{
  /* Checks https://react-bootstrap.netlify.app/docs/forms/checks-radios */
}
{
  /* forms https://react-bootstrap.netlify.app/docs/forms/floating-labels */
}
{
  /* forms layout https://react-bootstrap.netlify.app/docs/forms/layout */
}
{
  /* forms validation: https://react-bootstrap.netlify.app/docs/forms/validation */
}
