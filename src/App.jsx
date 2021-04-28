const initialIssues = [
  {
    id: 1,
    status: "New",
    owner: "Ravan",
    effort: 5,
    created: new Date("2018-08-15"),
    due: undefined,
    title: "Error in console when clicking Add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    effort: 14,
    created: new Date("2018-08-16"),
    due: new Date("2018-08-30"),
    title: "Missing bottom border on panel",
  },
];

const sampleIssue = {
    status: 'New', owner: 'Pieta',
    title: 'Completion date should be optional',
  };

class IssueFilter extends React.Component {
  render() {
    return <div>this is a placeholder for the issue filter</div>;
  }
}

class IssueRow extends React.Component {
  render() {
    const { id, status, owner, created, effort, due, title } = this.props.issue;
    return (
      <tr>
        <td>{id}</td>
        <td>{status}</td>
        <td>{owner}</td>
        <td>{created.toDateString()}</td>
        <td>{effort}</td>
        <td>{due ? due.toDateString() : ""}</td>
        <td>{title}</td>
      </tr>
    );
  }
}

class IssueTable extends React.Component {
  render() {
    const rowStyle = { border: "1px solid silver", padding: 4 };
    const issueRows = this.props.issues.map((issue) => (
      <IssueRow rowStyle={rowStyle} issue={issue} />
    ));
    return (
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Due Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>{issueRows}</tbody>
      </table>
    );
  }
}

class IssueAdd extends React.Component {
    constructor() {
        super();
        setTimeout(() => {
            this.props.createIssue(sampleIssue)
        }, 2000);
      }
    
      
  render() {
    return <div>this is a placeholder for a form to add an issue</div>;
  }
}

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = {issues:[]};
        this.createIssue = this.createIssue.bind(this)
    }
    createIssue(issue) {
        issue.id = this.state.issues.length+1;
        issue.created = new Date();
        const newIssueList = this.state.issues.slice();
        newIssueList.push(issue);
        this.setState({issues: newIssueList})
    }
  
    componentDidMount() {
      this.loadData();
    }
  
    loadData() {
      setTimeout(() => {
        this.setState({ issues: initialIssues });
      }, 500);
    }
  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues}/>
        <hr />
        <IssueAdd createIssue={this.createIssue}/>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<IssueList />, document.getElementById("contents"));
