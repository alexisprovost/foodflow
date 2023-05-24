interface WarningHolderProps {
	children?: React.ReactNode;
}

const WarningHolder = ({ children }: WarningHolderProps) => {
	return (
		<div className="loading" style={{ display: "flex", justifyContent: "center", padding: "0 0 4rem 0" }}>
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<p style={{ color: "#fff", marginTop: "1rem", padding: "1rem 0 0 0", textAlign: "center" }}>{children}</p>
			</div>
		</div>
	);
};

export default WarningHolder;
