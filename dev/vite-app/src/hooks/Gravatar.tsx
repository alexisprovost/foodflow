import { FC } from "react";
import md5 from "md5";

interface GravatarProps {
	email: string;
	size?: number;
	defaultImage?: string;
	className?: string;
}

const Gravatar: FC<GravatarProps> = ({ email, size = 80, defaultImage = "identicon", className }) => {
	const normalizedEmail = email.trim().toLowerCase();
	const hash = md5(normalizedEmail);
	const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultImage}`;
	return <img src={gravatarUrl} alt="Gravatar" className={className} width={size} height={size} />;
};

export default Gravatar;
