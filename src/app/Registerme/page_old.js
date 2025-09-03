"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { CogIcon, UserIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import localFont from "next/font/local";

// Load custom fonts
const familyName = localFont({
  src: "../../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
});

const comic = localFont({
  src: "../../../public/fonts/Comic_Relief/ComicRelief-Regular.ttf"
});

export default function StepperWithContent() {
  const [activeStep, setActiveStep] = useState(0);
  const [hallTicketNo, setHallTicketNo] = useState(""); 
  const [firstName, setFirstName] = useState(""); 
  const [parentPhone, setParentPhone] = useState("");
  const [sendDigits, setSendDigits] = useState("");
  const router = useRouter(); 
  const isLastStep = activeStep === 2; 
  const isFirstStep = activeStep === 0;
  const api = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const handleNext = async () => {
    if (activeStep === 0) {
      if (hallTicketNo.length !== 10) {
        toast.error("Hall ticket number must be 10 characters.");
        return;
      }
      try {
        console.log(api);
        const response = await fetch(api+"api/auth/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hallticketno: hallTicketNo }),
          credentials: 'include',
        });
        const data = await response.json();
        if (response.status === 200) {
          const sanitizedFirstName = data.firstname.replace(/KMIT/g, "");
          setFirstName(sanitizedFirstName.trim());
          setParentPhone(data.parentphone);
          setActiveStep((cur) => cur + 1);
        } else {
          toast.error(data.msg || "An error occurred");
        }
      } catch (err) {
        console.error("Error:", err);
        toast.error("Server Error");
      }
    } else if (activeStep === 1) {
      if (sendDigits.length !== 4 || !/^\d{4}$/.test(sendDigits)) {
        toast.error("Incorrect or invalid");
        return;
      }
      setActiveStep((cur) => cur + 1);
    } else if (activeStep === 2) {
      try {
        const response = await fetch(api+"api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hallticketno: hallTicketNo,
            parentphone: sendDigits,
          }),
        });
        const data = await response.json();

        console.log(data);
        if (response.status === 200) {
          toast.success("Login successful!");
          localStorage.setItem("token", data.token);
          router.push(`/Paypage`);
        } else {
          toast.error(data.msg || "Login failed");
        }
      } catch (err) {
        console.error("Error:", err);
        toast.error("Server Error");
      }
    }
  };
  
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className={`text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent ${familyName.className} mb-4`}>
            Navraas'25
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full mx-auto"></div>
          <p className={`text-gray-300 text-lg mt-4 ${comic.className}`}>
            Your gateway to the most vibrant celebration
          </p>
        </motion.div>

        {/* Stepper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
        >
          <Stepper 
            activeStep={activeStep}
            className="mb-12"
            activeLineClassName="bg-gradient-to-r from-orange-500 to-purple-600"
            completedLineClassName="bg-gradient-to-r from-orange-500 to-purple-600"
          >
            <Step 
              className={`${activeStep >= 0 ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white' : 'bg-gray-600 text-gray-300'} transition-all duration-300`}
            >
              <UserIcon className="h-5 w-5" />
              <div className="absolute -bottom-[4.5rem] w-max text-center">
                <Typography variant="h6" className={`${activeStep === 0 ? 'text-orange-400' : 'text-gray-400'} ${familyName.className}`}>
                  Step 1
                </Typography>
                <Typography className={`${activeStep === 0 ? 'text-orange-300' : 'text-gray-500'} font-normal ${comic.className}`}>
                  Enter Your Hall Ticket Number
                </Typography>
              </div>
            </Step>
            
            <Step 
              className={`${activeStep >= 1 ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white' : 'bg-gray-600 text-gray-300'} transition-all duration-300`}
            >
              <CogIcon className="h-5 w-5" />
              <div className="absolute -bottom-[4.5rem] w-max text-center">
                <Typography variant="h6" className={`${activeStep === 1 ? 'text-orange-400' : 'text-gray-400'} ${familyName.className}`}>
                  Step 2
                </Typography>
                <Typography className={`${activeStep === 1 ? 'text-orange-300' : 'text-gray-500'} font-normal ${comic.className}`}>
                  Verification
                </Typography>
              </div>
            </Step>
            
            <Step 
              className={`${activeStep >= 2 ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white' : 'bg-gray-600 text-gray-300'} transition-all duration-300`}
            >
              <BuildingLibraryIcon className="h-5 w-5" />
              <div className="absolute -bottom-[4.5rem] w-max text-center">
                <Typography variant="h6" className={`${activeStep === 2 ? 'text-orange-400' : 'text-gray-400'} ${familyName.className}`}>
                  Step 3
                </Typography>
                <Typography className={`${activeStep === 2 ? 'text-orange-300' : 'text-gray-500'} font-normal ${comic.className}`}>
                  Confirm & Login
                </Typography>
              </div>
            </Step>
          </Stepper>

          {/* Step Content */}
          <div className="mt-20">
            {activeStep === 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold text-white ${familyName.className} mb-2`}>
                    Welcome to Navraas'25
                  </h3>
                  <p className={`text-gray-300 ${comic.className}`}>
                    Enter your hall ticket number to get started
                  </p>
                </div>
                
                <div className="relative max-w-md mx-auto">
                  <input
                    type="text"
                    id="hallticket"
                    value={hallTicketNo}
                    onChange={(e) => setHallTicketNo(e.target.value.toUpperCase())}
                    className="block px-4 pb-3 pt-6 w-full text-lg text-white bg-black/50 backdrop-blur-lg rounded-xl border-2 border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-0 transition-all duration-300 placeholder-transparent peer"
                    placeholder="Hall Ticket Number"
                  />
                  <label
                    htmlFor="hallticket"
                    className={`absolute text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-black/50 px-3 peer-focus:px-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 ${familyName.className}`}
                  >
                    Enter Your Hall Ticket Number
                  </label>
                </div>
                
                <div className={`text-center text-gray-400 ${comic.className}`}>
                  <span className="text-sm">Example: </span>
                  <span className="text-orange-400 font-semibold">22BDXYZ63</span>
                </div>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className={`text-3xl font-bold text-white ${familyName.className} mb-4`}>
                    खम्मा घणी, <span className="text-orange-400">{firstName}</span>
                  </h3>
                  <p className={`text-gray-300 ${comic.className}`}>
                    We need to verify your identity
                  </p>
                </div>

                <div className="relative max-w-md mx-auto">
                  <input
                    type="tel"
                    id="parentphone"
                    maxLength={4}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setSendDigits(value);
                    }}
                    className="block px-4 pb-3 pt-6 w-full text-lg text-white bg-black/50 backdrop-blur-lg rounded-xl border-2 border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-0 transition-all duration-300 placeholder-transparent peer"
                    placeholder="Last 4 digits"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  <label
                    htmlFor="parentphone"
                    className={`absolute text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-black/50 px-3 peer-focus:px-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 ${familyName.className}`}
                  >
                    Last 4 Digits of Parent's Phone
                  </label>
                </div>

                <div className="text-center bg-white/10 backdrop-blur-lg rounded-xl p-4 max-w-md mx-auto">
                  <p className={`text-gray-200 ${comic.className}`}>
                    Hey {firstName}, your parent's phone number looks like:{" "}
                    <span className="font-bold text-orange-400">{parentPhone}****</span>
                  </p>
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className={`text-3xl font-bold text-white ${familyName.className} mb-4`}>
                    Confirm Your Details
                  </h3>
                  <p className={`text-orange-400 text-xl ${comic.className}`}>
                    {firstName}
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                    <label className={`block text-gray-300 text-sm mb-2 ${familyName.className}`}>
                      Hall Ticket Number
                    </label>
                    <input
                      type="text"
                      value={hallTicketNo}
                      readOnly
                      className="w-full px-4 py-3 text-white bg-black/50 rounded-lg border border-gray-600 focus:outline-none"
                    />
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                    <label className={`block text-gray-300 text-sm mb-2 ${familyName.className}`}>
                      Last 4 Digits of Parent's Phone
                    </label>
                    <input
                      type="text"
                      value={sendDigits}
                      readOnly
                      className="w-full px-4 py-3 text-white bg-black/50 rounded-lg border border-gray-600 focus:outline-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <Button 
              onClick={handlePrev} 
              disabled={isFirstStep}
              className={`px-6 py-3 rounded-full ${isFirstStep ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'} text-white transition-all duration-300 ${familyName.className}`}
            >
              Previous
            </Button>
            
            <motion.button
              onClick={handleNext}
              className={`px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${familyName.className}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLastStep ? "🎫 Login & Proceed" : "Next →"}
            </motion.button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className={`text-gray-400 text-sm ${comic.className}`}>
            Designed and Developed by{' '}
            <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent font-bold">
              Vardaan & Arnav
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography variant="h6" color={activeStep === 0 ? "orange" : "gray"}>
              Step 1
            </Typography>
            <Typography color={activeStep === 0 ? "orange" : "gray"} className="font-normal">
              Enter Your HallTicket Number
            </Typography>
          </div>
        </Step>
        <Step >
          <CogIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography variant="h6" color={activeStep === 1 ? "orange" : "gray"}>
              Step 2
            </Typography>
            <Typography color={activeStep === 1 ? "orange" : "gray"} className="font-normal">
            खम्मा घणी
            </Typography>
          </div>
        </Step>
        <Step >
          <BuildingLibraryIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography variant="h6" color={activeStep === 2 ? "orange" : "gray"}>
              Step 3
            </Typography>
            <Typography color={activeStep === 2 ? "orange" : "gray"} className="font-normal">
              Confirm Details and Login
            </Typography>
          </div>
        </Step>
      </Stepper>

      <div className="mt-48">
        {activeStep === 0 && (
          <>
            <div className="relative mt-8 w-1/2 mx-auto">
              <input
                type="text"
                id="floating_outlined"
                value={hallTicketNo}
                onChange={(e) => setHallTicketNo(e.target.value.toUpperCase())}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-black rounded-lg border border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sm text-gray-400 duration-300 font-baskerville transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black px-3 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Enter Your HallTicket Number
              </label>
            </div>
            <div className="ml-[25%] mt-[2%] font-baskerville">Example: 22BDXYZ63</div>
          </>
        )}

        {activeStep === 1 && (
          <>
            <div className="text-center">
              <Typography variant="h6" className="font-baskerville text-3xl">
                खम्मा घणी, <span className="text-deep-orange-400">{firstName}</span>
              </Typography>
            </div>

            <div className="relative mt-9 w-1/2 mx-auto">
              <input
                type="tel"
                id="floating_outlined"
                maxLength={4} // Limits the input to 4 characters
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Ensures only numeric values are accepted
                  setSendDigits(value);
                }}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-black rounded-lg border border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                placeholder=" "
                inputMode="numeric" // Provides a numeric keyboard on mobile devices
                pattern="[0-9]*" // Enforces numeric pattern
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sm text-gray-400 duration-300 font-baskerville transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black px-3 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Enter Last 4 Digits of Your Parent Phone Number
              </label>
            </div>

            <div className="text-center">
              <Typography className="text-gray-200 font-normal mt-4">
                Yo {firstName} your Parent Phone looks something like this:{" "}
                <span className="font-extrabold">{parentPhone}*****</span>
              </Typography>
            </div>
          </>
        )}

        {activeStep === 2 && (
          <>
            <div className="text-center">
              <Typography variant="h6" className="font-baskerville text-3xl ">
                Confirm Your Details <span className="text-deep-orange-400">{firstName}</span>
              </Typography>
            </div>
            <div className="relative mt-9 w-1/2 mx-auto">
              <div className=" m-[1%] font-baskerville">
                Your Hallticket Number
              </div>
              <input
                type="text"
                value={hallTicketNo}
                readOnly
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-black rounded-lg border border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                placeholder="HallTicket Number"
              />
              </Step>
    
    <div className=" mt-[4%] font-baskerville">
                Last 4 Digits of Parent&apos;s Phone
              </div>
              <input
                type="text"
                value={sendDigits}
                readOnly
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-black rounded-lg border border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer mt-2"
                placeholder="Last 4 Digits of Parent's Phone"
              />
              
            </div>
          </>
        )}
      </div>

      <div className=" mt-10 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext}>
          {isLastStep ? "Login" : "Next"}
        </Button>
      </div>
      
    </div>
    
      
  );
}
