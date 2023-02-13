import React from "react";

function PostDashboard({ posts }) {
	return (
		<div className="grid grid-cols-2 justify-items-center mt-10">
			{posts.map((post) => {
				const {
					id,
					judul,
					isi,
					kategori,
					user: { name },
				} = post;

				return (
					<div key={id} className="bg-slate-300 p-5 rounded-lg">
						<h1>{judul}</h1>
						<h3>{kategori}</h3>
						<h4>
							penulis : <strong>{name}</strong>
						</h4>
						<p>{isi}</p>
					</div>
				);
			})}
		</div>
	);
}

export default PostDashboard;
