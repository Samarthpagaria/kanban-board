# Kanban Board

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## Project Overview

Kanban Board is a lightweight, purely client-side task management application built entirely with vanilla HTML, CSS, and JavaScript. It provides a classic three-column workflow (To Do, Work in Progress, Done) allowing users to organize tasks via native drag-and-drop. 

What makes this project unique is its absolute zero-dependency architecture. It proves that a genuinely useful, persistent productivity tool can be built without frameworks, build steps, or backend databases by treating the DOM as the single source of truth and persisting state entirely via browser `localStorage`. It is aimed at individuals or small teams wanting an instant, offline-capable task board.

## Live Links

| Environment | URL |
| ----------- | --- |
| Production Frontend | [https://kanban-board-sam-io.vercel.app/](https://kanban-board-sam-io.vercel.app/) |
| GitHub Repository | [https://github.com/Samarthpagaria/kanban-board](https://github.com/Samarthpagaria/kanban-board) |

## Complete Tech Stack

**Frontend Dependencies**
*This project has absolutely no external dependencies, no `package.json`, and no frontend frameworks.*
- **Markup**: HTML5 (semantic structure)
- **Styling**: Vanilla CSS (CSS variables, Flexbox)
- **Scripting**: Vanilla JavaScript (ES6, Native DOM APIs)
- **External Assets**: Google Fonts (Quicksand) via CDN
- **Persistence**: Browser `localStorage`

**Backend Dependencies**
*No backend. Fully client-side application.*

## Project Structure

```text
kanban-board/
├── .git/                   # Git repository data
├── test/                   # Test directory (currently empty)
├── docs.html               # Technical documentation page (minimalist Strivo-style theme)
├── docs.css                # Styles for the documentation page
├── index.html              # Core semantic layout, board columns, and task-creation modal markup
├── script.js               # Core logic: DOM selection, drag-and-drop bindings, task CRUD, and persistence
└── style.css               # CSS variables, resets, Flexbox layout rules, hover states, and transitions
```

## Database / Data Structure

There is no traditional database. Data is stored in browser `localStorage` as a single stringified JSON object under the key `tasks`.

**Board State JSON Structure (localStorage: `tasks`)**

```json
{
  "todo": [
    {
      "title": "Task Title",
      "description": "Task description details..."
    }
  ],
  "progress": [],
  "done": []
}
```
*Note: Task objects are intentionally minimal. They contain no unique IDs, timestamps, or explicit status fields. The status is implied entirely by which array (column ID) the task resides in.*

## Authentication & Security

None. The application is completely open and client-side only. Data is stored on the user's local machine via `localStorage`.

## Complete API Reference

No external API is consumed or provided. All data operations (CRUD) occur synchronously against the in-memory JSON object and local DOM.

## Deployment Stack

- **Hosting Platform**: Vercel (Static Deployment)
- **Build Command**: None (Static files are served directly)
- **Output Directory**: Root directory (`/`)

## Uptime Monitoring / Analytics

None configured. No tracking scripts or analytics components are present in the codebase.

## Architecture Deep Dive

- **Drag & Drop Engine**: Built on the native HTML5 Drag & Drop API (`draggable`, `dragenter`, `dragleave`, `dragover`, `drop`). It deliberately bypasses the native `dataTransfer` object in favor of a single global reference (`dragElement`) that tracks the currently dragged DOM node. 
- **DOM-as-Source-of-Truth State Sync**: Rather than the conventional React/Vue "update state → re-render DOM" flow, this app inverts it: the DOM action happens first (e.g., appending a dropped element), and then the entire `tasksData` object is rebuilt by querying the live DOM for every column's current tasks. This guarantees the saved state always matches exactly what the user sees, preventing UI/data drift.
- **Synchronous Persistence Layer**: Every state-changing action (adding a task, dropping a task, or deleting a task) synchronously serializes the entire `tasksData` object to `localStorage`. There is no debouncing or batching. On page load, the saved JSON is parsed and the DOM is completely rehydrated node-by-node via `document.createElement`.
- **Delegated Task Deletion**: Instead of attaching a delete event listener to every single task button, the app uses a single delegated `click` listener on the `document`. It checks if the clicked target contains the `.button` class, locates the parent task node, removes it, and triggers a scoped rebuild of just that specific column's state.

## Environment Variables

None. The application does not require any environment variables.

## Scripts

There is no `package.json`, so there are no npm scripts.

## Pages & Routes

| Path | Component/File | Auth Required | Description |
| ---- | -------------- | ------------- | ----------- |
| `/` | `index.html` | No | The main Kanban board interface |
| `/docs.html` | `docs.html` | No | Comprehensive technical documentation page |

## Known Limitations & Missing Features

- **No Unique Identifiers**: Tasks lack UUIDs or timestamps. They are identified implicitly by their position in the DOM.
- **No Mobile Responsiveness**: The layout is purely Flexbox without media queries. It relies on a desktop viewport width and will overflow or compress poorly on narrow mobile screens.
- **No Edit Functionality**: Tasks cannot be edited once created; they must be deleted and recreated.
- **No Intra-column Reordering**: Dropped tasks are always appended to the bottom of the target column. You cannot drag a task and place it between two specific tasks within the same column.
- **Empty Tests**: A `test/` directory exists but contains no unit or integration tests. 
- **No Rate Limiting or Input Sanitization**: While rate limiting is irrelevant for a purely client-side app, input fields (`input`, `textarea`) are not strictly sanitized for HTML injection before being mapped to `textContent` (though `textContent` is inherently safe from XSS, it limits rich text).

## Local Development Setup

Because there are no build tools or dependencies, setup is instantaneous:

1. Clone the repository:
   ```bash
   git clone https://github.com/Samarthpagaria/kanban-board.git
   ```
2. Navigate to the directory:
   ```bash
   cd kanban-board
   ```
3. Open `index.html` in any modern web browser. (Alternatively, use a tool like VS Code Live Server for hot-reloading during development).

## Contributing / Code Style

Contributions are welcome! Please ensure that you maintain the zero-dependency philosophy. Write plain Vanilla JS, keep CSS variables organized in the `:root` pseudo-class, and avoid introducing build tools unless fundamentally restructuring the project.

## License

MIT License (Implicit)

## Author

**Samarth Pagaria**
- GitHub: [@Samarthpagaria](https://github.com/Samarthpagaria)
