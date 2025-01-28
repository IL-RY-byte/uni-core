const testimonials = [
  {
    name: "Sophia",
    review: "UniCore transformed how I...",
    rating: 5,
  },
  {
    name: "Ethan",
    review: "Effortless communication a...",
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex text-yellow-500 space-x-1">
      {Array.from({ length: rating }, (_, i) => (
        <span key={i}>⭐</span>
      ))}
    </div>
  );
};

const StudentTestimonials = () => {
  return (
    <section className="container w-full">
      <div className="mx-auto flex flex-col items-center gap-6 md:gap-12 max-w-6xl min-w-fit pt-12 ld:py-0 lg:flex-row">
        <div className="text-left lg:w-1/2">
          <h2 className="text-[28px] sm:text-2xl font-bold">
            Student Testimonials
          </h2>
          <p className="mt-2">
            Here&apos;s what users are saying about UniCore
          </p>
        </div>

        <div className="flex flex-col items-center justify-left gap-4 w-full md:flex-row lg:w-1/2">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full max-w-[300px] sm:max-w-[400px] lg:w-64 bg-gray-100 p-4 flex flex-col space-y-2 rounded-lg shadow-md transition hover:shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <p className="font-bold">{testimonial.name}</p>
              </div>

              <StarRating rating={testimonial.rating} />
              <p className="truncate">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentTestimonials;
