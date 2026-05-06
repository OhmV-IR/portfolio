pipeline {
    agent none
    
    tools {
        nodejs 'node24'
    }

    stages {
        stage("Quality and Build") {
            parallel {
                stage("Build") {
                    agent { label "windows || linux" }
                    steps {
                        checkout scm
                        // "ENV_FILE" is the ID of the secret file in Jenkins Credentials
                        withCredentials([file(credentialsId: 'ENV_FILE', variable: 'SECRET_FILE')]) {
                            script {
                                if (isUnix()) {
                                    sh "cp ${SECRET_FILE} .env"
                                    sh "npm i && npm run build"
                                } else {
                                    bat "copy ${SECRET_FILE} .env"
                                    bat "npm i && npm run build"
                                }
                            }
                        }
                    }
                }

                stage("Lint") {
                    agent { label "windows || linux" }
                    steps {
                        checkout scm
                        withCredentials([file(credentialsId: 'ENV_FILE', variable: 'SECRET_FILE')]) {
                            script {
                                if (isUnix()) {
                                    sh "cp ${SECRET_FILE} .env"
                                    sh "npm i && npx eslint ."
                                } else {
                                    bat "copy ${SECRET_FILE} .env"
                                    bat "npm i && npx eslint ."
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}