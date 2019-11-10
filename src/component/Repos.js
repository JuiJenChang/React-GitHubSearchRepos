import React, { Component } from 'react';
import './Repos.css';

class Repos extends Component {
    render() {
        let data = this.props.data;
        return (
            <div>
                <img src={data.avatar} className="searchRepos-avatar" />
                <h2 className="searchRepos-name">{data.name || data.username}</h2>
                <p>{data.requests} Requests</p>
                <p>
                    <span className="searchRepos-span-1">{data.success} Success </span>
                    <span> and </span>
                    <span className="searchRepos-span-2">{data.fails} Fails </span>
                </p>
                <ol>
                    {data.repos}
                </ol>
            </div>
        );
    }
}

export default Repos;