export default function Header() {
  return (
    <>
      <div className="header">
        <div className="container-fluid">
          <div className="vidContainer">
            <video loop muted autoPlay>
              <source src="/videos/header.mp4" />
            </video>
            <div className="blacklayer"></div>
          </div>
          <div className="textContainer">
            <h2>أهلا بيك في منتجع الزعيم</h2>
            <h1>سعدولا</h1>
            <img src="/images/icons8-arrow-down-60.png" alt="" />
            <h3>انزل تحت</h3>
          </div>
        </div>
      </div>
    </>
  );
}
