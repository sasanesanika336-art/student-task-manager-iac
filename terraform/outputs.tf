output "worker_name" {
  description = "Name of the deployed Cloudflare Worker"
  value       = cloudflare_workers_script.student_task_manager.script_name
}

output "kv_namespace_id" {
  description = "ID of the Workers KV namespace"
  value       = cloudflare_workers_kv_namespace.student_tasks.id
}