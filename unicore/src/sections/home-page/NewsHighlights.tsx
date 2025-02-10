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

      <div className="h-[400px] md:h-[440px] min-h-fit mt-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:w-full">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="flex flex-col flex-1 lg:max-w-[350px] min-w-[230px] mx-[6px] sm:mx-0 max-w-[400px] aspect-[3.7/5] rounded-lg border-2 border-gray-200 shadow-sm max-h-[400px] lg:max-h-[450px]"
          >
            <div className="h-3/4 flex items-center justify-center bg-gray-200 rounded-t-lg text-gray-500">
              <Image
                src={item.icon}
                alt={item.iconText}
                width={200}
                height={200}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>

            <div className="px-4 py-2 flex flex-col flex-grow lg:min-h-[120px]">
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
