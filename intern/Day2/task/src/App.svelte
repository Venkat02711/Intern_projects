<script>
// @ts-nocheck

  let task = "";

  /** @type {{id:number, text:string, completed:boolean}[]} */
  let tasks = [];

  function add() {
    if (task.trim()) {
      tasks = [
        ...tasks,
        {
          id: Date.now(),
          text: task,
          completed: false
        }
      ];
      task = "";
    }
  }

  /** @param {number} index */
  function toggle(index) {
    tasks[index].completed = !tasks[index].completed;
    tasks = [...tasks];
  }

  /** @param {number} index */
  function remove(index) {
    tasks = tasks.filter((_, i) => i !== index);
  }
</script>

<div class="app">
  <h1>To-Do App</h1>

  <div class="input-container">
    <input bind:value={task} placeholder="Enter task" />
    <button class="add-btn" on:click={add}>Add</button>
  </div>

  <ul>
    {#each tasks as task, index}
      <li>
        <span class="task-text {task.completed ? 'completed' : ''}">
          {task.text}
        </span>

        <div>
          <button class="complete-btn" on:click={() => toggle(index)}>
            Complete
          </button>

          <button class="delete-btn" on:click={() => remove(index)}>
            Delete
          </button>
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .app {
    font-family: Arial, sans-serif;
    background: #f4f6f8;
    min-height: 100vh;
    padding: 20px;
  }

  h1 {
    text-align: center;
    color: #333;
  }

  .input-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
  }

  input {
    padding: 10px;
    width: 250px;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
  }

  button {
    padding: 10px 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .add-btn {
    background: #4cafef;
    color: white;
  }

  .add-btn:hover {
    background: #2196f3;
  }

  ul {
    list-style: none;
    padding: 0;
    max-width: 400px;
    margin: auto;
  }

  li {
    background: white;
    margin: 10px 0;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .task-text {
    flex: 1;
  }

  .completed {
    text-decoration: line-through;
    color: gray;
  }

  .complete-btn {
    background: #4caf50;
    color: white;
    margin-right: 5px;
  }

  .complete-btn:hover {
    background: #45a049;
  }

  .delete-btn {
    background: #f44336;
    color: white;
  }

  .delete-btn:hover {
    background: #d32f2f;
  }
</style>