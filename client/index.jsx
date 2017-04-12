import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

const token = localStorage.getItem('token')
const username = localStorage.getItem('username')

ReactDOM.render(<App auth={[token, username]} />, document.getElementById('app'))
