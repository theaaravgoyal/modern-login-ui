import { useState, useRef } from "react";

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

  const [mobileActiveSec, setActiveSec] = useState("signIn");
  const [ripple, setRipple] = useState(null);
  const cardRef = useRef(null);

  const handleSectionToggle = (e, targetSec) => {
    const btn = e.currentTarget;
    const cardRect = cardRef.current.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const x = btnRect.left + btnRect.width / 2 - cardRect.left;
    const y = btnRect.top + btnRect.height / 2 - cardRect.top;
    const color = targetSec === "signUp" ? "#6600ff" : "#ececec";

    setRipple({ x, y, color, active: false });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setRipple({ x, y, color, active: true });
        setTimeout(() => {
          setActiveSec(targetSec);
          setRipple(null);
        }, 520);
      });
    });
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

  const signUpFormFields = [
    { label: "Name", type: "text", placeholder: "Aarav Goyal" },
    { label: "Email", type: "email", placeholder: "example@xyz.com" },
    { label: "Password", type: "password", placeholder: "password" },
  ];
  const signInFormFields = [
    { label: "Email", type: "email", placeholder: "example@xyz.com" },
    { label: "Password", type: "password", placeholder: "password" },
  ];

  const InputField = ({ label, type, placeholder, dark = false }) => (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={label}
        className="text-xs font-bold tracking-widest uppercase"
        style={{ color: "var(--primary-dark)" }}
      >
        {label}
      </label>
      <input
        className="bg-(--grey) rounded-xl px-4 py-3 outline-none text-sm focus:ring-2 focus:ring-(--primary-dark)/30 transition-all"
        type={type}
        name={label}
        id={label}
        placeholder={placeholder}
        required
      />
    </div>
  );

  const SocialIcons = () => (
    <div className="flex gap-2.5 justify-center">
      {links.map((link) => (
        <div
          key={link}
          className="border border-(--grey) w-11 h-11 flex justify-center items-center rounded-xl cursor-pointer transition-all duration-200 hover:border-(--primary-dark) hover:bg-(--primary-light)/20"
        >
          <i className={`${link} text-sm`}></i>
        </div>
      ))}
    </div>
  );

  const maxRadius = 900;

  return (
    <>
      {/* ========== DESKTOP VIEW — UNTOUCHED ========== */}
      <div className="hidden xl:inline-block relative overflow-hidden py-20 px-10 bg-white min-w-[80vw] min-h-[80vh] rounded-[40px] shadow-2xl">
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
                  <a href="#" className="text-sm text-gray-500 text-center">
                    Forget Your Password?
                  </a>
                )}
                <button
                  type="submit"
                  className="bg-(--primary-dark) cursor-pointer text-white py-3 rounded-md mt-3 font-bold"
                >
                  {section.button}
                </button>
              </form>
            </div>
          ))}
        </div>

        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-(--primary-dark) flex flex-col justify-center items-center px-10 text-white gap-6 transition-all duration-700 ease-in-out ${
            panelSide === "right"
              ? "translate-x-full z-40"
              : "translate-x-0 z-50"
          }`}
          style={{
            borderTopLeftRadius: panelSide === "right" ? "120px" : "0px",
            borderBottomLeftRadius: panelSide === "right" ? "120px" : "0px",
            borderTopRightRadius: panelSide === "left" ? "120px" : "0px",
            borderBottomRightRadius: panelSide === "left" ? "120px" : "0px",
          }}
        >
          <h1 className="text-4xl font-bold text-center">Hello, Friends!</h1>
          <p className="text-center">
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
          className={`absolute top-0 left-0 w-1/2 h-full bg-(--primary-dark) flex flex-col justify-center items-center px-10 text-white gap-6 transition-all duration-700 ease-in-out ${
            panelSide === "right"
              ? "translate-x-full z-50"
              : "translate-x-0 z-40"
          }`}
          style={{
            borderTopLeftRadius: panelSide === "right" ? "120px" : "0px",
            borderBottomLeftRadius: panelSide === "right" ? "120px" : "0px",
            borderTopRightRadius: panelSide === "left" ? "120px" : "0px",
            borderBottomRightRadius: panelSide === "left" ? "120px" : "0px",
          }}
        >
          <h1 className="text-4xl font-bold text-center">Welcome Back!</h1>
          <p className="text-center">
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

      {/* ========== MOBILE VIEW — REDESIGNED ========== */}
      <div
        ref={cardRef}
        className="inline-block xl:hidden relative overflow-hidden bg-white w-[90vw] rounded-3xl shadow-2xl"
      >
        {/* Radial ripple overlay */}
        {ripple && (
          <div
            style={{
              position: "absolute",
              left: ripple.x,
              top: ripple.y,
              width: ripple.active ? `${maxRadius * 2}px` : "0px",
              height: ripple.active ? `${maxRadius * 2}px` : "0px",
              borderRadius: "50%",
              background: ripple.color,
              transform: "translate(-50%, -50%)",
              zIndex: 20,
              pointerEvents: "none",
              transition: ripple.active
                ? "width 0.55s cubic-bezier(0.4,0,0.2,1), height 0.55s cubic-bezier(0.4,0,0.2,1)"
                : "none",
            }}
          />
        )}

        {/* ——— SIGN IN ——— purple bg */}
        <div
          className={`${
            mobileActiveSec === "signIn" ? "flex" : "hidden"
          } relative z-10 flex-col items-center`}
          style={{ background: "var(--primary-dark)" }}
        >
          {/* Purple header area */}
          <div className="w-full flex flex-col items-center px-7 pt-10 pb-8 gap-5">
            <h1 className="text-3xl font-extrabold text-white">Welcome Back</h1>
            <p className="text-sm" style={{ color: "var(--primary-light)" }}>
              Sign in to continue your journey
            </p>
            <div className="flex gap-2.5">
              {links.map((link) => (
                <div
                  key={link}
                  className="w-11 h-11 flex justify-center items-center rounded-xl cursor-pointer transition-all duration-200 bg-white/10 hover:bg-white/20 border border-white/20"
                >
                  <i className={`${link} text-white text-sm`}></i>
                </div>
              ))}
            </div>
            <span className="text-xs" style={{ color: "var(--primary-light)" }}>
              or use your email & password
            </span>
          </div>

          {/* White form area */}
          <div className="w-full bg-white rounded-t-3xl px-7 pt-8 pb-10 flex flex-col gap-4">
            <form className="w-full flex flex-col gap-4">
              {signInFormFields.map((field) => (
                <InputField key={field.label} {...field} />
              ))}
              <a href="#" className="text-xs text-gray-400 text-right -mt-1">
                Forgot password?
              </a>
              <button
                type="submit"
                className="text-white py-4 rounded-xl font-bold text-base mt-1 transition-opacity hover:opacity-90"
                style={{ background: "var(--primary-dark)" }}
              >
                Sign In
              </button>
            </form>
            <div className="text-center text-gray-300 text-xs">— or —</div>
            <button
              onClick={(e) => handleSectionToggle(e, "signUp")}
              className="border-2 rounded-xl py-3 font-bold text-sm cursor-pointer transition-all hover:opacity-80"
              style={{
                borderColor: "var(--primary-dark)",
                color: "var(--primary-dark)",
                background: "transparent",
              }}
            >
              Create an account →
            </button>
          </div>
        </div>

        {/* ——— SIGN UP ——— white bg */}
        <div
          className={`${
            mobileActiveSec === "signUp" ? "flex" : "hidden"
          } relative z-10 flex-col items-center`}
        >
          {/* Grey header area */}
          <div
            className="w-full flex flex-col items-center px-7 pt-10 pb-8 gap-5 rounded-b-3xl"
            style={{ background: "var(--grey)" }}
          >
            <h1 className="text-3xl font-extrabold text-black">
              Create Account
            </h1>
            <p className="text-sm text-gray-500">
              Join us — it only takes a minute
            </p>
            <div className="flex gap-2.5">
              {links.map((link) => (
                <div
                  key={link}
                  className="w-11 h-11 flex justify-center items-center rounded-xl cursor-pointer transition-all duration-200 bg-white border border-gray-200 hover:border-(--primary-dark)"
                >
                  <i className={`${link} text-sm`}></i>
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-400">
              or use your email for registration
            </span>
          </div>

          {/* White form area */}
          <div className="w-full bg-white px-7 pt-8 pb-10 flex flex-col gap-4">
            <form className="w-full flex flex-col gap-4">
              {signUpFormFields.map((field) => (
                <InputField key={field.label} {...field} />
              ))}
              <button
                type="submit"
                className="text-white py-4 rounded-xl font-bold text-base mt-1 hover:opacity-90 transition-opacity"
                style={{ background: "var(--primary-dark)" }}
              >
                Sign Up
              </button>
            </form>
            <div className="text-center text-gray-300 text-xs">— or —</div>
            <button
              onClick={(e) => handleSectionToggle(e, "signIn")}
              className="border-2 rounded-xl py-3 font-bold text-sm cursor-pointer transition-all hover:opacity-80"
              style={{
                borderColor: "var(--primary-dark)",
                color: "var(--primary-dark)",
                background: "transparent",
              }}
            >
              ← Back to Sign In
            </button>
          </div>
        </div>
      </div>
      <table></table>
    </>
  );
}

export default App;
