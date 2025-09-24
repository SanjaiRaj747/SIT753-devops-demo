pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'docker build -t sample-node-app .'
      }
    }
    stage('Test') {
      steps { sh 'npm test' }
    }
    stage('Code Quality') {
      steps { sh 'npm run lint || true' }
    }
    stage('Security') {
      steps { sh 'npm audit --json > audit-output.json || true' }
    }
    stage('Deploy') {
      steps {
        sh 'docker-compose up -d --build'
        sh 'sleep 5'
        sh 'curl --fail http://localhost:3000/health'
      }
    }
    stage('Release') {
      steps { echo 'Release step placeholder (tagging, pushing images)' }
    }
    stage('Monitoring') {
      steps {
        sh 'curl --fail http://localhost:3000/health || echo "ALERT: app not healthy"'
      }
    }
  }
}