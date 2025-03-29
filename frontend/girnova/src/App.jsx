import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import HomeSection from "./components/Homesection";
// import CourseSection from "./pages/Courses";

import HomeSection from "./components/Homesection";
import LoginPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ContactPage from "./pages/Contact";
// import TestimonialsSection from "./components/TestimonialSection";
// import SolvitStory from "./components/OurStory";
// import TeamProfiles from "./components/Team";
import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./pages/LearnerDashboard";
import TeacherDashboard from "./components/TechDash";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/techDashboard" element={<TeacherDashboard />} />
        </Routes>
      </Router>
    </>
  );
}
