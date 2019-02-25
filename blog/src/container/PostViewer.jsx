import React from 'react'
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from "megadraft";
import api from '../api';
import { MDBCol, MDBRow, MDBCardTitle } from 'mdbreact';
import {MDBCard, MDBCardBody, MDBIcon, MDBTooltip, MDBCollapse, MDBInput, MDBBtn } from "mdbreact";
import {SelfBuildingSquareSpinner} from 'react-epic-spinners'
const gravatarUrl = require('gravatar-url');

class PostViewer extends React.Component {
	state = {
		title:"",
		content: {},
		editorState: editorStateFromRaw(null),
		comments:[],
		user_title:"",
		user_content:"",
		loading: true
	}
	componentDidMount() {
		api.get("/posts/" + this.props.match.params.id).then(res => {
			let title = res.data.title
			let content = JSON.parse(res.data.content)
			console.log(content)
			this.setState({
				title:title, 
				content:content
			})
			api.get("/posts/" + this.props.match.params.id + "/comments").then(res => {
				this.setState({comments:res.data, loading:false})
			})
		})

	}
	updateComments = () => {
		api.get("/posts/" + this.props.match.params.id + "/comments").then(res => {
			this.setState({comments:res.data})
		})		
	}

	onChange = (editorState) => {
		this.setState({editorState})
	}
	render() {
		let editorState = editorStateFromRaw(null)
		if (this.state.title)
			editorState = editorStateFromRaw(this.state.content)
		if (!this.state.loading){
		return (
			<React.Fragment>
			<MDBRow>
				<MDBCol md="12">
					<MDBInput label="Title" value={this.state.title} disabled />
				</MDBCol>
			</MDBRow>
				<MegadraftEditor editorState={editorState} onChange={this.onChange} readOnly={true} />
			<MDBRow>
				{localStorage.getItem("user") && <MDBCol md="12" className="mt-5 mb-4">
					<MDBCard>
						<MDBCardBody>
							<MDBCardTitle>Leave your opinion!</MDBCardTitle>
							<MDBInput label="title" getValue={(value) => this.setState({user_title:value})} />
							<MDBInput label="content" type="textarea" getValue={(value) => this.setState({user_content:value})} />
							<MDBBtn color="success" rounded onClick={() => {
								if (this.state.user_content && this.state.user_title) {api.post("/posts/" + this.props.match.params.id + "/comments", {
									id: JSON.parse(localStorage.getItem("user")).id,
									title: this.state.user_title,
									content: this.state.user_content
								}).then(res => this.updateComments())}
							}}>Submit</MDBBtn>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>}
				<div className="mdb-feed">
					{this.state.comments && this.state.comments.map((comment) => (
						<div className="news mb-2" key={comment.id}>
							<div className="label">
								<img src={gravatarUrl(comment.author.email)} className="rounded-circle z-depth-1-half"/>
							</div>
							<div className="excerpt">
								<div className="brief">
									<a href={"/users/" + comment.author.id}>{comment.author.username}</a> commented: {comment.title}
								</div>
								<div className="added-text">
									{comment.content}
								</div>
							</div>
						</div>
					))}
				</div>
			</MDBRow>
			</React.Fragment>
		)}
		return (
			<MDBRow center className="mt-5">
				<SelfBuildingSquareSpinner size={200} color="green"/>
			</MDBRow>
		)
	}
}

export default PostViewer