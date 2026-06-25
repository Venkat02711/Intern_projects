<script>
	import { auth, db } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	import {
		signOut,
		onAuthStateChanged
	} from 'firebase/auth';

	import {
		collection,
		addDoc,
		onSnapshot
	} from 'firebase/firestore';

	let reason = $state('');
	let startDate = $state('');
	let endDate = $state('');
	let requests = $state([]);

	if (browser) {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				goto('/');
			}
		});
	}

	onSnapshot(
		collection(db, 'leaveRequests'),
		(snapshot) => {
			requests = snapshot.docs.map((d) => ({
				id: d.id,
				...d.data()
			}));
		}
	);

	async function applyLeave() {
		if (
			!reason ||
			!startDate ||
			!endDate
		)
			return;

		await addDoc(
			collection(db, 'leaveRequests'),
			{
				employee:
					auth.currentUser.email,
				reason,
				startDate,
				endDate,
				status: 'Pending'
			}
		);

		reason = '';
		startDate = '';
		endDate = '';

		alert('Leave Applied');
	}

	async function logout() {
		await signOut(auth);
		goto('/');
	}
</script>

<div class="app">
	<div class="top">
		<h1>Employee Dashboard</h1>

		<button onclick={logout}>
			Logout
		</button>
	</div>

	<div class="form">
		<input
			bind:value={reason}
			placeholder="Reason"
		/>

		<input
			type="date"
			bind:value={startDate}
		/>

		<input
			type="date"
			bind:value={endDate}
		/>

		<button onclick={applyLeave}>
			Apply Leave
		</button>
	</div>

	<h2>My Requests</h2>

	{#each requests as req}
		{#if req.employee === auth.currentUser?.email}
			<div class="card">
				<p>
					<b>Reason:</b>
					{req.reason}
				</p>

				<p>
					<b>Dates:</b>
					{req.startDate}
					-
					{req.endDate}
				</p>

				<p>
					<b>Status:</b>
					{req.status}
				</p>
			</div>
		{/if}
	{/each}
</div>

<style>
	.app {
		padding: 20px;
		background: #f4f6f8;
		min-height: 100vh;
	}

	.top {
		display: flex;
		justify-content: space-between;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 400px;
		margin-top: 20px;
	}

	input,
	button {
		padding: 10px;
	}

	.card {
		background: white;
		padding: 15px;
		margin-top: 10px;
		border-radius: 8px;
	}
</style>