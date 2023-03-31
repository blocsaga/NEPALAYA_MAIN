import { Helmet } from 'react-helmet';
import StaticContentDiv from '../../components/StaticContentDiv';
import Section from './components/Section';
import Courses from './components/Courses';

import Team from './components/Team';
import Alumni from './components/Alumni';
// import Contact from './components/Contact';
import Contact from './components/ContactUs/Loadable';

import { Col, Container, Row } from 'reactstrap';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="max-w-2xl mx-auto">
        <div className="m-20 px-20 py-10 shadow max-w-2xl mx-auto">
          {/* Importing Section */}
          <Section />

          {/* Importing Courses */}
          <Courses />

          {/* Importing Team */}
          <Team />

          {/* Importing Alumni */}
          {/* <Alumni /> */}

          {/* Importing Contact Us */}
          <Contact />
        </div>
      </div>
    </>
  );
}

export default HomePage;
