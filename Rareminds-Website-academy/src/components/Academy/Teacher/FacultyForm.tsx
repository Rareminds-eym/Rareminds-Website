import { useState } from "react";
import { Input } from "../UI/input";
import { Textarea } from "../UI/textarea";
import { Button } from "../UI/button";

interface FormData {
  name: string;
  school: string;
  role: string;
  email: string;
  phone: string;
  message: string;
}

const FacultyForm=()=> {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    school: "",
    role: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Request submitted successfully!");
    setFormData({
      name: "",
      school: "",
      role: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="faculty-bg flex items-center justify-center px-2 ">
      <div className="glass-card-container w-full max-w-xl mx-auto flex flex-col bg-gray-200 rounded-md gap-6 p-4 sm:p-8">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-black text-center md:text-2xl text-lg font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
            Your Faculty is Your Brand. Let&apos;s Invest in Them.
          </h1>
          <div className="flex w-full gap-3 flex-col md:flex-row">
            <Button
              className="w-[auto]  md:w-1/2 font-medium rounded-[4px] py-2 px-0 p-3  text-sm md:text-lg"
              style={{ backgroundColor: "#ffc107", color: "#232323" }}
              type="button"
            >
              Host an FDP at My Institution
            </Button>
            <Button
              className="w-[auto] md:w-1/2 font-medium rounded-[4px] py-2 px-0 p-3  text-sm sm:text-base"
              style={{ backgroundColor: "#ffffff", color: "#232323" }}
              variant="secondary"
              type="button"
            >
              Talk to Academic Program Head
            </Button>
          </div>
        </div>
        <div className="form-glass px-3 sm:px-8 pt-5 pb-7 rounded-xl mx-auto w-full">
          <h2 className="text-black text-center font-semibold text-lg sm:text-xl mb-4">
            Request More Information
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3"
          >
            <div>
              <label htmlFor="name" className="label-gray">
                Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="input-glass"
                required
              />
            </div>
            <div>
              <label htmlFor="school" className="label-gray">
                School Name
              </label>
              <Input
                id="school"
                name="school"
                placeholder="Institution name"
                value={formData.school}
                onChange={handleChange}
                className="input-glass"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="label-gray">
                Role
              </label>
              <Input
                id="role"
                name="role"
                placeholder="Your position"
                value={formData.role}
                onChange={handleChange}
                className="input-glass"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="label-gray">
                Email
              </label>
              <Input
                id="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="input-glass"
                type="email"
                required
              />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="phone" className="label-gray">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="input-glass"
                type="tel"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="label-gray">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your requirements"
                value={formData.message}
                onChange={handleChange}
                className="input-glass"
                rows={3}
                required
              />
            </div>
            <div className="sm:col-span-2 flex justify-center mt-4">
              <Button
                type="submit"
                className="faculty-yellow-btn submit-btn bg-yellow-300 hover:bg-yellow-500 rounded-md"
              >
                Submit Request
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FacultyForm;