import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState(null);
	const navigate = useNavigate();

	const MIN_LENGTH = 5;
	const MAX_LENGTH = 25;

	const submitHandler = async (e) => {
		e.preventDefault();
		setMessage('');

		if (!username) {
			setMessage('Please enter your username.');
			return;
		}

		if (username.length < MIN_LENGTH || username.length > MAX_LENGTH) {
			setMessage('Username must contain 5 to 25 characters.');
			return;
		}

		if (!password) {
			setMessage('Please enter your password.');
			return;
		}

		if (password.length < MIN_LENGTH || password.length > MAX_LENGTH) {
			setMessage('Password must contain 5 to 25 characters.');
			return;
		}

		try {
			const response = await fetch('http://localhost:3000/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});

			let data = {};

			try {
				data = await response.json();
			} catch {}

			if (!response.ok) {
				throw new Error(data.message || 'Login failed');
			}

			localStorage.setItem('token', data.token);
			localStorage.setItem('userLogin', data.username);
			navigate('/dashboard');
		} catch (err) {
			setMessage(err.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<form
				onSubmit={submitHandler}
				className="p-6 bg-white rounded shadow-md w-full max-w-sm"
			>
				<img
					src="/logo-round.png"
					alt="Sense notes logo"
					className="flex mb-5 max-h-40 items-center max-w-full mx-auto"
				/>

				<h2 className="text-2xl font-OpenSans font-bold mb-4 flex flex-row items-center justify-center text-slate-800">
					Log in
				</h2>

				<div className="mb-4">
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full p-2 border border-blue-500 rounded-md mt-1 outline-none font-OpenSans"
						placeholder="username"
					/>
				</div>

				<div className="mb-4">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-2 border border-blue-500 rounded-md mt-1 outline-none font-OpenSans"
						placeholder="password"
					/>
				</div>

				{message && (
					<p className="mb-4 text-lg text-red-500 font-OpenSans text-center">{message}</p>
				)}

				<Button className="w-full" type="submit">
					Enter
				</Button>

				<p className="mt-4 text-center font-GoogleSans">
					Don't have an account?{' '}
					<Link to="/signup" className="text-blue-500 font-GoogleSans">
						Sign up
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
