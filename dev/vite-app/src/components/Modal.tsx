import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
	const modalRoot = document.getElementById("modal-root") as HTMLElement;
	const modalElement = document.createElement("div");

	useEffect(() => {
		modalRoot.appendChild(modalElement);

		return () => {
			modalRoot.removeChild(modalElement);
		};
	}, [modalElement, modalRoot]);

	return ReactDOM.createPortal(children, modalElement);
};

export default Modal;
