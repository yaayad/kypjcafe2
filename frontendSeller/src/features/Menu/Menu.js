import Cookies from "js-cookie";
import React from "react";
import useFetch from "../../hooks/useFetch";
import Header from '../../components/Header';
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
	const seller_id = Cookies.get("seller_id");
	const { data, isLoading, error } = useFetch(`http://localhost:3500/menu/${seller_id}`);
	const navigate = useNavigate();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const handleDelete = async (item_id) => {
		console.log(item_id);
		try {
			const response = await fetch(`http://localhost:3500/menu/item/${item_id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.status === 200 || response.status === 201) {
				console.log("Delete Cafe Successful");
				navigate("/welcome");
				// You can also access the response data if the server sends any.
				console.log("Server response data:", response.data);
			} else {
				console.error("Delete failed with status code:", response.status);
				// Handle the error and provide user feedback
			}
		} catch (error) {
			console.log(error)
		}
	};

	return (
			<div className="min-h-screen text-black font-Rubik bg-gradient-to-r  from-slate-200 to-slate-500">
			<Header/>

			<h1 className="mt-10 text-zinc-900 text-3xl text-center">All Menus</h1>
			<div className="flex justify-center item-center mt-5 ">
				<Link to={"create-menu"}>
					<button className="px-5 py-2 mt-4 font-medium text-white transition duration-300 ease-in-out delay-60 bg-slate-600 hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r from-slate-600 to-slate-800 rounded-3xl drop-shadow-lg">Add Menu</button>
				</Link>
			</div>
			<div className="flex justify-center items-center gap-4 p-4 max-w-full font-Rubik antialiased">
				{data.length === 0 ? (
					// Display the "Create Menu" button when data is empty
					<div className="text-center">
						<p>No menu items found. Create your menu now!</p>
						<Link to="create-menu">
							<button className="px-4 py-2 mt-4 font-medium text-white transition duration-300 ease-in-out delay-60 bg-slate-600 hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r from-slate-600 to-slate-800 rounded-3xl drop-shadow-lg">Create Menu</button>
						</Link>
					</div>
				) : (
					// Display menu items if data is not empty
					data.map((item) => (
						<div key={item.item_id} className="px-3 py-3 mt-4 font-medium text-white bg-gradient-to-r from-slate-400 to-slate-500 rounded-3xl drop-shadow-lg">
							<img src={`http://localhost:3500/images/${item.item_image_url}`} alt="" className="rounded-2xl w-52 max-h-[116px] m-auto" />
							<div className="flex justify-between items-center">
								<p>{item.item_name}</p>
								<p>{item.price}</p>
							</div>

							<Link to={`edit/${item.item_id}`}>
								<button className="px-5 py-2 mt-4 font-medium text-white transition duration-300 ease-in-out delay-60 bg-slate-600 hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r from-slate-600 to-slate-800 rounded-3xl drop-shadow-lg">Edit</button>
							</Link>

							<button className="px-2 py-2 ml-14 mt-4 font-medium text-white hover:text-[#FF0000] transition duration-300 ease-in-out delay-60 hover:-translate-y-1  hover:scale-102" onClick={() => handleDelete(item.item_id)}>Delete</button>
						</div>
					))
				)}
			</div>
			</div>
	);
};

export default Menu;
