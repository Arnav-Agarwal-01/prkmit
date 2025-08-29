"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { CogIcon, UserIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StepperWithContent() {
  const [activeStep, setActiveStep] = useState(0);
  const [hallTicketNo, setHallTicketNo] = useState(""); 
  const [firstName, setFirstName] = useState(""); 
  const [parentPhone, setParentPhone] = useState(""); // Store the first 5 digits of parent phone
  const [sendDigits, setSendDigits] = useState(""); // Store the last 4 digits of parent phone
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
          credentials: 'include', // Ensure this is present
        });
        const data = await response.json();
        if (response.status === 200) {
          // Handle successful response
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
      // Validate the last 4 digits input
      if (sendDigits.length !== 4 || !/^\d{4}$/.test(sendDigits)) {
        toast.error("Incorrect or invalid");
        return;
      }
      setActiveStep((cur) => cur + 1);
    } else if (activeStep === 2) {
      // Make API call for login on confirmation
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
    <div className="w-full mt-[15vh] px-24 py-4">
      {/* Add ToastContainer at the top */}
      <ToastContainer />
      <div className="text-center text-7xl m-[1%] font-baskerville font-semibold text-deep-orange-400">
        Navraas&apos;25
      </div>
      <Stepper activeStep={activeStep}>
        <Step >
          <UserIcon className="h-5 w-5" />
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
