import React from 'react'


function CardList (props){
  return (
    <div>
      {
        props.usersData.map( user => 
          <div className="card-container" key={user.node_id}>
              <img  src={user.avatar_url ? user.avatar_url : 'No profile'} alt={user.name}/>
              <div className='user-description'>
                  <h2>Name:{user.name ? user.name : 'Not specified'}</h2>
                  <span>Company:{user.company? user.company : 'Not specified'}</span>
              </div>
          </div>

        )

      }
    </div>
  )
}


class Form extends React.Component {
  render(){
    return(
      <>
      <form onSubmit={this.props.getData}>
        <input type="text" value={this.props.name} onChange={this.props.handleInput}/>
        <button>Submit</button>
      </form>
      </>
    )
  }
}


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      user: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }
  async fetchData (event){
    event.preventDefault();
    const response = await fetch(`https://api.github.com/users/${this.state.user}`);
    if(response.ok){
      const jsonResponse = await response.json();
      this.setState(
          { data: [...this.state.data, jsonResponse] }
      )
    }
    this.setState({user: ''});
  }
  


  handleChange(event){
    event.preventDefault();
    this.setState({user: event.target.value})
  }

  render(){
    return (
      <> 
        <h1 className="title">Github Card</h1>
        <Form name={this.state.user} handleInput={this.handleChange} getData={this.fetchData}/>
        <CardList usersData={this.state.data}/>
      </>
    )
  }
}
export default App;