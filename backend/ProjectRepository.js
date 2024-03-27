const mysql = require('mysql');
const config = require('./config');

class ProjectRepository {
  static getConnection() {
    return mysql.createConnection(config);
  }

  static async getMembers(project) {
    const db = this.getConnection();
    const command = `SELECT * FROM user_project WHERE project_id = '${project.project_id}'`;
    return new Promise((resolve, reject) => {
      db.query(command, (err, result) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.log(result);
        return resolve(result);
      });
    });
  }
  static async addProject(project) {
    const db = this.getConnection();
    const command = `INSERT INTO projects (project_id, name, description) 
                     VALUES ('${project.project_id}', '${project.name}', '${project.description}')`;
    return new Promise((resolve, reject) => {
      db.query(command, (err, result) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.log(result);
        return resolve(result);
        // return resolve({ success: true, message: "Project added successfully" });
      });
    });
  }
  static async assignMember(project, user_id) {
    const db = this.getConnection();
    const command = `INSERT INTO user_project (user_id, project_id)
                     VALUES ('${user_id}', '${project.project_id}')`;
    return new Promise((resolve, reject) => {
      db.query(command, (err, result) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.log(result);
        return resolve(result);
        // return resolve({ success: true, message: "User assigned successfully" });
      });
    });
  }
  static async removeMember(project, user_id) {
    const db = this.getConnection();
    const command = `DELETE FROM user_project 
                     WHERE user_id = '${user_id}' AND project_id = '${project.project_id}'`;
    return new Promise((resolve, reject) => {
      db.query(command, (err, result) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.log(result);
        return resolve(result);
        // return resolve({ success: true, message: "User removed successfully" });
      });
    });
  }
}

module.exports = ProjectRepository;