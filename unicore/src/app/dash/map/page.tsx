import dynamic from "next/dynamic";

const CampusMap = dynamic(() => import("@/sections/map-page/CampusMap"), {
  ssr: false, 
});

export default function MapPage() {
  return <CampusMap />;
}
