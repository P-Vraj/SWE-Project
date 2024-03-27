const { v4 : uuidv4 } = require('uuid');
const UserRepository = require('./UserRepository');

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
    return UserRepository.addUser(this);
  }
  /**
   * Deletes the user with the given user id from the database
   */
  static deleteUser(user_id) {
    return UserRepository.deleteUser(user_id);
  }
}

module.exports = User;