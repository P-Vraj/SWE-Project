const { v4 : uuidv4 } = require('uuid');
const mysql = require('mysql');
const config = require('./config');

class User {
  name = "";                // User name
  user_id = 0;              // Unique user ID
  user_type = "";           // User type, one of {Employee, Manager, Admin}
  time_sheet = new Map();   // Map of <Project_ID, [Array of clock in/out times]>

  /**
   * Constructs a user given a name and type, and creates a unique user id for them
   * @param {string} name - The name of the user
   * @param {string} user_type - One of { 'EMPLOYEE', 'MANAGER', 'ADMIN' }
   */
  constructor(name, user_type) {
    this.name = name;
    this.user_type = user_type;
    this.user_id = uuidv4();
  }

  /** 
   * 
  */
  logTime(project_id) {
    // Get project by project_id
    const current_unix_time = new Date().getTime();
    this.time_sheet.set(project_id, current_unix_time);
  }
  /**
   * 
   */
  addUser() {
    UserRepository.addUser(this);
  }
  /**
   * Deletes the user with the given user id from the database
   */
  static deleteUser(user_id) {
    UserRepository.deleteUser(user_id);
  }
}

class UserRepository {
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
  static async getProjects(user) {
    const db = this.getConnection();
    const command = `SELECT * FROM user_project WHERE user_id = '${user.user_id}'`;
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
  static async addUser(user) {
    const db = this.getConnection();
    const command = `INSERT INTO users (user_id, name, user_type) 
                     VALUES ('${user.user_id}', '${user.name}', '${user.user_type}')`;
    // db.query(command, (err, result) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log(result);
    //   return { success: true, message: "User added successfully" };
    // });
    try {
      const result = await this.queryDatabase(db, command);
      console.log(result);
      return { success: true, message: "User added successfully" };
    } catch (err) {
      console.error(err);
    }
  }
  static async deleteUser(user_id) {
    const db = this.getConnection();
    const command = `DELETE FROM users WHERE user_id = '${user_id}'`;
    // db.query(command, (err, result) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log(result);
    //   return { success: true, message: "User deleted successfully" };
    // });
    try {
      const result = await this.queryDatabase(db, command);
      console.log(result);
      return { success: true, message: "User deleted successfully" };
    } catch (err) {
      console.error(err);
    }
  }
};

module.exports = User;