import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Aisha Sharma",
      role: "Software Developer",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "Learnistiq helped me land my first tech job. The courses are practical and easy to follow.",
    },
    {
      name: "Prince Rathore",
      role: "Entrepreneur",
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "The business courses gave me confidence to scale my startup.",
    },
    {
      name: "Priya Singh",
      role: "UX Designer",
      image:
        "https://randomuser.me/api/portraits/women/65.jpg",
      review:
        "Amazing instructors and real-world projects. Highly recommended.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Learners Say
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(
            (item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow"
              >
                <p className="text-gray-600 mb-4">
                  "{item.review}"
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full"
                  />

                  <div>
                    <h4 className="font-semibold">
                      {item.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;