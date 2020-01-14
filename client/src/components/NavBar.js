import React, { Component, Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logout from "./Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "../assets/wsb_logo.png";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    msg: null,
    alertOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object,
    register: PropTypes.func,
    clearErrors: PropTypes.func
  };

  render() {
    // this includes all the state values
    const { isAuthenticated, user } = this.props.auth;

    const userLinks = (
      <Fragment>
        <Nav>
          <Nav.Link>
            <span className="navbar-text mr-3">
              <strong>{user ? `Welcome ${user.name}` : ""}</strong>
            </span>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/contact">
            <span className="navbar-text mr-3">Contact</span>
          </Nav.Link>
        </Nav>
        <Nav>
          <Logout />
        </Nav>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <Nav>
          <Nav.Link href="Register">Register</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="Login">Login</Nav.Link>
        </Nav>
      </Fragment>
    );

    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="mainSiteNavBar"
        >
          <Link to="/">
            <img src={logo} alt="wsb logo" className="wsbNavLogo"></img>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>{user ? "Balance: " + user.balance : ""}</Nav>
            <Nav>{isAuthenticated ? userLinks : guestLinks}</Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps)(NavBar);
