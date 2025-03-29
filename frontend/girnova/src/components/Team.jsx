export default function TeamProfiles() {
    const teamMembers = [
      {
        id: 1,
        name: "Samuel Osei ",
        role: "Software Engineer",
        image:
          "images/T1.jpeg",
      },
      {
        id: 2,
        name: "Charlotte kariza",
        role: "Web Designer",
        image:
          "images/T2.jpeg",
      },
      {
        id: 3,
        name: " Amina Njeri",
        role: "Software Developer",
        image:
          "images/T3.jpeg",
      },
      {
        id: 4,
        name: "David Mwangi",
        role: "Software Developer",
        image:
          "images/T4.jpeg",
      },
    ];
  
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square relative">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={`${member.name} profile photo`}
                  className="object-cover w-full h-full "
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
  
                <div className="flex space-x-2 mt-4">
  <a href="#" className="bg-[#155DFC] text-white p-2 rounded-full hover:bg-[#155DFC] transition-colors">
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12a10 10 0 1 0-11 9.95V15h-2v-3h2V9.5a3 3 0 0 1 3-3h2v3h-2a1 1 0 0 0-1 1V12h3l-1 3h-2v6.95A10 10 0 0 0 22 12z" />
    </svg>
  </a>
  <a href="#" className="bg-[#155DFC] text-white p-2 rounded-full hover:bg-[#155DFC] transition-colors">
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.29 4.29 0 0 0 1.88-2.37 8.4 8.4 0 0 1-2.7 1.04A4.17 4.17 0 0 0 11.5 8a4.3 4.3 0 0 0 .11.95A11.93 11.93 0 0 1 3 4.56a4.18 4.18 0 0 0-.56 2.14 4.22 4.22 0 0 0 1.87 3.5 4.08 4.08 0 0 1-1.92-.53v.05a4.2 4.2 0 0 0 3.36 4.1 4.2 4.2 0 0 1-1.91.07 4.24 4.24 0 0 0 3.95 2.94A8.36 8.36 0 0 1 2 19.5a11.78 11.78 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.68 0-.18-.01-.36-.02-.54A8.3 8.3 0 0 0 22.46 6z" />
    </svg>
  </a>
  <a href="#" className="bg-[#155DFC] text-white p-2 rounded-full hover:bg-[#155DFC] transition-colors">
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12a10 10 0 1 0-11 9.95V15h-2v-3h2V9.5a3 3 0 0 1 3-3h2v3h-2a1 1 0 0 0-1 1V12h3l-1 3h-2v6.95A10 10 0 0 0 22 12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  