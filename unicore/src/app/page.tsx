import NewsHighlights from "@/sections/home-page/NewsHighlights";
import FirstScreen from "@/sections/home-page/FirstScreen";
import KeyFeatures from "@/sections/home-page/KeyFeatures";
import StudentTestimonials from "@/sections/home-page/StudentTestimonials";

export default function Home() {
  return (
    <div className="mx-auto lg:mx-[100px] mb-20 px-2 md:px-0">
      <FirstScreen />
      <NewsHighlights />
      <KeyFeatures />
      <StudentTestimonials />
    </div>
  );
}
