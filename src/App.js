import React, { Component } from 'react'
import './App.scss'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <div className='app-header'>
          <h2>Interesting diffs:</h2>
        </div>
        <div>
          <Issues/>
        </div>
      </div>
    )
  }
}

class Issues extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fullList: []
    }
  }

  componentDidMount () {
    fetch('static/intdiffs.json')
      .then(response => {
        response.json().then(fullList => {
          this.setState({fullList})
        })
      })
  }

  render () {
    return (
      <table>
        <tbody>
          {this.state.fullList.map(row => {
            var path, sub, before, after;
            [path, sub, before, after] = row;
            return (
              <tr>
                <td>{path}</td>
                <td>{sub}</td>
                <td>
                  <pre>{before}</pre>
                  <pre>{after}</pre>
                </td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    )
  }
}

export default App
