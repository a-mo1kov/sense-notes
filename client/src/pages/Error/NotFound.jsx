import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';

const NotFound = () => {
	const navigate = useNavigate();

	const returnBack = () => {
		const isAuthorized = Boolean(localStorage.getItem('token'));

		if (isAuthorized) {
			navigate('/dashboard');
		} else {
			navigate('/login');
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-white">
			<div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl shadow-md drop-shadow-2xl">
				<div className="text-8xl font-bold text-blue-500 mb-4 font-OpenSans">404</div>
				<h1 className="text-4xl font-bold text-slate-800 mb-4 font-OpenSans">
					Time's slipping away!
				</h1>
				<p className="text-lg text-slate-800 mb-6 font-OpenSans">
					You've stumbled into a gap in the timeline. This page doesn't exist, but your
					schedule won't wait. Let's get back to being productive.
				</p>
				<Button onClick={returnBack} className="w-full">
					Go home
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
