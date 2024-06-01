import SignupForm from "./signupForm";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";


function Signup() {
  return (
    <div className="flex w-full h-screen justify-center align-top pt-20">
      <div className="pr-20 pt-10">
        <span className="text-xl font-semibold text-gray-700 pl-6">stripe</span>
        <div className="flex items-start pt-6">
          <IoIosCheckmarkCircleOutline className="mt-1" style={{ color: 'purple', fontSize: '1rem' }} />
          <div className="ml-2 w-96">
            <div className="flex flex-col justify-start">
              <h1 className="text-md font-medium text-gray-700">Get started quickly</h1>
              <p1 className="text-sm text-gray-600 text-wrap">Integrate with developer-friendly APIs or choose low-code or pre-built solutions.</p1>
            </div>
          </div>
        </div>
        <div className="flex items-start pt-4">
          <IoIosCheckmarkCircleOutline className="mt-1" style={{ color: 'purple', fontSize: '1rem' }} />
          <div className="ml-2 w-96">
            <div className="flex flex-col justify-start">
              <h1 className="text-md font-medium text-gray-700">Support any business model</h1>
              <p1 className="text-sm text-gray-600 text-wrap">E-commerce, subscriptions, SaaS platforms, marketplaces, and more—all within a unified platform.</p1>
            </div>
          </div>
        </div>
        <div className="flex items-start pt-4">
          <IoIosCheckmarkCircleOutline className="mt-1" style={{ color: 'purple', fontSize: '1rem' }} />
          <div className="ml-2 w-96">
            <div className="flex flex-col justify-start">
              <h1 className="text-md font-medium text-gray-700">Join millions of businesses</h1>
              <p1 className="text-sm text-gray-600 text-wrap">Stripe is trusted by ambitious startups and enterprises of every size.</p1>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full max-w-md">
          <SignupForm />
      </div>
    </div>
);
}

export default Signup;