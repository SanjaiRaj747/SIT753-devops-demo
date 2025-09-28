pipeline {
    agent any

    environment {
        // This is a common practice to make npm and other tools more accessible in the path
        PATH = "${tool 'NodeJS 18.17.1'}/bin:${env.PATH}"
    }

    // UPDATED: Changed the names in the tools section for better compatibility
    tools {
        // The name 'NodeJS 18.17.1' MUST match the name in Manage Jenkins > Tools > NodeJS Installations
        nodejs 'NodeJS 18.17.1' 
        // Changed from 'sonarScanner' to 'sonarRunner' to match Jenkins' plugin tool ID
        sonarRunner 'SonarQube Scanner' 
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
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    bat 'npm run lint'
                }

                // Run SonarQube analysis
                // 'MySonar' MUST match the name in Manage Jenkins > System > SonarQube Servers
                withSonarQubeEnv('MySonar') {
                    // sonar-scanner is the command run by the 'SonarQube Scanner' tool installed above
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
                    // Note: You must have 'curl' installed and available in your Windows environment's PATH for this to work.
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