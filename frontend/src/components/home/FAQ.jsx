import React from "react";

const FAQ = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        <details className="border rounded-xl p-4">
          <summary className="font-semibold cursor-pointer">
            What is Learnistiq?
          </summary>

          <p className="mt-3 text-gray-600">
            Learnistiq is an online learning
            platform offering industry-ready
            courses in development, design,
            business and more.
          </p>
        </details>

        <details className="border rounded-xl p-4">
          <summary className="font-semibold cursor-pointer">
            Are the courses beginner friendly?
          </summary>

          <p className="mt-3 text-gray-600">
            Yes. We provide courses for
            beginners as well as advanced
            learners.
          </p>
        </details>

        <details className="border rounded-xl p-4">
          <summary className="font-semibold cursor-pointer">
            Do I get lifetime access?
          </summary>

          <p className="mt-3 text-gray-600">
            Yes, once enrolled you can access
            the course anytime.
          </p>
        </details>

        <details className="border rounded-xl p-4">
          <summary className="font-semibold cursor-pointer">
            Can I learn at my own pace?
          </summary>

          <p className="mt-3 text-gray-600">
            Absolutely. Learn whenever and
            wherever you want.
          </p>
        </details>
      </div>
    </section>
  );
};

export default FAQ;