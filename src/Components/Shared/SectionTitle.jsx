
const SectionTitle = ({ heading }) => {
    return (
        <div className='mx-auto text-center w-full md:w-2/3 lg:w-1/2'>
            <h3 className='text-7xl text-[#F85A47] my-8 text-center font-bold border-y-2  border-[#F85A47]'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;