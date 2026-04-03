import Link from "next/link";
import { HiCheckCircle, HiArrowRight, HiShieldCheck, HiStar, HiLocationMarker, HiWifi, HiHome, HiSearch, HiCalendar, HiKey, HiDesktopComputer, HiAcademicCap, HiGlobeAlt } from "react-icons/hi";
import { FaWhatsapp, FaWind, FaBroom, FaFire } from "react-icons/fa";
import PropertyCard from "@/components/PropertyCard";
import FAQAccordion from "@/components/FAQAccordion";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import { propertyService } from "@/services/propertyService";
import { Property } from "@/types/property";

export default async function Home() {
  let properties: Property[] = [];
  try {
    properties = await propertyService.getAllProperties();
  } catch (e) {
    console.error("Firebase not configured or error fetching: ", e);
  }

  return (
    <div className="flex flex-col gap-6 md:gap-10 pb-0">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero.png" 
            alt="Co-living in Hyderabad" 
            className="w-full h-full object-cover brightness-[0.6] scale-105 active:scale-110 transition-transform duration-[10s]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-[#ff385c]/10" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto md:mx-0 md:pl-20 flex flex-col gap-8 text-white pb-24 md:pb-32">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-[#ff385c] px-5 py-2 rounded-full w-fit font-bold tracking-widest text-xs uppercase shadow-lg">
            HYDERABAD'S #1 PREMIUM CO-LIVING
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter text-white drop-shadow-2xl">
            Fully Managed <br />
            <span className="text-[#ff385c] drop-shadow-[0_0_15px_rgba(255,56,92,0.3)]">Co-living Spaces </span> 
            <br />in Hyderabad.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl font-medium leading-relaxed tracking-tight">
            Premium rental homes near HITEC City, Gachibowli, and Madhapur. <br className="hidden md:block" />Designed for IT professionals. Zero brokerage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a href="#properties" className="btn-primary py-4 px-10 text-lg shadow-2xl shadow-[#ff385c]/40 hover:shadow-[#ff385c]/60 transition-all font-bold">
              View Properties <HiArrowRight />
            </a>
            <a href="#contact" className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all shadow-xl">
              Book a Visit
            </a>
          </div>
        </div>
      </section>

      {/* Benefit-Driven Strip */}
      <div className="max-w-7xl mx-auto px-6 w-full -mt-20 md:-mt-24 lg:-mt-28 relative z-10">
        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="flex items-center gap-4 p-3 md:p-4 rounded-2xl bg-blue-50/10">
            <div className="bg-[#ff385c]/10 p-4 rounded-2xl shrink-0">
               <HiCheckCircle className="text-3xl text-[#ff385c]" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-gray-900 text-lg leading-tight">No setup required — just move in</span>
              <span className="text-gray-500 text-sm font-medium">Fully furnished & WiFi ready.</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 md:p-4 rounded-2xl bg-blue-50/50">
            <div className="bg-[#008489]/10 p-4 rounded-2xl shrink-0">
               <FaBroom className="text-3xl text-[#008489]" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-gray-900 text-lg leading-tight">Save time with daily cleaning</span>
              <span className="text-gray-500 text-sm font-medium">Focus on work, we handle the chores.</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 md:p-4 rounded-2xl bg-blue-50/50">
             <div className="bg-purple-50 p-4 rounded-2xl shrink-0">
               <HiArrowRight className="text-3xl text-purple-600" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-gray-900 text-lg leading-tight">Hassle-free living near your office</span>
              <span className="text-gray-500 text-sm font-medium">Zero brokerage & simple deposits.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Audience Section - "Who is this for" */}
      <section className="max-w-7xl mx-auto px-6 w-full py-12 md:py-20 flex flex-col gap-8">
        <div className="flex flex-col text-center items-center gap-4">
          <span className="text-[#008489] font-black uppercase tracking-widest text-sm bg-[#008489]/10 px-4 py-1.5 rounded-full">
            Who is this for?
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Perfect for</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* IT Professionals */}
          <div className="group bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col gap-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50/50 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-teal-100/50 transition-colors"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-teal-50 text-[#008489] rounded-xl flex items-center justify-center text-2xl md:text-3xl shadow-inner shrink-0 leading-none">
                <HiDesktopComputer />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">IT Professionals</h3>
            </div>
            
            <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed relative z-10">
              Stay minutes away from major tech parks like **Mindspace, Cyber Towers, and Financial District**. High-speed WiFi is always on us.
            </p>
          </div>

          {/* Students */}
          <div className="group bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col gap-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50/50 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-purple-100/50 transition-colors"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl md:text-3xl shadow-inner shrink-0 leading-none">
                <HiAcademicCap />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Students</h3>
            </div>
            
            <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed relative z-10">
              Focus on your studies in a peaceful, dedicated **study corner**. We provide all-inclusive healthy meals to keep you fueled and focused.
            </p>
          </div>

          {/* Relocating Employees */}
          <div className="group bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col gap-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50/50 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-orange-100/50 transition-colors"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center text-2xl md:text-3xl shadow-inner shrink-0 leading-none">
                <HiGlobeAlt />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight text-balance">Relocators</h3>
            </div>
            
            <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed relative z-10">
              Moving to Hyderabad? **Just bring your bags**. We provide ready-to-live setups with zero brokerage so you feel at home on day one.
            </p>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="max-w-7xl mx-auto px-6 w-full py-12 md:py-20 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-16 text-center md:text-left">
          <div className="flex flex-col gap-4">
            <span className="text-[#ff385c] font-black uppercase tracking-widest text-sm">Our Locations</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Premium properties in <br/>top IT corridors.</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <WhyChooseUs />

      {/* FAQ Section */}
      <section id="faq" className="max-w-7xl mx-auto px-6 w-full scroll-mt-24 py-12 md:py-20">
        <div className="text-center flex flex-col gap-4 mb-12 md:mb-20">
          <span className="text-[#008489] font-black uppercase tracking-widest text-sm bg-[#008489]/10 px-4 py-1.5 rounded-full w-fit mx-auto">
            Process
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Hassle-free process.</h2>
          <p className="text-lg md:text-xl text-gray-500 font-medium">From searching to settling in, we've got you covered.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative">
          {/* Desktop Timeline Line */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gray-200 z-0">
            <div className="absolute top-0 left-0 h-full w-2/3 bg-gradient-to-r from-[#008489] to-[#ff385c]"></div>
          </div>
          
          {/* Mobile Timeline Line */}
          <div className="md:hidden absolute top-0 bottom-0 left-[31px] w-[2px] border-l-2 border-dashed border-gray-200 z-0"></div>

          <div className="relative z-10 flex md:flex-col items-center md:text-center gap-6 group">
            <div className="relative shrink-0">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-white border-4 border-[#008489] rounded-full flex items-center justify-center text-2xl md:text-3xl font-black text-[#008489] shadow-lg group-hover:scale-110 transition-transform">
                1
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full flex items-center justify-center text-[#ff385c]">
                <HiSearch className="text-sm md:text-xl" />
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">Choose</h3>
              <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">
                Pick your preferred property in HITEC City, Gachibowli or Madhapur.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 flex md:flex-col items-center md:text-center gap-6 group">
            <div className="relative shrink-0">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-white border-4 border-[#008489] rounded-full flex items-center justify-center text-2xl md:text-3xl font-black text-[#008489] shadow-lg group-hover:scale-110 transition-transform">
                2
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full flex items-center justify-center text-[#ff385c]">
                <HiCalendar className="text-sm md:text-xl" />
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">Visit</h3>
              <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">
                Schedule a tour physically or opt for a video call walkthrough.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 flex md:flex-col items-center md:text-center gap-6 group">
            <div className="relative shrink-0">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-[#008489] rounded-full flex items-center justify-center text-2xl md:text-3xl font-black text-white shadow-xl shadow-[#008489]/30 group-hover:scale-110 transition-transform border-4 border-white">
                3
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full flex items-center justify-center text-[#ff385c]">
                <HiKey className="text-sm md:text-xl" />
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">Move In</h3>
              <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">
                Complete standard KYC, pay the zero-brokerage deposit, and pack your bags.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Localities SEO Section */}
      <section id="locations" className="max-w-7xl mx-auto px-6 w-full py-12 md:py-20 scroll-mt-24">
        <div className="flex flex-col gap-3 text-center items-center mb-8 md:mb-16 mt-4">
          <div className="bg-[#008489]/10 text-[#008489] font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider">
            Premium Locations
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Our presence in Hyderabad</h2>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl">
            Live close to your workplace. We offer zero-brokerage luxury co-living in the city's top tech hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/locations/hitec-city" className="group relative h-[300px] md:h-[400px] overflow-hidden rounded-[2.5rem] flex items-end p-6 md:p-8 transition-all hover:-translate-y-2 shadow-xl">
            <div className="absolute inset-0 z-0">
              <img src="/hero.png" alt="HITEC City" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col gap-3 w-full">
              <div className="flex items-center justify-between text-white border-b border-white/20 pb-4">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight">HITEC City</h3>
                <HiArrowRight className="text-2xl md:text-3xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              <p className="text-gray-300 font-medium text-sm md:text-base line-clamp-2">Premium PG & Co-living near Mindspace and Cyber Towers.</p>
            </div>
          </Link>

          <Link href="/locations/gachibowli" className="group relative h-[300px] md:h-[400px] overflow-hidden rounded-[2.5rem] flex items-end p-6 md:p-8 transition-all hover:-translate-y-2 shadow-xl">
            <div className="absolute inset-0 z-0">
              <div className="w-full h-full bg-gray-800 transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
            </div>
            <div className="relative z-10 flex flex-col gap-3 w-full text-white">
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight">Gachibowli</h3>
                <HiArrowRight className="text-2xl md:text-3xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              <p className="text-gray-300 font-medium text-sm md:text-base line-clamp-2">Luxury rental rooms tailored for tech professionals.</p>
            </div>
          </Link>

          <Link href="/locations/madhapur" className="group relative h-[300px] md:h-[400px] overflow-hidden rounded-[2.5rem] flex items-end p-6 md:p-8 transition-all hover:-translate-y-2 shadow-xl text-white">
            <div className="absolute inset-0 z-0">
              <div className="w-full h-full bg-[#008489] transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
            </div>
            <div className="relative z-10 flex flex-col gap-3 w-full">
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight">Madhapur</h3>
                <HiArrowRight className="text-2xl md:text-3xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              <p className="text-gray-300 font-medium text-sm md:text-base line-clamp-2">Top-rated co-living spaces right in the city's vibrant heart.</p>
            </div>
          </Link>
        </div>
      </section>

      <Testimonials />

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 w-full py-12 md:py-20 scroll-mt-24">
        <div className="text-center flex flex-col gap-3 mb-8 md:mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">FAQ</h2>
          <p className="text-lg md:text-xl text-gray-500 font-medium">Everything you need to know.</p>
        </div>
        
        <FAQAccordion />
      </section>

      {/* Aggressive CTA Section */}
      <section id="contact" className="max-w-5xl mx-auto px-6 w-full text-center scroll-mt-24 mb-12 md:mb-20">
        <div className="bg-gradient-to-br from-[#ff385c] to-[#e31c5f] py-12 md:py-20 px-6 md:px-16 rounded-[2.5rem] md:rounded-[3rem] text-white flex flex-col items-center gap-6 shadow-2xl shadow-[#ff385c]/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <HiShieldCheck className="text-[10rem] md:text-[15rem]" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Ready to see it yourself?</h2>
            <p className="text-lg md:text-xl text-white/90 max-w-xl">
              Rooms fill up fast. Contact us on WhatsApp or schedule a free visit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-8 w-full max-w-2xl justify-center items-center">
              <a 
                href="https://wa.me/919052909771?text=Hi,%20I'm%20interested%20in%20KK%20Hospitalities%20co-living%20in%20Hyderabad."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white p-4 rounded-xl font-bold hover:bg-[#1ebd5a] transition-all flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-xl" /> WhatsApp
              </a>
              <a 
                href="tel:+919052909771"
                className="w-14 bg-gray-100 text-gray-700 p-4 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
