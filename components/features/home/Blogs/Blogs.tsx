import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
}

const blogs: Blog[] = [
  { id: '1', title: 'Exploring Banff', description: 'Discover the beauty of Banff...', image: '/images/bg2.jpg' },
  { id: '2', title: 'Edinburgh Adventures', description: 'Experience the charm of Edinburgh...', image: '/images/bg2.jpg' },
  { id: '3', title: 'Las Vegas Lights', description: 'The vibrant nightlife of Las Vegas...', image: '/images/bg2.jpg' },
];

const Blogs = () => {
  const router = useRouter();

  return (
    <div className="w-[90%] xl:w-[80%] py-16 px-12 mx-auto mb-8">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Latest Blogs</h2>
        <button
          onClick={() => router.push('/blogs')}
          className="text-[#febd2d] hover:text-[#e5a827] font-semibold"
        >
          See All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <Link href={`/blog/${blog.id}`}
            key={blog.id}
            className="rounded-2xl overflow-hidden border">
            <div className="relative w-full h-56">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-white h-48">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Travel</span>
                <span className="text-sm text-gray-500">March 19, 2025</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 line-clamp-3 overflow-hidden">{blog.title}</h3>
              <div className="flex items-center">
                <div className="relative w-8 h-8 mr-2">
                  <Image
                    src="/images/bg2.jpg"
                    alt="Author"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <span className="text-sm text-gray-700">Author Name</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;