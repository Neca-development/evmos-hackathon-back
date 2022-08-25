pipeline {
  agent none
  environment {
    REGISTRY_HOST = credentials('docker-registry-host')
    REGISTRY_HOST_REMOTE = credentials('docker-registry-domain')
    JENKINS_SERVER = credentials('jenkins-server')
    SLACK_CHANNEL = ''
    PRODUCTION_URL = ''
  }

  stages {
    stage ('Check build') {
      agent any

      when { changeRequest() }

      steps {
        build_pr('unistory-node', 16)
      }
    }

    stage('Build') {
      agent any

      when {
        allOf {
          not {
            changeRequest()
          }
          anyOf {
            branch 'main'
            branch 'development'
          }
        }
      }

      steps {
        script {
          def GIT_REPO_NAME = env.GIT_URL.replaceFirst(/^.*\/([^\/]+?).git$/, '$1').toLowerCase()
          sh """
            DOCKERFILE=Dockerfile

            docker build . \
              -f \${DOCKERFILE} \
              --build-arg DOCKER_ENV=\${DOCKER_ENV} \
              -t ${GIT_REPO_NAME}.\${BRANCH_NAME} \
              -t ${GIT_REPO_NAME}.\${BRANCH_NAME}:\${BUILD_NUMBER} \
              -t \${REGISTRY_HOST}/${GIT_REPO_NAME}.\${BRANCH_NAME} \
              -t \${REGISTRY_HOST}/${GIT_REPO_NAME}.\${BRANCH_NAME}:\${BUILD_NUMBER} \
              -t ${GIT_REPO_NAME}-\${BRANCH_NAME} \
              -t ${GIT_REPO_NAME}-\${BRANCH_NAME}:\${BUILD_NUMBER} \
              -t \${REGISTRY_HOST}/${GIT_REPO_NAME}-\${BRANCH_NAME} \
              -t \${REGISTRY_HOST}/${GIT_REPO_NAME}-\${BRANCH_NAME}:\${BUILD_NUMBER}

            docker push -a \${REGISTRY_HOST}/${GIT_REPO_NAME}.\${BRANCH_NAME}
          """
        }
      }
    }

    stage('Start') {
          agent any

          when {
            allOf {
              not {
                changeRequest()
              }
              anyOf {
                branch 'main'
              }
            }
          }

          environment {
            FRONT_REPO_NAME = 'evmos-hackathon-front'
            FRONT_BRANCH_NAME = 'main'
          }

          steps {
            script {
              def IMAGE_EXPOSED_PORT = 3000
              def GIT_REPO_NAME = env.GIT_URL.replaceFirst(/^.*\/([^\/]+?).git$/, '$1').toLowerCase()
              sh """
                echo REGISTRY_HOST_REMOTE=${REGISTRY_HOST_REMOTE} >> .development.env
                echo GIT_REPO_NAME=${GIT_REPO_NAME} >> .development.env
                echo BRANCH_NAME=${BRANCH_NAME} >> .development.env
                echo FRONT_REPO_NAME=${FRONT_REPO_NAME} >> .development.env
                echo FRONT_BRANCH_NAME=${FRONT_BRANCH_NAME} >> .development.env

                docker-compose --env-file .development.env up -d
              """
            }
            notify_slack("Traefik backend startup success")
          }
        }
      }
    }
  }

  post {
    failure {
      node(null) {
        script {
          if (env.BRANCH_NAME == "development" || env.BRANCH_NAME == "main") {
            notify_slack('Build failure')
          }
        }
      }
    }
  }
}
