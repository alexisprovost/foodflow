interface BalanceProps {
	amount: number;
}

const Balance = ({ amount = 0 }: BalanceProps) => {
	return (
		<div className="animate__animated animate__fadeIn animate__faster ">
			<h3 className="text-teal-500 text-lg font-medium">Total balance value</h3>
			<p className="text-primaryText text-2xl font-bold">${amount.toFixed(2)}</p>
		</div>
	);
};

export default Balance;
