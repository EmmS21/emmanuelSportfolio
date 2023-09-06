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
      selectedProject: null,
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

  handleTechChange = (values) => {
    this.setState({ selectedTechnologies: values });
  };

  handleProjectClick = (project) => {
    this.setState({ detailsModalShow: true, deps: project });
  };

  render() {
    let projectsDisplay;
    if (this.props.resumeProjects && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.projects;
      projectsDisplay = this.props.resumeProjects
        .filter(project => {
          if (this.state.selectedTechnologies.length === 0) return true;
            return this.state.selectedTechnologies.every(selectedTech => 
          project.technologies.some(tech => tech.name === selectedTech)
          );
        })
    
        .map((projects) => {
          return (
            <div
              className="col-sm-12 col-md-6 col-lg-4 project-box"
              key={projects.title}
              style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
            >
              <span className="portfolio-item d-block">
                <div 
                  className="foto" 
                  onClick={() => {
                  this.handleProjectClick(projects)
                  }}
                  >
                  <div className="project-image-container">
                    <img
                      src={projects.images[0]}
                      alt="projectImages"
                      height="100%"
                      style={{ marginBottom: 0, paddingBottom: 0, position: 'relative', objectFit: 'cover', flex: '1 1 auto' }}
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
              onChange={this.handleTechChange}
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
            onHide={() => [
              this.setState({
                detailsModalShow: false,
                isPEMDASCalculatorSelected: false,
              })
            ]}
            data={this.state.deps}
            isPEMDASCalculatorSelected={this.state.isPEMDASCalculatorSelected}
          />
        </div>
      </section>
    );
  }
}

export default Projects;
