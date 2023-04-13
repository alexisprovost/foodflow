interface StringComponentProps {
	text: string;
	className?: string;
}

const Title: React.FC<StringComponentProps> = ({ text, className }) => {
	let classes = "text-5xl font-bold"; //
	if (className) {
		classes += " " + className;
	}

	return (
		<div>
			<p className={classes}>{text}</p>
		</div>
	);
};

export default Title;
