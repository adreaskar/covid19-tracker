export const Container = ({ children }) => {
    return (
        <div className="bg-white w-[85%] md:w-[65%] lg:w-[45%] shadow-lg rounded-[10px]">
            {children}
        </div>
    );
};
