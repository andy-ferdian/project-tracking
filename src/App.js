import React, { Component } from "react"
import Dashboard from "./Dashboard"
import Login from "./Login"
import Header from "./Component/Header"
import Sidebar from "./Component/Sidebar"
import Footer from "./Component/Footer"
import Content from "./Component/Content"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

function App() {
  const isLoggedIn = true

  if (isLoggedIn) {
    return (
      <Router>
        <Header />
        <Sidebar />
        <Switch>
          <Route path="/project/:projectname" component={Content} />
          <Route path="/" exact component={Content} />
        </Switch>
        <Footer />
      </Router>
    )
  } else {
    return (
      <Router>
        <Route path="/" component={Login} />
      </Router>
    )
  }
}
export default App
