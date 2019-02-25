import {Route, Switch, Redirect} from 'react-router-dom'
import React from 'react'
import Register from './container/Register';
import Home from './container/Home';
import Login from './container/Login';
import PostEditor from './container/PostEditor';
import PostViewer from './container/PostViewer';

const AuthRoute = (props) => {
	if (localStorage.getItem("jwt"))
		return (
			<Route path={props.path} exact={props.exact} component={props.component} />
		)
	return (
		<Redirect to="/login" />
	)
}

const Routes = (props) => (
	<div className="mt-5 pt-5">
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/register" exact component={Register} />
			<Route path="/login" exact component={Login}/>
			<AuthRoute path="/post/new" exact component={PostEditor} />
			<Route path="/post/:id" component={PostViewer} />
		</Switch>
	</div>
)

export default Routes