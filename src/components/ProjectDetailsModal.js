import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "../scss/light-slider.scss";
import AwesomeSliderStyles2 from "../scss/dark-slider.scss";

class ProjectDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0, 
    };
  }  

  handleNextImage = () => {
    const { images } = this.props.data;
    const { currentImageIndex } = this.state;
    if (currentImageIndex < images.length - 1) {
      this.setState({ currentImageIndex: currentImageIndex + 1 });
    }
  };

  handlePrevImage = () => {
    const { currentImageIndex } = this.state;
    if (currentImageIndex > 0) {
      this.setState({ currentImageIndex: currentImageIndex - 1 });
    }
  }

  hasVideoLinks() {
    const { one, two, three, four, five, six, seven } = this.props.data;
    return one || two || three || four || five || six || seven;
  }
  
  render() {
    const { data } = this.props;
    if (!data) {
      return null
    }
    const {
      technologies = [],
      images = [],
      title,
      description,
      one,
      one_description,
      two,
      two_description,
      three,
      three_description,
      four,
      four_description,
      five,
      five_description,
      six,
      six_description,
      seven,
      seven_description,
      url,
    } = data;

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
    

    let content;
    if (url) {
      content = (
        <iframe
          title={title}
          src={url}
          width="500px"
          height="600px"
          style={{ border: "none", overflow: "auto" }}
        ></iframe>
      );
    } else if (images.length > 0) {
      console.log('this is working')
      const img = images.map((elem, i) => <div key={i} data-src={elem} />);
      console.log('****',img)     
      content = (
        <AwesomeSlider
          cssModule={[AwesomeSliderStyles, AwesomeSliderStyles2]}
          animation="scaleOutAnimation"
          className="slider-image"
        >
          {img}
        </AwesomeSlider>
      );
    } else {
      content = <p>No content available for this project.</p>;
    }


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
            <div>
              {content}
            </div>
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
              { one &&  <li><a href={one}> {one_description} </a></li> }
              { two && <li><a href={two}> {two_description} </a></li> }
              { three && <li><a href={three}> {three_description} </a></li> }
              { four &&  <li><a href={four}> {four_description} </a></li> }
              { five &&  <li><a href={five}> {five_description} </a></li> }
              { six && <li><a href={six}> {six_description} </a></li> }
              { seven && <li><a href={seven}> {seven_description} </a></li> }
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