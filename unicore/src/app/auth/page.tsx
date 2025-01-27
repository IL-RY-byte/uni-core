import LoginSection from "@/sections/auth-page/LoginSection";
import { MantineProvider } from "@mantine/core";

const Page = () => {
  return (
    <>
      <MantineProvider>
        <LoginSection />
      </MantineProvider>
    </>
  );
};

export default Page;
