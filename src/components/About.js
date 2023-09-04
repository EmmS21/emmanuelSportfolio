import React, { Component } from "react";
import { Modal, Select } from 'antd';

const { Option } = Select;
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProjects: [], 
      isModalVisible: false, 
      isRedCircleHovered: false
    };
    this.closeModal = this.closeModal.bind(this); 
  }
  countDown = () => {
    let secondsToGo = 10; 
    const instance = Modal.success({
      title: 'End to End Testing',
      content: `This will open up a new browser controlled by Selenium and carry out end to end testing for the Project; Job Assistant. Please do not interact with that page during this time. You will see a summary of the test results upon completion.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `This will open up a new browser controlled by Selenium and carry out end to end testing for the Project; Job Assistant. Please do not interact with that page during this time. You will see a summary of the test results upon completion.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
    }, secondsToGo * 1000);
  };

  runSeleniumScript = async () => {
    this.countDown();
    try {
      const response = await fetch('http://localhost:5001/api/runSelenium');
      const data = await response.text();
      if (response.ok) {
        console.log('Selenium script executed successfully:', data);
        alert(data);
      } else {
        console.error('Error executing Selenium script:', data);
        alert('Failed to execute the Selenium script.');
      }
    } catch (error) {
      console.error("Error fetching the endpoint:", error.message);
      alert('Failed to execute the Selenium script due to a network error.');
    }
  };
  handleDropdownChange = selectedKeys => {
    const selectedProjects = [];
    
    for (const [projectName, projectObj] of Object.entries(this.props.projectData)) {
      for (const key of selectedKeys) {
        if (projectObj.hasOwnProperty(key)) {
          selectedProjects.push({
            key: key,
            value: projectObj[key],
            projectName: projectName
          });
        }
      }
    }
  
    // Check if selectedProjects is not empty before showing modal
    if (selectedProjects.length > 0) {
      this.setState({ selectedProjects, isModalVisible: true });
    } else {
      this.setState({ selectedProjects, isModalVisible: false });
    }
  }
  


  closeModal = () => {
    this.setState({ isModalVisible: false });
  }
  getUniqueProjectKeys = () => {
    const allKeys = [];
    for (const [projectName, projectObj] of Object.entries(this.props.projectData)) {
        allKeys.push(...Object.keys(projectObj));
    }
    // Get unique keys
    return [...new Set(allKeys)];
}


  render() {
    if (this.props.sharedBasicInfo) {
      var profilepic = this.props.sharedBasicInfo.image;
    }
    if (this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.about;
      var hello = this.props.resumeBasicInfo.description_header;
      var about = this.props.resumeBasicInfo.description;
      var contact_me =  this.props.resumeBasicInfo.contact_me;
    }

    return (
      <section id="about">
        <div className="col-md-12">
          <h1 style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="row center mx-auto mb-5">
            <div className="col-md-4 mb-5 center">
              <div className="polaroid">
                <div className="picture-button-container">
                <span style={{ cursor: "auto" }}>
                  <img
                    height="250px"
                    src={profilepic}
                    alt="Avatar placeholder"
                  />
                </span>
                <button
              className="e2e-test-btn"
              onClick={this.runSeleniumScript}
              title="This will run an end-to-end test simulating a user's journey"
            >
              Visual End to End Testing
            </button>
            </div>


              </div>
            </div>

            <div className="col-md-8 center">
              <div className="col-md-10">
                <div className="card">
                  <div className="card-header">
                    <span
                      className="iconify"
                      data-icon="emojione:red-circle"
                      data-inline="false"
                    ></span>{" "}
                    &nbsp;{" "}
                    <span
                      className="iconify"
                      data-icon="twemoji:yellow-circle"
                      data-inline="false"
                    ></span>{" "}
                    &nbsp;{" "}
                    <span
                      className="iconify"
                      data-icon="twemoji:green-circle"
                      data-inline="false"
                    ></span>
                  </div>
                  <div
                    className="card-body font-trebuchet text-justify ml-3 mr-3"
                    style={{
                      height: "auto",
                      fontSize: "132%",
                      lineHeight: "200%",
                    }}
                  >
                    <br />
                    <span className="wave">{hello} :) </span>
                    <br />
                    <br />
                    {about}
                    <br />
                    <br />
                    <strong>Contact me: </strong><strong>{ contact_me }</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="select-container">
          <label className="flashing-label">Select Job Responsibilities and get a summary of proficiencies shown in existing projects</label>
          <Select
              mode="multiple"
              showSearch={false}
              placeholder="Select Job Responsibilities"
              onChange={this.handleDropdownChange}
              style={{ width: '100%' }}
            >
              {this.getUniqueProjectKeys().map(key => (
                <Option key={key} value={key}>{key}</Option>
              ))}
            </Select>
        </div>
        <Modal
            title="Proficiency based on project"
            visible={this.state.isModalVisible}
            onCancel={this.closeModal}
            footer={null}
        >
            {this.state.selectedProjects.map(project => (
                <div key={project.key}>
                    <strong>{project.key}:</strong> {project.value} 
                    <br/>
                    <small>Project: {project.projectName}</small>
                    <br/><br/>
                </div>
            ))}
        </Modal>
      </section>
    );
  }
}
export default About;