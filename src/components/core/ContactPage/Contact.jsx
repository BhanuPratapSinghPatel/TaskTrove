import React from "react";
import ContactUsForm from "../ContactPage/ContactUsForm";

const ContactForm = () => {
  return (
    <div className="border border-richblack-600 text-richblack-500 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-4xl leading-10 font-semibold text-richblack-300">
        Got An Idea? We&apos;ve Got The Skills. Let&apos;s Team Up
      </h1>
      <p className="">
        Tell Us More About Yourself
      </p>

      <div className="mt-7">
        <ContactUsForm/>
      </div>
    </div>
  );
};

export default ContactForm;
