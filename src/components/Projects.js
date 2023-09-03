import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { Select } from 'antd';

const { Option } = Select;

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
      selectedTechnologies: [],
    };
  }

  extractUniqueTechnologies = () => {
    const technologiesSet = new Set();
    if (this.props.resumeProjects) {
      this.props.resumeProjects.forEach(project => {
        if (project.technologies) {
          project.technologies.forEach(tech => {
            technologiesSet.add(tech.name);
          });
        }
      });
    }
    return [...technologiesSet];
  };

  render() {
    console.log("Projects props:", this.props);
    console.log("Unique technologies:", this.extractUniqueTechnologies());

    let detailsModalShow = (data) => {
      this.setState({ detailsModalShow: true, deps: data });
    };

    let detailsModalClose = () => this.setState({ detailsModalShow: false });

    const handleTechChange = (values) => {
      this.setState({ selectedTechnologies: values });
    };

    let projectsDisplay;
    if (this.props.resumeProjects && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.projects;
      projectsDisplay = this.props.resumeProjects
        .filter(project => {
          if (this.state.selectedTechnologies.length === 0) return true;
          return project.technologies.some(tech => this.state.selectedTechnologies.includes(tech.name));
        })
        .map(function (projects) {
          return (
            <div
              className="col-sm-12 col-md-6 col-lg-4"
              key={projects.title}
              style={{ cursor: "pointer" }}
            >
              <span className="portfolio-item d-block">
                <div className="foto" onClick={() => detailsModalShow(projects)}>
                  <div>
                    <img
                      src={projects.images[0]}
                      alt="projectImages"
                      height="230"
                      style={{ marginBottom: 0, paddingBottom: 0, position: 'relative' }}
                    />
                    <span className="project-date">{projects.startDate}</span>
                    <br />
                    <p className="project-title-settings mt-3">
                      {projects.title}
                    </p>
                  </div>
                </div>
              </span>
            </div>
          );
        });
    }

    return (
      <section id="portfolio">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="col-md-12 mx-auto">
          <div className="filter-container">
            <label>Select Technologies:</label>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Filter by technologies"
              onChange={handleTechChange}
            >
              {this.extractUniqueTechnologies().map(tech => (
                <Option key={tech} value={tech}>
                  {tech}
                </Option>
              ))}
            </Select>
            </div>
            <div className="row mx-auto">{projectsDisplay}</div>
          </div>
          <ProjectDetailsModal
            show={this.state.detailsModalShow}
            onHide={detailsModalClose}
            data={this.state.deps}
          />
        </div>
      </section>
    );
  }
}

export default Projects;
