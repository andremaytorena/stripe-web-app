import LoginForm from "./loginForm";

function Login() {
  return (
    <div className="flex w-full h-screen items-center justify-center pb-10">
      <div className="relative w-full max-w-md">
        <div className="absolute -top-16 left-5">
          <span className="text-xl font-semibold text-gray-700">stripe</span>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
