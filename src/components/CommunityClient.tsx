'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Loader2, Send } from 'lucide-react';
import { CommunityPost, addCommunityPost, getCommunityPosts } from '@/lib/firestore';
import { Avatar, AvatarFallback } from './ui/avatar';

const postSchema = z.object({
  content: z.string().min(1, { message: 'Comment cannot be empty.' }).max(500, { message: 'Comment must be 500 characters or less.' }),
});

type PostFormValues = z.infer<typeof postSchema>;

const getInitials = (email: string | undefined | null) => {
    if (!email) return 'AN';
    return email.substring(0, 2).toUpperCase();
};

const getAuthorDisplayName = (post: CommunityPost) => {
    if (post.authorEmail) {
      return post.authorEmail.split('@')[0];
    }
    return 'Anonymous';
};

export default function CommunityClient() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: { content: '' },
  });

  const fetchPosts = async () => {
    setIsLoading(true);
    const fetchedPosts = await getCommunityPosts();
    setPosts(fetchedPosts);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onSubmit = async (data: PostFormValues) => {
    if (!user) return;
    setIsSubmitting(true);

    try {
      const newPostData = {
        userId: user.uid,
        content: data.content,
        createdAt: new Date().toISOString(),
        authorEmail: user.email ?? undefined,
      };
      const newPost = await addCommunityPost(newPostData);
      setPosts(prev => [newPost, ...prev]);
      form.reset();
    } catch (error) {
      console.error("Failed to submit post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold font-headline text-foreground mb-2">Community Chat</h1>
      <p className="text-muted-foreground mb-8">Share your thoughts, questions, and experiences with the community.</p>

      {user && (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Post a Comment</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Textarea
                                placeholder="What's on your mind?"
                                {...field}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                        Post
                    </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      )}
      {!user && (
          <div className="text-center p-8 border rounded-lg bg-muted">
            <p>Please log in to post comments and join the discussion.</p>
          </div>
      )}

      <div className="space-y-6">
        {isLoading ? (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-10">No comments yet. Be the first to post!</p>
        ) : (
          posts.map(post => (
            <Card key={post.id}>
              <CardContent className="p-4 flex gap-4">
                 <Avatar>
                    <AvatarFallback>{getInitials(post.authorEmail)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-sm">{getAuthorDisplayName(post)}</p>
                        <p className="text-xs text-muted-foreground">
                            {new Date(post.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                        </p>
                    </div>
                    <p className="text-sm">{post.content}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
