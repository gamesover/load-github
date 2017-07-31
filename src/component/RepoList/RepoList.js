import React, {Component} from 'react';
import ReactTable from 'react-table';
import Moment from 'react-moment';
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
      accessor: 'name',
      Cell: props => <span title={props.value}>{props.value}</span>
    }, {
      Header: 'Description',
      accessor: 'description',
      Cell: props => <span title={props.value}>{props.value}</span>,
      sortable: false
    }, {
      id: 'createdAt',
      Header: 'Created at',
      accessor: 'created_at',
      sortable: false,
      Cell: props => <Moment format="YYYY/MM/DD">{props.value}</Moment>
    }, {
      Header: '',
      accessor: '',
      sortable: false,
      Cell: props => <button type="button"
                             onClick={this.hideRow.bind(null, props.original.id)}
                             className="btn btn-info">
        Hide</button>
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

  hideRow = (id) => {
    const updatedRepos = _.filter(this.state.repos, function (repo) {
      return repo.id !== id;
    });
    const updatedHiddenRows = this.state.hiddenRows + 1

    this.setState({
      repos: updatedRepos,
      hiddenRows: updatedHiddenRows
    });
  }
}

export default RepoList;
