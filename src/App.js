import React, { Component } from 'react';
import './App.css';
import SearchRepos from './component/SearchRepos';
import Repos from './component/Repos';

const API = 'https://api.github.com/users';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      name: '',
      avatar: undefined,
      repos: [],
      homeUrl: '',
      requests: 0,
      success: 0,
      fails: 0,
    }
  }

  fetchRepos = username => {
    let url = `${API}/${username}/repos`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.length >= 0) {
          const countRequests = this.state.requests + 1;
          const countSuccess = this.state.success + 1;
          this.setState({
            repos: data,
            requests: countRequests,
            success: countSuccess,
          })
        }
        else {
          const countRequests = this.state.requests + 1;
          const countFail = this.state.fails + 1;
          this.setState({
            repos: [" User could not be found. "],
            requests: countRequests,
            fails: countFail,
          })
        }
      })
  }

  fetchProfile = username => {
    let url = `${API}/${username}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          username: data.login,
          name: data.name,
          avatar: data.avatar_url,
          homeUrl: data.html_url,
        })
        console.log(this.state)
      })
  }

  render() {
    return (
      <div className="searchRepos-main">
        <h1>Search GitHub Repos</h1>
        <SearchRepos fetchProfile={this.fetchProfile} fetchRepos={this.fetchRepos} />
        <Repos data={this.state} />
      </div>
    );
  }
}

export default App;
