"use client";

import { useState } from "react";
import { HiChevronDown, HiChevronUp, HiQuestionMarkCircle } from "react-icons/hi";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Is food included?",
    answer: "Yes! We provide inclusive, hygienic, and healthy meals (Breakfast and Dinner) tailored for daily working schedules."
  },
  {
    question: "Is the deposit refundable?",
    answer: "Absolutely. We maintain a strict zero-brokerage policy, and your simple deposit is fully refundable upon fulfilling the standard notice period."
  },
  {
    question: "Are guests allowed?",
    answer: "Yes, day guests are welcome! We just ask that you coordinate with your flatmates out of courtesy."
  },
  {
    question: "Is cleaning daily?",
    answer: "Yes, professional house-keeping sweeps and cleans daily to ensure your living space is always fresh."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300">
          <button 
            onClick={() => toggleFAQ(idx)}
            className="w-full flex items-center justify-between p-4 md:p-6 text-left cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <h4 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-3">
              <HiQuestionMarkCircle className="text-[#ff385c] shrink-0" /> {faq.question}
            </h4>
            <div className="text-gray-400 bg-white p-1 rounded-full shadow-sm">
               {openIndex === idx ? <HiChevronUp className="text-[#008489] text-xl" /> : <HiChevronDown className="text-[#008489] text-xl"/>}
            </div>
          </button>
          
          <div 
            className={`px-4 md:px-6 text-sm md:text-base text-gray-600 font-medium leading-relaxed overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-96 pb-4 md:pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
