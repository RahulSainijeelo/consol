import Image from "next/image";

interface CategoryHeroProps {
  category: string;
}

export function CategoryHero({ category }: CategoryHeroProps) {
  const categoryConfig = getCategoryConfig(category);

  return (
    <section className="py-1">
      {/* Advertisement Banner */}
      {/* {category === 'politics' && (
        <div className="mb-2">
          <div className="relative w-full h-24 md:h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg overflow-hidden">
            <Image
              src="/api/placeholder/1200/128"
              alt="Advertisement"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )} */}

      {/* Category Header */}
      <div className="text-center mb-2">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-0 p-0">
          {categoryConfig.title}
        </h1>
        {/* <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {categoryConfig.description}
        </p> */}
      </div>
    </section>
  );
}

function getCategoryConfig(category: string) {
  const configs = {
    politics: {
      title: "Politics",
      description: ""
    },
    media: {
      title: "Media",
      description: ""
    }
  };
  
  return configs[category as keyof typeof configs] || {
    title: category.charAt(0).toUpperCase() + category.slice(1),
    description: ""
  };
}
