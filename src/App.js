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
      avatar: '',
      repos: '',
      homeUrl: '',
      notFound: '',
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
        this.state.requests += 1;
        this.state.success += 1;
        let reposLsit = data.map((item, i) => <li key={i}><a href={item.html_url} target="_blank">{item.name}</a></li>);
        this.setState({
          repos: reposLsit,
          requests: this.state.requests,
          success: this.state.success,
        })
        console.log(data);
      })
      .catch((error) => {
        this.state.fails += 1;
        this.setState({
          repos: " User could not be found. ",
          requests: this.state.requests,
          fails: this.state.fails,
        })
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
          notFound: data.message
        })
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
