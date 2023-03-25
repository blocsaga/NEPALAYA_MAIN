import { Row, Col } from 'reactstrap';

function FooterLink() {
  return (
    // Footer Link start
    <Row>
      <Col lg={12}>
        <div className="text-center">
          <p className="text-muted mb-0">
            {new Date().getFullYear()} © Nepalaya. Managed with 💚 by Pranav &
            Shamel.
          </p>
        </div>
      </Col>
    </Row>
  );
}
export default FooterLink;
