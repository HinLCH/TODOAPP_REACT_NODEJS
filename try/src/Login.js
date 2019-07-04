import React from 'react';

class Login extends React.Component {
  constructor(){ 
        super()
        this.state = {
            userName:"",
            password:"",
           
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleChange(event){
        this.setState({
          [event.target.name]: event.target.value
        })
        console.log("inputing",event.target.value)
    }

    handleSubmit(event){
        event.preventDefault()
        console.log("handleSubmit is running")
        var requestBody = {"userName":this.state.userName , "password":this.state.password}
        this.setState({
            userName:"",
            password:""
        })
        
        console.log("requestBody",requestBody)
        fetch("http://localhost:5000/login",{
          method: "post", 
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
         })
         .then(res => {
             return res.json();
        })
         .then((test)=>{
            console.log("success?",test)
            if (test === "success"){
                window.location= '/todoapp';
            } else {
                alert("incorrect username or password")
            }
            })
    }
    
    render(){
        return(
            <div>
                Login Page
                <form onSubmit={this.handleSubmit} >
                    <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange}/><br/>
                    <input type="text" name="password" value={this.state.password} onChange={this.handleChange}/><br/>
                    <button>Login</button>
                </form>
            </div>
        )}
}

export default Login;