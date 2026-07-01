🚀 AWS CI/CD Pipeline: Automating Node.js Deployments
📖 Project Overview

This project demonstrates a fully automated Continuous Integration and Continuous Deployment (CI/CD) pipeline built natively on AWS. It features a robust AWS CodePipeline v2 integrated with a GitHub repository, enabling automated builds and zero-downtime deployments to an Amazon EC2 instance.

As a "Secret Mission" enhancement, the pipeline includes a Manual Approval Gate, simulating enterprise release workflows and balancing deployment speed with operational safety.

🏗️ Architecture & CI/CD Flow
Source
Code is pushed to the main branch in GitHub.
Build
AWS CodeBuild compiles the application using instructions defined in buildspec.yml.
Approval
A Manual Approval Gate pauses the pipeline for review before deployment.
Deploy
AWS CodeDeploy deploys the artifact to an EC2 instance using appspec.yml.
🛠️ Technologies & AWS Services Used
Compute: Amazon EC2 (t2.micro, Amazon Linux 2023)
CI/CD: AWS CodePipeline (v2), AWS CodeBuild, AWS CodeDeploy
Version Control: GitHub
Storage: Amazon S3 (artifact storage)
Security/IAM: EC2 Instance Profiles, CodeDeploy Service Roles
Application: Node.js
📸 Step-by-Step Implementation
Step 1: Application & Repository Setup

A Node.js application was configured with essential deployment files:

buildspec.yml
Defines build environment and commands for AWS CodeBuild
appspec.yml
Defines deployment instructions for AWS CodeDeploy
Files section: Copies build output to /home/ec2-user/app
Hooks section:
Stops existing application
Installs dependencies
Starts application (binds to port 80)
Step 2: EC2 Configuration with IAM & CodeDeploy Agent

An Amazon Linux 2023 EC2 instance was provisioned as the deployment target:

Installed and verified AWS CodeDeploy Agent
Attached IAM Instance Profile with:
AmazonEC2RoleforAWSCodeDeploy
AmazonSSMManagedInstanceCore
Step 3: CodeDeploy Setup
Created a CodeDeploy Application
Created a Deployment Group
Targeted EC2 instances using tags
Assigned CodeDeployServiceRole with AWSCodeDeployRole permissions
Step 4: CodePipeline Assembly

A 3-stage AWS CodePipeline was created:

Source (GitHub)
Build (CodeBuild)
Deploy (CodeDeploy)

An S3 bucket is automatically used to store and transfer build artifacts between stages.

Step 5: Verification & Manual Approval Gate

A Manual Approval Gate was added between Build and Deploy stages to ensure production safety and controlled releases.

Pipeline was triggered via Git push and successfully deployed to:

http://54.225.6.62/

The application response confirmed successful deployment:

"Hello from CodePipeline! Pipeline Version 1.0"

💡 Key Takeaways & Challenges
Artifact Synchronization Issue
Problem: scripts folder was not being pushed from local environment to GitHub
Resolution: Reviewed .gitignore and Git staging process to ensure all required files were committed properly
CI/CD Best Practices Learned
Fully automated pipelines improve speed and consistency
Manual approval stages add critical safety for production systems
Proper artifact packaging is essential before pipeline execution
🚀 Future Improvements

This project strengthened my understanding of AWS-native CI/CD workflows. The next step is to fully recreate and automate this infrastructure using:

Terraform (Infrastructure as Code)
Modular AWS architecture design
Fully automated environment provisioning
👤 Author

Sandeep Silumula
Incident Management Leader | AWS DevOps Engineer | (SRE) | DevOps
