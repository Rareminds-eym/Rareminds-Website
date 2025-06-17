import React from "react";
import { useParams } from "react-router-dom";
import { useRecruitmentService } from "@/hooks/useRecruitmentService";
import RecruitmentServiceSection from "./sections/RecruitmentServiceSection";
import TechTeamSection from "./sections/TechTeamSection";
import ErrorComponent from "@/components/ErrorComponent";
import DeliverySection from "./sections/DeliverySection";
import ApproachSection from "./sections/ApproachSection";
import ContactSection from "./sections/ContactSection";
import ModelsSection from "./sections/ModelsSection";
import LoaderComponent from "@/components/LoaderComponent";
import { Helmet } from "react-helmet-async";

const Service: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { services, loading, error } = useRecruitmentService();
  const foundService = services.find(
    (s) => s.link && s.link.toLowerCase() === String(name).toLowerCase()
  );

  if (loading) return <LoaderComponent />;
  if (error) return <ErrorComponent message={error} />;
  if (!foundService) {
    return (
      <ErrorComponent
        title="404 - Service Not Found"
        message="The service you are looking for does not exist or is not available."
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>{foundService?.meta_title || "Service"}</title>
        <meta
          name="description"
          content={
            foundService?.meta_desc ||
            "Service details and information."
          }
        />
      </Helmet>
      <RecruitmentServiceSection foundService={foundService} />
      <TechTeamSection
        title={foundService.heading_1}
        description={
          Array.isArray(foundService.heading_1_desc)
            ? foundService.heading_1_desc
            : [foundService.heading_1_desc]
        }
      />
      <DeliverySection
        title={foundService.heading_2}
        description={foundService.heading_2_desc}
        list={foundService.heading_2_list}
      />
      <ModelsSection
        title={foundService.heading_3}
        description={foundService.heading_3_desc}
        list={foundService.heading_3_list}
      />
      <ApproachSection
        title={foundService.heading_4}
        description={foundService.heading_4_desc}
        list={foundService.heading_4_list}
      />
      <ContactSection
        title={foundService.heading_5}
        description={foundService.heading_5_desc}
      />
    </>
  );
};

export default Service;
