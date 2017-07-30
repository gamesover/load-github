import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import _ from 'lodash';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      githubUsername: '',
      githubUsernameState: '',
      githubUsernameFeedback: ''
    };
  }

  render() {
    return (
        <div className="App">
          <Form className="github-load-form">
            <FormGroup color={this.state.githubUsernameState}>
              <Label for="github-username">Github Username</Label>
              <Input state={this.state.githubUsernameState}
                     value={this.state.githubUsername}
                     onChange={this.handleChange}
                     type="text"
                     name="github-username"
                     id="github-username"
                     placeholder="github username"/>
              <FormFeedback>{this.state.githubUsernameFeedback}</FormFeedback>
            </FormGroup>
            <Button color="primary" disabled={this.state.loading} onClick={this.loadGithubAccount}>
              {this.state.loading &&
              <i className="fa fa-spinner fa-spin fa-fw"></i>
              }
              Load Repos
            </Button>
          </Form>
        </div>
    );
  }

  handleChange = (event) => {
    this.setState({githubUsername: event.target.value});
  }

  loadGithubAccount = () => {
    const validForm = this.validateForm();

    if (!validForm)
      return;

    this.setLoadingState(true);

    this.fetchRepoList(this.state.githubUsername);
  }

  fetchRepoList(repo) {
    const getRepoListURL = `https://api.github.com/users/${repo}/repos`;

    fetch(getRepoListURL)
        .then(this.handleErrors)
        .then(response => response.json())
        .then(data => {
          const result = _.map(data, (repository) => {
            return {
              id: repository.id,
              name: repository.name,
              description: repository.description,
              created_at: repository.created_at
            };
          });

          console.log(result);

          this.setLoadingState(false);
        })
        .catch(error => {
          this.setLoadingState(false);
          this.setFormGitHubUsernameResponse('danger', `Github Username ${error}`);
        });
  }

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  resetForm() {
    this.setFormGitHubUsernameResponse('', '');
    this.setLoadingState(false);
  }

  setLoadingState(state = true) {
    this.setState((prevState) => {
      return {loading: state};
    });
  }

  setFormGitHubUsernameResponse(state, feedback) {
    this.setState((prevState) => {
      return {
        githubUsernameState: state,
        githubUsernameFeedback: feedback
      };
    });
  }

  validateForm() {
    const validUsername = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(this.state.githubUsername);

    if (!validUsername) {
      this.setFormGitHubUsernameResponse('warning', 'Github Username invalid');
    }

    return validUsername;
  }
}

export default App;
