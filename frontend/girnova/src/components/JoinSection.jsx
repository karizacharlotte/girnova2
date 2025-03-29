export default function JoinSection() {
    return (
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-16 h-1.5 bg-gradient-to-r from-transparent to-[#155dfc]"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#155dfc] tracking-wide">BE PART OF THE CHANGE!</h2>
            </div>
  
            <p className="text-gray-700 text-lg leading-relaxed">
            Are you ready to shape the future of tech in Africa? Girnova is here to help you take that leap. Discover our tailored training and development programs designed to equip you with the skills needed to succeed, or join our talent pool today to get noticed by top companies offering incredible opportunities. Position yourself for success in Africa’s rapidly growing tech industry with Girnova.
            </p>
  
            <div className="pt-4">
              <button className="flex items-center border-2 border-[#155DFC] text-[#155DFC] hover:bg-blue-50 rounded px-8 py-6 text-base font-medium">
                JOIN US NOW
                <svg
                  className="ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 17l5-5-5-5v10z" />
                </svg>
              </button>
            </div>
          </div>
  
      
        </div>
      </section>
    );
  }
  