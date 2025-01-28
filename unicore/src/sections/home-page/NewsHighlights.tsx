import Image from "next/image";
import ImageUni1 from "../../../images/home/hats.jpg";
import ImageUni3 from "../../../images/home/sport.jpg";
import ImageUni2 from "../../../images/home/notes.jpg";

const highlights = [
  {
    title: "University Life Update",
    description:
      "Stay updated on events, vacancies, and university announcements",
    iconText: "Streamlined Schedules Icon",
    icon: ImageUni1,
  },
  {
    title: "Global Academic Events",
    description: "Explore global academic events and scientific breakthroughs",
    iconText: "Effortless Communication Icon",
    icon: ImageUni2,
  },
  {
    title: "Upcoming Events and Reminders",
    description: "Never miss out on important events with automatic reminders",
    iconText: "Digital Integration Icon",
    icon: ImageUni3,
  },
];

const NewsHighlights = () => {
  return (
    <section className="container py-12 ld:py-0 flex flex-col items-center justify-center w-full md:min-h-[30vh] lg:max-h-[800px]">
      <h2 className="text-[28px] sm:text-2xl font-bold text-center">
        Latest News and Highlights
      </h2>
      <p className="text-center mt-2">Discover the benefits of using UniCore</p>

      <div className="h-[400px] md:h-[440px] min-h-fit mt-8 flex flex-col lg:flex-row items-center justify-center gap-11">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="flex flex-col h-[400px] md:min-h-[440px] max-w-[300px] sm:max-w-[340px] min-w-[260px] rounded-lg shadow-sm border-gray-200 border-2"
          >
            <div className="h-3/4 flex items-center justify-center bg-gray-200 rounded-t-lg text-gray-500">
              <Image
                src={item.icon}
                alt={item.iconText}
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div className="px-4 py-2">
              <p className="line-clamp-2">{item.description}</p>
              <p className="text-xl mt-2">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsHighlights;
