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
    <div className="flex space-x-1 text-yellow-500">
      {Array.from({ length: rating }, (_, i) => (
        <span key={i}>⭐</span>
      ))}
    </div>
  );
};

const StudentTestimonials = () => {
  return (
    <section className="container w-full">
      <div className="py-12 ld:py-0 max-w-6xl min-w-fit mx-auto flex flex-col lg:flex-row items-center gap-6 md:gap-12">
        {/* Left Section - Title */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-[28px] sm:text-2xl font-bold">Student Testimonials</h2>
          <p className="mt-2">
            Here&apos;s what users are saying about UniCore
          </p>
        </div>

        {/* Right Section - Testimonials */}
        <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center justify-left gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full md:w-64 bg-gray-100 rounded-lg shadow-md p-4 flex flex-col space-y-2 hover:shadow-lg transition"
            >
              {/* Avatar & Name */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <p className="font-bold">{testimonial.name}</p>
              </div>

              {/* Star Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Review */}
              <p className="truncate">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentTestimonials;
