import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export const CustomButton = ({ className, link, text }) => {
    const classes = twMerge(`
    w-full 
    hover:cursor-pointer 
    hover:bg-[#0c85d0]
    text-white 
    text-lg
    font-normal 
    bg-[#1da0f2] 
    border-none
    rounded-[5px] 
    border-[2px] 
    py-[15px] 
    px-[20px]
    duration-300
    ${className ?? ''}
  `);

    return (
        <div className="w-full text-center">
            <Link href={link}>
                <button className={classes}>{text}</button>
            </Link>
        </div>
    );
};
