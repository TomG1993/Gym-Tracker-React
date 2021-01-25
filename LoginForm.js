import React, {useState} from 'react';



const LoginForm = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
      const handleEmailInput = e => {
        setEmail(e.target.value);
      };

      const handlePasswordInput = e => {
        setPassword(e.target.value);
      };

     const onSubmit = (e) => {
		e.preventDefault();
		console.log("logging in");
		Login();
		
    }
    
    const Login = () =>{
		console.log("fetching login");
        const url = "https://localhost:44367/Login";
		const response = fetch(url, 
			{
			mode: 'cors',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify({
				email: email,
				password: password
			})
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.id > 0){
                props.activeUser(data.id);
                props.token(data.token);
                props.activePage("overview");
                return;
                }
                else{
                    var emailError = data.name;
                    setEmailError(emailError);
                }
        });
	};


    return (
        <form>
            <input 
            name ="email"
                placeholder="Email"
                value={email}
                onChange={e => handleEmailInput(e)}
            />
            <div>{EmailError}</div>

<input 
            name ="password"
            type ="password"
                placeholder="Password"
                value={password}
                onChange={e => handlePasswordInput(e)}
            />
            <div>{passwordError}</div>


            <button className="inputBase button loginButton" onClick={e => onSubmit(e)}>Login</button>
            </form>
            );
}


export default LoginForm;