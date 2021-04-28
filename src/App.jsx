class IssueFilter extends React.Component{
    render(){
        return(
            <div>this is a placeholder for the issue filter</div>
        )
    }
}

class IssueTable extends React.Component{
    render(){
        return(
            <div>this is a placeholder for the issue Table</div>
        )
    }
}

class IssueAdd extends React.Component{
    render(){
        return(
            <div>this is a placeholder for a form to add an issue</div>
        )
    }
}

class IssueList extends React.Component{
    render(){
        return(
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter/>
                <hr/>
                <IssueTable/>
                <hr/>
                <IssueAdd/>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<IssueList/>, document.getElementById('contents'))