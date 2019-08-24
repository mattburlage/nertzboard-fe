import React from 'react';
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
    DropdownItem } from 'reactstrap';

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleDarkMode() {
        this.setState({
            isOpen: false,
        });
        this.props.toggleDarkMode()
    }

    render() {

        let navbarClasses = this.props.darkMode ? 'navbar-dark bg-dark' : 'navbar-light';

        return (
            <div>
                <Navbar className={navbarClasses} expand="md">
                    <NavbarBrand>NertzBoard</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/">Current Game</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">Statistics</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        New Game
                                    </DropdownItem>
                                    <DropdownItem>
                                        Switch Room
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.toggleDarkMode}>
                                        Toggle Dark Mode
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                        </Nav>
                        <Nav navbar className={'ml-auto'}>
                            <NavItem className={'navbar-text'}>
                                Signed in as matthew
                            </NavItem>
                        </Nav>

                    </Collapse>
                </Navbar>
            </div>
        );
    }
}