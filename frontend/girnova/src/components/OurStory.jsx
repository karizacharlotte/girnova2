export default function HertechwingsStory() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-black">The Strategic Foundation Of</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#155DFC]">"GIRNOVA"</h3>
          <p className="text-gray-800 text-lg">
          Girnova is a vision that empowers young girls by uniting their strength, the power of technology, and limitless possibilities. "Gir" represents the fierce, driven girls with the potential to shape the future, while "Nova" symbolizes a new beginning, where every girl shines brightly. At Girnova, we provide a platform for girls to discover technology, gain valuable skills, and unlock new opportunities. Our mission is to equip them to solve Africa's tech challenges, break barriers, and lead with confidence. Girnova is not just about teaching tech; it's about transforming lives and helping every girl soar beyond her dreams.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <div className="rounded-[40px] overflow-hidden">
            <img
              src="images/tech.jpeg"
              alt="SOLVIT AFRICA team members with medals"
              width={100}
              height={70}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

