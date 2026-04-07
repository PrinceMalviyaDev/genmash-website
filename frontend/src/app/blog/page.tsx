'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from '@/components/shared/BlogCard';
import { getBlogPosts } from '@/lib/api';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts().then(setPosts).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">Blog</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Insights & Articles</h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">Technical insights, industry trends, and best practices from our engineering team.</p>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? <div className="text-center py-20 text-slate-400">Loading posts...</div> : posts.length === 0 ? <div className="text-center py-20 text-slate-400">No posts yet.</div> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.map((post: any, i: number) => (
                <motion.div key={post._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <BlogCard {...post} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
