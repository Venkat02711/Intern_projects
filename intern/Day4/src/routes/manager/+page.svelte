<script>
	import { auth, db } from '$lib/firebase';

	import {
		signOut,
		onAuthStateChanged
	} from 'firebase/auth';

	import {
		collection,
		onSnapshot,
		updateDoc,
		doc
	} from 'firebase/firestore';

	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

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

	async function approve(id) {
		await updateDoc(
			doc(db, 'leaveRequests', id),
			{
				status: 'Approved'
			}
		);
	}

	async function reject(id) {
		await updateDoc(
			doc(db, 'leaveRequests', id),
			{
				status: 'Rejected'
			}
		);
	}

	async function logout() {
		await signOut(auth);
		goto('/');
	}
</script>

<div class="app">
	<div class="top">
		<h1>Manager Dashboard</h1>

		<button onclick={logout}>
			Logout
		</button>
	</div>

	{#each requests as req}
		<div class="card">
			<p>
				<b>Employee:</b>
				{req.employee}
			</p>

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

			<button
				class="approve"
				onclick={() =>
					approve(req.id)}
			>
				Approve
			</button>

			<button
				class="reject"
				onclick={() =>
					reject(req.id)}
			>
				Reject
			</button>
		</div>
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
		margin-bottom: 20px;
	}

	.card {
		background: white;
		padding: 15px;
		margin-bottom: 10px;
		border-radius: 8px;
	}

	button {
		padding: 8px 12px;
		margin-right: 5px;
	}

	.approve {
		background: green;
		color: white;
		border: none;
	}

	.reject {
		background: red;
		color: white;
		border: none;
	}
</style>