import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBMDBNavLink, MDBIcon, MDBNavLink } from 'mdbreact';

class Header extends React.Component {
	state = {
		collapse:false
	}
	onClick = () => {
		this.setState({collapse:!this.state.collapse})
	}
	render() {
		return(
			<div>
					<header>
					<MDBNavbar style={{backgroundColor:"green"}} dark expand="md" scrolling fixed="top">
						<MDBNavbarBrand href="/">
							<strong>TekLog</strong>
						</MDBNavbarBrand>
						<MDBNavbarToggler onClick={this.onClick} />
						<MDBCollapse isOpen={this.state.collapse} navbar>
							<MDBNavbarNav right>
								{localStorage.getItem("jwt") && <React.Fragment><MDBNavItem><MDBNavLink to="/post/new">Write</MDBNavLink></MDBNavItem><MDBNavItem><MDBNavLink to="/profile"><MDBIcon far icon="user" /></MDBNavLink></MDBNavItem></React.Fragment>}
								{!localStorage.getItem("jwt") && <MDBNavItem><MDBNavLink to="/login">Login</MDBNavLink></MDBNavItem>}
							</MDBNavbarNav>
						</MDBCollapse>
					</MDBNavbar>
					</header>
			</div>
		)
	}
}

export default Header