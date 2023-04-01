// import { useEffect, useState } from "react";
import { Dropdown, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import { isAuthenticated } from "../auth/helper";
import { logoutUser } from "../util-methods/http-calls";

function NavBar({ userEmail, setUserEmail, getUserState }) {
  // const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   const { user } = isAuthenticated();
  //   setUserEmail(user?.email);
  // }, []);

  const logoutHandler = async () => {
    await logoutUser();
    getUserState();
    navigate("/");
    setUserEmail("");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      className="position-sticky top-0 left-0 nav-z-index"
    >
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          <span className="display-6">Unlock.Fit</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to={"/information"}>
              Informations
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/dashboard"}>
              Dashboard
            </Nav.Link>
          </Nav>
          {userEmail && (
            <Nav>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  variant="link"
                >
                  <Navbar.Text>Signed in as: {userEmail}</Navbar.Text>
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                  <Dropdown.Item href="#/action-1" active disabled>
                    Profile
                  </Dropdown.Item>

                  <Dropdown.Divider />
                  <Dropdown.Item
                    as={Link}
                    onClick={logoutHandler}
                    href="#/action-4"
                  >
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
