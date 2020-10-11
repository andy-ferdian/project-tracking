import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"

function Sidebar() {
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index3.html" className="brand-link">
          <span className="brand-text font-weight-light">AdminLTE 322</span>
        </a>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image"></div>
            <div className="info">
              <a href="#" className="d-block">
                Alexander Pierce
              </a>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <NavLink to="/project/:projectname" activeClassName="selected">
                  <i className="nav-icon fas fa-th"></i>
                  <p>Phenikaa Website</p>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
