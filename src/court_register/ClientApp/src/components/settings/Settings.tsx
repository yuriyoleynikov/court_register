import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Settings = () => (
    <NavItem>
        <NavLink tag={Link} className="text-dark" to="/settings">Настройки</NavLink>
    </NavItem>
);

export default Settings;
