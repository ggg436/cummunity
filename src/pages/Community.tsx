import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/clerk-react";
import { Search } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { postsApi } from '@/lib/api';

// Add RGB ring animation styles
const rgbRingStyles = `
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.avatar-ring {
  position: relative;
  padding: 3px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-ring::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    #ff0000,
    #ffa500,
    #ffff00,
    #008000,
    #0000ff,
    #4b0082,
    #ee82ee,
    #ff0000
  );
  animation: rotate 3s linear infinite;
  background-size: 400%;
  z-index: 1;
}

.avatar-ring::after {
  content: '';
  position: absolute;
  inset: 3px;
  background: white;
  border-radius: 50%;
  z-index: 2;
}

.avatar-ring > * {
  z-index: 3;
}
`;

// Types for posts data
interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  dislikes: number;
  comments: number;
  created_at: string;
  timeAgo?: string;
}

const Community: React.FC = () => {
  const [postText, setPostText] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get user info from Clerk
  const { user, isLoaded: isUserLoaded } = useUser();
  const author = user?.fullName || user?.username || "Anonymous User";
  const avatarLetter = author.charAt(0);
  
  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Format date to time ago (e.g. "2 hours ago")
  const getTimeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;
    
    return `${Math.floor(seconds)} second${seconds === 1 ? '' : 's'} ago`;
  };

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await postsApi.getPosts();
      
      // Add timeAgo to each post
      const postsWithTimeAgo = data.posts.map((post: Post) => ({
        ...post,
        timeAgo: getTimeAgo(post.created_at)
      }));
      
      setPosts(postsWithTimeAgo);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching posts:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Create a new post
  const createPost = async () => {
    if (!postText.trim()) return;
    
    try {
      await postsApi.createPost({
        author,
        avatar: avatarLetter,
        content: postText
      });
      
      // Clear input and refresh posts
      setPostText('');
      fetchPosts();
    } catch (err: any) {
      console.error('Error creating post:', err);
      alert(err.message || 'Failed to create post');
    }
  };

  // Like or dislike a post
  const reactToPost = async (id: number, action: 'like' | 'dislike') => {
    try {
      await postsApi.reactToPost(id, action);
      
      // Update UI optimistically
      setPosts(posts.map(post => {
        if (post.id === id) {
          return {
            ...post,
            likes: action === 'like' ? post.likes + 1 : post.likes,
            dislikes: action === 'dislike' ? post.dislikes + 1 : post.dislikes
          };
        }
        return post;
      }));
    } catch (err: any) {
      console.error(`Error ${action}ing post:`, err);
      alert(err.message || `Failed to ${action} post`);
    }
  };
  
  const upcomingEvents = [
    {
      date: { day: 12, month: 'MAY' },
      title: 'College Fair 2023',
      details: 'Virtual Event • 10:00 AM EST'
    },
    {
      date: { day: 18, month: 'MAY' },
      title: 'Essay Writing Workshop',
      details: 'Online • 7:00 PM EST'
    },
    {
      date: { day: 25, month: 'MAY' },
      title: 'Admission Q&A Session',
      details: 'Zoom • 5:30 PM EST'
    }
  ];
  
  const topics = [
    { icon: 'fa-solid fa-graduation-cap', name: 'Study Abroad Options', count: 142 },
    { icon: 'fa-solid fa-passport', name: 'Visa Experience', count: 142 },
    { icon: 'fa-solid fa-university', name: 'University Life', count: 142 },
    { icon: 'fa-solid fa-briefcase', name: 'Career Advice', count: 142 },
    { icon: 'fa-solid fa-plane', name: 'Immigration Tips', count: 142 }
  ];
  
  const chatMembers = [
    {
      name: 'Arlene McCoy',
      avatar: 'A',
      timeAgo: '1 day ago',
      message: 'Here I teach advanced proofing techniques. It\'s hard for people to refuse if you use this technique. Note: Invite me to see if your proofing improves dramatically :)',
      likes: 211,
      comments: 203
    },
    {
      name: 'Theresa Webb',
      avatar: 'T',
      timeAgo: '2 days ago',
      message: 'Just shared my experience with the UK student visa process. Check it out if you\'re planning to study there!',
      likes: 89,
      comments: 45
    }
  ];
  
  const communityImage = "https://readdy.ai/api/search-image?query=Top%20view%20of%20diverse%20students%20working%20together%20on%20laptops%20around%20a%20table%20with%20coffee%20cups%20and%20notebooks%2C%20collaborative%20learning%20environment%2C%20bright%20natural%20lighting%2C%20educational%20community%20setting%2C%20modern%20workspace&width=300&height=200&seq=1&orientation=landscape";
  
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <style>{rgbRingStyles}</style>
        <div className="container mx-auto px-4 py-6 max-w-[1440px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex flex-col">
                    <img
                      src={communityImage}
                      alt="Global Education Community"
                      className="w-full h-40 object-cover object-top rounded-lg mb-4"
                    />
                    <h1 className="text-xl font-bold">Global Education Community</h1>
                    <p className="text-gray-600 text-sm mt-2">
                      "Your gateway to international education success. Share experiences, get advice, and connect with fellow students worldwide."
                    </p>
                    <div className="mt-4 flex flex-col space-y-1">
                      <span className="text-gray-700 text-sm">Public</span>
                      <span className="text-gray-700 text-sm">Education</span>
                      <span className="text-gray-700 text-sm">15,432 members</span>
                      <span className="text-gray-700 text-sm">Active discussions</span>
                    </div>
                    <Button
                      className="mt-4 w-full rounded-md whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm"
                      variant="default"
                    >
                      Invite
                    </Button>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold">Topics</h2>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md cursor-pointer">
                      +
                    </Button>
                  </div>
                  <ul className="space-y-3">
                    {topics.map((topic, index) => (
                      <li key={index} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center">
                          <span className="w-6 text-gray-600">#</span>
                          <span className="text-sm ml-2">{topic.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-gray-100">{topic.count}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-6">
              <div className="mb-4">
                <div className="bg-white rounded-lg shadow-sm p-3">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search in community..."
                      className="pl-10 border-gray-200 text-sm font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Search size={16} />
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm mb-4">
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="avatar-ring">
                      <Avatar className="h-10 w-10">
                        {user?.imageUrl ? (
                          <AvatarImage src={user.imageUrl} alt={author} />
                        ) : (
                          <AvatarFallback>{avatarLetter}</AvatarFallback>
                        )}
                      </Avatar>
                    </div>
                    <Input
                      type="text"
                      placeholder="What's on your mind?"
                      className="flex-1 border-none focus:ring-0 text-sm"
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    />
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between border-t pt-3 overflow-x-auto">
                    <div className="flex space-x-4">
                      <Button variant="ghost" className="text-sm text-gray-600 rounded-md whitespace-nowrap">
                        📷 Photo
                      </Button>
                      <Button variant="ghost" className="text-sm text-gray-600 rounded-md whitespace-nowrap">
                        🎥 Video
                      </Button>
                      <Button variant="ghost" className="text-sm text-gray-600 rounded-md whitespace-nowrap">
                        😊 Feeling
                      </Button>
                    </div>
                    <Button 
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-md whitespace-nowrap"
                      onClick={createPost}
                    >
                      Publish
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm mb-4">
                <Tabs defaultValue="all-posts">
                  <div className="px-4 pt-2">
                    <TabsList className="w-full justify-start bg-transparent border-b">
                      <TabsTrigger
                        value="all-posts"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none font-medium text-sm px-6"
                      >
                        All Posts
                      </TabsTrigger>
                      <TabsTrigger value="trending" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none">
                        Trending Post
                      </TabsTrigger>
                      <TabsTrigger value="discussions" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none">
                        Discussions
                      </TabsTrigger>
                      <TabsTrigger value="media" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none">
                        Media/Pics
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="all-posts" className="mt-0">
                    {loading ? (
                      <div className="p-6 text-center text-gray-500">
                        Loading posts...
                      </div>
                    ) : error ? (
                      <div className="p-6 text-center text-red-500">
                        Error: {error}
                      </div>
                    ) : posts.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        No posts yet. Be the first one to post!
                      </div>
                    ) : (
                      posts.map((post) => (
                        <div key={post.id} className="p-4 border-b border-gray-100">
                          <div className="flex items-start space-x-3">
                            <div className="avatar-ring">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{post.avatar}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center">
                                <h3 className="font-medium text-sm">{post.author}</h3>
                                <span className="text-xs text-gray-500 ml-2">{post.timeAgo}</span>
                              </div>
                              <p className="mt-2 text-sm">{post.content}</p>
                              <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                                <div className="flex items-center space-x-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-md whitespace-nowrap transition-colors"
                                    onClick={() => reactToPost(post.id, 'like')}
                                  >
                                    👍 {post.likes} likes
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-xs text-gray-600 rounded-md whitespace-nowrap"
                                    onClick={() => reactToPost(post.id, 'dislike')}
                                  >
                                    👎 {post.dislikes} dislikes
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-xs text-gray-600 rounded-md whitespace-nowrap">
                                    💬 {post.comments} Comments
                                  </Button>
                                </div>
                                <Button variant="ghost" size="sm" className="text-xs text-gray-600 rounded-md whitespace-nowrap">
                                  🔗 Share
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </TabsContent>
                  
                  <TabsContent value="trending" className="mt-0">
                    <div className="p-6 text-center text-gray-500">
                      📈
                      <p className="mt-2">Trending posts will appear here</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="discussions" className="mt-0">
                    <div className="p-6 text-center text-gray-500">
                      💬
                      <p className="mt-2">Active discussions will appear here</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="media" className="mt-0">
                    <div className="p-6 text-center text-gray-500">
                      📸
                      <p className="mt-2">Media and pictures will appear here</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Right Sidebar */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-sm mb-4">
                <div className="p-4">
                  <h2 className="font-semibold mb-3">Upcoming Events</h2>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-blue-50 rounded p-2 text-center min-w-[40px]">
                          <div className="text-lg font-bold text-blue-600">{event.date.day}</div>
                          <div className="text-xs text-blue-600">{event.date.month}</div>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{event.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">{event.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="text-blue-500 mt-2 p-0 h-auto rounded-md whitespace-nowrap cursor-pointer">
                    See All Events →
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold">Group Chat</h2>
                    <Button variant="outline" size="sm" className="text-xs rounded-md whitespace-nowrap cursor-pointer">
                      + Create New Group
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-4">
                      {chatMembers.map((member, index) => (
                        <div key={index} className="border border-gray-100 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <div className="avatar-ring">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{member.avatar}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center">
                                <h3 className="font-medium text-sm">{member.name}</h3>
                                <span className="text-xs text-gray-500 ml-2">{member.timeAgo}</span>
                              </div>
                              <p className="mt-1 text-sm">{member.message}</p>
                              <div className="mt-2 flex items-center space-x-4">
                                <div className="flex items-center text-xs text-gray-500">
                                  👍 <span className="ml-1">{member.likes}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  💬 <span className="ml-1">Comments: {member.comments}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      👥 <span className="ml-1">15.2K</span>
                    </div>
                    <div className="flex items-center">
                      💬 <span className="ml-1">71</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Community;
