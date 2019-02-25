import React from 'react'
import {MDBContainer, MDBBtn, MDBFooter, MDBNavLink, MDBRow, MDBCol} from 'mdbreact'
import Routes from '../routes'
import Header from '../component/Header';
class Layout extends React.Component {
	render(){
		return(
			<React.Fragment>
			<MDBContainer>
				<Header/>
				<Routes />
			</MDBContainer>
			</React.Fragment>
		)
	}
}

export default Layout