"use client";
import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Testimonial = React.forwardRef(
  ({ name, role, company, testimonial, rating = 0, image, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Orangish gradient background
          "relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-b from-black via-zinc-900 to-orange-500/20 p-6 transition-all hover:shadow-lg hover:shadow-orange-500/10 md:p-8 h-full",
          className
        )}
        {...props}>
        <div
          className="absolute right-6 top-6 text-6xl font-serif text-muted-foreground/20">
          "
        </div>
        <div className="flex flex-col gap-4 justify-between h-full">
          {rating > 0 && (
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={cn(index < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted")} />
              ))}
            </div>
          )}

          <p className="text-pretty text-base text-muted-foreground leading-relaxed">
            {testimonial}
          </p>

          <div className="flex items-center gap-4 justify-start mt-4 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-4">
              {image && (
                <div className="h-12 w-12 relative overflow-hidden rounded-full border border-gray-700">
                  <Avatar className="h-full w-full">
                    <AvatarImage src={image} alt={name} className="object-contain" />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                  </Avatar>
                </div>
              )}

              <div className="flex flex-col">
                <h3 className="font-semibold text-foreground">{name}</h3>
                <p className="text-sm text-muted-foreground">
                  {role}
                  {company && ` @ ${company}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
)
Testimonial.displayName = "Testimonial"

export { Testimonial }