const newBlogSeedData = [
  {
    title: "The Art of Pour Over Coffee",
    content: `<p>Pour over coffee is a simple but precise brewing method that highlights the delicate flavors of your beans. In this post, we'll cover the equipment, technique, and tips to master the perfect pour over.</p>`,
    category: {
      _id: "6856da413b4412fb46662808", // your existing category _id
      name: "News",
      description: "Add News",
    },
    tags: ["coffee", "brewing", "pour over"],
    slug: "the-art-of-pour-over-coffee",
    metaTitle: "Master the Art of Pour Over Coffee",
    metaDescription:
      "Learn how to brew the perfect pour over coffee with expert tips and techniques.",
    metaUrl: "https://lovecoffee.com/blog/the-art-of-pour-over-coffee",
    metaPublishedAt: new Date(),
    metaPublished: true,
    metaRobots: "index, follow",
    metaKeywords: "pour over, coffee, brewing, technique",
    metaImage: "https://lovecoffee.com/uploads/blogs/pour-over.jpg",
    metaCanonical: "https://lovecoffee.com/blog/the-art-of-pour-over-coffee",
    metaAuthor: "683e126d6fb58ca98932bee2", // your existing author _id
    author: {
      _id: "683e126d6fb58ca98932bee2",
      name: "Sen Doan",
    },
    image: "uploads/blogs/pour-over.jpg",
    publishedAt: new Date(),
  },
  {
    title: "Health Benefits of Green Tea",
    content: `<p>Green tea is more than just a refreshing drink. Rich in antioxidants, it has been linked to improved brain function, fat loss, and lower risk of cancer. Discover why you should add it to your daily routine.</p>`,
    category: {
      _id: "6856da413b4412fb46662808",
      name: "News",
      description: "Add News",
    },
    tags: ["green tea", "health", "antioxidants"],
    slug: "health-benefits-of-green-tea",
    metaTitle: "Discover the Health Benefits of Green Tea",
    metaDescription:
      "Explore the many health benefits of green tea and why it's a great addition to your lifestyle.",
    metaUrl: "https://lovecoffee.com/blog/health-benefits-of-green-tea",
    metaPublishedAt: new Date(),
    metaPublished: true,
    metaRobots: "index, follow",
    metaKeywords: "green tea, antioxidants, health, benefits",
    metaImage: "https://lovecoffee.com/uploads/blogs/green-tea-benefits.jpg",
    metaCanonical: "https://lovecoffee.com/blog/health-benefits-of-green-tea",
    metaAuthor: "683e126d6fb58ca98932bee2",
    author: {
      _id: "683e126d6fb58ca98932bee2",
      name: "Sen Doan",
    },
    image: "uploads/blogs/green-tea-benefits.jpg",
    publishedAt: new Date(),
  },
  {
    title: "5 Unique Latte Art Ideas to Try at Home",
    content: `<p>Latte art can transform a simple coffee into a work of art. Whether you're a beginner or looking to impress friends, here are 5 unique latte art designs you can practice at home.</p>`,
    category: {
      _id: "6856da413b4412fb46662808",
      name: "News",
      description: "Add News",
    },
    tags: ["latte art", "coffee", "creative"],
    slug: "5-unique-latte-art-ideas-to-try-at-home",
    metaTitle: "Try These 5 Unique Latte Art Ideas at Home",
    metaDescription:
      "Step up your coffee game with 5 creative latte art designs perfect for home baristas.",
    metaUrl:
      "https://lovecoffee.com/blog/5-unique-latte-art-ideas-to-try-at-home",
    metaPublishedAt: new Date(),
    metaPublished: true,
    metaRobots: "index, follow",
    metaKeywords: "latte art, coffee, creative, home barista",
    metaImage: "https://lovecoffee.com/uploads/blogs/latte-art.jpg",
    metaCanonical:
      "https://lovecoffee.com/blog/5-unique-latte-art-ideas-to-try-at-home",
    metaAuthor: "683e126d6fb58ca98932bee2",
    author: {
      _id: "683e126d6fb58ca98932bee2",
      name: "Sen Doan",
    },
    image: "uploads/blogs/latte-art.jpg",
    publishedAt: new Date(),
  },
];

export default newBlogSeedData;
