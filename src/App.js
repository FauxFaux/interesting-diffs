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
            let path, sub, before, after;
            [path, sub, before, after] = row
            let ma = /.*\/([a-z0-9-]+)_.*/.exec(path)
            if (!ma) {
              return (<tr><td>PARSE ERROR ARGH</td></tr>);
            }
            let pkg = ma[1];
            return (
              <tr>
                <td className='pkg-name'>
                  <h3>{pkg}</h3>
                  <p>
                    <a href={'https://tests.reproducible-builds.org/' + path}>full dbd.txt</a>
                  </p>
                  <p>
                    <a href={'https://tests.reproducible-builds.org/debian/rb-pkg/unstable/amd64/' + pkg + '.html'}>
                      Reproducible Builds info page
                    </a>
                  </p>
                </td>
                <td>
                  <h3>{sub}</h3>
                  <pre className="before">{before}</pre>
                  <pre className="after">{after}</pre>
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
