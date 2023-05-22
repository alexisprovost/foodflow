interface StringComponentProps {
	text: string;
	className?: string;
	customSize?: string;
}

const Title: React.FC<StringComponentProps> = ({ text, className, customSize }) => {
	let classes = "pt-4 md:pt-0 font-bold";

	if (customSize) {
		classes += " " + customSize;
	} else {
		classes += " text-5xl";
	}

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
