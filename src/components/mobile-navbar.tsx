import Image from "next/image";

const MobileNavbar = () => {
  return (
    <div className="d-f ai-c jc-c py-3" style={{ backgroundColor: "#1e2039" }}>
      <Image
        className="h-auto"
        height={200}
        width={120}
        src="/logotype.png"
        alt="Yumma CSS Play Logo"
      />
    </div>
  );
};

export default MobileNavbar;
