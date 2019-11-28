import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const SettingsBlock = () => (
    <NavLink tag={Link} className="text-dark" to="/settings/users">Пользователи</NavLink>
);

export default SettingsBlock;
