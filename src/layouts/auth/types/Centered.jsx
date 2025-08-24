import React from "react";
// import NavbarAuth from "components/navbar/NavbarAuth";
import Footer from "components/footer/FooterAuthCentered";
import Sidebar from "components/sidebar";

const Centered = (props) => {
  const [open, setOpen] = React.useState(true);
  const { maincard } = props;
  return (
    <div className="flex min-h-screen w-full flex-col self-center justify-self-center overflow-hidden lg:mx-0">
      <Sidebar variant="auth" open={open} onClose={() => setOpen(false)} />
      {/* <NavbarAuth onOpenSidenav={() => setOpen(!open)} /> */}
      {/* <FixedPlugin /> */}
      <div className="absolute left-0 right-0 top-0 max-h-[48vh] min-h-[48vh] w-full overflow-hidden bg-gradient-to-br from-brand-400 to-brand-600 bg-cover bg-no-repeat md:mx-auto" />
      {/* bgImage={image} */}
      {maincard}
      {/* <Footer /> */}
    </div>
  );
};

export default Centered;
