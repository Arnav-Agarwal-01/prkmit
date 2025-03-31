import Image from "next/image";
import localFont from "next/font/local";

const familyName = localFont({
  src: "../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
})

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <main className="flex flex-col gap-8 items-center justify-center p-4 min-h-screen">
        <div className={`text-5xl text-white ${familyName.className}`}>
          Public Relations KMIT
        </div>
        <p className={`text-white text-3xl max-w-md text-center ${familyName.className}`}>
          Where chaos meets creativity.
        </p>
        {/* Add more content here */}
      </main>
    </div>
  );
}
