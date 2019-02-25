import React from 'react'
import {Redirect} from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import api from '../api'

class Register extends React.Component {
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
		let {username, password, password2, email, name} = this.state

		if (email && username && password && password2 && name && password === password2) {
			api.post("/register", {email, username, name, password}).then(res => {
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
					<p className="h5 text-center mb-4">Sign Up</p>
					<div className="grey-text">
						<MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong" success="right" getValue={(value) => this.setState({email:value})}/>
						<MDBInput label="Type your username" icon="user" group validate error="wrong" success="right" getValue={(value) => this.setState({username:value})}/>
						<MDBInput label="Type your name" icon="user" group validate error="wrong" success="right" getValue={(value) => this.setState({name:value})}/>
						<MDBInput label="Type your password" icon="lock" group type="password" validate error="wrong" success="right" getValue={(value) => this.setState({password:value})}/>
						<MDBInput label="Confirm password" icon="lock" group type="password" validate error="wrong" success="right" getValue={(value) => this.setState({password2:value})}/>
					</div>
					<div className="text-center">
        					<MDBBtn onClick={this.handleSubmit}>Register</MDBBtn>
        				</div>
				</MDBCol>
			</MDBRow>
		)
	}
}

export default Register