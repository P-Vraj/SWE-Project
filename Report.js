class Report {
  user_id = 0;              // Unique user ID that the report is generated for
  project_id = 0;           // Unique project ID that the report is generated for

  constructor(user_id, project_id) {
    this.user_id = user_id;
    this.project_id = project_id;
  }
  /**
   * @todo Generate report based on user and their permissions
   * @todo Create a way to get user data from database from just the user ID
   */
  generate() {

  }
}