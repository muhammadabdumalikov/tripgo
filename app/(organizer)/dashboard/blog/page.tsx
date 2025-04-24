import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function BlogManagementPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <Link href="/dashboard/blog/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Post
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {/* Blog posts will be listed here */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample blog post - will be replaced with actual data */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Sample Blog Post</h3>
                  <p className="text-sm text-gray-500">Published on April 24, 2024</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 