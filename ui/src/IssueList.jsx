import React from 'react';
import URLSearchParams from 'url-search-params'; // to inteprete and parse the query strings in links 

import graphQLFetch from './graphQLFetch.js'
import IssueTable from "./IssueTable.jsx"
import IssueFilter from './IssueFilter.jsx'
import IssueAdd from './IssueAdd.jsx'


export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  // reload data incase of query changes
  componentDidUpdate(prevProps){
    const {location: {search: prevSearch}} = prevProps;
    const {location: {search}} = this.props;
    if(prevSearch!== search){
      this.loadData();
    }
  }

  async loadData() {
    const {location: {search}} = this.props;
    const params = new URLSearchParams(search);
    const vars = {};
    if(params.get('status')) vars.status = params.get('status'); // access issue status

    // GraphQL query string
    const query = `query issueList($status: StatusType){
      issueList (status: $status){
        id title status owner
        created effort due
      }
    }`;

    const data = await graphQLFetch(query, vars);
    if (data) {
      this.setState({issues: data.issueList})
    }
  }

  async createIssue(issue) {
    // query field values filled in 
    const query = `mutation issueAdd($issue: IssueInputs!){
      issueAdd(issue: $issue){
        id
      }
    }`

    const data = await graphQLFetch(query, {issue});
    if (data) {
      this.loadData();
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </React.Fragment>
    );
  }
}