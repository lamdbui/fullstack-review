import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: '/repos',
      success: (data) => {
        console.log('*** SEARCH GET SUCCESS -', data);
        this.setState({ repos: data })
      },
      error: (data) => {
        console.log('*** THE SADNESS -', data);
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO: Should we do some input validation here?
    $.ajax({
      type: "POST",
      url: '/repos',
      data: term,
      dataType: 'text',
      success: (data, status) => {
        console.log(`*** GITHUB USER ${term} SUCCESSFUL`);
        // console.log(`*** GITHUB USER DATA ${data.items} SUCCESSFUL`, data);
        console.log('GH DATA: ', data);

        $.ajax({
          type: "GET",
          url: '/repos',
          success: (data) => {
            console.log('*** SEARCH GET SUCCESS -', data);
            this.setState({ repos: data })
          },
          error: (data) => {
            console.log('*** THE SADNESS -', data);
          }
        });
      }
    });

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
