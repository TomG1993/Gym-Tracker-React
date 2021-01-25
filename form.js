import React from "react";

const initialState = {
	email: "",
	password: "",
	emailError: "",
	passwordError: ""
}

export default class LoginForm extends React.Component {
	state = initialState;

	change = (e) => {

		this.props.onChange({[e.target.name]: e.target.value})
		this.setState ({
			[e.target.name]: e.target.value		
		});	

	};

	validate = () => {

		let emailError = "";
		let passwordError = "";

		if (!this.state.email){
			emailError = "Email cannot be blank"
		}

		if ((!this.state.password)){
			passwordError = "Password cannot be blank"
		}

		if (emailError){
			this.setState({emailError });
			return false;
		}

		return true;
	}

	  onSubmit = (e) => {
		e.preventDefault();
		//this.props.onSubmit(this.state);
		//this.setState(initialState)
		console.log("logging in");
		this.Login();
		
	}

	
	async Login(){
		console.log("fetching login");
        const url = "https://localhost:44367/Login";
		const response = await fetch(url, 
			{
			mode: 'cors',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		});
		const data = await response.json();

		console.log(data);

		console.log(data.email);

		if(data.id > 0){
		this.props.activePage("overview");
		return;
		}

		var emailError = data.name;

		this.setState({emailError});

	};

	render() {
		return (
			<form>
				<input
				name ="email"
					placeholder="Email"
					value={this.state.email}
					onChange={e => this.change(e)}
				/>
				<div>{this.state.emailError}</div>

<input
				name ="password"
				type ="password"
					placeholder="Password"
					value={this.state.password}
					onChange={e => this.change(e)}
				/>
				<div>{this.state.passwordError}</div>


				<button onClick={e => this.onSubmit(e)}>Login</button>
				</form>
				);
	}
}