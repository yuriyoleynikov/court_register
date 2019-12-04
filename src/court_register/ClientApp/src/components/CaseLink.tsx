import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Data } from './Data';

const CaseLink = () => (
    <NavItem>
        <NavLink tag={Link} className="text-dark" to="/cases">Дела</NavLink>
    </NavItem>
);

export default CaseLink;
