"use client";
import React from 'react'
import { TextHoverEffect } from '@/components/ui/text-hover-effect';

function page() {
  return (
    <div>
        <div className='text-sm md:text-base relative top-20'> {/* Updated class names */}
            <TextHoverEffect text="Saanjh" size='300px'/>
        </div>
    </div>
  )
}

export default page