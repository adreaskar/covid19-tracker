export const Credits = ({ lang }) => {
    return (
        <div className="text-center text-[rgb(179,179,179)]">
            {lang != 'el'
                ? 'A project made in 2020'
                : 'Ένα project φτιαγμένο το 2020'}
        </div>
    );
};
