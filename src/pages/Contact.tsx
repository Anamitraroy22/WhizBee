// src/pages/Contact.tsx

import React, { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send, Star, Heart, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const contactOptions = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Drop us a line anytime',
    contact: 'anamitraroy2206@gmail.com',
    color: 'whiz-blue',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Mon-Fri, 9am–6pm PST',
    contact: '+91 9674854571',
    color: 'whiz-green',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Come say hello!',
    contact: 'https://www.linkedin.com/in/anamitra-roy-6937a42a5/2',
    color: 'whiz-purple',
  },
];

const colorClassMap: Record<string, string> = {
  'whiz-blue': 'bg-whiz-blue/20 text-whiz-blue',
  'whiz-green': 'bg-whiz-green/20 text-whiz-green',
  'whiz-purple': 'bg-whiz-purple/20 text-whiz-purple',
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const contactInfoSectionRef = useRef<HTMLElement | null>(null);
  const communitySectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('section-hidden');
            entry.target.classList.add('section-visible');
          } else {
            entry.target.classList.remove('section-visible');
            entry.target.classList.add('section-hidden');
          }
        });
      },
      { threshold: 0.2 }
    );

    [heroSectionRef, contactInfoSectionRef, communitySectionRef].forEach(ref => {
      if (ref.current) {
        ref.current.classList.add('section-hidden');
        observer.observe(ref.current);
      }
    });

    return () => {
      [heroSectionRef, contactInfoSectionRef, communitySectionRef].forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const [text] = useTypewriter({
    words: ['Get in Touch', 'We\'re Here to Help', 'Connect With Us'],
    loop: 0,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://formspree.io/f/mvgrjokb", { // Replace with your Formspree endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      alert("Error submitting form.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="bg-indigo-50 min-h-screen px-4 sm:px-6 lg:px-0">
        {/* Hero Section */}
        <section
          ref={heroSectionRef}
          className="pt-24 pb-20 relative overflow-hidden text-center transition-all duration-700 ease-out"
        >
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-5xl font-bold mb-6 text-gray-800">
              <span className="text-gradient-orange">{text}</span>
              <Cursor cursorStyle='|' />
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about WhizBee? We’d love to hear from you.
            </p>
          </div>

          <div className="absolute top-20 left-10 w-16 h-16 bg-whiz-yellow rounded-full flex items-center justify-center float shadow-lg">
            <Star className="w-8 h-8 text-white" />
          </div>
          <div className="absolute top-32 right-20 w-12 h-12 bg-whiz-pink rounded-full flex items-center justify-center float-delayed shadow-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div className="absolute bottom-20 left-1/4 w-14 h-14 bg-whiz-purple rounded-full flex items-center justify-center float shadow-lg">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactInfoSectionRef} className="py-20 transition-all duration-700 ease-out">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Floating Contact Form Box */}
            <div className="relative z-20 bg-white rounded-xl shadow-2xl border border-gray-100 p-8 max-w-xl mx-auto lg:sticky top-28">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Send us a <span className="text-gradient-blue">Message</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="form-input w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-500"
                  />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="form-input w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-500"
                  />
                </div>

                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800"
                >
                  <option value="">Choose a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Support</option>
                  <option value="partnership">Partnership</option>
                </select>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Your Message"
                  required
                  className="form-input w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 resize-none"
                />

                <button
                  type="submit"
                  className="neuro-button w-full group hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Other Ways to <span className="text-gradient-orange">Connect</span>
              </h2>

              {contactOptions.map((item, i) => (
                <div key={i} className="neuro-card flex items-start gap-4 p-4 bg-white shadow-md border border-gray-100 rounded-xl">
                  <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", colorClassMap[item.color])}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-1">{item.description}</p>
                    <p className="text-gray-700 font-medium">{item.contact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section ref={communitySectionRef} className="py-20 text-center transition-all duration-700 ease-out">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Join Our <span className="text-gradient-orange">Community</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with other parents and get insights from educators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="neuro-button">Join Parent Community</button>
              <button className="px-8 py-4 rounded-full border-2 border-whiz-purple text-whiz-purple font-semibold hover:bg-whiz-purple hover:text-white transition-all">
                Follow on Social
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

