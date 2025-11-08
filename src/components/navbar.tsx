import Image from "next/image";
import Logo from "../../public/dark-logomark.png";

const Navbar = () => {
  return (
    <div className="" style={{backgroundColor: "#1e2039"}}>
      <Image className="h-auto mx-auto" width={140} src={Logo} alt="Yumma CSS Play Logo" />
    </div>
  );
};

export default Navbar;
