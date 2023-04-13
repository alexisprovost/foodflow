import React, { ChangeEvent, useState } from "react";

export interface InputProps {
	type: string;
	id?: string;
	name?: string;
	className?: string;
	label?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Label {
	label: string;
	children: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ type, id, name, className, label, value, onChange }) => {
	let classes = "w-full text-lg px-5 py-3 font-bold bg-primary text-gray-200 border border-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none" + (className ? " " + className : "");
	let randomId = Math.random().toString(36).substr(2, 9);

	if (!id) {
		id = randomId;
	}

	if (!name) {
		name = randomId;
	}

	if (className) {
		classes += " " + className;
	}

	const Label = ({ label, children }: Label) => (
		<div>
			<label>{label}</label>
			{children}
		</div>
	);

	return (
		<>
			{label ? (
				<Label label={label}>
					<input key={randomId} id={id} type={type} name={name} className={classes} value={value} onChange={onChange} />
				</Label>
			) : (
				<input key={randomId} id={id} type={type} name={name} className={classes} value={value} onChange={onChange} />
			)}
		</>
	);
};

export default Input;
