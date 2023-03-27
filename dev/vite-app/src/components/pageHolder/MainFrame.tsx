import { ReactNode } from "react";

interface MyComponentProps {
	children: ReactNode;
}

function MainFrame({ children }: MyComponentProps) {
	return <section className="ml-24 p-14 h-full overflow-auto">{children}</section>;
}

export default MainFrame;
