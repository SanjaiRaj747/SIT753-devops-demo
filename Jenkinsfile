pipeline {
    agent any

    environment {
        // This is a common practice to make npm and other tools more accessible in the path
        PATH = "${tool 'NodeJS 18.17.1'}/bin:${env.PATH}"
    }

    // You must have your SonarQube token as a Jenkins secret with the ID 'sonarqube-token'
    // This is not part of your GitHub repository for security reasons
    tools {
        nodejs 'node'
        // 'SonarQube Scanner' is the name you gave to the tool in Manage Jenkins -> Tools
        // You MUST configure this for this stage to work
        sonarScanner 'SonarQube Scanner'
    }

    stages {
        stage('Checkout') {
            steps {
                // Get the source code from the repository
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                // Install dependencies
                bat 'npm install'
                // Build the Docker image
                bat 'docker build -t sample-node-app .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Run the Jest tests
                bat 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running code quality checks...'
                // Run ESLint and continue even if it fails.
                // The `catchError` block prevents the pipeline from failing immediately.
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    bat 'npm run lint'
                }

                // Run SonarQube analysis
                // 'MySonar' is the name you gave your SonarQube server in Jenkins configuration
                withSonarQubeEnv('MySonar') {
                    bat 'sonar-scanner -Dsonar.projectKey=sample-node-app -Dsonar.sources=.'
                }
            }
        }

        stage('Security') {
            steps {
                echo 'Running security checks...'
                // The `catchError` block will allow the pipeline to proceed even if vulnerabilities are found
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    bat 'npm audit --json > audit-output.json'
                    bat 'trivy image sample-node-app:latest'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Use Docker Compose to stop any existing containers and start the new ones
                bat 'docker-compose down'
                bat 'docker-compose up -d'
            }
        }

        stage('Release') {
            steps {
                echo 'Tagging a new release...'
                script {
                    def version = "1.0.${env.BUILD_NUMBER}"
                    // Create and push the Git tag
                    bat "git tag -a v${version} -m 'Release version ${version}'"
                    bat "git push origin v${version}"
                }
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Checking application health...'
                script {
                    // Check the health endpoint and store the response code
                    def status = bat(script: "curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/health", returnStdout: true).trim()

                    // If the status is not 200, trigger an alert
                    if (status != '200') {
                        error("Health check failed with status ${status} - ALERT TRIGGERED")
                    } else {
                        echo "App is healthy"
                    }
                }
            }
        }
    }
}