# AWS CI/CD Capstone Project

This repository contains a Node.js web application with a fully automated CI/CD pipeline using AWS CodePipeline, CodeBuild, CodeDeploy, ECR, and ECS Fargate.

## Architecture

```
GitHub → CodePipeline → CodeBuild → ECR → CodeDeploy → ECS (Fargate) → ALB
```

## Repository Structure

```
myapp/
├── src/
│   ├── app.js           # Express.js application
│   ├── package.json     # Node.js dependencies
│   └── package-lock.json
├── tests/
│   └── app.test.js      # Jest unit tests
├── Dockerfile           # Container definition
├── buildspec.yml        # CodeBuild instructions
├── appspec.yml          # CodeDeploy ECS deployment config
├── taskdef.json         # ECS Task Definition template
└── README.md
```

## Prerequisites

- AWS Account with appropriate permissions
- GitHub account
- Docker installed locally (for testing)

## Setup Steps

### 1. Replace Placeholders

In `taskdef.json`, replace:
- `<account_id>` with your AWS Account ID
- `<IMAGE1_NAME>` stays as-is (CodeDeploy replaces this automatically)

In `buildspec.yml`, the env vars are set in CodeBuild project settings:
- `AWS_ACCOUNT_ID`
- `AWS_DEFAULT_REGION`

### 2. Create ECR Repository

```bash
aws ecr create-repository --repository-name myapp-repo --region us-east-1
```

### 3. Create ECS Cluster

```bash
aws ecs create-cluster --cluster-name myapp-cluster --capacity-providers FARGATE
```

### 4. Push to GitHub

Push this entire repo to GitHub. CodePipeline will detect the push and start the pipeline.

## Local Development

```bash
cd src
npm install
npm test       # Run unit tests
npm start      # Start app on port 3000
```

## Docker Build Locally

```bash
docker build -t myapp .
docker run -p 3000:3000 myapp
# Visit http://localhost:3000
```

## Pipeline Flow

1. **Source**: GitHub push triggers CodePipeline
2. **Build**: CodeBuild installs deps → runs tests → builds Docker image → pushes to ECR
3. **Approval**: Manual approval gate before production deploy
4. **Deploy**: CodeDeploy updates ECS task definition → Blue/Green deployment to Fargate
5. **Live**: App served via Application Load Balancer
