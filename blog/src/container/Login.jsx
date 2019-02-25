import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import api from '../api'

class Login extends React.Component {
	state = {
		loggedIn:false,
		email: "",
		name: "",
		username:"",
		password: "",
		password2: ""
	}
	componentDidMount() {
		const user = localStorage.getItem("user")
		if (user) {this.setState({loggedIn:true})}
	}
	handleSubmit = () => {
		let {password, email} = this.state

		if (email && password) {
			api.post("/login", {email, password}).then(res => {
				let user = {
					email:res.data.email,
					username:res.data.username,
					id:res.data.id
				}
				localStorage.setItem("user", JSON.stringify(user))
				localStorage.setItem("jwt", res.data.token)
				this.setState({loggedIn:true})
			})
		} else {

		}
	}
	render() {
		if (this.state.loggedIn) {
			return (
				<Redirect to="/"/>
			)
		}
		return (
			<MDBRow>
				<MDBCol center>
					<p className="h5 text-center mb-4">Sign In</p>
					<div className="grey-text">
						<MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong" success="right" getValue={(value) => this.setState({email:value})}/>
						<MDBInput label="Type your password" icon="lock" group type="password" validate error="wrong" success="right" getValue={(value) => this.setState({password:value})}/>
					</div>
					<div className="text-center">
        					<MDBBtn onClick={this.handleSubmit}>Login</MDBBtn> or <Link to="/register">Create Account</Link>
        				</div>
				</MDBCol>
			</MDBRow>
		)
	}
}

export default Login