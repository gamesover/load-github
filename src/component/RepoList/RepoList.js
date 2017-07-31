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
    if (JSON.stringify(nextProps.repos) !== JSON.stringify(this.props.repos)) {
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
      Cell: props =>
          <div className="text-center">
            <button type="button"
                    onClick={this.hideRow.bind(null, props.original.id)}
                    className="btn btn-info">
              Hide
            </button>
          </div>
    }];

    return (
        <div className="repo-list">
          <ReactTable
              data={this.state.repos}
              columns={columns}
              className="-striped -highlight"
              defaultPageSize={10}
              minRows={0}
          />
          <h2 className="text-center">Not showing {this.state.hiddenRows} repos</h2>
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
