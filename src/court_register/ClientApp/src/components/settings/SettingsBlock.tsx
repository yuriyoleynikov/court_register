import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const SettingsBlock = () => (
    <div>
        <NavLink tag={Link} className="text-dark" to="/settings/users">Пользователи</NavLink>
        <NavLink tag={Link} className="text-dark" to="/settings/units">Подразделения</NavLink>
    </div>
);

export default SettingsBlock;
