pipeline {
    agent none
    tools {
        nodejs 'node24'
    }
    stages{
        parallel {
            stage("Build"){
                agent { label "windows || linux"}
                steps {
                    checkout scm
                    script {
                        if(isUnix()){
                            sh "npm i"
                            sh "npm run build"
                        } else {
                            bat "npm i"
                            bat "npm run build"
                        }
                    }
                }
            }
            stage("Lint"){
                agent { label "windows || linux"}
                steps {
                    checkout scm
                    script {
                        if(isUnix()){
                            sh "npm i"
                            sh "npx eslint ."
                        } else {
                            bat "npm i"
                            bat "npx eslint ."
                        }
                    }
                }
            }
        }
    }
}