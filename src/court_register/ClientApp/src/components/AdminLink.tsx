import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <NavItem>
            <NavLink tag={Link} className="text-dark" to="/admin">Администрирование</NavLink>
        </NavItem>
    );
};