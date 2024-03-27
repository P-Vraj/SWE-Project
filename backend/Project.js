const { v4 : uuidv4 } = require('uuid');
const User = require('./User');
const ProjectRepository = require('./ProjectRepository');

class Project {
  name = "";                // Project name
  project_id = 0;           // Unique project ID
  member_ids = [];          // Array of member IDs assigned to project
  description = "";         // Project description
  time_sheet = new Map();   // Map of <User_ID, [Array of clock in/out times]>

  constructor(name, description = "") {
    this.name = name;
    this.description = description;
    this.project_id = uuidv4();
  }

  /**
   * Add the project to the database
   */
  addProject() {
    return ProjectRepository.addProject(this);
  }

  /** 
   * Assigns the user ID of the member to the project if they are an employee/manager
   * @param {User} member - The user to add
  */
  assignMember(member) {
    if (member.user_type === "EMPLOYEE" || member.user_type === "MANAGER") {
      this.member_ids.push(member.user_id);
      return ProjectRepository.assignMember(this, member.user_id);
    }
  }
  /**
   * Removes an employee/manager from the project if assigned
  */
  removeMember(member) {
    const index = this.member_ids.indexOf(id => id === member.user_id);
    if (index != -1) {
      const result = ProjectRepository.removeMember(this, member.user_id);
      this.member_ids.splice(index, 1);
      return result;
    }
  }
  /**
   * Get an array of the clock-ins / clock-outs done by a member for this project
   * @returns {Array} all member contributions for the project, or [] if the member is not part of the project
  */
  getContributions(member) {
    if (this.time_sheet.has(member.user_id)) {
      return this.time_sheet.get(member.user_id);
    }
    return [];
  }
}

module.exports = Project;