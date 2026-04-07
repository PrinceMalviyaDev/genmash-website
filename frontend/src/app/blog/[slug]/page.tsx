'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Calendar, MessageCircle, Link2 } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { getBlogPost } from '@/lib/api';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPost(slug).then(setPost).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="pt-40 pb-20 text-center text-slate-400">Loading...</div>;
  if (!post) return <div className="pt-40 pb-20 text-center"><h1 className="text-2xl font-bold text-slate-900">Post not found</h1><Link href="/blog" className="mt-4 inline-block text-blue-600">Back to Blog</Link></div>;

  return (
    <>
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-blue-600 mb-6 transition-colors"><ArrowLeft size={14} /> Back to Blog</Link>
          <Badge>{post.category}</Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">{post.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><User size={14} /> {post.author?.name}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} min read</span>
          </div>
        </div>
      </section>
      <article className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.featuredImage && <img src={post.featuredImage} alt={post.title} className="w-full h-64 object-cover rounded-2xl mb-10" />}
          <div className="prose prose-slate prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          {post.tags?.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-2">
              {post.tags.map((tag: string) => <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">{tag}</span>)}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
