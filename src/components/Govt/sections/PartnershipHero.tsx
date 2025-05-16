import React from "react";
import { Rss } from "lucide-react";
import { GooeyText } from "@/components/ui/GooeyText";

const PartnershipHero = () => {
    const handleCtaClick = (action: string) => {
        console.log(`Action clicked: ${action}`);
    };

    return (
        <section className="w-full py-6 px-4 sm:px-6 lg:px-8 mt-10 bg-[url('/images/Govt-Images/bg.png')] bg-cover bg-center bg-blend-overlay bg-white/30 h-[500px]" >
            <div className="flex justify-center">
                <div className=" animate-fade-in text-center max-w-6xl w-full">
                    <div>
                        <GooeyText
                            texts={[
                                "Collaborate. Innovate. Transform.",
                                "सहयोग करें। नवाचार करें। परिवर्तन करें।",
                                "ஒன்றிணை. உருவாக்கு. மேம்படு.",
                                "కలిసి పనిచేయండి. ఆవిష్కరించండి. మార్పు తేడి రండి.",
                                "ಸಹಕಾರ ನೀಡಿ. ಹೊಸದಾಗಿ ಯೋಚಿಸಿ. ಪರಿವರ್ತನೆ ತಂದುಕೊಳ್ಳಿ",
                                "सहकार्य गरौं। नवप्रवर्तन गरौं। रूपान्तरण गरौं।",
                            
                                "সহযোগ কৰক। নতুনত্ব আনক। পৰিবৰ্তন আনক।",
                        
                        "सहकार्य करा. नवे निर्माण करा. परिवर्तन घडवा.",
                        
                        "সহযোগ করুন. নতুন চিন্তা করুন. রূপান্তর করুন.",
                        
                        "સહયોગ કરો. નવીનતા લાવો. રૂપાંતર લાવો.",
                        "ਸਹਿਯੋਗ ਕਰੋ. ਨਵੀਨਤਾ ਲਿਆਓ. ਬਦਲਾਅ ਲਿਆਓ."
                            ]}
                        morphTime={1}
                        cooldownTime={3}
                        className="font-bold"
                        />
                    </div>

                    <p className="text-base md:text-lg text-black mx-auto px-2 sm:px-0">
                        Rareminds invites State Skill Development Missions (SSDMs), education departments, universities,
                        & <br /> public sector initiatives to explore high-impact collaborations tailored for local needs.
                    </p>

                    <div className=" flex flex-col sm:flex-row flex-wrap justify-center mt-10 md:mt-20 lg:mt-60 items-stretch gap-4 text-sm md:text-base ">
                        <button
                            onClick={() => handleCtaClick("schedule a government pitch call")}
                            className="px-6 py-3 font-semibold rounded-2xl border bg-red-500 border-b-4 border-red-300 text-white hover:bg-red-400 hover:border-red-500 transition-all duration-300  "
                        >
                            <span>Schedule a Government Pitch Call</span>
                        </button>

                        <button
                            onClick={() => handleCtaClick("request a department-specific proposal")}
                            className="px-6 py-3 font-semibold rounded-2xl border bg-white border-b-4 border-gray-300 text-black hover:bg-gray-50 transition-all duration-300"
                        >
                            Request Department-Specific Proposal
                        </button>

                        <button
                            onClick={() => handleCtaClick("subscribe to government partner newsletter")}
                            className="px-6 py-3 hover:text-black flex items-center justify-center font-semibold rounded-2xl bg-red-500 border-b-4 border-red-300 text-white hover:bg-white border hover:border-gray-300 transition-all duration-300"
                        >
                            <Rss size={16} className="mr-2 font-bold" />
                            <span>Subscribe to Govt. Partner Newsletter</span>
                        </button>


                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnershipHero;



