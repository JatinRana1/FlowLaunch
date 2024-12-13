# React + Vite Application with JSON Server

This project is a React application bootstrapped with **Vite**. It uses a **JSON Server** to simulate a backend API for demonstration purposes.

## Features

- Fast development environment with Vite.
- Local state management for add, update, and delete tasks.
- Integration with a JSON Server to fetch initial data.

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 14 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the React application:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will run on `http://localhost:5173`.

## Application Behavior

### Important Notes:

1. **Adding New Tasks:**
   - When you add a new task, it will appear in the UI immediately.
   - **However, it will not persist on the JSON Server** because the server does not modify the `db.json` file dynamically. Reloading the page will revert the tasks to the initial state defined in `db.json`.
   - 
** ONLY ON NEWLY ADDED TASKS **
2. **Updating Tasks:**
   - Task updates are handled in the local state of the application.
   - **These updates will not reflect on the JSON Server.**
   - A toast notification will display an error message indicating that updates were not saved to the server.

3. **Deleting Tasks:**
   - Similar to updates, deletions are handled in the local state.
   - **Deleted tasks will reappear after a page reload** as the changes are not reflected on the JSON Server.

### Why JSON Server Behaves This Way:
The JSON Server is a mock server designed for prototyping and testing. It reads data from the `db.json` file and serves it as an API. It does not support dynamic updates to the file without additional tooling or customization.

## Toast Notifications

- **Add Task:** Toast will confirm successful addition (local state only).
- **Update Task:** Toast will show an error stating updates are not saved to the server.
- **Delete Task:** Toast will show an error stating deletions are not saved to the server.

## Future Enhancements

- Integrate a real backend for persistent data storage.
- Add authentication and user management.
- Implement full CRUD operations with server sync.

