"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import { Activity } from "@/types";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils";

interface ActivityCardProps {
  activity: Activity;
  index?: number;
}

export default function ActivityCard({ activity, index = 0 }: ActivityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -3 }}
    >
      <Link href={activity.href} className="group block h-full">
        <div className="h-full rounded-3xl bg-white border border-beige-200 shadow-card hover:shadow-soft-md transition-all duration-300 overflow-hidden">
          {/* Top section */}
          <div className={`${activity.bgColor} px-5 py-5 flex items-center justify-between`}>
            <div className="w-12 h-12 rounded-2xl bg-white/70 border border-white/60 flex items-center justify-center text-2xl shadow-soft">
              {activity.icon}
            </div>
            <span className={`text-xs font-600 px-2.5 py-1 rounded-full ${getDifficultyColor(activity.difficulty)}`}>
              {getDifficultyLabel(activity.difficulty)}
            </span>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-sm font-700 text-warm-brown-dark mb-1 group-hover:text-olive-600 transition-colors">
              {activity.title}
            </h3>
            <p className="text-xs text-warm-sand leading-relaxed mb-4">
              {activity.description}
            </p>

            {/* Progress */}
            {activity.progress !== undefined && (
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-warm-sand">Progress</span>
                  <span className="text-xs font-600 text-olive-600">{activity.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-beige-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-olive-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${activity.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  />
                </div>
              </div>
            )}

            {/* Footer meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-warm-sand">
                  <Users size={10} />
                  {activity.ageRange}
                </span>
                <span className="flex items-center gap-1 text-xs text-warm-sand">
                  <Clock size={10} />
                  {activity.duration}
                </span>
              </div>
              <ArrowRight
                size={14}
                className="text-olive-500 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}