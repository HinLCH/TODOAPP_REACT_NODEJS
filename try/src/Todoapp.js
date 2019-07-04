import React from 'react';

class Todoapp extends React.Component {
  constructor(){ 
    super()
    this.state = {
        data : [],
        input: "",
        rowsID: "",
        deleted: false
    }
    this.getJson=this.getJson.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleRestart=this.handleRestart.bind(this)
    this.handleDelete=this.handleDelete.bind(this)
  
  }
  //getJson
  getJson(){
    fetch("http://localhost:5000/getJson",{
      method: "get",
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json()
    })
    .then(data => {
      this.setState({
        data: data
      })
      console.log('this.state.data',this.state.data)
      
    })
  }
//handleChange
  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log("check",event.target.value)
  }
//handleSubmit
  handleSubmit(event){
    event.preventDefault()
    if (this.state.input.length === 0 ){
      alert("Please enter something")
    } else {
    var requestBody = {"input":this.state.input}
    this.setState({
      input: ""
    })
    this.refs.input.value = "";
    console.log("requestBody",requestBody)
    fetch("http://localhost:5000/post",{
      method: "post", 
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
     })
    }//.then(response => { 
    //   return response.json()
    // })
    // .then(data => {
    //   console.log(data)
    //   console.log('debug1')
    //   console.log('debug2')
    // })
    
  }
  //handleRestart
  handleRestart(event){
    window.location.reload();
    fetch("http://localhost:5000/restart",{
      method : "post",
      body:""
    })
  }

  //add new feature:delete items by id
  //handleDelete
  handleDelete(event){
    event.preventDefault()
    var dataSet = this.state.data;
    var targetIndex = event.target.getAttribute("data-index");
    // console.log(" dataSet[targetIndex].id is ",dataSet[targetIndex].id);
    // console.log("this.state.rowsID before",this.state.rowsID);
    this.setState({
      rowsID: dataSet[targetIndex].id
    }, () => {
      // console.log("this.state.rowsID after",this.state.rowsID);
      var deleteID = this.state.rowsID;
      //console.log("we can get the ID after setState is done",deleteID);
      var requestBody = {"rowsID":deleteID}
      //console.log("requestBody",requestBody)
      fetch("http://localhost:5000/delete",{
        method : "post",
        headers:{
          'Content-Type': 'application/json'
            },
        body : JSON.stringify(requestBody)
      //get the key={index} andpost to backend
          })
          .then(()=>{
            console.log("okok");
            alert("seleted item was deleted")
            this.getJson()
            //add a pop up to remain user that one item was deleted
          })
          .catch((err)=>{
            console.log('There has been a problem : ',err.message)
          })
      });   
  }


  render(){
    return( 
      <div>
        <header>Good morning</header>
        <button onClick={this.handleRestart}>Restart your to-do list</button>
        <form onSubmit={this.handleSubmit}>
          <input 
            ref="input"
            type="text" 
            name="input" 
            onChange={this.handleChange}
            value={this.state.input}/>
          <button>Submit</button>
        </form>
        {/*now: hit the click to show the todolist
        future: automatically show all todolist +
                add a button to delete specified  item*/}
        <button onClick={this.getJson}>Get your to-do list</button>
        {this.state.data.map((value, index)=>
          <div key={index}>
            <span>{value.text}</span>
            <button onClick={this.handleDelete} data-index={index}>I've finish it already</button>
          </div>  
        )}  
        <p>hi</p>
      </div>
    ) 
  }
}

export default Todoapp;