import Intro from "./Intro/Intro";
import Header from "./Header/Header";
import Events from "./Events/Events";
import Youtube from "./Youtube/Youtube";
import Moments from "./Moments/Moments";
import Footer from "./Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Intro />
      <Youtube />
      <Events />
      <Moments />
      <Footer />
    </>
  );
}
