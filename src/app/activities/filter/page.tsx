"use client";
import FilterActivities from "@/components/filter-activities";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { motion } from "framer-motion";
import { Suspense } from "react";

export default function Filter() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 space-y-12">
          <motion.h1
            className="text-4xl font-bold text-center text-gradient my-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Something Specific Activities
          </motion.h1>
          <Suspense fallback={<p>Loading...</p>}>
            <FilterActivities />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
