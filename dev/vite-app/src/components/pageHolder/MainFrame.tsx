import { ReactNode } from "react";

interface MyComponentProps {
	children: ReactNode;
}

function MainFrame({ children }: MyComponentProps) {
	return (
		<section className="md:ml-24 ml-0 p-8 md:p-14 h-[calc(100vh-5rem)] md:h-full overflow-auto" style={{ height: "-moz-calc(100vh-5rem)" }}>
			{children}
		</section>
	);
}

export default MainFrame;
