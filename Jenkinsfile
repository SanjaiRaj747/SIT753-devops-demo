pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Build') {
      steps {
        bat 'npm install'
        bat 'docker build -t sample-node-app .'
      }
    }
    stage('Test') {
      steps { bat 'npm test' }
    }
    stage('Code Quality') {
      steps { bat 'npm run lint || true' }
    }
    stage('Security') {
      steps { bat 'npm audit --json > audit-output.json || true' }
    }
    stage('Deploy') {
      steps {
        bat 'docker-compose up -d --build'
        bat 'sleep 5'
        bat 'curl --fail http://localhost:3000/health'
      }
    }
    stage('Release') {
      steps { echo 'Release step placeholder (tagging, pushing images)' }
    }
    stage('Monitoring') {
      steps {
        bat 'curl --fail http://localhost:3000/health || echo "ALERT: app not healthy"'
      }
    }
  }
}