import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Icon } from "@iconify/react";
import { supabase } from "@/lib/supabaseClient";
import { sendEmailNotification } from "@/services/emailBff";
import { formatCompanyAddressLine } from "@/constants/companySettings";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import VerticalForm, { type SubmitPayload, type SubmitResult } from "@/components/forms/VerticalForm";
import { corporateForm } from "@/components/forms/verticalForms.config";

const ContactSection = () => {
  const {
    settings: companySettings,
    isLoading: companySettingsLoading,
    errorMessage: companySettingsError,
  } = useCompanySettings();

  // Saves to the database first, then sends the email (same order as before)
  const submitRecruitment = async (payload: SubmitPayload): Promise<SubmitResult> => {
    const v = payload.values;
    const submission = {
      name: v.name,
      company: v.company,
      email: v.email,
      role: v.jobRole,
      message: v.optionalMessage ?? "",
      submitted_at: new Date().toISOString(),
    };

    const { error: dbError, data } = await supabase
      .from("recruitment_forms")
      .insert([submission])
      .select()
      .single();

    if (dbError) {
      console.error("Supabase database error:", {
        message: dbError.message,
        details: dbError.details,
        hint: dbError.hint,
      });
      throw dbError;
    }

    await sendEmailNotification("recruitment-enquiry", {
      ...(data as Record<string, unknown>),
      verification_proof: payload.otpProof,
    });
  };

  return (
    <section className="section py-24 relative overflow-hidden bg-white bg-gradient-to-br from-blue-50 via-white to-gray-50 text-gray-800 z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-5 lg:px-14 relative z-10"
      >
        <div className="text-center mb-16">
          <div className="bg-corporate-black text-white w-16 h-16 rounded-[25px] mx-auto mb-4 flex items-center justify-center transform rotate-6">
            <Send size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl text-center font-bold mb-4 text-corporate-black">
            Partner with Us
          </h2>
          <p className="text-corporate-grey max-w-3xl mx-auto text-lg text-center">
            Whether you're hiring 5 or 500, we'll help you get it right
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                  <span className="bg-corporate-black w-10 h-10 rounded-full flex items-center justify-center text-white">
                    <Mail size={20} />
                  </span>
                  Request Talent Now
                </h3>

                <VerticalForm
                  config={corporateForm}
                  showTitle={false}
                  onSubmit={submitRecruitment}
                  inputClassName="w-full rounded-md border bg-white/50 px-3 py-2 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 disabled:opacity-60"
                  labelClassName="mb-2 block font-medium text-gray-700"
                  buttonClassName="corporate-btn-1 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="h-full flex flex-col justify-between gap-6">
              <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Get in Touch
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-corporate-black/10 text-corporate-black p-3 rounded-xl">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">
                        Phone
                      </h4>
                      <p className="text-gray-600">+91 95624 81100</p>
                      <p className="text-gray-600">+91 82960 61534</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-corporate-black/10 text-corporate-black p-3 rounded-xl">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">
                        Email
                      </h4>
                      <p className="text-gray-600">info@rareminds.in</p>
                      <p className="text-gray-600">careers@rareminds.in</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-corporate-black/10 text-corporate-black p-3 rounded-xl">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">
                        Address
                      </h4>
                      <p className="text-gray-600 max-w-[300px]">
                        {companySettingsLoading
                          ? 'Loading company settings...'
                          : companySettings
                            ? companySettings.office_address
                            : companySettingsError || 'Company settings are unavailable.'}
                      </p>
                      {companySettings && (
                        <p className="text-gray-600">
                          {formatCompanyAddressLine(companySettings)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl px-8 py-7 shadow-xl">
                <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
                  <Icon
                    icon="mdi:share-variant"
                    width={22}
                    height={22}
                    className="text-corporate-black"
                  />
                  Follow Us
                </h3>
                <motion.div
                  className="flex items-center gap-4 mt-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12 } },
                  }}
                >
                  {[
                    {
                      href: "https://www.linkedin.com/company/rareminds/",
                      icon: "mdi:linkedin",
                      color: "#0A66C2",
                      label: "LinkedIn",
                    },
                    {
                      href: "https://www.instagram.com/rareminds_eym/",
                      icon: "mdi:instagram",
                      color: "#E4405F",
                      label: "Instagram",
                    },
                    {
                      href: "https://www.facebook.com/people/RaremindsHR/61576026163390/",
                      icon: "mdi:facebook",
                      color: "#1877F3",
                      label: "Facebook",
                    },
                    {
                      href: "https://x.com/minds_rare",
                      icon: "ri:twitter-x-fill",
                      color: "#1A1A1A",
                      label: "X (Twitter)",
                    },
                    {
                      href: "https://www.youtube.com/channel/UClkBtwJsScYxFzNoFdlifeA",
                      icon: "mdi:youtube",
                      color: "#FF0000",
                      label: "YouTube",
                      size: 40,
                    },
                  ].map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="hover:scale-110 transition-transform"
                      variants={{
                        hidden: { opacity: 0, y: 24 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 24,
                          },
                        },
                      }}
                      whileHover={{ scale: 1.18, rotate: -6 }}
                    >
                      <Icon
                        icon={item.icon}
                        width={item.size || 32}
                        height={item.size || 32}
                        style={{ color: item.color }}
                      />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;