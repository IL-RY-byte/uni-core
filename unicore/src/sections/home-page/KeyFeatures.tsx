const features = [
  {
    title: "Digital Integration",
    description:
      "Simplify your university life with document signing, booking, and more",
    iconText: "📄",
  },
  {
    title: "Effortless Communication",
    description: "Chat with peers, faculty, and support staff",
    iconText: "💬",
  },
  {
    title: "Streamlined Schedules",
    description: "Access your classes and deadlines in one place",
    iconText: "📅",
  },
];

const KeyFeatures = () => {
  return (
    <section className="container py-12 ld:py-0 w-full md:min-h-[30vh] lg:min-h-[100vh] flex flex-col lg:flex-row items-center justify-between">
      {/* Left Section */}
      <div className="md:w-1/2 text-left">
        <h2 className="text-[28px] sm:text-2xl font-bold">Key Features Overview</h2>
        <p className="mt-2 mb-4">Discover the benefits of using UniCore</p>
      </div>

      {/* Right Section */}
      <div className="w-full flex flex-col space-y-4 md:h-[480px] max-w-[520px]">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center h-full w-full shadow-sm border-gray-100 border-2 rounded-lg p-4 hover:shadow-lg transition md:gap-11 "
          >
            {/* Icon Box */}
            <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-md text-2xl">
              {feature.iconText}
            </div>

            {/* Text Content */}
            <div className="ml-4">
              <p className="font-bold font-xl">{feature.title}</p>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;
