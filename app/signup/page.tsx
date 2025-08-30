"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { CSpinner } from "@coreui/react";
import signup from "@/server/signup/signup";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checkbox: false,
  });
  const [pending, setPending] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: name == "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    try {
      const response = await signup(formData);
      if(response){
        setPending(false)
      }
    } catch (error) {
      console.error(`Error fetching locations: ${error}`);
    }
  };

  useEffect(()=>{
    console.log(formData)
  },[formData])
  return (
    <main className="h-screen box-border relative ">
      <div className="grid gap-x-2 lg:grid-cols-2 grid-cols-1 bg-[#322C40] h-full">
        <div className="p-4 flex items-center justify-center">
          <Image
            src="/images/scienic.avif"
            alt="login screen background image"
            height={1000} // Keep for aspect ratio
            width={600} // Keep for aspect ratio
            priority
            className="rounded-xl w-full h-full bg-contain "
          />
          {/* bg-[url(/images/login-image.jpg)] bg-auto */}
        </div>
        <div className="p-10 items-center justify-center">
          <div className="flex flex-col mx-auto space-y-10 max-w-[540px] h-full justify-center">
            <div className="flex space-y-5 flex-col">
              <p className="text-5xl text-white">Create an account</p>
              <p className="text-xm text-[#beb0db]">
                Already have an account?{" "}
                <span className="text-[#7d67ac]">
                  {" "}
                  <Link href={"login"}>Log in</Link>
                </span>
              </p>
            </div>
            <form action="">
              <div className="grid gap-y-3">
                <div className="flex space-x-4 w-full">
                  <input
                    type="text"
                    className="flex-1 rounded-lg focus-visible:outline-[#4d4463] outline-none bg-[#2a2535] p-3 placeholder:text-[#4b4558] text-[#c1bacf]"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="flex-1 rounded-lg focus-visible:outline-[#4d4463] outline-none bg-[#2a2535] p-3 placeholder:text-[#4b4558] text-[#c1bacf]"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="text"
                  className="flex-1 rounded-lg focus-visible:outline-[#4d4463] outline-none bg-[#2a2535] p-3 placeholder:text-[#4b4558] text-[#c1bacf]"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="flex-1 rounded-lg focus-visible:outline-[#4d4463] outline-none bg-[#2a2535] p-3 placeholder:text-[#4b4558] text-[#c1bacf]"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="flex space-x-3">
                  <label
                    htmlFor="check-box"
                    className="cursor-pointer relative"
                  >
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="check-box"
                      onChange={handleChange}
                      className="appearance-none peer h-6 w-6 rounded-md border-[#413a50] border focus-visible:outline-[#4d4463] outline-none"
                    />
                    <Check className="stroke-2 h-5 w-5 text-stone-400 absolute top-[2px] left-[2px] text-opacity-0 peer-checked:text-opacity-100 peer-checked:bg-[#2a2535]" />
                  </label>
                  <span>
                    I agree to the{" "}
                    <Link
                      href={``}
                      className="focus-visible:outline-[#4d4463] outline-none rounded-md"
                    >
                      Terms and Conditions
                    </Link>
                  </span>
                </div>
              </div>
            </form>

            <div className="box-border ">
              <div className="grid gap-y-5">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setPending(true);
                    handleSubmit(e);
                  }}
                  className="bg-purple-600/70 w-full rounded-lg p-3 outline-offset-3"
                >
                  {pending ? <CSpinner /> : "Create account"}
                </button>
                <div className="flex items-center w-full space-x-2">
                  <div className=" h-0 border-t-[1px] border-[#4b4558] flex-1 "></div>
                  <div className="text-no-wrap text-[#4b4558]">
                    Or register with
                  </div>
                  <div className=" h-0 border-t-[1px] border-[#4b4558] flex-1 "></div>
                </div>
                <div className="flex space-x-3">
                  <div className="flex items-center py-1 justify-center space-x-3 flex-1 border-2 border-opacity-40 border-[#817992] rounded-lg">
                    <Image
                      src="/svgs/github.svg"
                      alt="Description of SVG"
                      width={35}
                      height={35}
                      className="size-3"
                    />
                    <p>Google</p>
                  </div>
                  <div className="flex items-center py-1 justify-center space-x-3 flex-1 border-2 border-opacity-40 border-[#817992] rounded-lg">
                    <Image
                      src="/svgs/google.svg"
                      alt="Description of SVG"
                      width={35}
                      height={35}
                      className="size-3"
                    />
                    <p>Apple</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
