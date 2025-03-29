const testimonials = [
    {
      id: 1,
      name: " Reshma Saujani ",
      company: "Girls Who Code",
      image: "images/pic1.jpeg",
      text: " Created one of the largest coding programs for girls",
      rating: 5,
    },
    {
      id: 2,
      name: " Kimberly Bryant ",
      company: "Black Girls Code",
      image: "images/Pic 2.jpeg",
      text: "Empowered thousands of Black girls in STEM.",
      rating: 5,
    },
    {
      id: 3,
      name: "Fei-Fei Li",
      company: "AI Researcher & Co-Director of Stanford HAI",
      image: "images/pic3.jpeg",
      text: "Inspires the next generation of women in AI.",
      rating: 5,
    },
  ];
  
  export default function TestimonialsSection() {
    let activePage = 0;
  
    return (
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Successful Stroies of Women in Tech
            </h2>
          </div>

        </div>
  
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="border shadow-sm rounded-lg p-8 flex flex-col items-center text-center">
             <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#155DFC] p-1 mb-6">

                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{testimonial.name}</h3>
              <p className="text-gray-500 mb-6">{testimonial.company}</p>
              <p className="text-gray-600 mb-6">{testimonial.text}</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? "text-[#155DFC] fill-[#155DFC]" : "text-gray-200"}`}

                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.429 8.2 1.191-5.934 5.78 1.4 8.158L12 18.896l-7.334 3.849 1.4-8.158L.132 9.207l8.2-1.191L12 .587z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
  
        <div className="flex justify-center mt-10 gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${activePage === index ? "bg-[#155DFC]" : "bg-gray-200"}`}

              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    );
  }
  