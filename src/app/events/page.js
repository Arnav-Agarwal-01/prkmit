import React from 'react'
import localFont from 'next/font/local';
import { TextAnimate } from '@/components/magicui/text-animate';
import {Timeline} from '@/components/ui/timeline';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Testimonial } from '@/components/ui/testimonial-card';
const familyName = localFont({
    src: "../../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
  })

export default function page() {
    const timelineData = [
        {
          title: "January - Patang Utsav",
          content: "Description of Event 1.",
          images: [
            "/events/patang1.jpg",
            "/events/patang2.jpg"
          ],
          link: "/patang-utsav"
        },
        {
          title: "March - KMIT EVENING",
          content: (
            <div>
              <p>Description of Event 2.</p>
              <ul>
                <li>Point 1</li>
                <li>Point 2</li>
              </ul>
            </div>
          ),
          images: [
            "/events/kmit1.jpg",
            "/events/kmit2.jpg"
          ],
          link: "/kmit-evening"
        },
        {
          title: "October - Navraas",
          content: (
            <div>
              <p>Description of Event 2.</p>
              <ul>
                <li>Point 1</li>
                <li>Point 2</li>
              </ul>
            </div>
          ),
          images: [
            "/events/kmit1.jpg",
            "/events/kmit2.jpg"
          ],
          link: "/navras"
        }
      ];
  return (
    <div>
        


        <div className="container mx-auto  pt-60 pb-8 px-4 ">
          <div className={`text-3xl md:text-4xl text-white ${familyName.className} text-center mb-12`}>
            <TextAnimate animation="blurInUp" by="character" duration={1}>
              KMIT Flagship Events
            </TextAnimate>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="container mx-auto  px-4">
          <Timeline data={timelineData} />
        </div>

        {/* Why Sponsor Us Section */}
        <div className="container mx-auto py-12 px-4 mt-40">
          <div className={`text-3xl md:text-4xl text-white ${familyName.className} text-center mb-8`}>
            <TextAnimate animation="blurInUp" by="character" duration={1}>
              Why Sponsor Us?
            </TextAnimate>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardSpotlight>
              <h3 className="text-xl font-bold text-white mb-4">Unparalleled Visibility</h3>
              <p className="text-neutral-400">Reach 5000+ students through our flagship events with premium branding opportunities.</p>
            </CardSpotlight>
            <CardSpotlight>
              <h3 className="text-xl font-bold text-white mb-4">Targeted Engagement</h3>
              <p className="text-neutral-400">Direct access to India's brightest engineering talent for recruitment and brand loyalty.</p>
            </CardSpotlight>
            <CardSpotlight>
              <h3 className="text-xl font-bold text-white mb-4">Custom Packages</h3>
              <p className="text-neutral-400">Tailored sponsorship solutions to meet your specific marketing objectives.</p>
            </CardSpotlight>
          </div>
        </div>


        {/* Testimonials Section */}
        <div className="container mx-auto py-12 px-4 mt-20">
          <div className={`text-3xl md:text-4xl text-white ${familyName.className} text-center mb-8`}>
            <TextAnimate animation="blurInUp" by="character" duration={1}>
              What People Say
            </TextAnimate>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Testimonial
              name="John Doe"
              role="CEO"
              company="Tech Corp"
              testimonial="Partnering with KMIT events was a game-changer for our brand visibility. The engagement we received exceeded all expectations."
              rating={5}
              image="/events/testimonial1.jpg"
            />
            <Testimonial
              name="Jane Smith"
              role="Marketing Director"
              company="Innovate Inc"
              testimonial="The professional execution and student participation made this sponsorship one of our most successful campaigns this year."
              rating={5}
              image="/events/testimonial2.jpg"
            />
            <Testimonial
              name="Alex Johnson"
              role="CTO"
              company="NextGen Solutions"
              testimonial="Our sponsorship with KMIT provided exceptional reach and engagement with the tech community."
              rating={5}
              image="/events/testimonial3.jpg"
            />
            <Testimonial
              name="Sarah Lee"
              role="Brand Manager"
              company="Global Innovations"
              testimonial="The student engagement was outstanding, leading to meaningful interactions with our brand."
              rating={5}
              image="/events/testimonial4.jpg"
            />
            <Testimonial
              name="Michael Chen"
              role="Head of Partnerships"
              company="TechBridge"
              testimonial="A highly professional and impactful collaboration that delivered measurable results."
              rating={5}
              image="/events/testimonial5.jpg"
            />
          </div>
        </div>
        
    </div>
  )
}
