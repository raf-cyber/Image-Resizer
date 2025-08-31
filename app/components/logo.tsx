import Image from "next/image";

export default function Logo() {
  return (
    <div className="mb-12">
      <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
        <Image
          src="/images/favicon.png"
          alt="Naturals Logo"
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
