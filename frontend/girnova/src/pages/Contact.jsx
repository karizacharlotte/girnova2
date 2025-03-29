import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ContactPage() {
    return (
        <>
        <Header/>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M20 0C20 11.046 11.046 20 0 20C11.046 20 20 28.954 20 40C20 28.954 28.954 20 40 20C28.954 20 20 11.046 20 0Z"
                  fill="url(#paint0_linear)"
                />
              </svg>
            </div>
  
            <h1 className="text-4xl font-bold mb-2 text-gray-900">Get In Tauch</h1>
  
            <div className="mb-4">
              <label htmlFor="first-name" className="block text-gray-700 mb-2">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                placeholder="Your First Name"
                className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="last-name" className="block text-gray-700 mb-2">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                placeholder="Your Last Name"
                className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your Email Address"
                className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
  
            <div className="mb-6">
  <label htmlFor="message" className="block text-gray-700 mb-2">
    Send a message
  </label>
  <textarea
    id="message"
    placeholder="Your Message"
    className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none"
    rows="4"
  ></textarea>
</div>

  
            <button
            className="w-full rounded-lg py-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity"

            >
              Send
            </button>

          </div>
        </div>
  
        <div className="hidden md:flex w-1/2  p-12 items-center justify-center relative overflow-hidden">

         <img src="images/contact.jpeg" className="w-full h-full object-cover"/>

        </div>
      </div>
      <Footer/>
        </>
    );
  }
  