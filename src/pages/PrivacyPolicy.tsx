import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState<number>(0);

  const sections = [
    "Information We Collect",
    "How We Use Your Information",
    "Sharing and Disclosure",
    "Data Retention",
    "Data Security",
    "Your Rights",
    "Third-Party Links",
    "Children's Privacy",
    "Changes to Policy",
    "Contact Us",
  ];

  useEffect(() => {
    // Create an Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Extract the section number from the ID (e.g., "section-2" -> 2)
            const sectionNumber = parseInt(entry.target.id.split("-")[1]);
            setActiveSection(sectionNumber);
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: "-20% 0px -75% 0px", // Adjust these values to change when sections become active
        threshold: 0,
      }
    );

    // Observe all section elements
    document.querySelectorAll('section[id^="section-"]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
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
            Privacy Policy
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
                  Rareminds ("we", "our", "us") respects your privacy and is
                  committed to protecting it through our compliance with this
                  policy. This Privacy Policy explains how we collect, use,
                  share, and safeguard your information when you visit our
                  website{" "}
                  <a
                    href="https://rareminds.in"
                    className="text-red-600 hover:text-red-700 underline decoration-2 underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    rareminds.in
                  </a>
                  , use our services, or otherwise interact with us.
                </p>
              </div>

              <div className="space-y-12">
                {/* Information We Collect */}
                <section id="section-0" className="scroll-mt-8">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">
                        1
                      </span>
                      Information We Collect
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Personal Information
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                          <li>
                            Full name, Email address, Phone number, Postal
                            address
                          </li>
                          <li>
                            Educational qualifications, Employment history
                          </li>
                          <li>
                            Account login credentials, Payment information
                          </li>
                          <li>Training participation and performance data</li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Automated Collection
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                          <li>Device and browser information</li>
                          <li>Usage data and interaction metrics</li>
                          <li>IP address and location data</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* How We Use Your Information */}
                <section id="section-1" className="scroll-mt-8">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">
                        2
                      </span>
                      How We Use Your Information
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>To create and manage user accounts</li>
                      <li>
                        To provide, operate, and maintain our website and
                        services
                      </li>
                      <li>To deliver content, newsletters, and updates</li>
                      <li>
                        To provide customer support and respond to inquiries
                      </li>
                      <li>
                        To notify you about changes or updates to services
                      </li>
                      <li>To verify your identity and prevent fraud</li>
                      <li>
                        To analyze user behavior for business insights and
                        improvements
                      </li>
                      <li>To comply with legal obligations</li>
                    </ul>
                  </div>
                </section>

                {/* Sharing and Disclosure */}
                <section id="section-2" className="scroll-mt-8">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">
                        3
                      </span>
                      Sharing and Disclosure
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          With Service Providers
                        </h3>
                        <p className="text-gray-600">
                          We share your information with trusted third-party
                          partners that assist in operating our website and
                          providing services (e.g., hosting providers, payment
                          processors, marketing tools). We also share your
                          information with employer partners, government
                          agencies, or academic institutions as part of our
                          training, placement, or recruitment services to match
                          you with relevant job/internship opportunities,
                          connect with potential employers, and send placement
                          alerts.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          With Your Consent
                        </h3>
                        <p className="text-gray-600">
                          We may share personal information with third parties
                          when we have your consent to do so. Job seekers
                          submitting their resumes agree to be contacted for
                          suitable openings and related career opportunities.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          For Legal Obligations
                        </h3>
                        <p className="text-gray-600">
                          We may disclose your information to comply with legal
                          obligations, respond to lawful requests, or protect
                          our legal rights.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Business Transfers
                        </h3>
                        <p className="text-gray-600">
                          In the event of a merger, acquisition, or sale of all
                          or a portion of our assets, your data may be
                          transferred as part of that transaction.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Data Retention */}
                <section id="section-3" className="scroll-mt-8">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">
                        4
                      </span>
                      Data Retention
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      We retain your personal data only as long as necessary for
                      the purposes outlined in this Privacy Policy, or as
                      required by applicable law. Training records and
                      assessment data may be retained for the duration of the
                      project/contract and up to 3 years thereafter, or as
                      mandated by project guidelines. Financial data is retained
                      for a minimum of 8 years, as mandated by applicable tax
                      and financial regulations. When data is no longer
                      required, we securely delete or anonymize it.
                    </p>
                  </div>
                </section>

                {/* Data Security */}
                <section id="section-4" className="scroll-mt-8">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">
                        5
                      </span>
                      Data Security
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>HTTPS encryption</li>
                      <li>Secure data storage</li>
                      <li>Access control policies</li>
                      <li>Employee confidentiality agreements</li>
                    </ul>
                    <p className="mt-4 text-gray-600">
                      Despite these efforts, no system is completely secure. We
                      encourage you to use caution when sharing personal
                      information online.
                    </p>
                  </div>
                </section>

                {/* Your Rights and Choices */}
                <section id="section-5" className="scroll-mt-8">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">
                        6
                      </span>
                      Your Rights and Choices
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>Access your personal data</li>
                      <li>Correct or update inaccurate information</li>
                      <li>Request deletion of your data</li>
                      <li>Withdraw your consent to processing</li>
                      <li>Object to or restrict certain types of processing</li>
                      <li>
                        Lodge a complaint with a data protection authority
                      </li>
                    </ul>
                    <p className="mt-4 text-gray-600">
                      To exercise any of these rights, contact us at{" "}
                      <a
                        href="mailto:info@rareminds.in"
                        className="text-red-500 underline"
                      >
                        info@rareminds.in
                      </a>
                      .
                    </p>
                  </div>
                </section>

                {/* Third-Party Links */}
                <section id="section-6" className="scroll-mt-8">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">
                        7
                      </span>
                      Third-Party Links
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      Our Website may contain links to other websites. We are
                      not responsible for the privacy practices or content of
                      those third-party sites. We encourage users to read their
                      privacy policies before submitting any information.
                    </p>
                  </div>
                </section>

                {/* Children's Privacy */}
                <section id="section-7" className="scroll-mt-8">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">
                        8
                      </span>
                      Children's Privacy
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      Our services are not directed to individuals under the age
                      of 13. We do not knowingly collect personal information
                      from children. If you believe a child has provided us with
                      personal data, please contact us immediately.
                    </p>
                  </div>
                </section>

                {/* Changes to This Privacy Policy */}
                <section id="section-8" className="scroll-mt-8">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3">
                        9
                      </span>
                      Changes to This Privacy Policy
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      We may update this policy from time to time to reflect
                      changes in our practices, legal requirements, or other
                      operational reasons. We will notify you of any material
                      changes by updating the “Effective Date” at the top of
                      this page.
                    </p>
                  </div>
                </section>

                {/* Contact Section with Card Design */}
                <section id="section-9" className="scroll-mt-8">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-8 text-white">
                    <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-gray-300 mb-2">
                          Address
                        </h3>
                        <p className="text-gray-100">
                          Rareminds
                          <br />
                          231, 13th Cross Rd, 2nd Stage,
                          <br />
                          Indira Nagar II Stage, Hoysala Nagar,
                          <br />
                          Indiranagar, Bengaluru,
                          <br />
                          Karnataka 560038
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-300 mb-2">
                            Email Us
                          </h3>
                          <a
                            href="mailto:info@rareminds.in"
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            info@rareminds.in
                          </a>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-300 mb-2">
                            Call Us
                          </h3>
                          <a
                            href="tel:+919902326951"
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
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
  );
};

export default PrivacyPolicy;
