# Todo Task Manager 📝

A simple Node.js-based task management system that allows you to add, remove, list, and read tasks. It handles file operations and ensures smooth functionality even when the JSON file is missing or contains invalid data.

---

## 🚀 Key Features

1. **Add a Task**
   - Adds a new task with a title and description.
   - Ensures no duplicate titles.
   - Example:
     ```javascript
     addTask("Learn Node.js", "Complete the Node.js tutorial.");
     ```

2. **Remove a Task**
   - Removes a task by its title.
   - Example:
     ```javascript
     removeTask("Learn Node.js");
     ```

3. **List All Tasks**
   - Displays all saved tasks in a user-friendly format.
   - Example:
     ```javascript
     listTasks();
     ```

4. **Read a Task**
   - Shows the details of a specific task based on the title.
   - Example:
     ```javascript
     readTask("Learn Node.js");
     ```

5. **Handles Missing/Invalid JSON File Gracefully**
   - If the JSON file doesn't exist or contains invalid JSON, the program:
     - Returns an empty array.
     - Logs appropriate error messages without crashing.

---

