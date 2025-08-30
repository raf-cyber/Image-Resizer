import {
  Sparkles,
  Zap,
  Folder,
  Ruler,
  ShieldCheck,
  Globe,
  Headphones,
} from "lucide-react";

export default function Services() {
  const services = [
    { title: "Premium Quality", icon: Sparkles },
    { title: "Fast Processing", icon: Zap },
    { title: "Multiple Formats", icon: Folder },
    { title: "Custom Dimensions", icon: Ruler },
    { title: "Secure & Reliable", icon: ShieldCheck },
  ];

  return (
    <div className="w-full flex justify-start mt-12 px-6">
      <div className="flex flex-wrap gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="max-w-xs flex-1 min-w-[180px] bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-md border border-white/40 transition-transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex flex-col items-center space-y-3">
                <Icon className="w-8 h-8 text-[#0ee08a]" />
                <h3 className="text-lg font-semibold text-[#0ee08a] text-center">
                  {service.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
