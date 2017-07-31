import React, {Component} from 'react';
import ReactTable from 'react-table';
import _ from 'lodash';
import './RepoList.css';

class RepoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: props.repos,
      hiddenRows: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.repos !== this.state.repos) {
      this.setState({
        repos: nextProps.repos,
        hiddenRows: 0
      });
    }
  }

  render() {
    const columns = [{
      Header: 'Id',
      accessor: 'id'
    }, {
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Description',
      accessor: 'description'
    }, {
      id: 'createdAt',
      Header: 'Created at',
      accessor: d => d.created_at
    }, {
      Header: 'Hide',
      accessor: '',
      Cell: value => <button type="button" onClick={this.hideRow.bind(this, value)} className="btn btn-info">
        Info</button>
    }];

    return (
        <div className="repo-list">
          <ReactTable
              data={this.state.repos}
              columns={columns}
          />
          <div>Not showing {this.state.hiddenRows} repos</div>
        </div>
    );
  }

  hideRow = (event) => {
    const updatedRepos = _.filter(this.state.repos, function (repo) {
      return repo.id !== event.row.id;
    });
    const updatedHiddenRows = this.state.hiddenRows + 1

    this.setState({
      repos: updatedRepos,
      hiddenRows: updatedHiddenRows
    });
  }
}

export default RepoList;
