import Image from "next/image";
import Logo from "../../public/logo.png";

const Navbar = () => {
  return (
    <header
      className=" bc-d-lead-3 b-1 d-f fs-sm fw-w py-1 sm:fw-nw sm:jc-fs w-full"
      style={{ backgroundColor: "#21243f" }}>
      <nav className="mx-auto px-4 w-full">
        <Image alt="Yumma CSS Play Logo" className="h-auto" src={Logo} width={140} />
      </nav>
    </header>
  );
};

export default Navbar;
