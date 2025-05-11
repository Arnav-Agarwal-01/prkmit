import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

const familyName = localFont({
  src: "../../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
})

const familyName2 = localFont({
  src: "../../../public/fonts/Bangers,Montserrat,Sora,Ysabeau_SC/Montserrat/static/Montserrat-SemiBold.ttf",
})

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Event Promotion",
      description: "We are dedicated to ensuring that every student participates in all events, big or small so that no one misses out on the excitement and opportunities to participate!",
      
    },
    {
      title: "Social Media Management",
      description: "We are adept at crafting compelling content, fostering community engagement, and connecting with audiences. We leverage platforms to drive interaction and relationships.",
      
    },
    {
      title: "Sponsorship Coordination",
      description: "We manage sponsorships, nurturing partnerships that align with our goals. We secure support, enhance visibility, and ensure mutual benefits for sponsors and our initiatives.",
      
    },
    {
      title: "Community Engagement",
      description: "We support student clubs, engage in cultural events, and run mentorship programs. Our newsletters keep everyone informed, building a vibrant, connected, and inclusive community.",
      
      
    },
    {
      title: "Feedback Management",
      description: "We handle feedback, bridging the gap between students and management. We gather insights, address concerns promptly, and enhance satisfaction, promoting a supportive and responsive campus environment.",
      
    },
    {
      title: "Networking",
      description: "We excel in networking and building relationships, connecting media and alumni. Our efforts cultivate strong ties, enhancing visibility, trust, and support critical for sustained organizational growth and success.",
      
    },
    {
      title: "Event Passes",
      description: "We provide event passes, ensuring that students have access to the most exciting events. Our efforts ensure a seamless experience, everytime.",
    },
    {
      title: "Internal Communication",
      description: "We facilitate internal communication, ensuring that all departments are aware of important updates and announcements. Our efforts enhance transparency, collaboration, and overall organizational effectiveness.",
    }
  ];
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}>
      {index < 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div
        className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div
          className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span
          className={`group-hover/feature:translate-x-2 transition duration-200 inline-block text-white dark:text-neutral-100 ${familyName.className}`}>
          {title}
        </span>
      </div>
      <p
        className={`text-sm text-white dark:text-neutral-300 max-w-xs relative z-10 px-10 ${familyName2.className}`}>
        {description}
      </p>
    </div>
  );
};
