interface StringComponentProps {
	text: string;
}

const Title: React.FC<StringComponentProps> = ({ text }) => {
	return (
		<div>
			<p className="text-5xl font-bold">{text}</p>
		</div>
	);
};

export default Title;
