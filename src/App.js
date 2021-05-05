import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  // lifecycle methods
  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const git_user_api_url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

  //   const res = await axios.get(git_user_api_url);

  //   this.setState({ users: res.data, loading: false });
  //   console.log(res.data);
  // }

  // Search GitHub users
  // With arrow functions, async goes in front of the param
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const git_user_search_api_url = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const res = await axios.get(git_user_search_api_url);

    this.setState({ users: res.data.items, loading: false });
    console.log(res.data);
  };

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  render() {
    const { users, loading } = this.state;


    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
