import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

import AuthContext from "../context/auth-contex";

export default function Navigation(props) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  //koristim konteks da vidim jel user log inan i tako mu zabranim pristup nekim putanjama
  const [context, setContext] = useContext(AuthContext);

  const logOut = () => {
    localStorage.clear();
    setContext({ token: null, userId: null });
  };

  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <div>
            <Navbar color="faded" light>
              <NavbarBrand href="/" className="mr-auto">
                Rs-Simulator
              </NavbarBrand>
              <NavbarToggler onClick={toggleNavbar} className="mr-2" />
              <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
                  {context[0].token && (
                    <NavItem>
                      <NavLink href="/components">Create Project</NavLink>
                    </NavItem>
                  )}
                  {!context[0].token && (
                    <NavItem>
                      <NavLink href="/auth">Log in</NavLink>
                    </NavItem>
                  )}
                  {context[0].token && (
                    <NavItem>
                      <NavLink href="/projects">My Projects</NavLink>
                    </NavItem>
                  )}
                  {context[0].token && (
                    <NavItem>
                      <NavLink href="/allprojects">All Projects</NavLink>
                    </NavItem>
                  )}
                  {context[0].token && (
                    <NavItem>
                      <NavLink href="/myprofile">My profile</NavLink>
                    </NavItem>
                  )}
                  {context[0].token && (
                    <NavItem>
                      <NavLink href="/auth" onClick={logOut}>
                        Log out
                      </NavLink>
                    </NavItem>
                  )}
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}
