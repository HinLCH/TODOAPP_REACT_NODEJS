import React from 'react';

class Error extends React.Component {
  constructor(){ 
    super()
    this.goBack = this.goBack.bind(this)    
    }

    goBack(event){
        console.log("goback is running");
        window.location= '/login'
    }
    
    render(){
        return(
            <div>   
               please login to use the todoapp<br/>
               <button onClick = {this.goBack}>Go back</button>
            </div>
        )}
}

export default Error;