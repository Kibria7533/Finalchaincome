import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import URL from "./Url";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { Link } from "react-router-dom";
import Myslider from "./Myslider";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliders: [],
      grettings: [],
      services: [],
      portfolios: [],
      loding: false,
    };
  }
  fetchsliders = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchslider`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("uuu", data.data[0].slider);
        if (data.data[0].slider.length) {
          // console.log(data.data);
          this.setState({ sliders: data.data[0].slider, loding: false });
        } else {
          this.setState({ sliders: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ loding: false });
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
        console.log("greeting", data.data);
        if (data.data.length) {
          // console.log(data.data);
          this.setState({ grettings: data.data, loding: false });
        } else {
          this.setState({ grettings: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ loding: false });
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

  fetchportfolios = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchportfolios`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("uuu", data.data[0].portfolios);
        if (data.data[0].portfolios.length) {
          // console.log(data.data);
          this.setState({ portfolios: data.data[0].portfolios, loding: false });
        } else {
          this.setState({ portfolios: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ loding: false });
      });
  };
  componentDidMount() {
    this.fetchgrettings();
    this.fetchportfolios();
    this.fetchservices();
    this.fetchsliders();
  }
  render() {
    return (
      <div className="wrapper-main">
        {/* Top Bar */}
        <Header />
        <header className="slider-main">
          <div
            id="carouselExampleIndicators"
            className="carousel slide carousel-fade"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to={0}
                className="active"
              />
              <li data-target="#carouselExampleIndicators" data-slide-to={1} />
              <li data-target="#carouselExampleIndicators" data-slide-to={2} />
            </ol>
            <div className="carousel-inner" role="listbox">
              {/* Slide One - Set the background image for this slide in the line below */}
              <div
                className="carousel-item active"
                style={{ backgroundImage: 'url("images/slider-01.jpg")' }}
              >
                <div className="carousel-caption d-none d-md-block">
                  <h3>Welcome to Chaincome</h3>
                  <p>Teamwork begins by building trust</p>
                </div>
              </div>
              {/* Slide Two - Set the background image for this slide in the line below */}
              <div
                className="carousel-item"
                style={{ backgroundImage: 'url("images/slider-02.jpg")' }}
              >
                <div className="carousel-caption d-none d-md-block">
                  <h3>Welcome to Chaincome</h3>
                  <p>Lets work Togather</p>
                </div>
              </div>
              {/* Slide Three - Set the background image for this slide in the line below */}
              <div
                className="carousel-item"
                style={{ backgroundImage: 'url("images/slider-03.jpg")' }}
              >
                <div className="carousel-caption d-none d-md-block">
                  <h3>Welcome to Chaincome</h3>
                  <p>Lets do business</p>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </header>
        {/* Page Content */}
        <div className="container">
          {/* About Section */}
          <div className="about-main">
            {this.state.grettings.map((item, index) => {
              return (
                <div className="row">
                  <div className="col-lg-6">
                    <h2>{item.greetingtitle}</h2>
                    <p>{ReactHtmlParser(item.greetingqoute)}</p>
                  </div>
                  <div className="col-lg-6">
                    <img
                      className="img-fluid rounded"
                      style={{ width: "100%" }}
                      src={`http://localhost:5000/${item.greetingimg}`}
                      alt=""
                    />
                  </div>
                </div>
              );
            })}

            {/* /.row */}
          </div>
        </div>
        <div className="services-bar">
          <div className="container">
            <h1 className="py-4">Our Best Services </h1>
            {/* Services Section */}
            <div className="row">
              {this.state.services.map((item, index) => {
                return (
                  <div className="col-lg-4 mb-4" key={index}>
                    <div className="card h-100">
                      <div className="card-img">
                        <img
                          className="img-fluid"
                          src={`http://localhost:5000/${item.img}`}
                          alt=""
                        />
                      </div>
                      <div className="card-body">
                        <h4 className="card-header"> {item.title} </h4>
                        <p className="card-text">
                          {ReactHtmlParser(item.qoute)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* /.row */}
          </div>
        </div>
        <div className="container">
          {/* Portfolio Section */}
          <div className="portfolio-main">
            <h2>Our Portfolio</h2>
            <div className="col-lg-12">
              <div className="project-menu text-center">
                <button className="btn btn-primary active" data-filter="*">
                  All
                </button>
                <button data-filter=".business" className="btn btn-primary">
                  Business
                </button>
                <button data-filter=".travel" className="btn btn-primary">
                  Travel
                </button>
                <button data-filter=".financial" className="btn btn-primary">
                  Financial
                </button>
                <button data-filter=".academic" className="btn btn-primary">
                  Academic
                </button>
              </div>
            </div>
            <div id="projects" className="projects-main row">
              {this.state.portfolios.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="col-lg-4 col-sm-6 pro-item portfolio-item financial"
                  >
                    <div className="card h-100">
                      <div className="card-img">
                        <a
                          href="images/portfolio-img-01.jpg"
                          data-fancybox="images"
                        >
                          <img
                            className="card-img-top"
                            src={`http://localhost:5000/${item.img}`}
                            alt=""
                          />
                          <div className="overlay">
                            <i className="fas fa-arrows-alt" />
                          </div>
                        </a>
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">
                          <a href="#">{item.title}</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* /.row */}
          </div>
        </div>

        {/* Contact Us */}
        <div className="touch-line">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Molestias, expedita, saepe, vero rerum deleniti beatae veniam
                  harum neque nemo praesentium cum alias asperiores commodi.
                </p>
              </div>
              <div className="col-md-4">
                <Link
                  className="btn btn-lg btn-secondary btn-block"
                  to="/contact"
                >
                  {" "}
                  Contact Us{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* <MessengerCustomerChat
    pageId="112437417295403"
    appId="2750775745168996"
  /> */}
        <Footer />
      </div>
    );
  }
}

export default Home;
