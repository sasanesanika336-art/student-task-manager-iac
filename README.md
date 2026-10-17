# Student Task Manager Using Terraform

A serverless Student Task Manager deployed on Cloudflare Workers using Terraform Infrastructure as Code (IaC).

## Technologies

- Terraform
- Cloudflare Workers
- Cloudflare Workers KV
- HTML
- CSS
- JavaScript
- Git and GitHub
- GitHub Actions

## Features

- Add student tasks
- View all tasks
- Mark tasks as completed
- Delete tasks
- Store task data in Cloudflare Workers KV
- Provision and update infrastructure using Terraform

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks` | List tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/{id}` | Get a task by ID |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |

## Deployment

**Live application:** https://student-task-manager.sasanesanika336.workers.dev

## Terraform Commands

Run these commands from the `terraform` directory:

```powershell
terraform init
terraform fmt -check
terraform validate
terraform plan
terraform apply
terraform show
```

**Warning:** `terraform destroy` removes managed infrastructure. Run it only during the planned destroy-and-recreate demonstration.

## GitHub Actions

The GitHub Actions workflow validates Worker JavaScript syntax and checks Terraform formatting, initialization, and configuration validity on pushes to `main` and manual workflow runs. It does not automatically deploy infrastructure.

## Infrastructure Resources

- Cloudflare Worker: `student-task-manager`
- Workers KV namespace: `student-task-manager-tasks`

Terraform manages the Worker, KV namespace, and the binding connecting the Worker to KV.

## Project Objective

To demonstrate Infrastructure as Code by provisioning, validating, modifying, and managing a serverless task management application using Terraform and Cloudflare.
