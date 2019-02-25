const multer = require('multer')
const express = require("express")
const {prisma} = require("./generated/prisma-client")
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const config = require("./config")
const jwt = require('jsonwebtoken')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const app = express()


//multer setup

const storage = multer.diskStorage({
	destination:"./public",
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now())
	}
})

var upload = multer({storage})




app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(express.static(__dirname + "public"));
app.get("/users", (req, res) => {
	prisma.users().then(users => res.send(users))
})

app.post("/login", async (req, res) => {
	let email = req.body.email
	const users = await prisma.users()
	let user = users.filter((us) => (us.email == email))
	if (user) {
		if (bcrypt.compareSync(req.body.password, user[0].password)) {
			let token = jwt.sign({username:user.username}, config.secret, {expiresIn:'24h'})
			user = user[0]
			res.json({success:true, message:"Authentication Successfull", token:token, username:user.username, email:user.username, id:user.id})
		}
	}
	res.json({success:false, message:"Invalid Credentials"})
})

app.post("/register", async (req, res) => {
	let hashedpasswd = bcrypt.hashSync(req.body.password, 12)
	const user = await prisma.createUser({name:req.body.name, email:req.body.email, password:hashedpasswd, username:req.body.username})
	let token = jwt.sign({username:user.username}, config.secret, {expiresIn:'24h'})
	res.send({username:user.username, email:user.email, id:user.id, token: token})
})


app.delete("/users/:id", (req, res) => {
	let id = req.params.id
	prisma.deleteUser({id}).then(user => res.status(200).send({msg:"success"}))
})

app.get("/posts", async (req, res) => {
	let fragment = `fragment PostsWithAuthors on Post {
		title
		content
		id
		imageUrl
		author {
			username
			id
			email
		}
	}`
	const posts = await prisma.posts().$fragment(fragment)
	res.json(posts)
})

app.get("/posts/:id", async (req, res) => {
	let id = req.params.id
	const post = await prisma.post({id})
	res.json(post)
})

app.post("/posts",async(req, res) => {
	let {title, content, id} = req.body
	let imageUrl = req.body.image
	let post = await prisma.createPost({title, content, author: {connect: {id}}, imageUrl})
	res.json(post)
})

app.delete("/posts/:id", async (req, res) => {
	let id = req.params.id
	let postTmp = await prisma.post({id})
	let comments = await prisma.deleteManyComments({post:postTmp})
	let post = await prisma.deletePost({id})
	res.json(post)
})

app.get("/posts/:id/comments", async(req, res) => {
	let id = req.params.id
	let fragment = `fragment CommentWithAuthor on Comment {
		title
		content
		author {
			id
			username
			email
		}
	}`
	const post = await prisma.post({id})
	let comments = await prisma.post({id}).comments().$fragment(fragment)
	//const comments = await prisma.comments({post}).$fragment(fragment)
	res.json(comments)
})

app.post("/posts/:id/comments", async (req,res) => {
	let id = req.params.id
	let {title, content} = req.body
	let comment = await prisma.createComment({title : title, content : content, author : {connect: {id: req.body.id}}, post: {connect: {id}}})
	res.json(comment)
})

app.listen(4000, () => console.log("listening"))