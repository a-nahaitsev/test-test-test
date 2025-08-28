import SoundSection from "@/components/SoundSection";
import DisplaySection from "@/components/DisplaySection";
import ViewCanvas from "@/components/ViewCanvas";
import Nav from "@/components/Nav";
import Jumbotron from "@/components/Jumbotron";

export default function Home() {
  return (
    <>
      {/* <ViewCanvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      /> */}
      <Nav />
      {/* <Jumbotron />
      <SoundSection />
      <DisplaySection /> */}
    </>
  );
}
