import React, { Component } from 'react';
import './SearchRepos.css';

class SearchRepos extends Component {

    handleForm = e => {
        e.preventDefault();
        let username = this.refs.username.value;
        this.props.fetchProfile(username);
        this.props.fetchRepos(username);
        this.refs.username.value = '';
    }

    render() {
        return (
            <div className="searchRepos-box">
                <form onSubmit={this.handleForm}>
                    <input className="search-box" type="search" ref="username" placeholder="github username" />
                </form>
                <button onClick={this.handleForm}>Search</button>
            </div>
        );
    }
}

export default SearchRepos;