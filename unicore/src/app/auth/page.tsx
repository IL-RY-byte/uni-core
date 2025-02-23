import Footer from "@/components/FooterComponent";
import Header from "@/components/HeaderComponent";
import AuthPageSection from "@/sections/auth-page/AuthPageSection";

const Page = () => {
  return (
    <div>
      <Header />
      <main className="mx-auto lg:mx-[100px] mb-20 px-2 md:px-0 bg-silver font-montserrat pt-[80px] md:pt-[60px] sm:pt-[50px]">
        <AuthPageSection />
      </main>
      <Footer />
    </div>
  );
};

export default Page;
