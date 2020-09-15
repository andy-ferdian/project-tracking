import React, { useEffect } from "react"
import Header from "./Component/Header"
import Sidebar from "./Component/Sidebar"
import Footer from "./Component/Footer"
import Content from "./Component/Content"

function Dashboard() {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <Content />
      <Footer />
    </div>
  )
}

export default Dashboard
