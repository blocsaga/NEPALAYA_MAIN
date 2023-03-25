import { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';

import Slider from 'react-slick';

import Img1 from '../../../assets/images/testi-img/img-1.png';
import Img2 from '../../../assets/images/testi-img/img-2.png';
import Img3 from '../../../assets/images/testi-img/img-3.png';
import Img4 from '../../../assets/images/testi-img/img-4.png';

import HomeUrl from '../../../assets/images/home-border.png';

import Client1 from '../../../assets/images/alumni/1.png';
import Client2 from '../../../assets/images/alumni/2.png';
import Client3 from '../../../assets/images/alumni/3.png';
import Client4 from '../../../assets/images/alumni/4.png';

export default function Alumni(props) {
  const [slideitems, setSlideitems] = useState([
    {
      id: 100,
      img: Img1,
      name: 'Balendra Shah',
      designation: 'Mayor, Kathmandu',
      description:
        'Balendra, 32, popularly known as Balen Shah or simply Balen, is a Nepalese rapper, structural engineer and politician. He is currently serving as the 15th mayor of Kathmandu, the capital of Nepal. Shah has been a popular figure in Nepalese hip-hop since the early 2010s.',
    },
    {
      id: 101,
      img: Img2,
      name: 'Sunita Dangol',
      designation: 'Deputy Mayor, Kathmandu',
      description:
        'Sunita Dangol is a Nepalese politician, Newa heritage conservationist, language activist, and media professional. She is currently serving as the deputy mayor of Kathmandu metropolitan city, the capital city of Nepal.',
    },
    {
      id: 103,
      img: Img3,
      name: 'RajuNath Pandey',
      designation: 'Chief, KMP',
      description:
        'City Police Superintendent Rajunath Pandey is the head of the Kathmandu Metropolitan City Police Force. Rajunath Pandey is known for his bold action.',
    },
    {
      id: 104,
      img: Img4,
      name: 'Dr. Toshima Karki',
      designation: 'Health Minister',
      description:
        'Dr. Karki is a general surgeon by education and practice. Alongside her medical profession, she has been actively vocal on the issues of health worker rights, physical attacks on medical professionals, and other pertinent malpractices in the Nepalese medical field.',
    },
  ]);
  // const imgSrc = (src) => new URL(`/images/img-{src}`, import.meta.url);

  var slidesettings = {
    dots: true,
    speed: 300,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    dotsClass: 'slick-dots slick-thumb carousel-indicators',
    customPaging: function (i) {
      return (
        <img
          src={'/images/img-' + (i + 1) + '.jpg'}
          alt=""
          className=" testi-img img-fluid rounded mx-auto d-block"
        />
      );
    },
  };

  const alumnilides = slideitems.map((slideitem, clientkey) => {
    return (
      <div className="carousel-item" key={slideitem.id}>
        <Row className="align-items-center">
          <Col lg="6">
            <div className="client-box mt-4">
              <h5 className="line-height_1_6">{slideitem.description}</h5>
              <div className="client-icon">
                <i className="mdi mdi-format-quote-close"></i>
              </div>
              <h5 className="f-18">{slideitem.name} </h5>
              <p className="text-primary mb-0">- {slideitem.designation} </p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="text-center mt-4">
              <img src={slideitem.img} className="img-fluid" alt="" />
            </div>
          </Col>
        </Row>
      </div>
    );
  });

  return (
    <>
      <section className="section" id="alumni">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="title-box text-center">
                <h3 className="title-heading mt-4">Let's hear from Alumni</h3>
                <p className="text-muted f-17 mt-3">
                  The college has constituted Alumni Association with a view to{' '}
                  <br />
                  establish and strengthen close relation of its alumni with the
                  college
                </p>

                <img src={HomeUrl} height="15" className="mt-3" alt="" />
              </div>
            </Col>
          </Row>
          <Row className="mt-5 pt-4">
            <Col lg="12">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <Slider {...slidesettings}>{alumnilides}</Slider>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section bg-light bg-alumni">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="title-box text-center">
                <h3 className="title-heading mt-4">All Trusted Brands</h3>
                <p className="text-muted f-17 mt-3">
                  We are providing work-integrated learning opportunities and
                  getting students out into the real world.
                  <br />
                  Our trusted companies will prepare students for success in
                  their chosen field.
                </p>
                <img src={HomeUrl} height="15" className="mt-3" alt="" />
              </div>
            </Col>
          </Row>
          <Row className="mt-5 pt-4">
            <Col lg={3}>
              <div className="client-images mt-4">
                <img
                  src={Client1}
                  alt="logo-img"
                  className="mx-auto img-fluid d-block"
                />
              </div>
            </Col>
            <Col lg={3}>
              <div className="client-images mt-4">
                <img
                  src={Client2}
                  alt="logo-img"
                  className="mx-auto img-fluid d-block"
                />
              </div>
            </Col>
            <Col lg={3}>
              <div className="client-images mt-4">
                <img
                  src={Client3}
                  alt="logo-img"
                  className="mx-auto img-fluid d-block"
                />
              </div>
            </Col>
            <Col lg={3}>
              <div className="client-images mt-4">
                <img
                  src={Client4}
                  alt="logo-img"
                  className="mx-auto img-fluid d-block"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
