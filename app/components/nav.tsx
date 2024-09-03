import Image from "next/image";
import Logo from "../assets/img/logo.png";

const Navbar = () => {
  return (
    <header
      className="d-f fs-sm fw-w py-3 sm:fw-nw sm:jc-fs w-full"
      style={{ backgroundColor: "#1f212a" }}
    >
      <nav className="mx-auto px-4 sm:ai-c sm:d-f sm:jc-sb w-full">
        <div className="ai-c d-f jc-sb">
          <Image
            alt="Logo"
            className="h-auto"
            height={140}
            src={Logo}
            width={140}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;