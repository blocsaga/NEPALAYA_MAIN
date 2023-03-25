import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Input } from 'reactstrap';
import FooterLink from './FooterLink';
const logoDark = new URL(
  '../../../assets/images/logo-dark.png',
  import.meta.url,
);
function Footer() {
  const [links, setlinks] = useState([
    {
      id: 1,
      title: 'For Student',
      child: [
        { title: 'Profile Management', link: '#' },
        { title: 'Task Management', link: '#' },
        { title: 'My Courses', link: '#' },
      ],
    },
    {
      id: 2,
      title: 'About College',
      child: [
        { title: 'Services', link: '#' },
        { title: 'Faq', link: '#' },
        { title: 'Contact us', link: '#' },
      ],
    },
  ]);
  return (
    <div>
      {/* Footer Start */}
      <footer className="section bg-light bg-footer pb-5">
        <Container>
          <Row>
            <Col lg={4}>
              <div className="footer-info mt-4">
                <img src={logoDark} alt="" height="22" />
                <p className="text-muted mt-4 mb-2">
                  Let’s connect on different Social Media! We post a lot about
                  content tips tricks to help save time with your course and
                  assignments so that you can easily grasp with ease. Feel free
                  to follow us there.
                </p>
                <div className="team-social mt-4 pt-2">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <Link to="#" className="text-reset">
                        <i className="mdi mdi-facebook"></i>
                      </Link>
                    </li>{' '}
                    <li className="list-inline-item">
                      <Link to="#" className="text-reset">
                        <i className="mdi mdi-twitter"></i>
                      </Link>
                    </li>{' '}
                    <li className="list-inline-item">
                      <Link to="#" className="text-reset">
                        <i className="mdi mdi-google"></i>
                      </Link>
                    </li>{' '}
                    <li className="list-inline-item">
                      <Link to="#" className="text-reset">
                        <i className="mdi mdi-pinterest"></i>
                      </Link>
                    </li>{' '}
                  </ul>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <Row className="pl-0 md-lg-5">
                {links.map((item, key) => (
                  <Col lg={6} key={key}>
                    <div className="mt-4">
                      <h5 className="f-20">{item.title}</h5>
                      <ul className="list-unstyled footer-link mt-3">
                        {item.child.map((linkItem, key) => (
                          <li key={key}>
                            <Link to={linkItem.link}>{linkItem.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col lg={4}>
              <div className="mt-4">
                <h5 className="f-20">Subscribe</h5>
                <div className="subscribe mt-4 pt-1">
                  <Form action="#">
                    <Input
                      placeholder="Enter Email"
                      type="text"
                      style={{ height: 'auto' }}
                    />
                    <Button color="primary" className="btn btn-primary">
                      <i className="mdi mdi-send"></i>
                    </Button>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
          <hr className="my-5" />
          {/* Render Footer Link End */}
          <FooterLink />
        </Container>
      </footer>
      {/* Footer End */}
    </div>
  );
}

export default Footer;
