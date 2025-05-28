import AboutHome from "@/components/home/about";
import Contact from "@/components/home/contact";
import Hero from "@/components/home/hero";
import Pilates from "@/components/home/pilates";
import Services from "@/components/home/services";
import Testimonials from "@/components/home/testimonials";
import Timetable from "@/components/home/timetable";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <AboutHome />
      <Pilates />
      <Services />
      <Timetable />
      <Contact />
      <Testimonials />
    </div>
  );
}
