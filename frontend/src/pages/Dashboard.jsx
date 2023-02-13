import React, { useEffect, useState } from "react";
import PostDashboard from "../components/PostDashboard";
import axios from "axios";
import PostForm from "../components/PostForm";

function Dashboard() {
	const [posts, setPosts] = useState(null);

	const getPost = async () => {
		await axios
			.get("http://localhost:5000/posts")
			.then((res) => {
				setPosts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getPost();
	}, []);

	return (
		<div>
			<PostForm />
			{posts && <PostDashboard posts={posts} />}
		</div>
	);
}

export default Dashboard;
