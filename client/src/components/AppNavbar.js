import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

import {Link} from "react-router-dom";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user ? user.user_role == "admin" ? `Welcome ${user.name}[Admin]`  :`Welcome ${user.name}`  : ''}</strong>
          </span>
        </NavItem>
        {
          user?
            user.user_role == "admin" ? 
            <React.Fragment>
              <NavItem>
                <NavLink href='/upload_lua'> Upload Lua</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/generate_invite'> Generate Invite</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/users'>Thor Hamer</NavLink>
              </NavItem>
            </React.Fragment>
          :""
          :""
        }
            
            {/* <NavItem>
              <NavLink href='/render_auction'>View All Auction</NavLink>
            </NavItem> */}

        <NavItem>
          <Logout />
        </NavItem>
        
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          {/* <NavLink href='/youtube_guide'>HOW TO USE</NavLink> */}
        </NavItem>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
        
      </Fragment>
    );

    return (
      <div>
        <Navbar  style={{backgroundColor:"#001334",marginBottom:"0px !important"}} dark expand='sm' className='mb-5 navbar-fixed'>
          <Container>
            <NavbarBrand href='/'>Molarity.Lua</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
