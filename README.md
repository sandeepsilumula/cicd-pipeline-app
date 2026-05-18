<div style="background-color: #0f172a; color: #f8fafc; padding: 35px; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6;">

    <h1 style="color: #ffffff; border-bottom: 1px solid #334155; padding-bottom: 10px; margin-top: 0;">🚀 AWS CI/CD Pipeline: Automating Node.js Deployments</h1>

    <h2 style="color: #e2e8f0; margin-top: 25px;">📖 Project Overview</h2>
    <p>This project demonstrates a fully automated Continuous Integration and Continuous Deployment (CI/CD) pipeline built natively on AWS. It features a robust V2 AWS CodePipeline integrated with a GitHub repository, enabling automated builds and zero-downtime deployments to an Amazon EC2 instance.</p>
    <p>As a "Secret Mission" enhancement, the pipeline incorporates a production-style <strong>Manual Approval Gate</strong> to simulate enterprise release workflows, balancing deployment velocity with operational safety.</p>

    <h2 style="color: #e2e8f0; margin-top: 25px;">🏗️ Architecture & CI/CD Flow</h2>
    <ol style="padding-left: 20px;">
        <li style="margin-bottom: 8px;"><strong>Source:</strong> Code is pushed to the <code>main</code> branch in <strong>GitHub</strong>.</li>
        <li style="margin-bottom: 8px;"><strong>Build:</strong> <strong>AWS CodeBuild</strong> compiles the application using instructions from <code>buildspec.yml</code>.</li>
        <li style="margin-bottom: 8px;"><strong>Approval:</strong> A <strong>Manual Approval Gate</strong> pauses the pipeline for review.</li>
        <li style="margin-bottom: 8px;"><strong>Deploy:</strong> <strong>AWS CodeDeploy</strong> pushes the artifact to <strong>EC2</strong> using instructions from <code>appspec.yml</code>.</li>
    </ol>

    <h2 style="color: #e2e8f0; margin-top: 25px;">🛠️ Technologies & Services Used</h2>
    <ul style="padding-left: 20px;">
        <li style="margin-bottom: 6px;"><strong>Compute:</strong> Amazon EC2 (t2.micro, Amazon Linux 2023)</li>
        <li style="margin-bottom: 6px;"><strong>CI/CD:</strong> AWS CodePipeline (V2), AWS CodeBuild, AWS CodeDeploy</li>
        <li style="margin-bottom: 6px;"><strong>Version Control:</strong> GitHub</li>
        <li style="margin-bottom: 6px;"><strong>Storage:</strong> Amazon S3 (Artifact storage)</li>
        <li style="margin-bottom: 6px;"><strong>Security/IAM:</strong> EC2 Instance Profiles, CodeDeploy Service Roles</li>
        <li style="margin-bottom: 6px;"><strong>Application:</strong> Node.js</li>
    </ul>

    <hr style="border: 0; border-top: 1px solid #334155; margin: 30px 0;">

    <h2 style="color: #e2e8f0;">📸 Step-by-Step Implementation</h2>

    <h3 style="color: #cbd5e1; margin-top: 20px;">Step 1: Application & Repository Foundation</h3>
    <p>Configured a Node.js web application equipped with critical deployment files:</p>
    <ul style="padding-left: 20px;">
        <li style="margin-bottom: 6px;"><strong><code>buildspec.yml</code>:</strong> Defines the build environment and commands for CodeBuild.</li>
        <li style="margin-bottom: 6px;"><strong><code>appspec.yml</code>:</strong> Positioned at the root directory, this file provides deployment instructions for CodeDeploy.
            <ul style="padding-left: 20px; margin-top: 4px;">
                <li><em>Files Section:</em> Copies build outputs to <code>/home/ec2-user/app</code>.</li>
                <li><em>Hooks Section:</em> Manages the application lifecycle (stopping the old app, installing dependencies, and starting the new app as <code>root</code> to bind to port 80).</li>
            </ul>
        </li>
    </ul>

    <h3 style="color: #cbd5e1; margin-top: 20px;">Step 2: Configuring EC2 with IAM & CodeDeploy Agent</h3>
    <p>Provisioned an Amazon Linux 2023 EC2 instance to serve as the deployment target.</p>
    <ul style="padding-left: 20px;">
        <li style="margin-bottom: 6px;">Installed and verified the <strong>CodeDeploy Agent</strong>.</li>
        <li style="margin-bottom: 6px;">Attached an IAM Instance Profile containing <code>AmazonEC2RoleforAWSCodeDeploy</code> (to fetch artifacts from S3) and <code>AmazonSSMManagedInstanceCore</code> (for secure Systems Manager session access).</li>
    </ul>

    <h3 style="color: #cbd5e1; margin-top: 20px;">Step 3: Setting Up CodeDeploy</h3>
    <p>Created a CodeDeploy Application and a corresponding Deployment Group.</p>
    <ul style="padding-left: 20px;">
        <li style="margin-bottom: 6px;">Targeted the EC2 instance using specific EC2 tags.</li>
        <li style="margin-bottom: 6px;">Assigned a dedicated <code>CodeDeployServiceRole</code> (with the <code>AWSCodeDeployRole</code> policy) to grant the service permissions to execute deployments on the infrastructure.</li>
    </ul>

    <h3 style="color: #cbd5e1; margin-top: 20px;">Step 4: Assembling the 3-Stage CodePipeline</h3>
    <p>Constructed a V2 CodePipeline integrating the Source, Build, and Deploy stages. The pipeline automatically provisions an S3 artifact bucket to securely pass code payloads between stages.</p>

    <h3 style="color: #cbd5e1; margin-top: 20px;">Step 5: Verification & The Manual Approval Gate</h3>
    <p>To ensure production readiness, I implemented a <strong>Manual Approval Gate</strong> between the Build and Deploy stages. This enforces a controlled checkpoint where a team lead can review build logs before releasing to the live environment.</p>
    <p>Successfully triggered the pipeline via a Git push and verified the live deployment at <code>http://54.225.6.62/</code>, confirming the application successfully served: <em>"Hello from CodePipeline! Pipeline Version 1.0"</em>.</p>

    <hr style="border: 0; border-top: 1px solid #334155; margin: 30px 0;">

    <h2 style="color: #e2e8f0;">💡 Key Takeaways & Challenges</h2>
    <ul style="padding-left: 20px;">
        <li style="margin-bottom: 10px;"><strong>Artifact Synchronization Challenge:</strong> Encountered an issue where the <code>scripts</code> folder was not updating from the local environment to the Git repository.
            <p style="margin: 4px 0 0 0; color: #cbd5e1;"><em>Resolution:</em> Audited Git tracking (checking <code>.gitignore</code> and staging processes) to ensure all vital deployment scripts were committed. This reinforced the importance of complete artifact packaging before pipeline execution.</p>
        </li>
        <li style="margin-bottom: 10px;"><strong>Enterprise CI/CD Practices:</strong> Automated pipelines are powerful, but implementing manual approval actions provides a necessary safety net, allowing teams to balance deployment speed with critical operational stability.</li>
    </ul>

    <h2 style="color: #e2e8f0; margin-top: 25px;">🚀 Looking Ahead</h2>
    <p>Successfully completing this project solidified my understanding of AWS-native CI/CD workflows. As I continue to upskill in CloudOps and Infrastructure as Code (IaC), my next major objective is to recreate and automate this entire infrastructure stack using <strong>Terraform</strong>.</p>

    <div style="margin-top: 35px; padding: 15px; background-color: #1e293b; border-left: 4px solid #3b82f6; border-radius: 4px;">
        <strong style="color: #ffffff;">Author:</strong> Sandeep Silumula <br>
        <span style="color: #94a3b8; font-size: 0.9em;">Senior Incident/Operations Manager</span>
    </div>

</div>
