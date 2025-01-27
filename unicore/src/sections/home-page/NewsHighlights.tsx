const highlights = [
  {
    title: "University Life Update",
    description:
      "Stay updated on events, vacancies, and university announcements",
    iconText: "Streamlined Schedules Icon",
  },
  {
    title: "Global Academic Events",
    description: "Explore global academic events and scientific breakthroughs",
    iconText: "Effortless Communication Icon",
  },
  {
    title: "Upcoming Events and Reminders",
    description: "Never miss out on important events with automatic reminders",
    iconText: "Digital Integration Icon",
  },
];

const NewsHighlights = () => {
  return (
    <section className="container py-12 ld:py-0 flex flex-col items-center justify-center w-full md:min-h-[30vh] lg:min-h-[100vh]">
      <h2 className="text-[28px] sm:text-2xl font-bold text-center">
        Latest News and Highlights
      </h2>
      <p className="text-center mt-2">Discover the benefits of using UniCore</p>

      <div className="h-[400px] md:h-[440px] min-h-fit mt-8 flex flex-col lg:flex-row items-center justify-center gap-11">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="flex flex-col h-[400px] md:min-h-[440px] max-w-[300px] sm:max-w-[340px] min-w-[260px] h-full rounded-lg shadow-sm border-gray-100 border-2"
          >
            <div className="h-3/4 flex items-center justify-center bg-gray-200 rounded-t-lg text-gray-500">
              {item.iconText}
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
