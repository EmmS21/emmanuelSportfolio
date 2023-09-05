import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "../scss/light-slider.scss";
import AwesomeSliderStyles2 from "../scss/dark-slider.scss";
import ErrorBoundary from "./ErrorBoundary";

const Calculator = React.lazy(() => import("calculator/Calculator"));

class ProjectDetailsModal extends Component {
  state = {
    isPEMDASLoaded: false,
  };
  async componentDidMount() {
    const isPEMDAS = this.props.data && this.props.data.title === 'PEMDAS Calculator';
    if(isPEMDAS){
      await import("https://pemdas-if107354y-emms21.vercel.app/remoteEntry.js");
      this.setState({ isPEMDASLoaded: true })
    }
  }

  hasVideoLinks() {
    const { one, two, three, four, five, six, seven } = this.props.data;
    return one || two || three || four || five || six || seven;
  }
  
  
  
  render() {
    const { data } = this.props
    if (!data) {
      return null
    }
    const {
      technologies = [],
      images = [],
      title,
      description,
      one,
      oneDescr,
      two,
      twoDescr,
      three,
      threeDescr,
      four,
      fourDescr,
      five,
      fiveDescr,
      six,
      sixDescr,
      seven,
      sevenDescr,
      url,
    } = data;

    const isPEMDAS = title === "PEMDAS Calculator";
    
    const tech = technologies.map((icons, i) => (
      <li className="list-inline-item mx-3" key={i}>
          <span>
            <div className="text-center">
              <i className={icons.class} style={{ fontSize: "300%" }}>
                <p className="text-center" style={{ fontSize: "30%" }}>
                  {icons.name}
                </p>
              </i>
            </div>
          </span>
      </li>
    ));
    const img = images.map((elem, i) => <div key={i} data-src={elem} />);

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-inside"
      >
        <span onClick={this.props.onHide} className="modal-close">
          <i className="fas fa-times fa-3x close-icon"></i>
        </span>
        <div className="col-md-12">
          <div className="col-md-10 mx-auto" style={{ paddingBottom: "50px" }}>
            <div className="slider-tab">
              <span
                className="iconify slider-iconfiy"
                data-icon="emojione:red-circle"
                data-inline="false"
                style={{ marginLeft: "5px" }}
              ></span>{" "}
              &nbsp;{" "}
              <span
                className="iconify slider-iconfiy"
                data-icon="twemoji:yellow-circle"
                data-inline="false"
              ></span>{" "}
              &nbsp;{" "}
              <span
                className="iconify slider-iconfiy"
                data-icon="twemoji:green-circle"
                data-inline="false"
              ></span>
            </div>
            <AwesomeSlider
              cssModule={[AwesomeSliderStyles, AwesomeSliderStyles2]}
              animation="scaleOutAnimation"
              className="slider-image"
            >
              {isPEMDAS && this.state.isPEMDASLoaded ? (
                <div data-src={images[0]}>
                  <ErrorBoundary>
                    <React.Suspense fallback="Loading Calculator...">
                      <Calculator />
                    </React.Suspense>
                  </ErrorBoundary>
                </div>
                ) : (
                  img
              )}            
              {img}
            </AwesomeSlider>
          </div>
          <div className="col-md-10 mx-auto">
            <h3 style={{ padding: "5px 5px 0 5px" }}>
              {title}
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-href"
                >
                  <i
                    className="fas fa-external-link-alt"
                    style={{ marginLeft: "10px" }}
                  ></i>
                </a>
              ) : null}
            </h3>
            <p className="modal-description">{description}</p>
            {this.hasVideoLinks() && (
              <>
            <p> Some Video Links: </p>
            <ul>
              { one &&  <li><a href={one}> {oneDescr} </a></li> }
              { two && <li><a href={two}> {twoDescr} </a></li> }
              { three && <li><a href={three}> {threeDescr} </a></li> }
              { four &&  <li><a href={four}> {fourDescr} </a></li> }
              { five &&  <li><a href={five}> {fiveDescr} </a></li> }
              { six && <li><a href={six}> {sixDescr} </a></li> }
              { seven && <li><a href={seven}> {sevenDescr} </a></li> }
            </ul>
              
              </>
            )}
            <div className="col-md-12 text-center">
              <ul className="list-inline mx-auto">{tech}</ul>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ProjectDetailsModal;