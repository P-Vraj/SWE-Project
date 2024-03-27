# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup Instructions

### Initial Setup

Download and install Node.js and npm from [the npm Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Download and install MySQL onto your machine from [MySQL Download](https://dev.mysql.com/downloads/mysql/)

***When creating a database, keep the username as 'root' (default behavior) and set the password to 'password'***

* If the password is set to another value, you can change it to 'password' from this [How to Reset the Root Password article](https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html)

### Dependency Installation

Once the project files have been downloaded, run this command ***within the project folder*** to install all dependencies:

```shell
npm install
```

### Database Setup

If you have an error regarding authentication protocols, run these commands:

```shell
ALTER USER 'root@localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
```

Otherwise try to run these commands:

```shell
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
```

If the issue persists, visit this [StackOverflow link](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)

### Creating the Database Tables

Below are the commands needed to create the database and tables before running the project:

```shell
mysql -u root -p
Enter password: password

CREATE DATABASE IF NOT EXISTS tracker_data;
USE tracker_data;
CREATE TABLE IF NOT EXISTS users (
    user_id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_type ENUM('EMPLOYEE', 'MANAGER', 'ADMIN') NOT NULL
);
CREATE TABLE IF NOT EXISTS projects (
    project_id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
CREATE TABLE IF NOT EXISTS user_project (
    user_id CHAR(36) NOT NULL,
    project_id CHAR(36) NOT NULL,
    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS times (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    project_id CHAR(36) NOT NULL,
    event_type ENUM('CLOCK IN', 'CLOCK OUT') NOT NULL,
    event_time TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS accounts (
    username_hash BINARY(32) NOT NULL,
    password_hash BINARY(32) NOT NULL,
    user_id CHAR(36) NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

```

### Running the Program

Go into the parent directory and run ``npm start`` to run the client (React frontend)

Then, go into the ``backend`` directory and run ``npm start`` as well to run the server (Node.js backend)

***Alternatively***, you can go the parent directory and run ``npm run dev`` to run both the client and the server concurrently.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)