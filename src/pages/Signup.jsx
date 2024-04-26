import signupImg from "../assets/Images/3dmanlove.png"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join The Millions On The Journey To Classifying With TaskTrove For Free"
      description1="Organize for today, tomorrow, and beyond."
      description2="Manage Today-Benefit Tomorrow."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup