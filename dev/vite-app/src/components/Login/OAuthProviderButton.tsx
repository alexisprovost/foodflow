import React from "react";

interface OAuthProviderButtonProps {
	onClick?: () => void;
	text: string;
	Icon: string;
	color?: string;
}

const OAuthProviderButton: React.FC<OAuthProviderButtonProps> = ({ onClick, text, Icon, color }) => {
	if (!color) {
		color = "#7289DA";
	}

	const hoverColor = `${color}`;
	const focusColor = `${color}cc`;

	return (
		<button
			type="button"
			className="text-white w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#7289DA]/55 mr-2 mb-2 ease-in-out duration-300 focus:outline-none"
			style={{
				backgroundColor: hoverColor,
			}}
			onClick={onClick}
			onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = focusColor)}
			onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
			onFocus={(e) => (e.currentTarget.style.backgroundColor = focusColor)}
			onBlur={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
		>
			{/* These are based on this src: https://tailwindflex.com/laurits/sign-up-with-google-button */}
			{Icon && <img src={Icon} alt="Google" className="mr-2 -ml-1 w-4 h-4" />}
			{text}
		</button>
	);
};

export default OAuthProviderButton;
