import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
import URL from "./Url";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
class Managegretting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greetingtitle: "",
      greetingqoute: "",
      image: "",
      grettings: [],
      loding: false,
    };
  }

  Change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onDrop = (files) => {
    console.log(files[0]);

    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    //save the Image we chose inside the Node Server
    axios
      .post(`${URL}/uploadImage`, formData, config)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            image: response.data.image,
          });
        } else {
          alert("Failed to save the Image in Server");
        }
      })
      .catch((err) => {
        console.log("hi");
        console.log(err);
      });
  };
  // onDelete = (image) => {
  //   const currentIndex = this.state.Images.indexOf(image);

  //   let newImages = [...this.state.Images];
  //   newImages.splice(currentIndex, 1);

  //   this.setState({ Images: newImages });
  // };
  Changesgreetingqoute = (e, data) => {
    this.setState({ greetingqoute: data.getData() });
  };
  onSubmit = async (event) => {
    event.preventDefault();
    const { greetingtitle, greetingqoute, image } = this.state;

    // if (!grettingtitle) {
    //   return alert("Give a grettingtitle of the product!");
    // }

    if (!image) {
      return alert("Give a grettings image!");
    }
    if (!greetingtitle) {
      return alert("Give a grettings title!");
    }
    if (!greetingqoute) {
      return alert("Give greeting qoute!");
    }

    const variables = {
      greetingtitle,
      greetingqoute,
      image,
    };

    await axios.post(`${URL}/grettingssetting`, variables).then((response) => {
      console.log(response);
      if (response.data.success) {
        this.componentDidMount();
        this.setState({ greetingtitle: "", greetingqoute: "", image: "" });
        alert("grettings Succesfully added");
      } else {
        alert("Failed to add grettings");
      }
    });
  };
  fetchgrettings = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchgrettings`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("uuu", data.data[0].grettings);
        if (data.data[0].grettings.length) {
          // console.log(data.data);
          this.setState({ grettings: data.data[0].grettings, loding: false });
        } else {
          this.setState({ grettings: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ loding: false });
      });
  };
  remove = async (id) => {
    await axios
      .get(
        `${URL}/deletegrettings/${id}`,

        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            auth: localStorage.getItem("auth"),
          },
        }
      )
      .then((data) => {
        console.log("uuu", data.data);
        this.componentDidMount();
        // if (data.data.length) {
        //   this.setState({ withdraw: data.data, loding: false, redirect: true });
        // }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ error: err.response.data.messege.msg, loding: false })
      });
  };
  hiden = (e) => {
    this.setState({ hiden: true });
  };
  componentDidMount() {
    this.fetchgrettings();
  }
  render() {
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
                      <Link to="/managegrettings" className="dropdown-item">
                        Manage grettings
                      </Link>
                    </li>
                    <li>
                      <Link to="/managegreeting" className="dropdown-item">
                        Manage Gretting
                      </Link>
                    </li>
                    <li>
                      <Link to="/managegrettings" className="dropdown-item">
                        Manage grettings
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
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Super Admin ?
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
                  >
                    <i className="fa fa-caret-down"></i>
                  </Link>
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
            <form onSubmit={this.onSubmit}>
              <div className="container">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Dropzone
                    onDrop={this.onDrop}
                    multiple={false}
                    maxSize={800000000}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        style={{
                          width: "300px",
                          height: "240px",
                          border: "1px solid lightgray",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        {...getRootProps()}
                      >
                        {/* {console.log("getRootProps", { ...getRootProps() })}
                      {console.log("getInputProps", { ...getInputProps() })} */}
                        <input {...getInputProps()} />
                        <i
                          className="fa fa-plus"
                          style={{ fontSize: "3rem" }}
                        ></i>
                        {/* <Icon type="plus" style={{ fontSize: '3rem' }} /> */}
                      </div>
                    )}
                  </Dropzone>

                  <div
                    style={{
                      display: "flex",
                      width: "350px",
                      height: "240px",
                      overflowX: "scroll",
                    }}
                  >
                    <div>
                      <img
                        style={{
                          minWidth: "300px",
                          width: "300px",
                          height: "240px",
                        }}
                        src={`http://localhost:5000/${this.state.image}`}
                        alt={`sliderImg`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Gretting title</label>
                <input
                  type="text"
                  name="greetingtitle"
                  onChange={this.Change}
                  value={this.state.greetingtitle}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter grettingtitle"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Greeting Qoute</label>

                <CKEditor
                  editor={ClassicEditor}
                  value={this.state.greetingqoute}
                  onChange={this.Changesgreetingqoute}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Managegretting;
