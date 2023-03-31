import { useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocation } from '../../containers/App/selectors';
import NotFoundPage from '../../containers/NotFoundPage';
import routes from '../../routes/public';
import Footer from './components/Footer';
import Header from './components/Header';

const switchRoutes = (
  <Routes>
    {routes.map((prop) => (
      <Route key={prop.path} {...prop} />
    ))}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const checkPathname = (pathname) => {
  switch (pathname) {
    case '/login':
      return false;
    case '/signup':
      return false;
    case '/contact':
      return false;
    default:
      break;
  }
  return true;
};

class Layout1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [
        { id: 1, idnm: 'home', navheading: 'Home' },
        { id: 2, idnm: 'courses', navheading: 'Courses' },
        { id: 3, idnm: 'team', navheading: 'Team' },
        { id: 5, idnm: 'contact', navheading: 'Contact' },
      ],
      pos: document.documentElement.scrollTop,
      imglight: false,
      navClass: '',
      fixTop: true,
    };
  }
  pathname = this.props.location.pathname;
  showHeaderAndFooter = checkPathname(this.pathname);

  componentDidMount() {
    window.addEventListener('scroll', this.scrollNavigation, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollNavigation, true);
  }

  scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > this.state.pos) {
      this.setState({ navClass: 'nav-sticky', imglight: false });
    } else {
      this.setState({ navClass: '', imglight: false });
    }
  };

  render() {
    return (
      <>
        {this.showHeaderAndFooter && (
          <Header
            navItems={this.state.navItems}
            navClass={this.state.navClass}
            imglight={this.state.imglight}
            top={this.state.fixTop}
          />
        )}

        <div className="flex-1">{switchRoutes}</div>
        {this.showHeaderAndFooter && <Footer />}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Layout1);
