import { Hero } from "@/components/sections/hero";
import { FeaturedCourses } from "@/components/sections/featured-courses";
import { WhyUs } from "@/components/sections/why-us";
import { Testimonials } from "@/components/sections/testimonials";
import { HomeBanner } from "@/components/sections/home-banner";
import { LatestBlogs } from "@/components/sections/latest-blogs";
import { CTA } from "@/components/sections/cta";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function Home() {
  return (
    <>
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      <AnimatedSection>
        <FeaturedCourses />
      </AnimatedSection>
      <AnimatedSection>
        <WhyUs />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>
      <AnimatedSection>
        <LatestBlogs />
      </AnimatedSection>
      <AnimatedSection>
        <CTA />
      </AnimatedSection>
    </>
  );
}
