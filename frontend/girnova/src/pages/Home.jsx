import CourseSection from "../components/Courses";
import Footer from "../components/Footer";
import Header from "../components/Header";

import HomeSection from "../components/Homesection";
import JoinSection from "../components/JoinSection";

import TestimonialsSection from "../components/TestimonialSection"

export default function Home(){
    return(
        <>
        <Header/>
        <HomeSection />
        <JoinSection />
        <CourseSection />
   
        <TestimonialsSection />
        <Footer/>
        </>
        
    );
}