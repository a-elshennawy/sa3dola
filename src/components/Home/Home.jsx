import Intro from "./Intro/Intro";
import Header from "./Header/Header";
import Events from "./Events/Events";
import Youtube from "./Youtube/Youtube";
import Moments from "./Moments/Moments";
import ProgressBar from "../ProgressBar/ProgressBar";

export default function Home() {
  return (
    <>
      <ProgressBar />
      <Header />
      <Intro />
      <Youtube />
      <Events />
      <Moments />
    </>
  );
}
