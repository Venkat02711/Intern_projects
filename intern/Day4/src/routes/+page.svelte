<script>
	import { auth } from '$lib/firebase';
	import {
		signInWithEmailAndPassword,
		createUserWithEmailAndPassword
	} from 'firebase/auth';

	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');

	async function login() {
		try {
			await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
		}
		catch {
			await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
		}

		if (
			auth.currentUser.email ===
			'manager@gmail.com'
		) {
			goto('/manager');
		}
		else {
			goto('/employee');
		}
	}
</script>

<div class="container">
	<div class="card">
		<h1>Leave Management System</h1>

		<input
			bind:value={email}
			type="email"
			placeholder="Enter Email"
		/>

		<input
			bind:value={password}
			type="password"
			placeholder="Enter Password"
		/>

		<button onclick={login}>
			Login / Register
		</button>

		<p>
			New employees are created automatically.
		</p>
	</div>
</div>

<style>
	.container {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #f4f6f8;
		font-family: Arial, sans-serif;
	}

	.card {
		background: white;
		padding: 30px;
		width: 350px;
		border-radius: 10px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	h1 {
		margin-bottom: 20px;
	}

	input {
		width: 100%;
		padding: 10px;
		margin: 10px 0;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-radius: 6px;
	}

	button {
		width: 100%;
		padding: 10px;
		background: #2196f3;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		margin-top: 10px;
	}

	button:hover {
		background: #1976d2;
	}

	p {
		margin-top: 15px;
		color: gray;
		font-size: 14px;
	}
</style>