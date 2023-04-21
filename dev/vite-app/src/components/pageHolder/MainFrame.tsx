import { ReactNode } from "react";

interface MyComponentProps {
	children: ReactNode;
}

function MainFrame({ children }: MyComponentProps) {
	return <section className="md:ml-24 ml-0 pb-28 md:pb-0 p-8 md:p-14 h-full overflow-auto">{children}</section>;
}

export default MainFrame;
