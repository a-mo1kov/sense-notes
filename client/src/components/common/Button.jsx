const Button = ({ children, className = '', ...props }) => {
	return (
		<button
			className={`inline-block bg-blue-500 text-white font-semibold font-OpenSans px-6 py-3 rounded-2xl border-2 hover:bg-white hover:text-blue-500 hover:border-2 transition-colors duration-500 ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
