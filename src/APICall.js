import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/posts',
});

function APICall(){
	
  const [essays, setEssays] = useState([]);
  const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	

	useEffect(() => {
		const fetchEssay = async () => {
			try {
				let response = await url.get('?_limit=15');
				setEssays(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchEssay();
	}, []);

  const addEssay = async (title, body) => {
		try {
			let response = await url.post('', {
				title: title,
				body: body,
			});
			setEssays([response.data, ...essays]);
			setTitle('');
			setBody('');
		} catch (error) {
			console.log(error);
		}
	};

	
	const deleteEssay = async (id) => {
		try {
			await url.delete(`${id}`);
			setEssays(
				essays.filter((essay) => {
					return essay.id !== id;
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	const formSubmit = (e) => {
		e.preventDefault();
		addEssay(title, body);
	};

return (
		<div className="app">
			<div className="appTitle">
				<h1 className="navTitle">FREE ESSAYS</h1>
			</div>
			<div className="add-essays-container">
				<form onSubmit={formSubmit}>
					<input
						type="text"
						className="form-control"
						value={title}
            placeholder="Enter Essay Title"
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						name=""
						className="form-control"
						id=""
						cols="10"
						rows="8"
						value={body}
            placeholder="Type Essay Body Here...."
						onChange={(e) => setBody(e.target.value)}
					></textarea>
					<button type="submit">ADD ESSAY</button>
				</form>
			</div>
			<div className="essays-container">
				<h2 className="subTitle">FIND ESSAYS HERE</h2>
				{essays.map((essay) => {
					return (
						<div className="essay-card" key={essay.id}>
							<h2 className="essay-title">{essay.title}</h2>
							<p className="essay-body">{essay.body}</p>
							<div className="button">
								<div className="delete-btn" onClick={() => deleteEssay(essay.id)}>
									DELETE ESSAY
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default APICall;
