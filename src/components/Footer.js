import Image from 'next/image';

export const Footer = ({ lang }) => {
    return (
        <div className="mt-[45px] text-[#888] text-center flex flex-col gap-2">
            <p>
                {lang != 'el'
                    ? 'Made possible with: '
                    : 'Πραγματοποιήθηκε με το: '}
                <a
                    className="no-underline hover:underline"
                    href="https://disease.sh"
                    target="_blank"
                >
                    <span>disease.sh</span>
                </a>
            </p>
            <a
                className="text-[#1da0f2] no-underline hover:underline"
                href="https://github.com/adreaskar/covid19-tracker"
                target="_blank"
            >
                <Image
                    src="/images/github.png"
                    alt="github"
                    width={30}
                    height={30}
                    className="inline opacity-30 hover:opacity-50 duration-300"
                />
            </a>
        </div>
    );
};
