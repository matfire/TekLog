import React from 'react'
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from "megadraft";
import api from '../api';
import { MDBCol, MDBInput, MDBRow, MDBBtn, MDBFileInput } from 'mdbreact';
import FileBase64 from 'react-file-base64';
class PostEditor extends React.Component {

	state = {
		title:"",
		content:"",
		editorState: editorStateFromRaw(null),
		thumbnail: []
	}

	onChange = (editorState) => {
		this.setState({editorState})
	}
	convertToBase64 = async(file) => {
		let reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			console.log("reading")
			let result = {
				name: file.name,
				type: file.type,
				size: Math.round(file.size/1000) + ' kb',
				base64: reader.result,
				file: file
			}
			this.setState({
				thumbnail: [result]
			})
		}
	}
	savePost = async() => {
		let content = editorStateToJSON(this.state.editorState)
		let id = JSON.parse(localStorage.getItem("user")).id
		if (this.state.title ) {		
			api.post("/posts", {
					title:this.state.title,
					content:content,
					id:id,
					image:this.state.thumbnail.base64
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
				<MDBCol md="12">
					<FileBase64 onDone={(files) => this.setState({thumbnail:files})}/>
				</MDBCol>
				<MDBCol>
				</MDBCol>
			</MDBRow>
				<MegadraftEditor editorState={this.state.editorState} onChange={this.onChange}/>
			</React.Fragment>
		)
	}
}

export default PostEditor