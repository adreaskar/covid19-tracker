import { Container } from '@/components/Container';
import { Credits } from '@/components/Credits';
import { Footer } from '@/components/Footer';
import { Form } from '@/components/Form';

export default function Home({ searchParams }) {
    return (
        <>
            <Container>
                <div className="py-[60px] md:py-[40px] flex flex-col items-center">
                    <Form />

                    <Footer lang={searchParams.lang} />
                </div>
            </Container>

            <Credits lang={searchParams.lang} />
        </>
    );
}
