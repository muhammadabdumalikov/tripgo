'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function CreateBlogPostPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement blog post creation
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

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Blog Post</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Post Details</CardTitle>
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
            </div>

            <div className="flex justify-end">
              <Button type="submit">Create Post</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 