import React from 'react'
import localFont from 'next/font/local';
import { TextAnimate } from '@/components/magicui/text-animate';
import {Timeline} from '@/components/ui/timeline';

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
    </div>
  )
}
