import Image from "next/image";
import Logo from "../../public/dark-logomark.png";

const Logotype = () => {
  return (
    <div className="mx-auto">
      <Image className="h-auto" width={140} src={Logo} alt="Yumma CSS Play Logo" />
    </div>
  );
};

export default Logotype;
