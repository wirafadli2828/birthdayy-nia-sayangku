"use client";

import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const memories = [
  {
    id: 1,
    title: "The First Time We Met",
    date: "A special beginning",
    text: "Momen awal yang nggak akan pernah aku lupakan. Senyum kamu waktu itu...",
    image: "/photo1.jpg"
  },
  {
    id: 2,
    title: "Our Favorite Day",
    date: "Laughs and joy",
    text: "Hari dimana kita tertawa lepas dan menikmati waktu berdua, tanpa peduli dunia.",
    image: "/photo2.jpg"
  },
  {
    id: 3,
    title: "Growing Together",
    date: "Every step of the way",
    text: "Melihat kamu tumbuh jadi wanita hebat sampai di umur barumu ini.",
    image: "/photo3.jpg"
  }
];

export default function Timeline() {
  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <Leaf className="mx-auto text-[#A9BA9D] mb-4" size={32} />
          <h2 className="font-serif text-4xl text-gray-800">Our Beautiful Journey</h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="space-y-32">
          {memories.map((memory, index) => (
            <div key={memory.id} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Image side */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl border-4 border-white transform transition-transform hover:scale-[1.02] duration-500 bg-gradient-to-tr from-[#FFFDD0] to-[#FFFFF0] group flex justify-center items-center">
                  <img 
                    src={memory.image} 
                    alt={memory.title}
                    className="w-full h-full object-cover text-transparent"
                    onError={(e) => {
                      // Fallback if user hasn't added images
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement?.classList.add('after:content-["Drop_Photo_Here"]', 'after:font-sans', 'after:text-[#A9BA9D]', 'after:absolute');
                    }}
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />
                </div>
              </motion.div>

              {/* Text side */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2 text-center md:text-left space-y-4"
              >
                <span className="text-sm font-sans tracking-widest text-[#D4AF37] uppercase bg-white/50 px-4 py-1 rounded-full">{memory.date}</span>
                <h3 className="font-serif text-3xl text-gray-800">{memory.title}</h3>
                <p className="font-sans text-gray-600 leading-relaxed text-lg">
                  {memory.text}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
