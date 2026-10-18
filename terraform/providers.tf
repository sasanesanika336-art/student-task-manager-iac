
terraform {
  cloud {
    organization = "sanika-student-task-manager"

    workspaces {
      name = "student-task-manager"
    }
  }

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }
}

provider "cloudflare" {}
