import React from 'react';
import Hero from "../About/Hero"
import Who from "../About/Who"
import JourneyTimeline from "../About/Journey"
import CoreFeatures from "../About/CorePillars"
import MissionVisionValues from "../About/Misson"
import LeadershipTeam from "../About/Meet"
import Achievements from "../About/Achievements"
import CalltoAction from "../About/CalltoAction"
import Partners from "../About/Partners"
import Why from "../About/Why"
import FloatingAction from "../../components/Contact/StickyButton/StickyButton/FloatingAction";
const About: React.FC = () => {
  return (
    <div className="relative w-full mt-23">
      <Hero />
       <MissionVisionValues />
      <Achievements />
      <Who />
      <JourneyTimeline />
      <CoreFeatures />
      <Why />
      <LeadershipTeam />
     
      <Partners />
      <CalltoAction />
    </div>
  );
};

export default About;