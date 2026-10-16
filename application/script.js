const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const message = document.getElementById("message");

async function loadTasks() {
  try {
    const response = await fetch("/api/tasks");

    if (!response.ok) {
      throw new Error("Unable to load tasks");
    }

    const tasks = await response.json();
    taskList.replaceChildren();

    if (tasks.length === 0) {
      taskList.textContent = "No tasks added yet.";
      return;
    }

    tasks.forEach((task) => {
      const card = document.createElement("div");
      card.className = "task";

      const title = document.createElement("p");
      title.textContent = task.title;

      const details = document.createElement("p");
      details.textContent =
        `Priority: ${task.priority} | Status: ${task.status}`;

      const date = document.createElement("p");
      date.textContent =
        `Created: ${new Date(task.createdDate).toLocaleDateString()}`;

      const statusButton = document.createElement("button");
      statusButton.textContent =
        task.status === "Completed" ? "Mark Pending" : "Mark Completed";

      statusButton.addEventListener("click", async () => {
        const newStatus =
          task.status === "Completed" ? "Pending" : "Completed";

        await updateTask(task.id, { status: newStatus });
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

      deleteButton.addEventListener("click", async () => {
        await deleteTask(task.id);
      });

      card.append(title, details, date, statusButton, deleteButton);
      taskList.appendChild(card);
    });
  } catch {
    taskList.textContent = "Unable to load tasks. Please try again.";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";

  const title = document.getElementById("title").value.trim();
  const priority = document.getElementById("priority").value;

  if (!title) {
    message.textContent = "Please enter a task title.";
    return;
  }

  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority })
    });

    if (!response.ok) {
      throw new Error("Unable to add task");
    }

    form.reset();
    message.textContent = "Task added successfully.";
    await loadTasks();
  } catch {
    message.textContent = "Unable to add task. Please try again.";
  }
});

async function updateTask(id, changes) {
  try {
    const response = await fetch(`/api/tasks/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes)
    });

    if (!response.ok) {
      throw new Error("Unable to update task");
    }

    await loadTasks();
  } catch {
    message.textContent = "Unable to update task.";
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`/api/tasks/${encodeURIComponent(id)}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Unable to delete task");
    }

    message.textContent = "Task deleted successfully.";
    await loadTasks();
  } catch {
    message.textContent = "Unable to delete task.";
  }
}

loadTasks();