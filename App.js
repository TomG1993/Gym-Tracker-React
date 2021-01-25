import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from "./LoginForm"
import Overview from "./Overview"

class App extends React.Component {

  state = {
    fields: {},
    activePage: "login"
  };
  
  getInitialState () {
    return {
        activePage: 'login'
    };
};

  onChangePage = newPage => {
  console.log("On change page" + newPage);
  this.setState({
      activePage: newPage
  });
  };


  onChange = updatedValue => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue
      }
    });
  };

  


  render() {
  return (
    <div className="App">
          <header className="App-header">
          {this.state.activePage === 'login' ? (
                                  <LoginForm activePage={this.onChangePage} onChange={fields => this.onChange(fields)}/>

                ) : this.state.activePage === 'overview' ? (
                  <Overview activePage={this.onChangePage} />

                ) : null}
             

      </header>
    </div>
  );
}
}

export default App;
