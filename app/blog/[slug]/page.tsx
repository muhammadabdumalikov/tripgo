import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  category: string;
  readTime: string;
}

// This would typically come from an API or database
const getBlogBySlug = (slug: string): Blog | null => {
  const blogs: Blog[] = [
    {
      id: '1',
      title: 'Exploring Banff',
      description: 'Discover the beauty of Banff National Park',
      image: '/images/bg2.jpg',
      content: `
        <p>Banff National Park is a stunning destination that offers breathtaking landscapes and unforgettable experiences. From the turquoise waters of Lake Louise to the rugged peaks of the Canadian Rockies, Banff is a paradise for nature lovers and adventure seekers alike.</p>
        
        <h2>Must-See Attractions</h2>
        <p>One of the most iconic spots in Banff is Lake Louise, known for its crystal-clear waters and surrounding mountain views. The Fairmont Chateau Lake Louise offers luxurious accommodations with stunning views of the lake.</p>
        
        <h2>Outdoor Activities</h2>
        <p>Whether you're interested in hiking, skiing, or wildlife watching, Banff has something for everyone. The park's extensive trail system offers routes for all skill levels, from easy walks to challenging mountain climbs.</p>
      `,
      author: {
        name: 'John Doe',
        avatar: '/images/bg2.jpg'
      },
      date: 'March 19, 2025',
      category: 'Travel',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Exploring Banff',
      description: 'Discover the beauty of Banff National Park',
      image: '/images/bg2.jpg',
      content: `
        <p>Banff National Park is a stunning destination that offers breathtaking landscapes and unforgettable experiences. From the turquoise waters of Lake Louise to the rugged peaks of the Canadian Rockies, Banff is a paradise for nature lovers and adventure seekers alike.</p>
        
        <h2>Must-See Attractions</h2>
        <p>One of the most iconic spots in Banff is Lake Louise, known for its crystal-clear waters and surrounding mountain views. The Fairmont Chateau Lake Louise offers luxurious accommodations with stunning views of the lake.</p>
        
        <h2>Outdoor Activities</h2>
        <p>Whether you're interested in hiking, skiing, or wildlife watching, Banff has something for everyone. The park's extensive trail system offers routes for all skill levels, from easy walks to challenging mountain climbs.</p>
      `,
      author: {
        name: 'John Doe',
        avatar: '/images/bg2.jpg'
      },
      date: 'March 19, 2025',
      category: 'Travel',
      readTime: '5 min read'
    },
    {
      id: '3',
      title: 'Exploring Banff',
      description: 'Discover the beauty of Banff National Park',
      image: '/images/bg2.jpg',
      content: `
        <p>Banff National Park is a stunning destination that offers breathtaking landscapes and unforgettable experiences. From the turquoise waters of Lake Louise to the rugged peaks of the Canadian Rockies, Banff is a paradise for nature lovers and adventure seekers alike.</p>
        
        <h2>Must-See Attractions</h2>
        <p>One of the most iconic spots in Banff is Lake Louise, known for its crystal-clear waters and surrounding mountain views. The Fairmont Chateau Lake Louise offers luxurious accommodations with stunning views of the lake.</p>
        
        <h2>Outdoor Activities</h2>
        <p>Whether you're interested in hiking, skiing, or wildlife watching, Banff has something for everyone. The park's extensive trail system offers routes for all skill levels, from easy walks to challenging mountain climbs.</p>
      `,
      author: {
        name: 'John Doe',
        avatar: '/images/bg2.jpg'
      },
      date: 'March 19, 2025',
      category: 'Travel',
      readTime: '5 min read'
    },
  ];
  
  return blogs.find(blog => blog.id === slug) || null;
};

export default function BlogDetail({ params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params?.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{blog.category}</span>
          <span>•</span>
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{blog.description}</p>
        <div className="flex items-center gap-4">
          <Image
            src={blog.author.avatar}
            alt={blog.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{blog.author.name}</p>
            <p className="text-sm text-gray-600">Travel Writer</p>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>

      {/* Share Section */}
      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Share this article</h3>
        <div className="flex gap-4">
          <button className="p-2 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
            </svg>
          </button>
          <button className="p-2 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
            </svg>
          </button>
          <button className="p-2 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}