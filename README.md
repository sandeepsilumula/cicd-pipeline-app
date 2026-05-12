# 🚀 AWS CI/CD Pipeline: Automating Node.js Deployments

## 📖 Project Overview
This project demonstrates a fully automated Continuous Integration and Continuous Deployment (CI/CD) pipeline built natively on AWS. It features a robust V2 AWS CodePipeline integrated with a GitHub repository, enabling automated builds and zero-downtime deployments to an Amazon EC2 instance. 

As a "Secret Mission" enhancement, the pipeline incorporates a production-style **Manual Approval Gate** to simulate enterprise release workflows, balancing deployment velocity with operational safety.

## 🏗️ Architecture & CI/CD Flow
1. **Source:** Code is pushed to the `main` branch in **GitHub**.
2. **Build:** **AWS CodeBuild** compiles the application using instructions from `buildspec.yml`.
3. **Approval:** A **Manual Approval Gate** pauses the pipeline for review.
4. **Deploy:** **AWS CodeDeploy** pushes the artifact to **EC2** using instructions from `appspec.yml`.



## 🛠️ Technologies & Services Used
*   **Compute:** Amazon EC2 (t2.micro, Amazon Linux 2023)
*   **CI/CD:** AWS CodePipeline (V2), AWS CodeBuild, AWS CodeDeploy
*   **Version Control:** GitHub
*   **Storage:** Amazon S3 (Artifact storage)
*   **Security/IAM:** EC2 Instance Profiles, CodeDeploy Service Roles
*   **Application:** Node.js

---

## 📸 Step-by-Step Implementation

### Step 1: Application & Repository Foundation
Configured a Node.js web application equipped with critical deployment files:
*   **`buildspec.yml`:** Defines the build environment and commands for CodeBuild.
*   **`appspec.yml`:** Positioned at the root directory, this file provides deployment instructions for CodeDeploy. 
    *   *Files Section:* Copies build outputs to `/home/ec2-user/app`.
    *   *Hooks Section:* Manages the application lifecycle (stopping the old app, installing dependencies, and starting the new app as `root` to bind to port 80).



### Step 2: Configuring EC2 with IAM & CodeDeploy Agent
Provisioned an Amazon Linux 2023 EC2 instance to serve as the deployment target. 
*   Installed and verified the **CodeDeploy Agent**.
*   Attached an IAM Instance Profile containing `AmazonEC2RoleforAWSCodeDeploy` (to fetch artifacts from S3) and `AmazonSSMManagedInstanceCore` (for secure Systems Manager session access).

### Step 3: Setting Up CodeDeploy
Created a CodeDeploy Application and a corresponding Deployment Group.
*   Targeted the EC2 instance using specific EC2 tags.
*   Assigned a dedicated `CodeDeployServiceRole` (with the `AWSCodeDeployRole` policy) to grant the service permissions to execute deployments on the infrastructure.



### Step 4: Assembling the 3-Stage CodePipeline
Constructed a V2 CodePipeline integrating the Source, Build, and Deploy stages. The pipeline automatically provisions an S3 artifact bucket to securely pass code payloads between stages.



### Step 5: Verification & The Manual Approval Gate
To ensure production readiness, I implemented a **Manual Approval Gate** between the Build and Deploy stages. This enforces a controlled checkpoint where a team lead can review build logs before releasing to the live environment.

Successfully triggered the pipeline via a Git push and verified the live deployment at `http://54.225.6.62/`, confirming the application successfully served: *"Hello from CodePipeline! Pipeline Version 1.0"*.



---

## 💡 Key Takeaways & Challenges

*   **Artifact Synchronization Challenge:** Encountered an issue where the `scripts` folder was not updating from the local environment to the Git repository. 
    *   *Resolution:* Audited Git tracking (checking `.gitignore` and staging processes) to ensure all vital deployment scripts were committed. This reinforced the importance of complete artifact packaging before pipeline execution.
*   **Enterprise CI/CD Practices:** Automated pipelines are powerful, but implementing manual approval actions provides a necessary safety net, allowing teams to balance deployment speed with critical operational stability.

## 🚀 Looking Ahead
Successfully completing this project solidified my understanding of AWS-native CI/CD workflows. As I continue to upskill in CloudOps and Infrastructure as Code (IaC), my next major objective is to recreate and automate this entire infrastructure stack using **Terraform**.

 **Author:** Sandeep Silumula, Senior Incident/Operations Manager
