function HomeSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-12 py-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center">
        
        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center">
          <img 
            src="images/pic.jpeg" 
            className="rounded-lg w-full sm:mt-12 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full"
            alt="HerTechWings"
          />
        </div>

        {/* Text Content */}
        <div className="lg:w-1/2 lg:ml-12 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight">
          Empowering Girls in Tech Across Africa{" "}
            <span className="text-[#155dfc]">At Girnova</span>
          </h1>
          <p className="mt-4 text-black text-base sm:text-lg">
          we inspire and equip young girls across Africa with the skills, mentorship, and community{" "}
          support needed to succeed in technology. Our goal is to break barriers and{" "}
          create equal opportunities in the tech industry for girls from all backgrounds.
          </p>

      
          <div className="mt-6">
            <button className="bg-[#155dfc] text-white px-6 py-3 rounded-lg mb-4 font-medium shadow-md hover:bg-[#9DC9F6] transition">
              Join Our Community
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HomeSection;
