import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios
			.post("http://localhost:5000/signInUsers", {
				email,
				password,
			})
			.then(() => {
				navigate("dashboard");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-slate-400 w-[90%] h-[300px] flex flex-col justify-center px-6 gap-5 rounded-lg shadow-lg"
		>
			<input
				type="email"
				placeholder="email"
				onChange={(e) => setEmail(e.target.value)}
				required
				className="py-2 px-3 rounded-lg outline-none"
			/>
			<input
				type="password"
				placeholder="***"
				onChange={(e) => setPassword(e.target.value)}
				required
				className="py-2 px-3 rounded-lg outline-none"
			/>
			<button
				type="submit"
				className="bg-green-400 py-2 rounded-lg font-semibold hover:bg-green-500"
			>
				Send
			</button>
		</form>
	);
}

export default LoginForm;
