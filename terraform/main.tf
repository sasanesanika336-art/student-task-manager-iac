resource "cloudflare_workers_kv_namespace" "student_tasks" {
  account_id = var.cloudflare_account_id
  title      = "student-task-manager-tasks"
}

resource "cloudflare_workers_script" "student_task_manager" {
  account_id         = var.cloudflare_account_id
  script_name        = var.worker_name
  content            = file("${path.module}/../application/worker.js")
  main_module        = "worker.js"
  compatibility_date = "2026-10-16"

  bindings = [
    {
      name         = "TASKS"
      type         = "kv_namespace"
      namespace_id = cloudflare_workers_kv_namespace.student_tasks.id
    }
  ]
}