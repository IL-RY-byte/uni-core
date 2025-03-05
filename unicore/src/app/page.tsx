import NewsHighlights from "@/sections/home-page/NewsHighlights";
import FirstScreen from "@/sections/home-page/FirstScreen";
import KeyFeatures from "@/sections/home-page/KeyFeatures";
import StudentTestimonials from "@/sections/home-page/StudentTestimonials";
import Header from "@/components/HeaderComponent";
import Footer from "@/components/FooterComponent";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="mx-auto lg:mx-[100px] mb-20 px-2 md:px-0 bg-silver font-montserrat pt-[80px] md:pt-[60px] sm:pt-[50px]">
        <FirstScreen />
        <NewsHighlights />
        <KeyFeatures />
        <StudentTestimonials />
      </main>
      <Footer />
    </div>
  );
}
