import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import URL from "./Url";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faqs: [],
      loding: false,
    };
  }
  fetchfaqs = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchfaqs`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("uuu", data.data[0].faqs);
        if (data.data[0].faqs.length) {
          // console.log(data.data);
          this.setState({ faqs: data.data[0].faqs, loding: false });
        } else {
          this.setState({ faqs: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ loding: false });
      });
  };
  componentDidMount() {
    this.fetchfaqs();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="full-title">
          <div className="container">
            {/* Page Heading/Breadcrumbs */}
            <h1 className="mt-4 mb-3">FAQ</h1>
            <div className="breadcrumb-main">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active">FAQ</li>
              </ol>
            </div>
          </div>
        </div>
        {/* Page Content */}
        <div className="faq-main">
          <div className="container">
            <h2>Frequently Asked Questions</h2>
            <div className="accordion" id="accordionExample">
              {this.state.faqs.map((item, index) => {
                return (
                  <div className="card accordion-single" key={index}>
                    <div className="card-header" id={1}>
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          {item.title}
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        {ReactHtmlParser(item.ans)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Faq;
