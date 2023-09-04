import React, { Component } from "react";
import { Modal, Select, Switch, Button, Tooltip } from 'antd';

const { Option } = Select;
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProjects: [], 
      isModalVisible: false, 
      isRedCircleHovered: false,
      switchValue: 'Background Summary',
      contactModalVisible: false,
      selectedContactType: '',
      email: '',
      name: '',
      additionalInfo: '',
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
    selectedKeys.forEach(selectedKey => {
        const addedProjects = new Set(); 
        for (let [projectName, skills] of Object.entries(this.props.projectData)) {
            if (skills.hasOwnProperty(selectedKey) && !addedProjects.has(projectName)) {
                selectedProjects.push({
                    key: selectedKey,
                    value: skills[selectedKey],
                    projectName: projectName
                });
                addedProjects.add(projectName);  
            }
        }
    });
    this.setState({ 
        selectedProjects, 
        isModalVisible: selectedProjects.length > 0 
    }, () => {
        console.log("Updated selectedProjects:", this.state.selectedProjects);
    });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  }
  getUniqueProjectKeys = () => {
    const allKeys = [];
    for (const [projectName, projectObj] of Object.entries(this.props.projectData)) {
        allKeys.push(...Object.keys(projectObj));
    }
    return [...new Set(allKeys)];
  }

  showContactModal = (contactType) => {
    this.setState({ 
        contactModalVisible: true,
        selectedContactType: contactType,
    });
  };

  closeContactModal = () => {
    this.setState({ contactModalVisible: false });
  };

  handleSend = async () => {
    console.log('Sending data:', this.state);
    if (!this.state.email || !this.state.name) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const data = {
      email: this.state.email,
      name: this.state.name,
      additionalInfo: this.state.additionalInfo,
      contactReason: this.state.selectedContactType,
    };
  
    try {
      const response = await fetch('https://emmanuelsibanda.vercel.app/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
  
      if (result.success) {
        alert('Email sent successfully.');
        this.closeContactModal();
        this.setState({ email: '', name: '', additionalInfo: '' }); // Reset form fields
      } else {
        alert('Error sending email.');
      }
    } catch (error) {
      alert('Failed to send the email due to a network error.');
    }
  }
  

  render() {
    if (this.props.sharedBasicInfo) {
      var profilepic = this.props.sharedBasicInfo.image;
    }
    if (this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.about;
      var hello = this.props.resumeBasicInfo.description_header;
      var about = this.props.resumeBasicInfo.description;
      var summary = this.props.resumeBasicInfo.highlights;
    }
    
    let displayContent;
    if (this.state.switchValue === 'Background Summary') {
      displayContent = about;
    } 
    else {
      displayContent = (
        <ul>
            {summary.map((item, index) => (
              <li key={index} style={{ listStyleType: 'none', position: 'relative' }}>
                    <span className="rotatingBullet"></span>
                    {item}
                </li>
            ))}
        </ul>
      );
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
                {/* <button
              className="e2e-test-btn"
              onClick={this.runSeleniumScript}
              title="This will run an end-to-end test simulating a user's journey"
            >
              Visual End to End Testing
            </button> */}
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
                    <Switch
                      className="float-right" 
                      checkedChildren="Background Summary"
                      unCheckedChildren="Highlights"
                      defaultChecked
                      onChange={(checked) => {
                          this.setState({ switchValue: checked ? 'Background Summary' : 'Highlights' });
                    }}
                    />
                    <br />
                    <br />
                    {displayContent}
                    <br />
                    <br />
                      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                        <button className="transparent-button" onClick={() => this.showContactModal('I am hiring')}>I am hiring</button>
                        <button className="transparent-button" onClick={() => this.showContactModal('Hiring a freelancer')}>Hiring a freelancer</button>
                        <button className="transparent-button" onClick={() => this.showContactModal('Building with you')}>Building with you</button>
                        <button className="transparent-button" onClick={() => this.showContactModal('This is a referral')}>This is a referral</button>
                      </div>
                  </div>
                  <Modal
                    title="Contact Form"
                    visible={this.state.contactModalVisible}
                    onCancel={this.closeContactModal}
                    footer={
                      <div style={{ textAlign: 'center'}}>
                        <button className="transparent-button-center" onClick={this.handleSend}>Send</button>
                      </div>
                    }
                  >
                  <div className="contact-modal-container">
                    <div className="contact-modal-field">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}                          
                            required
                        />
                    </div>
                    <div className="contact-modal-field">
                        <label>Name:</label>
                        <input 
                            type="text" 
                            placeholder="Enter your name"
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}                           
                            minLength="3"
                            required
                        />
                    </div>
                    <div className="contact-modal-field">
                        <label>Any additional info:</label>
                        <textarea placeholder="Any additional info..."
                          value={this.state.additionalInfo}
                          onChange={(e) => this.setState({ additionalInfo: e.target.value })}                        
                        ></textarea>
                    </div>
                    <p>Your email will be pre-populated based on your selection. I will reach out to you as soon as I can.</p>
                    </div>
                  </Modal>
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
            onOpen={() => this.setState({ displayedProjects: this.state.selectedProjects })}
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