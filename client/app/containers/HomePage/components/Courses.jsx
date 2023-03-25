import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import CountUp from 'react-countup';

import { Link } from 'react-router-dom';
import HomeUrl from '../../../assets/images/home-border.png';

export default class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        {
          id: 'service1',
          icon: 'mdi-calendar-outline',
          title: 'BSc CSIT',
          description:
            'Bachelor of Science in Computer Science and Information Technology (BSc. CSIT) is a four years degree launched by Tribhuvan University. ',
        },
        {
          id: 'service2',
          icon: 'mdi-file-document',
          title: 'Computer Engineering',
          description:
            'Bachelor of Computer Engineering in Nepal is a 4-year computer science course that is spread over 8 semesters.',
        },
        {
          id: 'service3',
          icon: 'mdi-clock',
          title: 'Master in AI & ML',
          description:
            'Master of Technology in Artificial Intelligence (MTech in AI) program of Kathmandu University is a 2 years (4 semesters) full-time study program',
        },
      ],
      counters: [
        {
          id: '1',
          extraclass: '',
          start: 15,
          end: 20,
          title: 'Courses',
          description:
            'CSIT, BCA, BIT, BE Computer, BIM, BCIS, BEIT, BSc. ICT, BSc. Hons, BSc(Hons) Ethical Hacking and Cybersecurity. NEPALAYA offers IT Courses in Nepal.',
        },
        {
          id: '2',
          extraclass: 'pt-3',
          start: 70,
          end: 100,
          title: 'Placement',
          description:
            'We work with potential employers and Companies committed to making Nepalaya the “Institution of first choice” from which to recruit dynamic and talented students.',
        },
        {
          id: '3',
          extraclass: 'pt-3',
          start: 1500,
          end: 2000,
          title: 'Students',
          description:
            'A benefit to studying in Nepalya is the opportunity to discover yourself while gaining an understanding of a different study culture. Being in a new place by yourself can be overwhelming at times, and it tests your ability to adapt to diverse situations while being able to problem solve',
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <section className="section bg-courses" id="courses">
          <Container>
            <Row>
              <Col lg="12">
                <div className="title-box text-center">
                  <h3 className="title-heading mt-4">
                    We Provide Awesome Courses{' '}
                  </h3>
                  <p className="text-muted f-17 mt-3">
                    Our different Information Technology courses are an
                    excellent choice to help advance your career.
                    <br />
                    Whether you are seeking professional development, new
                    skills, or a new career, information technology courses
                    <br /> can help you become a more competitive and valuable
                    employee with important skills
                  </p>

                  <img src={HomeUrl} height="15" className="mt-3" alt="" />
                </div>
              </Col>
            </Row>
            <Row className="mt-5 pt-4">
              {/* Render Footer Link */}
              {this.state.courses.map((item, key) => (
                <Col lg={4} key={key}>
                  <div className="courses-box p-4 mt-4">
                    <div className="courses-icon bg-soft-primary">
                      <i className={'mdi text-primary ' + item.icon}></i>
                    </div>

                    <h5 className="mt-4">{item.title}</h5>
                    <p className="text-muted mt-3">{item.description}</p>

                    <div className="mt-3">
                      <Link to="#" className="text-primary f-16">
                        Learn More <i className="mdi mdi-arrow-right ml-1"></i>
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <Row className="align-items-center mt-5 pt-4" id="counter">
              <Col lg={6}>
                <div className="pr-4 mt-4">
                  <p className="text-uppercase">why choose us </p>
                  <h3>A platform for technolgy loving Students </h3>
                  <p className="text-muted mt-3">
                    Technology is needed in nearly every industry, IT jobs are
                    always in demand. Because of the ever-changing landscape of
                    technology, IT jobs are fast-paced and dynamic. Because it's
                    such a large field there is a huge variety of career
                    opportunities to suit every type of personality.
                  </p>
                  <div className="mt-4 pt-1">
                    <Link to="#" className="btn btn-outline-primary">
                      Discover More
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={5} className="offset-lg-1">
                <div className="counter-box">
                  {this.state.counters.map((counteritem, key) => (
                    <div
                      className={counteritem.id !== '1' ? 'mt-4 pt-3' : 'mt-4'}
                      key={key}
                    >
                      <div className="media">
                        <div className="count-box bg-soft-primary text-center">
                          <h3 className="counter-count mb-1 text-primary">
                            <CountUp
                              className="counter-value"
                              delay={2}
                              start={counteritem.start}
                              end={counteritem.end}
                            />{' '}
                            <span className="count-plus text-primary"> +</span>
                          </h3>
                          <p className="text-uppercase text-muted mb-0 f-14">
                            {counteritem.title}{' '}
                          </p>
                        </div>
                        <div className="media-body pl-4">
                          <p className="text-muted mb-0 mt-3">
                            {counteritem.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}
