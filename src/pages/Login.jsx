import loginImg from "../assets/Images/3d-business-joyful-man-with-phone-waving-his-hand.png"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Organize for today, tomorrow, and beyond."
      description2="Manage Today-Benefit Tomorrow."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login