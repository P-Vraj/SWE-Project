const mysql = require('mysql');
const config = require('./config');

class UserRepository {
  static getConnection() {
    return mysql.createConnection(config);
  }
  
  static async getProjects(user) {
    const db = this.getConnection();
    const command = `SELECT * FROM user_project WHERE user_id = '${user.user_id}'`;
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
  static async addUser(user) {
    const db = this.getConnection();
    const command = `INSERT INTO users (user_id, name, user_type) 
                     VALUES ('${user.user_id}', '${user.name}', '${user.user_type}')`;
    return new Promise((resolve, reject) => {
      db.query(command, (err, result) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.log(result);
        return resolve(result);
        // return resolve({ success: true, message: "User added successfully" });
      });
    });
  }
  static async deleteUser(user_id) {
    const db = this.getConnection();
    const command = `DELETE FROM users WHERE user_id = '${user_id}'`;
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
};

module.exports = UserRepository;