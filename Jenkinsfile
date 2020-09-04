@Library('github-release-helpers@v0.2.1')
def releaseInfo

pipeline {
  agent {
		docker {
			image 'node:lts'
			args "-e HOME=$HOME"
		}
	};

  options {
    buildDiscarder(logRotator(numToKeepStr:'5'))
  }

  stages {
		stage('Build Release Info') {
			steps {
				script{
					releaseInfo = generateGithubReleaseInfo(
						'PaulTrampert',
						'flatitude',
						'v',
						'Github User/Pass',
            'https://api.github.com',
            BRANCH_NAME == "master" ? null : BRANCH_NAME,
            env.BUILD_NUMBER
					)

					echo releaseInfo.nextVersion().toString()
					echo releaseInfo.changelogToMarkdown()
				}
			}
		}

    stage('Restore') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test-ci'
      }
    }

		stage('Publish') {
			steps {
				script {
					def packageJson = readJSON file: 'package.json'
					packageJson.version = releaseInfo.nextVersion().toString()
					writeJSON file: 'package.json', json: packageJson, pretty: 2
				}
				withCredentials([string(credentialsId: 'npmrc', variable: 'NPMRC')]) {
					writeFile file: ".npmrc", text: NPMRC
					sh 'npm publish'
				}
			}
		}

		stage ('Tag') {
			when { branch 'master' }

			steps {
				publishGithubRelease(
					'PaulTrampert',
					'flatitude',
					releaseInfo,
					'v',
					'Github User/Pass'
				)
			}
		}
  }

  post {
    failure {
      mail to: 'paul.trampert@gmail.com', subject: "Build status of ${env.JOB_NAME} changed to ${currentBuild.result}", body: "Build log may be found at ${env.BUILD_URL}"
    }
    always {
      archiveArtifacts artifacts: '**/*', excludes: 'node_modules/**/*, doc_src/**/*, doc/**/*, testReports/**/*'
      step(
				[
					$class: 'XUnitBuilder',
					testTimeMargin: '60000',
					thresholdMode: 1,
					thresholds: [
						[
							$class: 'FailedThreshold',
							failureNewThreshold: '',
							failureThreshold: '',
							unstableNewThreshold: '',
							unstableThreshold: '0'
						],
						[
							$class: 'SkippedThreshold',
							failureNewThreshold: '',
							failureThreshold: '',
							unstableNewThreshold: '',
							unstableThreshold: ''
						]
					],
					tools: [
						[
							$class: 'JUnitType',
							deleteOutputFiles: true,
							failIfNotNew: true,
							pattern: 'junit.xml',
							skipNoTestFiles: false,
							stopProcessingIfError: true
						]
					]
				]
			)
      deleteDir()
    }
  }

}