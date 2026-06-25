import { useState } from "react";

function App() {
  const links = [
    "fa-brands fa-google",
    "fa-brands fa-facebook-f",
    "fa-brands fa-github",
    "fa-brands fa-linkedin-in",
  ];

  const [panelSide, setPanelSide] = useState("left");

  const handlePanelToggle = () => {
    setPanelSide((prev) => (prev === "left" ? "right" : "left"));
  };

  const sections = [
    {
      title: "Sign In",
      subtitle: "or use your email password",
      fields: [
        { label: "Email", type: "email", placeholder: "example@xyz.com" },
        { label: "Password", type: "password", placeholder: "password" },
      ],
      button: "Sign In",
      showForgot: true,
    },
    {
      title: "Create Account",
      subtitle: "or use your email for registration",
      fields: [
        { label: "Name", type: "text", placeholder: "Aarav Goyal" },
        { label: "Email", type: "email", placeholder: "example@xyz.com" },
        { label: "Password", type: "password", placeholder: "password" },
      ],
      button: "Sign Up",
      showForgot: false,
    },
  ];

  const InputField = ({ label, type, placeholder }) => (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={label} className="text-base font-semibold">
        {label}
      </label>
      <input
        className="bg-(--grey) rounded-md px-3 py-2 outline-none"
        type={type}
        name={label}
        id={label}
        placeholder={placeholder}
        required
      />
    </div>
  );

  return (
    <div className="relative overflow-hidden py-20 px-10 bg-white min-w-[80vw] min-h-[80vh] rounded-[40px] shadow-2xl">
      {/* Forms */}
      <div className="relative z-10 flex flex-row justify-between items-center h-full">
        {sections.map((section) => (
          <div
            key={section.title}
            className="w-full flex flex-col justify-center items-center px-16 gap-8"
          >
            <h1 className="text-4xl font-extrabold">{section.title}</h1>

            <div className="flex gap-3">
              {links.map((link) => (
                <div
                  key={link}
                  className="border border-(--grey) w-10 h-10 flex justify-center items-center transition-all duration-300 ease-in-out rounded-md hover:bg-(--primary-dark)/20 hover:border-(--primary-dark) cursor-pointer"
                >
                  <i className={link}></i>
                </div>
              ))}
            </div>

            <span className="text-sm">{section.subtitle}</span>

            <form className="w-full flex flex-col gap-5">
              {section.fields.map((field) => (
                <InputField key={field.label} {...field} />
              ))}

              {section.showForgot && (
                <a href="#" className="text-sm text-(gray-500) text-center">
                  Forget Your Password?
                </a>
              )}

              <button
                type="submit"
                className="bg-(--primary-dark) text-white py-3 rounded-md mt-3 font-bold"
              >
                {section.button}
              </button>
            </form>
          </div>
        ))}
      </div>

      {/* Sliding Overlay */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-(--primary-dark) 
          flex flex-col justify-center items-center px-10 text-white gap-6
          transition-all duration-700 ease-in-out
          ${panelSide === "right" ? "translate-x-full z-40" : "translate-x-0 z-50"}`}
        style={{
          borderTopLeftRadius: panelSide === "right" ? "120px" : "0px",
          borderBottomLeftRadius: panelSide === "right" ? "120px" : "0px",
          borderTopRightRadius: panelSide === "left" ? "120px" : "0px",
          borderBottomRightRadius: panelSide === "left" ? "120px" : "0px",
        }}
      >
        <h1 className="text-4xl font-bold text-center">Hello, Friends!</h1>

        <p className="text-center max-w-[300px]">
          Register with your personal details to use all site features.
        </p>

        <button
          onClick={handlePanelToggle}
          className="border border-white cursor-pointer px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-black transition"
        >
          Sign In
        </button>
      </div>
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-(--primary-dark) 
          flex flex-col justify-center items-center px-10 text-white gap-6
          transition-all duration-700 ease-in-out
          ${panelSide === "right" ? "translate-x-full z-50" : "translate-x-0 z-40"}`}
        style={{
          borderTopLeftRadius: panelSide === "right" ? "120px" : "0px",
          borderBottomLeftRadius: panelSide === "right" ? "120px" : "0px",
          borderTopRightRadius: panelSide === "left" ? "120px" : "0px",
          borderBottomRightRadius: panelSide === "left" ? "120px" : "0px",
        }}
      >
        <h1 className="text-4xl font-bold text-center">Welcome Back!</h1>

        <p className="text-center max-w-[300px]">
          Enter your personal details to use all site features.
        </p>

        <button
          onClick={handlePanelToggle}
          className="border border-white cursor-pointer px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-black transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default App;
