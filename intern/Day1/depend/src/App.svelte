<script>
  let count = 0;
  let name = "";
  let showMessage = false;

  let fruits = ["Apple", "Banana", "Mango"];

  function increment() {
    count += 1;
  }
</script>

<style>
  h1 {
    color: #ff3e00;
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
  }

  button {
    padding: 0.5rem 0.8rem;
    margin: 0.25rem 0;
    border: none;
    border-radius: 6px;
    background: #ff3e00;
    color: white;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.9;
  }

  input {
    display: block;
    margin: 0.75rem 0;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 6px;
  }

  ul {
    padding-left: 1.25rem;
  }

  li {
    margin: 0.25rem 0;
  }
</style>

<h1>Svelte Practice</h1>

<section>
  <h3>Counter</h3>
  <p>Counter: {count}</p>
  <button on:click={increment}>Increment</button>
</section>

<section>
  <h3>Greeting</h3>
  <input bind:value={name} placeholder="Enter your name" />
  <p>Hello {name}</p>
</section>

<section>
  <h3>Toggle Message</h3>
  <button on:click={() => (showMessage = !showMessage)}>
    Toggle Message
  </button>

  {#if showMessage}
    <p>Message is Visible!</p>
  {/if}
</section>

<section>
  <h3>Fruits</h3>
  <ul>
    {#each fruits as fruit}
      <li>{fruit}</li>
    {/each}
  </ul>
</section>