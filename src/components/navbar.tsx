import Image from "next/image";

const Navbar = () => {
  return (
    <div className="mx-4" style={{ backgroundColor: "#1e2039" }}>
      <Image
        className="h-auto py-2 sm:mx-auto"
        height={160}
        width={80}
        src="/logotype.png"
        alt="Yumma CSS Play Logo"
      />
    </div>
  );
};

export default Navbar;
