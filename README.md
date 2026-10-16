\# Student Task Manager Using Terraform



A serverless Student Task Manager deployed on Cloudflare Workers using Terraform Infrastructure as Code (IaC).



\## Technologies

\- Terraform

\- Cloudflare Workers

\- Cloudflare Workers KV

\- HTML

\- CSS

\- JavaScript

\- Git and GitHub

\- GitHub Actions



\## Features

\- Add student tasks

\- View all tasks

\- Mark tasks as completed

\- Delete tasks

\- Store task data in Cloudflare Workers KV

\- Deploy infrastructure using Terraform



\## API Endpoints



| Method | Endpoint | Purpose |

|---|---|---|

| GET | `/api/tasks` | List tasks |

| POST | `/api/tasks` | Create a task |

| GET | `/api/tasks/{id}` | Get a task by ID |

| PUT | `/api/tasks/{id}` | Update a task |

| DELETE | `/api/tasks/{id}` | Delete a task |



\## Terraform Commands



```powershell

terraform init

terraform fmt -check

terraform validate

terraform plan

terraform apply

terraform show

terraform destroy
