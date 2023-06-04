# Node.js Installation Guide

Follow these simple steps to install Node.js on your computer.

## Prerequisites

- **Operating System:** Node.js is compatible with Windows, macOS, and Linux.
- **Internet Connection:** Ensure you have an active internet connection to download the necessary files.

## Installation Steps

1. **Windows Users:**

   - Visit the official Node.js website: [nodejs.org](https://nodejs.org).
   - Click on the "Downloads" button.
   - Download the recommended LTS (Long-Term Support) version.
   - Double-click the downloaded installer and follow the prompts.
   - Restart your computer if necessary.

2. **macOS Users:**

   - Visit the official Node.js website: [nodejs.org](https://nodejs.org).
   - Click on the "Downloads" button.
   - Download the recommended LTS (Long-Term Support) version.
   - Double-click the downloaded package and follow the prompts.
   - Open Terminal and type `node -v` to verify the installation.

3. **Linux Users:**

   - Open Terminal.
   - Run the following commands:

     ```bash
     sudo apt update
     sudo apt install nodejs
     ```

   - To verify the installation, type `node -v` in the Terminal.

## Verification

To ensure Node.js is installed correctly, open your command prompt or terminal and execute the following command:

```bash
node -v
```

## Getting Started

After installing Node.js and cloning the repository on your machine, follow these steps to set up and run the project:

1. Open a terminal or command prompt and navigate to the project directory.

2. Run the following command to install the project dependencies:

   ```bash
   npm install
   ```

   This command will read the package.json file and install all the required packages and dependencies for the project.

3. Once the installation is complete, you need to configure the `db.js` file with your local MySQL username, password, and database name. Locate the `db.js` file in the project directory and update the appropriate fields with your MySQL configuration.

4. After configuring the database, you can start the server by running the following command:

```bash
 npm start
```

This command will start the server, and it will listen on port 3000 by default.

> **Note:** If port 3000 is already occupied by another project, you have two options:
>
> - Stop the other project running on Port 3000 and start this project.
> - Change the port number by modifying the `app.js` file. Locate the `app.js` file in the project directory and find the line of code where the server is listening on port 3000. Modify the port number to an available port of your choice.

5. Once the server is running, you can access the project by opening a web browser and navigating to [http://localhost:3000](http://localhost:3000).
