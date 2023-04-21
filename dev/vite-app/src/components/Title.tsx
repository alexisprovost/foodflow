interface StringComponentProps {
	text: string;
	className?: string;
}

const Title: React.FC<StringComponentProps> = ({ text, className }) => {
	let classes = "pt-4 md:pt-0 text-5xl font-bold"; //
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
