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
class Manageservices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Image: "",
      title: "",
      qoute: "",
      services: [],
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
            Image: response.data.image,
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
  Changesqoute = (e, data) => {
    this.setState({ qoute: data.getData() });
  };
  onSubmit = async (event) => {
    event.preventDefault();
    const { Image, title, qoute } = this.state;

    // if (!title) {
    //   return alert("Give a title of the product!");
    // }

    if (!Image) {
      return alert("Give a service image!");
    }
    if (!title) {
      return alert("Give a service Title!");
    }
    if (!qoute) {
      return alert("Give a service Qoute!");
    }

    const variables = {
      Image,
      title,
      qoute,
    };

    await axios.post(`${URL}/servicessetting`, variables).then((response) => {
      console.log(response);
      if (response.data.success) {
        this.componentDidMount();
        this.setState({ title: "", qoute: "", Image: "" });
        alert("services Succesfully added");
      } else {
        alert("Failed to add services");
      }
    });
  };
  fetchservices = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchservices`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("uuu", data.data[0].services);
        if (data.data[0].services.length) {
          // console.log(data.data);
          this.setState({ services: data.data[0].services, loding: false });
        } else {
          this.setState({ services: [], loding: false });
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
        `${URL}/deleteservices/${id}`,

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

  componentDidMount() {
    this.fetchservices();
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
                      <Link to="/manageservices" className="dropdown-item">
                        Manage services
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
                      src={`http://localhost:5000/${this.state.Image}`}
                      alt={`servicesImg`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input
                  type="text"
                  name="title"
                  onChange={this.Change}
                  value={this.state.title}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">services Qoute</label>

                <CKEditor
                  editor={ClassicEditor}
                  value={this.state.qoute}
                  onChange={this.Changesqoute}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="container-fluid">
            <h1 className="mt-4">Your services</h1>

            <table className="table">
              <thead>
                <th>S No</th>
                <th>Title</th>
                <th>Qoute</th>
                <th>Image</th>
                <th>Action</th>
              </thead>
              <tbody>
                {this.state.services.map((services, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="S.No">{index + 1}</td>
                      <td data-label="Title">{services.title}</td>
                      <td data-label="Qoute">
                        {ReactHtmlParser(services.qoute)}
                      </td>
                      <td data-label="Image">
                        <img
                          style={{ width: "200px", height: "200px" }}
                          src={`http://localhost:5000/${services.img}`}
                          alt={`servicesImg`}
                        />
                      </td>

                      <td data-label="Action">
                        <button
                          type="button"
                          onClick={() => this.remove(services._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Manageservices;
