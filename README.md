
# DevOps WebApp Project

This project demonstrates an end-to-end DevOps implementation for a web application.

## Project Features
- Git and GitHub for version control.
- CI/CD pipeline using GitHub Actions.
- Dockerized application for consistent deployment.
- Locally hosted using Docker Compose.
- **New**: Final Assessment page with an overview of our Software Engineering project.

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

---

### 1.6 Monitoring with Prometheus and Grafana

In the future, we plan to add **Prometheus** and **Grafana** for basic monitoring of the application. These tools will allow us to track performance metrics and visualize the health and status of the application.

#### Prometheus: Monitoring and Alerting

**Prometheus** is an open-source system monitoring and alerting toolkit. It is designed for reliability and scalability, making it perfect for monitoring applications and services in production. Prometheus can collect metrics such as CPU usage, memory consumption, request rates, error rates, and more, from your application containers.

Prometheus works by scraping metrics from targets at specified intervals. These metrics are exposed in a special format (e.g., `/metrics` endpoint) by your application. Prometheus then stores this data and allows you to query it for monitoring and alerting purposes.

- **Installation and Setup**: 
  For setting up Prometheus, you would configure Prometheus to scrape metrics from your application's endpoint.
  
  Example `prometheus.yml` configuration to scrape metrics from your application:
  ```yaml
  scrape_configs:
    - job_name: 'webapp'
      static_configs:
        - targets: ['webapp:3000']
  ```

  - **Setting Up in Docker**: 
    You can add Prometheus as a service in your `docker-compose.yml` file.

#### Grafana: Data Visualization

**Grafana** is a powerful open-source data visualization tool that works seamlessly with Prometheus. It provides a user-friendly interface for displaying Prometheus metrics and creating dashboards to monitor the performance and health of your application.

With Grafana, you can set up custom dashboards to track key metrics such as:

- CPU and memory usage
- Response times for HTTP requests
- Error rates
- Application performance metrics

Grafana queries Prometheus for data and then visualizes it in customizable charts, graphs, and other visualization formats.

- **Installation and Setup**:
  To set up Grafana, you can add it as a service in your `docker-compose.yml` file and point it to your Prometheus instance.

  Example `docker-compose.yml` snippet to include Grafana:
  ```yaml
  version: '3.8'

  services:
    prometheus:
      image: prom/prometheus
      container_name: prometheus
      volumes:
        - ./prometheus.yml:/etc/prometheus/prometheus.yml
      ports:
        - "9090:9090"
      networks:
        - monitoring

    grafana:
      image: grafana/grafana
      container_name: grafana
      environment:
        - GF_SECURITY_ADMIN_PASSWORD=admin
      ports:
        - "3001:3000"
      depends_on:
        - prometheus
      networks:
        - monitoring

  networks:
    monitoring:
      driver: bridge
  ```

- **Accessing Grafana**: 
  Once Grafana is running, you can access the Grafana dashboard at `http://localhost:3001`. Log in using the default username (`admin`) and password (`admin`), and then configure Prometheus as your data source in Grafana.

#### Basic Metrics to Monitor

With Prometheus and Grafana, we can track the following key metrics:

1. **Application Metrics**:
   - HTTP request rate
   - Response times
   - Error rate (4xx and 5xx status codes)

2. **System Metrics**:
   - CPU usage
   - Memory usage
   - Disk I/O
   - Network traffic

3. **Docker Container Metrics**:
   - Container memory and CPU usage
   - Container restart count

#### Setting Up Monitoring (Future Steps)

As part of future improvements, we will integrate Prometheus and Grafana into this project for enhanced monitoring. This setup will enable real-time tracking of application performance and help in proactive issue detection and resolution.

To begin using Prometheus and Grafana for monitoring:

1. **Add Prometheus and Grafana to your Docker setup** (as outlined above).
2. **Configure Prometheus to scrape metrics** from the application.
3. **Create Grafana dashboards** to visualize the metrics collected by Prometheus.

---

For further assistance, refer to the `README.md` for troubleshooting tips and additional resources.
