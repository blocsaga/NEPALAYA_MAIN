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
    case '/forgot-password-user':
      return false;
    case '/contact':
      return false;
    default:
      break;
  }
  return true;
};

function Layout1(props) {
  const [state, setState] = useState({
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
  });

  let pathname = props.location.pathname;
  let showHeaderAndFooter = checkPathname(pathname);

  const scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > state.pos) {
      setState({ navClass: 'nav-sticky', imglight: false });
    } else {
      setState({ navClass: '', imglight: false });
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollNavigation, true);
    return window.removeEventListener('scroll', scrollNavigation, true);
  }, []);

  return (
    <>
      {showHeaderAndFooter && (
        <Header
          navItems={state.navItems}
          navClass={state.navClass}
          imglight={state.imglight}
          top={state.fixTop}
        />
      )}

      <div className="flex-1">{switchRoutes}</div>
      {showHeaderAndFooter && <Footer />}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Layout1);
