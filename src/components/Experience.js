import React, { Component } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    };
  }
  handleMouseOver = () => {
    this.setState({ isHovered: true });
  }
  
  handleMouseOut = () => {
    this.setState({ isHovered: false });
  }
    
  render() {
    if (this.props.resumeExperience && this.props.resumeBasicInfo && this.props.resumeQualifications) {
      var sectionName = this.props.resumeBasicInfo.section_name.experience;
      var work = this.state.isHovered ? this.props.resumeQualifications.map((qualification, i) => (
        <VerticalTimelineElement
          key={i}
          className="vertical-timeline-element--work experience-box"
          date={qualification.year} 
          iconStyle={{
            background: "#AE944F",
            color: "#fff",
            textAlign: "center",
          }}
          icon={<i className="fas fa-graduation-cap experience-icon"></i>}
          >
            <h3 
              className="vertical-timeline-element-title"
              style={{ textAlign: "left" }}
            >
              {qualification.studied}
            </h3>
            <h4
              className="vertical-timeline-element-subtitle"
              style={{ textAlign: "left" }}
            >
              {qualification.institution}
            </h4>
            <div>{qualification.status}</div>
          </VerticalTimelineElement> 
      )):      
      this.props.resumeExperience.map((work, i) => {
        const technologies = work.technologies;
        const mainTechnologies = work.mainTech;
        const description = work.description;

        var mainTech = mainTechnologies.map((technology, i) => {
          return (
            <Badge pill className="main-badge mr-2 mb-2" key={i}>
              {technology}
            </Badge>
          );
        });
        var tech = technologies.map((technology, i) => {
          return (
            <Badge pill className="experience-badge mr-2 mb-2" key={i}>
              {technology}
            </Badge>
          );
        });
        return (
          <VerticalTimelineElement
            className={`vertical-timeline-element--work experience-box ${this.state.isHovered && i > 2 ? 'hide-experience' : ''}`}
            date={work.years}
            iconStyle={{
              background: "#AE944F",
              color: "#fff",
              textAlign: "center",
            }}
            icon={<i className="fab fa-angular experience-icon"></i>}
            key={i}
          >
            <div style={{ textAlign: "left", marginBottom: "4px" }}>
              {mainTech}
            </div>

            <h3
              className="vertical-timeline-element-title"
              style={{ textAlign: "left" }}
            >
              {work.title}
            </h3>
            <h4
              className="vertical-timeline-element-subtitle"
              style={{ textAlign: "left" }}
            >
              {work.company}
            </h4>
            <div>{description}</div>
            <div style={{ textAlign: "left", marginTop: "15px" }}>{tech}</div>
          </VerticalTimelineElement>
        );
      });
    }

    return (
      <section id="resume" className="pb-5">
        <div className="col-md-12 mx-auto">
          <div className="col-md-12">
            <h1 className="section-title" style={{ color: "black" }}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}>            
              <span className="text-experience" style={{ textAlign: "center" }}>
                {sectionName}
              </span>
              <span className="text-qualifications" style={{ textAlign: "center" }}>
                Qualifications
              </span>
            </h1>
          </div>
        </div>
        <div className="col-md-8 mx-auto">
          <VerticalTimeline>
            {work}
            <VerticalTimelineElement
              iconStyle={{
                background: "#AE944F",
                color: "#fff",
                textAlign: "center",
              }}
              icon={
                <i className="fas fa-hourglass-start mx-auto experience-icon"></i>
              }
            />
          </VerticalTimeline>
        </div>
      </section>
    );
  }
}

export default Experience;
