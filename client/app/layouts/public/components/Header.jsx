import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Container,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// import DropdownMenu from '../../../components/DropdownMenu';
import { logoutRequest } from '../../../containers/App/actions';
import {
  makeSelectToken,
  makeSelectUser,
} from '../../../containers/App/selectors';

const logo = new URL('../../../assets/img/logo.svg', import.meta.url);
// Import Logo
import logodark from '../../../assets/images/logo-dark.png';
import logolight from '../../../assets/images/logo-light.png';
import ScrollspyNav from './Scrollspy';

function Header(props) {
  let navigate = useNavigate();
  const {
    token,
    user,
    navItems,
    top,
    navClass,
    imglight,
    logoutRequest: logout,
  } = props;
  const [checked, setChecked] = useState('');
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleToggle = () => {
    checked === '' ? setChecked('checked') : setChecked('');
  };
  const redirectToLogin = () => {
    navigate('/login');
  };

  const redirectToRegister = () => {
    navigate('/signup');
  };
  const handleLogout = () => {
    logout();
  };

  const toggle = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  let targetId = props.navItems.map((item) => {
    return item.idnm;
  });
  return (
    <>
      <Navbar
        expand="lg"
        fixed={top === true ? 'top' : ''}
        className={navClass + ' navbar-custom sticky sticky-dark'}
        id="navbar"
      >
        <Container>
          {/* LOGO */}
          <NavbarBrand className="navbar-brand logo text-uppercase" href="/">
            {imglight === true ? (
              <img src={logolight} alt="" height="22" />
            ) : (
              <img src={logodark} alt="" height="22" />
            )}
          </NavbarBrand>

          <NavbarToggler onClick={toggle}>
            <i className="mdi mdi-menu"></i>
          </NavbarToggler>
          <Collapse
            id="navbarCollapse"
            isOpen={isOpenMenu}
            className=" navbar-collapse"
          >
            <ScrollspyNav
              scrollTargetIds={targetId}
              scrollDuration="800"
              headerBackground="true"
              activeNavClass="active"
              className="navbar-collapse"
            >
              <Nav
                className="navbar-nav ml-auto navbar-center"
                id="navbar-navlist"
              >
                {navItems.map((item, key) => (
                  <NavItem
                    key={key}
                    className={item.navheading === 'Home' ? 'active' : ''}
                  >
                    <NavLink
                      className={item.navheading === 'Home' ? 'active' : ''}
                      href={'#' + item.idnm}
                    >
                      {item.navheading}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </ScrollspyNav>

            {!token ? (
              <>
                <ul className="navbar-nav navbar-center">
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Log In
                    </Link>
                  </li>
                  <li className="nav-item d-inline-block d-lg-none">
                    <Link to="/signup" className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </ul>
                <div className="navbar-button d-none d-lg-inline-block">
                  <Link
                    to="/signup"
                    className="btn btn-sm btn-soft-primary btn-round"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            ) : (
              <>
                <UncontrolledDropdown>
                  <DropdownToggle
                    data-toggle="dropdown"
                    tag="span"
                    className="navbar-nav"
                  >
                    <li className="navbar-nav">
                      <Link to="#" className="text-muted active">
                        {user.name}
                      </Link>
                    </li>
                  </DropdownToggle>
                  <DropdownMenu right>
                    {user.isAdmin && (
                      <DropdownItem>
                        <Link to="/admin/dashboard" className="text-muted">
                          Dashboard
                        </Link>
                      </DropdownItem>
                    )}
                    <DropdownItem>
                      <Link to="/user/profile" className="text-muted ">
                        Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout} className="text-muted">
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

Header.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  navItems: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  user: makeSelectUser(),
});
export default connect(mapStateToProps, { logoutRequest })(Header);
