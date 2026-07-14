import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import PricingPreview from "../../components/home/PricingPreview";
import Footer from "../../components/layout/Footer";

export default function Home() {
    return (
        <>
            <Navbar />

            <Hero />

            <Features />

            <PricingPreview />

            <Footer />
        </>
    );
}