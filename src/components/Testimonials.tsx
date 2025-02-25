"use client"

import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO, TechVision Inc.",
    text: "VivaceFlow&apos;s AI solutions have completely transformed our customer service operations. We&apos;ve seen a 40% reduction in response times and a significant improvement in customer satisfaction scores. Their team was professional, knowledgeable, and responsive throughout the entire implementation process.",
    rating: 5,
    image: "",
    initials: "SJ",
    company: "TechVision Inc."
  },
  {
    name: "Michael Chen",
    role: "Director of Innovation, Global Retail Solutions",
    text: "We partnered with VivaceFlow to develop a predictive analytics solution for our inventory management. The results exceeded our expectations - 30% reduction in overstock and a 25% decrease in stockouts. Their expertise in AI and deep understanding of retail challenges made all the difference.",
    rating: 5,
    image: "",
    initials: "MC",
    company: "Global Retail Solutions"
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Marketing, HealthPlus",
    text: "The generative AI content solution from VivaceFlow has revolutionized our content marketing strategy. We&apos;re now able to create personalized content at scale, resulting in a 45% increase in engagement and 28% higher conversion rates. Their ongoing support has been exceptional.",
    rating: 5,
    image: "",
    initials: "ER",
    company: "HealthPlus"
  },
  {
    name: "David Wilson",
    role: "CEO, FinTech Innovations",
    text: "VivaceFlow delivered a custom AI solution that helped us identify patterns in financial data that we were previously missing. Their approach was thorough, and they took the time to understand our specific needs. The ROI on this project was evident within the first quarter.",
    rating: 5,
    image: "",
    initials: "DW",
    company: "FinTech Innovations"
  },
]

const Testimonials = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
            Client Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Hear from businesses that have transformed their operations with our AI solutions.
          </p>
        </div>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-4">
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-800">{testimonial.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 italic flex-grow mb-4">
                      &quot;{testimonial.text}&quot;
                    </blockquote>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <p className="text-sm font-medium text-blue-600">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="static transform-none mx-2" />
            <CarouselNext className="static transform-none mx-2" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}

export default Testimonials
