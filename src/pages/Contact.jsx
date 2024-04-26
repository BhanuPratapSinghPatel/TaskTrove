import React from "react"

import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import ContactDetails from "../components/core/ContactPage/ContactDetails"
import ContactUs from "../components/core/ContactPage/Contact"


const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails/>
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactUs/>
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-8 text-richblack-300">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews From Other Users
        </h1>
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  )
}

export default Contact
