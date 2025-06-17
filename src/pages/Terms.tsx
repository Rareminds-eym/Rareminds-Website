import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  const [activeSection, setActiveSection] = useState<number>(0);

  const sections = [
    "Eligibility",
    "Services",
    "User Accounts",
    "Intellectual Property",
    "User Conduct",
    "Privacy",
    "Payments",
    "Liability",
    "Indemnification",
    "Legal",
    "Contact"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionNumber = parseInt(entry.target.id.split('-')[1]);
            setActiveSection(sectionNumber);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -75% 0px',
        threshold: 0
      }
    );

    document.querySelectorAll('section[id^="section-"]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Terms of Service | Rareminds Official Policies</title>
        <meta name="description" content="Review Rareminds’ terms for using our training, recruitment, and digital services. Know your rights, responsibilities, and legal protections." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-center mb-4"
            >
              Terms and Conditions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center text-lg opacity-90 max-w-3xl mx-auto"
            >
              Last Updated: June 4, 2025
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Navigation Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-8">
                <nav className="space-y-1">
                  {sections.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(index)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                        activeSection === index
                          ? "bg-red-50 text-red-700 font-medium"
                          : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {section}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-lg max-w-none">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                  <p className="text-gray-600 leading-relaxed">
                    These Terms and Conditions ("Terms") govern your access to and use of the website{" "}
                    <a href="https://rareminds.in" className="text-red-600 hover:text-red-700 underline decoration-2 underline-offset-2">
                      rareminds.in
                    </a>{" "}
                    and the services provided by Rareminds. By accessing or using our Website and services, you agree to comply with and be bound by these Terms.
                  </p>
                </div>

                <div className="space-y-12">
                  {/* Eligibility */}
                  <section id="section-0" className="scroll-mt-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">1</span>
                        Eligibility
                      </h2>
                      <p className="text-gray-600 mb-4">By using our Website, you represent and warrant that:</p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>You are at least 18 years old or have the legal capacity to enter into binding contracts.</li>
                        <li>You will comply with all applicable laws and regulations.</li>
                        <li>You will not use our Website for any unlawful or prohibited purpose.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Services */}
                  <section id="section-1" className="scroll-mt-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">2</span>
                        Services
                      </h2>
                      <p className="text-gray-600 mb-4">Rareminds provides educational and professional development services, including but not limited to:</p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                          <li>Customized training programs</li>
                          <li>Faculty Development Programs (FDP)</li>
                          <li>Student employability training</li>
                          <li>Placement drives and hackathons</li>
                          <li>Digital resource access</li>
                        </ul>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                          <li>Online courses and training</li>
                          <li>Career counseling and mentorship</li>
                          <li>Recruitment assistance</li>
                          <li>Industry resources and tools</li>
                          <li>E-certifications</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* User Accounts */}
                  <section id="section-2" className="scroll-mt-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">3</span>
                        User Accounts
                      </h2>
                      <p className="text-gray-600 mb-4">To access certain features of our Website, you may be required to create an account. You agree to:</p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>Provide accurate, current, and complete information during registration.</li>
                        <li>Maintain the confidentiality of your account credentials.</li>
                        <li>Notify us immediately of any unauthorized use of your account.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Intellectual Property */}
                  <section id="section-3" className="scroll-mt-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">4</span>
                        Intellectual Property
                      </h2>
                      <div className="space-y-4 text-gray-600">
                        <p>All content on our Website, including text, graphics, logos, images, and software, is the property of Rareminds or its licensors and is protected by intellectual property laws.</p>
                        <p>You may not use, reproduce, or distribute any content without prior written permission from the Company.</p>
                      </div>
                    </div>
                  </section>

                  {/* User Conduct */}
                  <section id="section-4" className="scroll-mt-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">5</span>
                        User Conduct
                      </h2>
                      <p className="text-gray-600 mb-4">You agree not to:</p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>Use our Website for any unlawful or fraudulent activities</li>
                        <li>Upload or transmit viruses, malware, or other harmful code</li>
                        <li>Interfere with the operation of our Website or services</li>
                        <li>Attempt to gain unauthorized access to any part of our Website or systems</li>
                      </ul>
                      <p className="mt-4 text-gray-600">We reserve the right to suspend or terminate your access for any violation of these Terms.</p>
                    </div>
                  </section>

                  {/* Privacy */}
                  <section id="section-5" className="scroll-mt-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">6</span>
                        Privacy
                      </h2>
                      <div className="space-y-4 text-gray-600">
                        <p>Your use of our Website is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.</p>
                        <p>Please review our <a href="/privacy-policy" className="text-red-600 hover:text-red-700 underline decoration-2 underline-offset-2">Privacy Policy</a> to understand our practices.</p>
                      </div>
                    </div>
                  </section>

                  {/* Payments and Refunds */}
                  <section id="section-6" className="scroll-mt-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">7</span>
                        Payments and Refunds
                      </h2>
                      <div className="space-y-4 text-gray-600">
                        <p>Certain services may require payment. All fees are clearly stated on the relevant pages of our Website.</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Payments must be made through approved methods</li>
                          <li>For institutional or B2B engagements, separate invoicing and contractual terms may apply</li>
                          <li>These will be agreed upon prior to service initiation and supersede general payment conditions</li>
                        </ul>
                        <p>Refunds, if applicable, will be processed in accordance with our Refund Policy, which is available on our Website.</p>
                      </div>
                    </div>
                  </section>

                  {/* Limitation of Liability */}
                  <section id="section-7" className="scroll-mt-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">8</span>
                        Limitation of Liability
                      </h2>
                      <div className="space-y-4 text-gray-600">
                        <p>To the fullest extent permitted by law, Rareminds shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Website or services.</p>
                        <p>Rareminds is not liable for issues arising from third-party software platforms used during service delivery.</p>
                        <p>Our total liability to you shall not exceed the amount you paid for the specific service giving rise to the claim.</p>
                      </div>
                    </div>
                  </section>

                  {/* Indemnification */}
                  <section id="section-8" className="scroll-mt-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">9</span>
                        Indemnification
                      </h2>
                      <div className="space-y-4 text-gray-600">
                        <p>You agree to indemnify and hold harmless Rareminds and its affiliates, employees, agents, and partners from any claims, losses, liabilities, damages, costs, or expenses (including legal fees) arising out of:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Your use of our Website or services</li>
                          <li>Your violation of these Terms</li>
                          <li>Your infringement of any rights of another party</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Legal */}
                  <section id="section-9" className="scroll-mt-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">10</span>
                        Legal
                      </h2>
                      <div className="space-y-6 text-gray-600">
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Governing Law</h3>
                          <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Amendments</h3>
                          <p>We reserve the right to update or modify these Terms at any time. Changes will be posted with an updated "Effective Date." Continued use of our Website after changes constitutes acceptance of the new Terms.</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Force Majeure</h3>
                          <p>Rareminds shall not be held liable for any failure or delay in performance due to causes beyond its reasonable control, including but not limited to natural disasters, internet outages, acts of government, or pandemics.</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Contact Section */}
                  <section id="section-10" className="scroll-mt-8">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-8 text-white">
                      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="font-semibold text-gray-300 mb-2">Address</h3>
                          <p className="text-gray-100">
                            Rareminds<br />
                            231, 13th Cross Rd, 2nd Stage,<br />
                            Indira Nagar II Stage, Hoysala Nagar,<br />
                            Indiranagar, Bengaluru,<br />
                            Karnataka 560038
                          </p>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-gray-300 mb-2">Email Us</h3>
                            <a href="mailto:info@rareminds.in" className="text-red-400 hover:text-red-300 transition-colors">
                              info@rareminds.in
                            </a>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-300 mb-2">Call Us</h3>
                            <a href="tel:+919902326951" className="text-red-400 hover:text-red-300 transition-colors">
                              +91 9902326951
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
