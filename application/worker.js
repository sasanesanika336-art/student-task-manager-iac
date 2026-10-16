const HTML = "\r\n\u003c!DOCTYPE html\u003e\r\n\u003chtml lang=\"en\"\u003e\r\n\u003chead\u003e\r\n  \u003cmeta charset=\"UTF-8\"\u003e\r\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003e\r\n  \u003ctitle\u003eStudent Task Manager\u003c/title\u003e\r\n  \u003clink rel=\"stylesheet\" href=\"/style.css\"\u003e\r\n\u003c/head\u003e\r\n\u003cbody\u003e\r\n  \u003cmain class=\"container\"\u003e\r\n    \u003cheader\u003e\r\n      \u003ch1\u003eStudent Task Manager\u003c/h1\u003e\r\n      \u003cp\u003eOrganize your academic tasks in one place.\u003c/p\u003e\r\n    \u003c/header\u003e\r\n\r\n    \u003csection class=\"card\"\u003e\r\n      \u003ch2\u003eAdd a Task\u003c/h2\u003e\r\n      \u003cform id=\"task-form\"\u003e\r\n        \u003clabel for=\"title\"\u003eTask Title\u003c/label\u003e\r\n        \u003cinput id=\"title\" name=\"title\" type=\"text\"\r\n               placeholder=\"e.g. Prepare project presentation\" required\u003e\r\n\r\n        \u003clabel for=\"priority\"\u003ePriority\u003c/label\u003e\r\n        \u003cselect id=\"priority\" name=\"priority\"\u003e\r\n          \u003coption\u003eHigh\u003c/option\u003e\r\n          \u003coption selected\u003eMedium\u003c/option\u003e\r\n          \u003coption\u003eLow\u003c/option\u003e\r\n        \u003c/select\u003e\r\n\r\n        \u003cbutton type=\"submit\"\u003eAdd Task\u003c/button\u003e\r\n      \u003c/form\u003e\r\n      \u003cp id=\"message\" role=\"status\"\u003e\u003c/p\u003e\r\n    \u003c/section\u003e\r\n\r\n    \u003csection class=\"card\"\u003e\r\n      \u003ch2\u003eMy Tasks\u003c/h2\u003e\r\n      \u003cdiv id=\"task-list\" aria-live=\"polite\"\u003eLoading tasks...\u003c/div\u003e\r\n    \u003c/section\u003e\r\n  \u003c/main\u003e\r\n\r\n  \u003cscript src=\"/script.js\"\u003e\u003c/script\u003e\r\n\u003c/body\u003e\r\n\u003c/html\u003e\r\n";
const CSS = "* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  margin: 0;\r\n  font-family: Arial, sans-serif;\r\n  background: #f1f5f9;\r\n  color: #1e293b;\r\n}\r\n\r\n.container {\r\n  width: 90%;\r\n  max-width: 800px;\r\n  margin: 40px auto;\r\n}\r\n\r\nheader {\r\n  text-align: center;\r\n  margin-bottom: 30px;\r\n}\r\n\r\nheader h1 {\r\n  color: #1d4ed8;\r\n}\r\n\r\nheader p {\r\n  color: #64748b;\r\n}\r\n\r\n.card {\r\n  background: white;\r\n  padding: 24px;\r\n  margin-bottom: 24px;\r\n  border-radius: 10px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\r\n}\r\n\r\nh2 {\r\n  margin-top: 0;\r\n}\r\n\r\nlabel {\r\n  display: block;\r\n  margin: 14px 0 6px;\r\n  font-weight: bold;\r\n}\r\n\r\ninput,\r\nselect {\r\n  width: 100%;\r\n  padding: 11px;\r\n  border: 1px solid #cbd5e1;\r\n  border-radius: 6px;\r\n  font-size: 16px;\r\n}\r\n\r\nbutton {\r\n  margin-top: 16px;\r\n  padding: 11px 18px;\r\n  border: none;\r\n  border-radius: 6px;\r\n  background: #2563eb;\r\n  color: white;\r\n  font-size: 15px;\r\n  cursor: pointer;\r\n}\r\n\r\nbutton:hover {\r\n  background: #1d4ed8;\r\n}\r\n\r\n.task {\r\n  padding: 14px;\r\n  margin-top: 12px;\r\n  border: 1px solid #e2e8f0;\r\n  border-radius: 6px;\r\n}\r\n\r\n.task p {\r\n  margin: 6px 0;\r\n  overflow-wrap: anywhere;\r\n}\r\n\r\n.task button {\r\n  margin-right: 8px;\r\n}\r\n\r\n#message {\r\n  color: #b91c1c;\r\n}";
const JS = "const form = document.getElementById(\"task-form\");\r\nconst taskList = document.getElementById(\"task-list\");\r\nconst message = document.getElementById(\"message\");\r\n\r\nasync function loadTasks() {\r\n  try {\r\n    const response = await fetch(\"/api/tasks\");\r\n\r\n    if (!response.ok) {\r\n      throw new Error(\"Unable to load tasks\");\r\n    }\r\n\r\n    const tasks = await response.json();\r\n    taskList.replaceChildren();\r\n\r\n    if (tasks.length === 0) {\r\n      taskList.textContent = \"No tasks added yet.\";\r\n      return;\r\n    }\r\n\r\n    tasks.forEach((task) =\u003e {\r\n      const card = document.createElement(\"div\");\r\n      card.className = \"task\";\r\n\r\n      const title = document.createElement(\"p\");\r\n      title.textContent = task.title;\r\n\r\n      const details = document.createElement(\"p\");\r\n      details.textContent =\r\n        `Priority: ${task.priority} | Status: ${task.status}`;\r\n\r\n      const date = document.createElement(\"p\");\r\n      date.textContent =\r\n        `Created: ${new Date(task.createdDate).toLocaleDateString()}`;\r\n\r\n      const statusButton = document.createElement(\"button\");\r\n      statusButton.textContent =\r\n        task.status === \"Completed\" ? \"Mark Pending\" : \"Mark Completed\";\r\n\r\n      statusButton.addEventListener(\"click\", async () =\u003e {\r\n        const newStatus =\r\n          task.status === \"Completed\" ? \"Pending\" : \"Completed\";\r\n\r\n        await updateTask(task.id, { status: newStatus });\r\n      });\r\n\r\n      const deleteButton = document.createElement(\"button\");\r\n      deleteButton.textContent = \"Delete\";\r\n\r\n      deleteButton.addEventListener(\"click\", async () =\u003e {\r\n        await deleteTask(task.id);\r\n      });\r\n\r\n      card.append(title, details, date, statusButton, deleteButton);\r\n      taskList.appendChild(card);\r\n    });\r\n  } catch {\r\n    taskList.textContent = \"Unable to load tasks. Please try again.\";\r\n  }\r\n}\r\n\r\nform.addEventListener(\"submit\", async (event) =\u003e {\r\n  event.preventDefault();\r\n  message.textContent = \"\";\r\n\r\n  const title = document.getElementById(\"title\").value.trim();\r\n  const priority = document.getElementById(\"priority\").value;\r\n\r\n  if (!title) {\r\n    message.textContent = \"Please enter a task title.\";\r\n    return;\r\n  }\r\n\r\n  try {\r\n    const response = await fetch(\"/api/tasks\", {\r\n      method: \"POST\",\r\n      headers: { \"Content-Type\": \"application/json\" },\r\n      body: JSON.stringify({ title, priority })\r\n    });\r\n\r\n    if (!response.ok) {\r\n      throw new Error(\"Unable to add task\");\r\n    }\r\n\r\n    form.reset();\r\n    message.textContent = \"Task added successfully.\";\r\n    await loadTasks();\r\n  } catch {\r\n    message.textContent = \"Unable to add task. Please try again.\";\r\n  }\r\n});\r\n\r\nasync function updateTask(id, changes) {\r\n  try {\r\n    const response = await fetch(`/api/tasks/${encodeURIComponent(id)}`, {\r\n      method: \"PUT\",\r\n      headers: { \"Content-Type\": \"application/json\" },\r\n      body: JSON.stringify(changes)\r\n    });\r\n\r\n    if (!response.ok) {\r\n      throw new Error(\"Unable to update task\");\r\n    }\r\n\r\n    await loadTasks();\r\n  } catch {\r\n    message.textContent = \"Unable to update task.\";\r\n  }\r\n}\r\n\r\nasync function deleteTask(id) {\r\n  try {\r\n    const response = await fetch(`/api/tasks/${encodeURIComponent(id)}`, {\r\n      method: \"DELETE\"\r\n    });\r\n\r\n    if (!response.ok) {\r\n      throw new Error(\"Unable to delete task\");\r\n    }\r\n\r\n    message.textContent = \"Task deleted successfully.\";\r\n    await loadTasks();\r\n  } catch {\r\n    message.textContent = \"Unable to delete task.\";\r\n  }\r\n}\r\n\r\nloadTasks();";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (path === "/") {
      return new Response(HTML, {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }

    if (path === "/style.css") {
      return new Response(CSS, {
        headers: { "Content-Type": "text/css; charset=utf-8" }
      });
    }

    if (path === "/script.js") {
      return new Response(JS, {
        headers: { "Content-Type": "application/javascript; charset=utf-8" }
      });
    }

    if (!path.startsWith("/api/tasks")) {
      return new Response("Not Found", { status: 404 });
    }

    const id = path.match(/^\/api\/tasks\/([^/]+)$/)?.[1];

    try {
      if (method === "GET" && path === "/api/tasks") {
        const listed = await env.TASKS.list({ prefix: "task:" });
        const tasks = await Promise.all(
          listed.keys.map(async (key) =>
            JSON.parse(await env.TASKS.get(key.name))
          )
        );
        return jsonResponse(tasks);
      }

      if (method === "POST" && path === "/api/tasks") {
        const body = await request.json();

        if (!body.title?.trim()) {
          return jsonResponse({ error: "Task title is required" }, 400);
        }

        const taskId = `T${crypto.randomUUID().slice(0, 8)}`;
        const task = {
          id: taskId,
          title: body.title.trim(),
          priority: body.priority || "Medium",
          status: body.status || "Pending",
          createdDate: new Date().toISOString()
        };

        await env.TASKS.put(`task:${taskId}`, JSON.stringify(task));
        return jsonResponse(task, 201);
      }

      if (id && method === "GET") {
        const value = await env.TASKS.get(`task:${id}`);
        return value
          ? jsonResponse(JSON.parse(value))
          : jsonResponse({ error: "Task not found" }, 404);
      }

      if (id && method === "PUT") {
        const key = `task:${id}`;
        const value = await env.TASKS.get(key);

        if (!value) {
          return jsonResponse({ error: "Task not found" }, 404);
        }

        const existing = JSON.parse(value);
        const body = await request.json();
        const updated = {
          ...existing,
          ...(body.title !== undefined && { title: body.title.trim() }),
          ...(body.priority !== undefined && { priority: body.priority }),
          ...(body.status !== undefined && { status: body.status })
        };

        await env.TASKS.put(key, JSON.stringify(updated));
        return jsonResponse(updated);
      }

      if (id && method === "DELETE") {
        const key = `task:${id}`;
        const value = await env.TASKS.get(key);

        if (!value) {
          return jsonResponse({ error: "Task not found" }, 404);
        }

        await env.TASKS.delete(key);
        return jsonResponse({ message: "Task deleted successfully" });
      }

      return jsonResponse({ error: "Method not allowed" }, 405);
    } catch {
      return jsonResponse({ error: "Invalid request or server error" }, 500);
    }
  }
};
