import TemplateListSection from "@/sections/documents/admin-page/TemlateListSection";
import ActiveApplicationsSection from "@/sections/documents/apply-page/ActiveApplications";
import DocumentsRepoSection from "@/sections/documents/apply-page/DocumentRepoSection";
import SubmitNewApplicationSection from "@/sections/documents/apply-page/SubmitNewApplicationSection";

const Page = () => {
  return (
    <>
      <TemplateListSection />
      <ActiveApplicationsSection />
      <DocumentsRepoSection />
      <SubmitNewApplicationSection />
    </>
  );
};

export default Page;
