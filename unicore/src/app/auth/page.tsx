import { MantineProvider } from "@mantine/core";
import AuthPageSection from "@/sections/auth-page/AuthPageSection"

const Page = () => {
  return (
    <>
      <MantineProvider>
        <AuthPageSection/>
      </MantineProvider>
    </>
  );
};

export default Page;
