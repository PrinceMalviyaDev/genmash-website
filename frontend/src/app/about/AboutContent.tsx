'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  Lightbulb,
  Heart,
  Shield,
  Link2,
  Globe,
} from 'lucide-react';
import { getTeamMembers } from '@/lib/api';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const timeline = [
  { year: '2020', title: 'Founded', description: 'GenMash Software Solutions was born in Indore with a vision to deliver quality software.' },
  { year: '2021', title: 'First Major Client', description: 'Delivered our first enterprise-grade project and expanded the team to 10 members.' },
  { year: '2022', title: 'AI Division Launched', description: 'Started our AI/ML division to build intelligent automation and chatbot solutions.' },
  { year: '2023', title: 'Global Expansion', description: 'Expanded operations to serve clients across 10+ countries worldwide.' },
  { year: '2024', title: '100+ Projects', description: 'Crossed the milestone of 100 successfully delivered projects.' },
  { year: '2025', title: 'AI Agents Era', description: 'Pioneered AI agent development and automation solutions for businesses.' },
];

const values = [
  { icon: Lightbulb, title: 'Innovation', description: 'We embrace cutting-edge technology to build forward-thinking solutions.' },
  { icon: Shield, title: 'Quality', description: 'Every line of code is crafted with care, ensuring reliability and performance.' },
  { icon: Eye, title: 'Transparency', description: 'Open communication and honest pricing throughout the project lifecycle.' },
  { icon: Heart, title: 'Client First', description: 'Your success is our priority. We go the extra mile to exceed expectations.' },
];

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  github: string;
}

export default function AboutContent() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    getTeamMembers().then(setTeam).catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3"
            >
              About Us
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight"
            >
              Building the Future of
              <span className="text-blue-600"> Software</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-lg text-slate-500 leading-relaxed"
            >
              Since 2020, GenMash Software Solutions has been transforming businesses
              through innovative technology. We&apos;re a team of passionate developers,
              designers, and strategists dedicated to building impactful digital products.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-blue-50 rounded-2xl"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-5">
                <Target size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To empower businesses with innovative, scalable, and affordable software
                solutions that drive growth and efficiency. We believe every business
                deserves access to world-class technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-900 rounded-2xl"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-5">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
              <p className="text-slate-300 leading-relaxed">
                To become the most trusted technology partner for businesses worldwide,
                known for delivering exceptional quality, pushing the boundaries of
                innovation, and making technology accessible to all.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">
              What Drives Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-6 bg-white rounded-2xl border border-slate-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                  <value.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">
              Our Journey
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Company Timeline
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-100" />

              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-16"
                  >
                    {/* Dot */}
                    <div className="absolute left-[17px] top-1 w-4 h-4 bg-blue-600 rounded-full border-4 border-blue-100" />
                    <div className="text-sm font-bold text-blue-600 mb-1">
                      {item.year}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">
              Our People
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Meet the Team
            </h2>
            <p className="mt-3 text-slate-500">
              The talented people behind GenMash&apos;s success
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member._id || member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 text-center hover:shadow-md transition-shadow"
              >
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-sm text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Link2 size={14} />
                    LinkedIn
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-blue-600 mb-4">
            <Globe size={20} />
            <span className="font-semibold text-sm uppercase tracking-wide">
              Global Reach
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Serving Clients Worldwide
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto mb-10">
            From our base in Indore, India, we work with clients across
            North America, Europe, Asia, and the Middle East.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { flag: '🇮🇳', region: 'India' },
              { flag: '🇺🇸', region: 'United States' },
              { flag: '🇬🇧', region: 'United Kingdom' },
              { flag: '🇦🇪', region: 'UAE' },
            ].map((item) => (
              <div
                key={item.region}
                className="p-4 bg-slate-50 rounded-xl text-center"
              >
                <div className="text-3xl mb-2">{item.flag}</div>
                <div className="text-sm font-medium text-slate-700">{item.region}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
