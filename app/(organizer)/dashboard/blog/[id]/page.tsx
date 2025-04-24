'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";

interface EditBlogPostPageProps {
  params: {
    id: string;
  };
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const [formData, setFormData] = useState({
    title: 'Sample Blog Post',
    content: 'This is a sample blog post content...',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement blog post update
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    // TODO: Implement blog post deletion
    console.log('Deleting post:', params.id);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Blog Post</h1>
        <Link href="/dashboard/blog">
          <Button variant="outline">Back to Blog Management</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter blog post title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your blog post content here..."
                value={formData.content}
                onChange={handleChange}
                className="min-h-[300px] resize-y"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Featured Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="cursor-pointer"
              />
              <p className="text-sm text-gray-500">
                Current image: sample-image.jpg
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="destructive"
                onClick={handleDelete}
              >
                Delete Post
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 