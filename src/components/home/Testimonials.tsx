"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon, Quote } from "lucide-react";
import { AnimateOnScroll, StaggerContainer } from "@/hooks/useAnimateOnScroll";
import { testimonials } from "@/constants/testimonials";

const Testimonials = () => {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
        
        <AnimateOnScroll variant="fadeInUp" className="text-center mb-16">
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
            Client Success Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it. Hear from businesses that have transformed their operations with our AI solutions.
          </p>
        </AnimateOnScroll>
        
        <AnimateOnScroll variant="fadeIn" delay={0.2}>
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-4">
                  <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 h-full rounded-xl overflow-hidden">
                    <CardContent className="p-8 flex flex-col h-full relative">
                      <Quote className="absolute top-4 right-4 h-12 w-12 text-blue-100 opacity-50" />
                      <div className="flex items-center mb-6">
                        <Avatar className="h-14 w-14 mr-4 border-2 border-blue-100 shadow-md">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl font-semibold">
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-lg">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 italic flex-grow mb-6 text-lg leading-relaxed">
                        &quot;{testimonial.text}&quot;
                      </blockquote>
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                          {testimonial.company}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-10 gap-4">
              <CarouselPrevious className="static transform-none mx-2 bg-white shadow-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300" />
              <CarouselNext className="static transform-none mx-2 bg-white shadow-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300" />
            </div>
          </Carousel>
        </AnimateOnScroll>
        
        <AnimateOnScroll variant="fadeInUp" delay={0.4} className="mt-16 text-center">
          <div className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
            <span>View all case studies</span>
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Testimonials;
