import React, { useEffect } from "react"
import Card from "./Card"

function Content() {
  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <Card />
          </div>
        </div>
      </div>
    </>
  )
}

export default Content
