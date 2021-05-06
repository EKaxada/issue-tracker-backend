/* globals React */
/* eslint "react/jsx-no-def": "off" */

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

  async loadData() {
    // GraphQL query string
    const query = `query {
      issueList {
        id title status owner
        created effort due
      }
    }`;

    const data = await graphQLFetch(query);
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