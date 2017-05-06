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
      fullList: [],
      notes: {}
    }
  }

  componentDidMount () {
    fetch('static/intdiffs.json')
      .then(response => {
        response.json().then(fullList => {
          this.setState({fullList})
        })
      })
    fetch('static/notes.json')
      .then(response => {
        response.json().then(notes => {
          this.setState({notes})
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
            let ma = /.*\/([a-z0-9.+-]+)_.*/.exec(path)
            if (!ma) {
              return (<tr><td>PARSE ERROR ARGH</td></tr>);
            }
            let pkg = ma[1];
            return (
              <tr>
                <td className='pkg-name'>
                  <h3>{pkg}
                    <span> - </span>
                    <a href={'https://tests.reproducible-builds.org/debian/rb-pkg/unstable/amd64/' + pkg + '.html'}>
                      rp.d.n
                    </a>
                    <span> - </span>
                    <a href={'https://tests.reproducible-builds.org/' + path}>dbd.txt</a>
                  </h3>

                  <ul>
                    { (
                      () => {
                        let ret = []
                        let issues, note;
                        [issues, note] = this.state.notes[pkg]
                        issues.forEach(issue =>
                          ret.push(<li>{issue.replace(/_/g, ' ')}</li>)
                        )
                        if (note) {
                          ret.push(<li>..and has a textual note</li>)
                        }
                        return ret
                      })()
                    }
                  </ul>
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
