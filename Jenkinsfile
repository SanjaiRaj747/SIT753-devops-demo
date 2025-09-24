pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Building the application...'
                bat 'npm install'
                bat 'docker build -t sample-node-app .'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'npm test'
            }
        }
        stage('Code Quality') {
            steps {
                echo 'Running code quality checks...'
                bat 'npm run lint || true'
            }
        }
        stage('Security') {
            steps {
                echo 'Scanning for vulnerabilities...'
                bat 'npm audit --json 1>audit-output.json || true'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                bat 'docker-compose up -d --build'
                // Pause for 5 seconds to ensure the application is ready
                sleep 5
            }
        }
        stage('Release') {
            when {
                // Only run the release stage on the main branch
                branch 'main'
            }
            steps {
                echo 'Creating a release...'
                bat 'echo Releasing new version...'
            }
        }
        stage('Monitoring') {
            steps {
                echo 'Monitoring the application...'
            }
        }
    }
}