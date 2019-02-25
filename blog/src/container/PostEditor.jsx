import React from 'react'
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from "megadraft";
import api from '../api';
import { MDBCol, MDBInput, MDBRow, MDBBtn, MDBFileInput } from 'mdbreact';
class PostEditor extends React.Component {
	state = {
		title:"",
		content:"",
		editorState: editorStateFromRaw(null),
	}
	componentDidMount() {

	}

	onChange = (editorState) => {
		this.setState({editorState})
	}
	savePost = () => {
		let content = editorStateToJSON(this.state.editorState)
		let id = JSON.parse(localStorage.getItem("user")).id
		if (this.state.title ) {		
			api.post("/posts", {
					title:this.state.title,
					content:content,
					id:id
			}).then(res => console.log("created post"))
		}
	}
	render() {
		return (
			<React.Fragment>
			<MDBRow>
				<MDBCol md="10">
					<MDBInput label="Title" getValue={(value) => this.setState({title:value})} />
				</MDBCol>
				<MDBCol md="2">
					<MDBBtn color="success" rounded onClick={() => this.savePost()}>Save</MDBBtn>
				</MDBCol>
				<MDBCol>
				</MDBCol>
			</MDBRow>
				<MegadraftEditor editorState={this.state.editorState} onChange={this.onChange} />
			</React.Fragment>
		)
	}
}

export default PostEditor