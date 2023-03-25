import Title from "../Title";

const Holder = () => {
	return (
		<div className="h-[inherit] flex justify-center items-center">
            <section className="bg-secondary rounded-[2rem] shadow-lg p-6 mx-6 my-8 lg:my-16 w-full overflow-auto h-full">
                <Title text="Test" />
            </section>
        </div>
	);
};

export default Holder;
