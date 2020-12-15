import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import ParticlesBg from "particles-bg";

class Dashboard extends Component {
  render() {
    let config = {
      num: [4, 7],
      rps: 0.1,
      radius: [5, 40],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-40, 40],
      // body: "./img/icon.png", // Whether to render pictures
      // rotate: [0, 20],
      alpha: [0.6, 0],
      scale: [1, 0.1],
      position: "center", // all or center or {x:1,y:1,width:100,height:100}
      color: ["random", "#ff0000"],
      cross: "dead", // cross or bround
      random: 15, // or null,
      g: 5, // gravity
      // f: [2, -1], // force
      onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(
          particle.p.x,
          particle.p.y,
          particle.radius * 2,
          particle.radius * 2
        );
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
      },
    };

    return (
      <div className="d-flex" id="wrapper">
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">
            {" "}
            <a href="/">Chaincome</a>{" "}
          </div>
          <br />
          <br />
          <div className="list-group list-group-flush">
            <Link
              to="/dashboard"
              className="list-group-item list-group-item-action bg-light"
            >
              Dashboard
            </Link>
            <Link className="list-group-item list-group-item-action bg-light">
              <ul className="list-unstyled">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link  dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Manage Users
                  </a>
                  <ul className="dropdown-menu dropdown-menu-right">
                    <li>
                      <Link to="/alluser" className="dropdown-item">
                        All User
                      </Link>
                    </li>
                    <li>
                      <Link to="/userrequest" className="dropdown-item">
                        User Requests
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </Link>
            <Link className="list-group-item list-group-item-action bg-light">
              <ul className="list-unstyled">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link  dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Withdraw Manage
                  </a>
                  <ul className="dropdown-menu dropdown-menu-right">
                    <li>
                      <Link to="/allwithdraw" className="dropdown-item">
                        All Withdraws
                      </Link>
                    </li>
                    <li>
                      <Link to="/withdrawrequest" className="dropdown-item">
                        Withdraw Requests
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </Link>
            <Link className="list-group-item list-group-item-action bg-light">
              <ul className="list-unstyled">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link  dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Settings
                  </a>
                  <ul className="dropdown-menu dropdown-menu-right">
                    <li>
                      <Link to="/manageslider" className="dropdown-item">
                        Manage Slider
                      </Link>
                    </li>
                    <li>
                      <Link to="/managegreeting" className="dropdown-item">
                        Manage Gretting
                      </Link>
                    </li>
                    <li>
                      <Link to="/manageservices" className="dropdown-item">
                        Manage Services
                      </Link>
                    </li>
                    <li>
                      <Link to="manageportfolio" className="dropdown-item">
                        Manage Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link to="/managebussiness" className="dropdown-item">
                        Manage Business
                      </Link>
                    </li>
                    <li>
                      <Link to="/managemission" className="dropdown-item">
                        Manage Mission
                      </Link>
                    </li>
                    <li>
                      <Link to="/managevission" className="dropdown-item">
                        Manage Vission
                      </Link>
                    </li>
                    <li>
                      <Link to="/manageteam" className="dropdown-item">
                        Manage Team
                      </Link>
                    </li>
                    <li>
                      <Link to="/managefaq" className="dropdown-item">
                        Manage Faq
                      </Link>
                    </li>
                    <li>
                      <Link to="/manageothers" className="dropdown-item">
                        Others
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </Link>
          </div>
        </div>
        {/* /#sidebar-wrapper */}
        {/* Page Content */}
        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></Link>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/">
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container-fluid">
            {/* <ParticlesBg type="custom" config={config} /> */}
            <ParticlesBg type="random" />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
