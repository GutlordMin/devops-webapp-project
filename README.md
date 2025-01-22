Here's the updated **`README.md`** incorporating the **Documentation** section:

```markdown
# DevOps WebApp Project

This project demonstrates an end-to-end DevOps implementation for a web application.

## Project Features
- Git and GitHub for version control.
- CI/CD pipeline using GitHub Actions.
- Dockerized application for consistent deployment.
- Locally hosted using Docker Compose.

## Project Structure

```
devops-webapp-project/
│
├── .github/
│   └── workflows/
│       └── ci-cd-pipeline.yml       # GitHub Actions CI/CD pipeline configuration
├── docker-compose.yml               # Docker Compose configuration
├── Dockerfile                        # Dockerfile for building the app image
├── package.json                      # NPM project configuration
├── README.md                         # Project documentation (this file)
└── src/
    ├── index.js                      # Main application file
    └── ...                           # Other source code files
```

## 1. Documentation

The documentation provides a comprehensive guide on how to build, test, and deploy your **DevOps Web Application** using the tools and technologies configured in the project. It also explains how to run the application using Docker and describes the CI/CD pipeline for automation.

---

### 1.1 Project Setup and Prerequisites

Before starting, ensure you have the following tools installed:

1. **Git**: For version control.
2. **Node.js (v16 or higher)**: Required to run the application locally.
3. **Docker**: To containerize and run the application.
4. **Docker Compose**: For managing multi-container Docker applications.

You can download and install these tools as follows:
- **Git**: [Download Git](https://git-scm.com/)
- **Node.js**: [Download Node.js](https://nodejs.org/en/)
- **Docker**: [Download Docker](https://www.docker.com/products/docker-desktop)
- **Docker Compose**: Docker Compose comes pre-installed with Docker Desktop for Windows/macOS. For Linux, follow the [official installation guide](https://docs.docker.com/compose/install/).

---

### 1.2 Steps to Build, Test, and Deploy

This section explains how to get the application up and running locally or using Docker.

#### Step 1: Clone the Repository
To clone the repository to your local machine, run:
```bash
git clone https://github.com/your-username/devops-webapp-project.git
cd devops-webapp-project
```

#### Step 2: Install Dependencies

- **Using Node.js (Local Setup)**:
  After cloning the repository, install the necessary dependencies by running the following command:
  ```bash
  npm install
  ```

- **Using Docker (Containerized Setup)**:
  Alternatively, if you prefer using Docker, run the following command:
  ```bash
  docker-compose build
  ```

#### Step 3: Run the Application Locally

- **Using Node.js (Local Setup)**:
  After installing dependencies, you can start the application by running:
  ```bash
  npm start
  ```
  This will start the server at `http://localhost:3000`.

- **Using Docker (Containerized Setup)**:
  If you're using Docker, the application can be started by running:
  ```bash
  docker-compose up -d
  ```
  This will run the application in detached mode, and you can access it at `http://localhost:3000`.

#### Step 4: Run Tests

To run tests locally, use the following command:
```bash
npm test
```

For Dockerized environments, you can run tests inside the container:
```bash
docker-compose run app npm test
```

#### Step 5: Deploy the Application

- **Deploy Using Docker (Local Setup)**:
  To deploy the application locally, simply run:
  ```bash
  docker-compose up -d
  ```
  This will start the application in detached mode, ensuring it's running in the background.

- **Automated Deployment via CI/CD**:
  The project is set up with a CI/CD pipeline (as defined in `.github/workflows/ci-cd-pipeline.yml`), which automatically deploys the application after each push to the `main` branch or a successful pull request. The CI/CD pipeline includes:
  - **Build**: Checkout the repository, install dependencies, and build the application.
  - **Test**: Run tests in a Docker container.
  - **Deploy**: Deploy the application using Docker Compose.

---

### 1.3 CI/CD Pipeline

The CI/CD pipeline automates the process of building, testing, and deploying the application. Here’s an overview of the pipeline workflow:

1. **Build Stage**:
   - The pipeline checks out the code and installs dependencies.
   - The application is built using the `npm run build` command.

2. **Test Stage**:
   - After the build, the tests are executed to ensure code quality.
   - Tests run within a Docker container to ensure consistency across environments.

3. **Deploy Stage**:
   - After passing tests, the application is deployed using Docker Compose.

The pipeline is defined in `.github/workflows/ci-cd-pipeline.yml`.

Here is a simplified version of the CI/CD pipeline file:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install Dependencies
        run: npm install

      - name: Build Application
        run: npm run build

  test:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Set up Docker
        uses: docker/setup-buildx-action@v2

      - name: Build Docker Image
        run: docker-compose build

      - name: Run Tests
        run: docker-compose run app npm test

  deploy:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Set up Docker
        uses: docker/setup-buildx-action@v2

      - name: Deploy Application
        run: |
          docker-compose down --remove-orphans
          docker-compose up -d
```

This file defines the entire CI/CD pipeline, ensuring that every change is built, tested, and deployed automatically.

---

### 1.4 How to Run the Application Using Docker

The Docker setup ensures that the application runs in a containerized environment, making it easy to deploy across different machines without worrying about environment configuration.

- To run the application with Docker:
  1. **Build the Docker image**: 
     ```bash
     docker-compose build
     ```
  2. **Start the application**:
     ```bash
     docker-compose up -d
     ```
  3. **Access the application**: 
     Open a web browser and go to `http://localhost:3000` to see the application running.

- **Docker Compose Commands**:
  - **To stop the application**: 
    ```bash
    docker-compose down
    ```
  - **To view logs**: 
    ```bash
    docker-compose logs
    ```

---

### 1.5 Troubleshooting

If you encounter any issues, here are some common solutions:

- **Port Conflicts**: Ensure no other services are running on the same port (`3000` by default).
- **Missing Dependencies**: If `npm install` or `docker-compose build` fails, try deleting `node_modules` and `package-lock.json` (or the Docker cache) and reinstalling.
- **Docker Issues**: If the application doesn't run in Docker, make sure Docker and Docker Compose are properly installed and running.

For further assistance, refer to the `README.md` for troubleshooting tips and additional resources.
