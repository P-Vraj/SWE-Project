const { v4 : uuidv4 } = require('uuid');
const mysql = require('mysql');
const config = require('./config');

const User = require('./User');

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
    ProjectRepository.addProject(this);
  }

  /** 
   * Assigns the user ID of the member to the project if they are an employee/manager
   * @param {User} member - The user to add
  */
  assignMember(member) {
    if (member.user_type === "EMPLOYEE" || member.user_type === "MANAGER") {
      this.member_ids.push(member.user_id);
      ProjectRepository.assignMember(this, member.user_id);
    }
  }
  /**
   * Removes an employee/manager from the project if assigned
  */
  removeMember(member) {
    const index = this.member_ids.indexOf(id => id === member.user_id);
    if (index != -1) {
      ProjectRepository.removeMember(this, member.user_id);
      this.member_ids.splice(index, 1);
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

class ProjectRepository {
  static getConnection() {
    return mysql.createConnection(config);
  }
  static queryDatabase(db, command) {
    return new Promise((resolve, reject) => {
      db.query(command, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  static async getMembers(project) {
    const db = this.getConnection();
    const command = `SELECT * FROM user_project WHERE project_id = '${project.project_id}'`;
    // db.query(command, (err, result) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log(result);
    //   return result;
    // });
    try {
      const result = await this.queryDatabase(db, command);
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
  static async addProject(project) {
    const db = this.getConnection();
    const command = `INSERT INTO projects (project_id, name, description) 
                     VALUES ('${project.project_id}', '${project.name}', '${project.description}')`;
    // db.query(command, (err, result) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log(result);
    //   return { success: true, message: "Project added successfully" };
    // });
    try {
      const result = await this.queryDatabase(db, command);
      console.log(result);
      return { success: true, message: "Project added successfully" };
    } catch (err) {
      console.error(err);
    }
  }
  static async assignMember(project, user_id) {
    const db = this.getConnection();
    const command = `INSERT INTO user_project (user_id, project_id)
                     VALUES ('${user_id}', '${project.project_id}')`;
    // db.query(command, (err, result) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log(result);
    //   return { success: true, message: "User assigned successfully" };
    // });
    try {
      const result = await this.queryDatabase(db, command);
      console.log(result);
      return { success: true, message: "User assigned successfully" };
    } catch (err) {
      console.error(err);
    }
  }
  static async removeMember(project, user_id) {
    const db = this.getConnection();
    const command = `DELETE FROM user_project 
                     WHERE user_id = '${user_id}' AND project_id = '${project.project_id}'`;
    // db.query(command, (err, result) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log(result);
    //   return { success: true, message: "User removed successfully" };
    // });
    try {
      const result = await this.queryDatabase(db, command);
      console.log(result);
      return { success: true, message: "User removed successfully" };
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Project;