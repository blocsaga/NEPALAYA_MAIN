import { Component } from 'react';
import { Link } from 'react-router-dom';

import { Col, Container, Row } from 'reactstrap';
import Slider from 'react-slick';

import HomeUrl from '../../../assets/images/home-border.png';

import Img1 from '../../../assets/images/users/img-1.png';
import Img2 from '../../../assets/images/users/img-2.png';
import Img3 from '../../../assets/images/users/img-3.png';
import Img4 from '../../../assets/images/users/img-4.png';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [
        {
          id: 1,
          img: Img1,
          name: 'Balen Shah',
          nickname: '#balen',
          description:
            'Our curriculum is designed to equip students with practical skills, problem-solving techniques, and critical thinking abilities that will help them excel in their careers.',
        },
        {
          id: 2,
          img: Img2,
          name: 'Sunita Dangol',
          nickname: '#sunita',
          description:
            'Overall, our courses are excellent choice for students looking to build a rewarding career in the tech industry',
        },
        {
          id: 3,
          img: Img3,
          name: 'Rajunath Pandey',
          nickname: '#raju',
          description:
            'Our experienced faculty members are passionate about teaching and are dedicated to helping students achieve their goals. We offer a range of courses in various fields of IT, including programming, database management, networking, and cybersecurity',
        },
        {
          id: 4,
          img: Img4,
          name: 'Dr.Toshima Karki',
          nickname: '#toshima',
          description:
            'IT course at Nepalaya provides students with an in-depth understanding of the latest technologies and tools in the industry.',
        },
      ],
    };
  }

  render() {
    var temsettings = {
      autoplay: true,
      dots: true,
      speed: 300,
      infinite: false,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 1,
    };

    const teamslides = this.state.teams.map((team, teamindex) => {
      return (
        <div className="team-box p-3" key={teamindex}>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="mt-4">
                <h5 className="mt-2">{team.name}</h5>
                <p className="team-badge bg-primary text-white rounded f-14 mt-2">
                  #{team.nickname}
                </p>
                <p className="text-muted mt-3">{team.description}</p>
                <div className="team-social mt-4 pt-2">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <Link to="#" className="text-reset">
                        <i className="mdi mdi-facebook"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#" className="text-reset">
                        <i className="mdi mdi-twitter"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#" className="text-reset">
                        <i className="mdi mdi-google"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mt-4">
                <img src={team.img} alt="" className="img-fluid rounded" />
              </div>
            </Col>
          </Row>
        </div>
      );
    });
    return (
      <>
        <section className="section pt-0" id="team">
          <Container>
            <Row>
              <Col lg="12">
                <div className="title-box text-center">
                  <h3 className="title-heading mt-4">
                    Meet the People behind Nepalaya
                  </h3>
                  <p className="text-muted f-17 mt-3">
                    We are proud to say that our college is supported by our
                    Alumni. They are the reason that we stand out from others.
                  </p>
                  <img src={HomeUrl} height="15" className="mt-3" alt="" />
                </div>
              </Col>
            </Row>
            <Row className="mt-5 pt-4">
              <Col lg="12">
                <div className="team-carousel">
                  <Slider {...temsettings}>{teamslides}</Slider>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section bg-light bg-cta">
          <Container>
            <Row className="justify-content-center">
              <Col lg={9}>
                <div className="text-center">
                  <h2>
                    Get Started With{' '}
                    <span className="text-primary">Nepalaya</span>
                  </h2>
                  <p className="text-muted mt-3">
                    Explore our wide range of courses that offer the program you
                    want to pursue. You can check different links that will help
                    you get more information about available courses
                  </p>
                  <div className="mt-4 pt-2">
                    <Link
                      to="#"
                      className="btn btn-soft-primary btn-round mr-3 btn-rounded"
                    >
                      Request a course
                    </Link>
                    <Link
                      to="#"
                      className="btn btn-primary btn-round btn-rounded"
                    >
                      Get Started Now
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}
