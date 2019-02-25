import React from 'react'
import api from '../api'
import { MDBBtn, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBView, MDBMask } from 'mdbreact';
import {Link} from 'react-router-dom'
import ImageLoader from 'react-image-file'
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
			posts.filter((post) => (post.id !== id))
			this.setState({posts})
		})
	}
	render() {
		return (
			<div>
				<MDBCard className="my-5 px-5 pb-5">
					<MDBCardBody>
						<h2 className="h1-responsive font-weight-bold text-center my-5">Recent Posts</h2>
				{this.state.posts.map((post) => (
					<MDBRow key={post.id} className="mb-3">
						<MDBCol lg="5" xl="4">
							<MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">
								<img src={post.imageUrl} alt={post.title}/>
								<Link to={"/post/" + post.id}><MDBMask overlay="white-slight"/></Link>
							</MDBView>
						</MDBCol>
						<MDBCol lg="7" xl="8">
							<h3 className="font-weight-bold mb-3 p-0"><strong>{post.title}</strong></h3>
							<p className="dark-grey-text">
							</p>
							<p>
								by <Link to={"/profiles/" + post.author.id}>{post.author.username}</Link>
							</p>
							<Link to={"/post/" + post.id}>
								<MDBBtn color="primary" size="md">
									Read More
								</MDBBtn>
							</Link>
						</MDBCol>
					</MDBRow>
				))}
					</MDBCardBody>
				</MDBCard>
			</div>
		)
	}
}

export default Home