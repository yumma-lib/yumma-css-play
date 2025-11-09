import Image from "next/image";

const Navbar = () => {
  return (
    <div style={{ backgroundColor: "#1e2039" }}>
      <Image
        className="h-auto py-2 mx-auto"
        width={80}
        src="/logotype.png"
        alt="Yumma CSS Play Logo"
      />
    </div>
  );
};

export default Navbar;
