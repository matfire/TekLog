import React from 'react'
import api from '../api'
import { MDBBtn } from 'mdbreact';
import {Link} from 'react-router-dom'
class Home extends React.Component {
	state = {
		posts: []
	}
	componentDidMount() {
		api.get("/posts").then(res => this.setState({posts:res.data}))
	}

	deletePost = (id) => {
		api.delete("/posts/" + id).then(res => {
			let posts = this.state.posts
			posts.filter((post) => (post.id != id))
			this.setState({posts})
		})
	}
	render() {
		return (
			<div>
				{this.state.posts.map((post) => (
					<div>
						<Link to={"/post/" + post.id}>{post.title} by {post.author.username}</Link> {post.author.id === JSON.parse(localStorage.getItem("user")).id && <MDBBtn color="danger" rounded onClick={() => this.deletePost(post.id)}>Delete</MDBBtn>}
					</div>
				))}
			</div>
		)
	}
}

export default Home