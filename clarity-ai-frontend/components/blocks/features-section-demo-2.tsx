import { cn } from "@/lib/utils";
import {
  IconBrain,
  IconBriefcase,
  IconChartBar,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconMoodHappy,
  IconUsers,
} from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Built for Every Business",
      description:
        "From startups to enterprises, our chatbot adapts to your unique needs effortlessly.",
      icon: <IconBriefcase />,
    },
    {
      title: "Intuitive and Easy to Use",
      description:
        "Set up your chatbot and manage conversations with a simple, user-friendly interface.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Affordable and Transparent Pricing",
      description:
        "No surprise fees. Choose a plan that fits your business without breaking the bank.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Always On, Always Reliable",
      description:
        "Our chatbots are online 24/7, ensuring your customers are never left waiting.",
      icon: <IconCloud />,
    },
    {
      title: "Deep Business Knowledge",
      description:
        "Train your chatbot to understand your business as well as you do, for smarter responses.",
      icon: <IconBrain />,
    },
    {
      title: "Seamless Collaboration",
      description:
        "Integrate with your support team to provide a seamless handoff when needed.",
      icon: <IconUsers />,
    },
    {
      title: "Instant Customer Satisfaction",
      description:
        "Respond to queries instantly and improve customer satisfaction effortlessly.",
      icon: <IconMoodHappy />,
    },
    {
      title: "Insightful Analytics",
      description:
        "Track customer interactions and gain insights to continually improve your service.",
      icon: <IconChartBar />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
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
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400 group-hover/feature:text-green-500 transition-all delay-200">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-green-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
