import axios from "axios";
import React, { useState } from "react";
import jwt_decoded from "jwt-decode";

function PostForm() {
	const [judul, setJudul] = useState("");
	const [isi, setIsi] = useState("");
	const [kategori, setKategori] = useState("");

	const [token, setToken] = useState("");
	const [exp, setExp] = useState("");

	const axiosJWT = axios.create();

	const refreshToken = async () => {
		try {
			await axios.get("http://localhost:5000/token").then(async (res) => {
				setToken(res.data);
				const decoded = await jwt_decoded(res.data);
				setExp(decoded.exp);
			});
		} catch (error) {
			console.log(error);
		}
	};

	axiosJWT.interceptors.request.use(async (config) => {
		if (exp * 1000 < new Date().getTime()) {
			await axios
				.get("http://localhost:5000/token")
				.then(async (res) => {
					config.headers.Authorization = `Bearer ${res.data}`;
					setToken(res.data);
					const decoded = await jwt_decoded(res.data);
					setExp(decoded.exp);
					console.log(config);
					return config;
				})
				.catch((err) => {
					return Promise.reject(err);
				});
		}
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axiosJWT
			.post("http://localhost:5000/users", {
				judul: judul,
				isi: isi,
				kategori: kategori,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="mt-10 bg-green-400 w-[90%] mx-auto rounded-lg flex flex-col gap-5 p-5"
		>
			<input
				type="text"
				placeholder="judul"
				onChange={(e) => setJudul(e.target.value)}
				className="py-2 px-3 rounded-lg outline-none"
			/>
			<input
				type="text"
				placeholder="isi"
				onChange={(e) => setIsi(e.target.value)}
				className="py-2 px-3 rounded-lg outline-none"
			/>
			<input
				type="text"
				placeholder="kategori"
				onChange={(e) => setKategori(e.target.value)}
				className="py-2 px-3 rounded-lg outline-none"
			/>
			<button
				type="submit"
				className="bg-slate-300 py-2 rounded-lg hover:bg-slate-400 font-semibold"
			>
				Send
			</button>
		</form>
	);
}

export default PostForm;
