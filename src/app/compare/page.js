import { Container } from '@/components/Container';
import { Credits } from '@/components/Credits';
import { Footer } from '@/components/Footer';
import { FormCompare } from '@/components/FormCompare';

export default function Compare({ searchParams }) {
    return (
        <>
            <Container>
                <div className="py-[60px] md:py-[40px] flex flex-col items-center">
                    <FormCompare />

                    <Footer lang={searchParams.lang} />
                </div>
            </Container>

            <Credits lang={searchParams.lang} />
        </>
    );
}
