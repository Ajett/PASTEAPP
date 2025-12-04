
// import { NavLink } from "react-router-dom";
// import { Home } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/authSlice";

// const Navbar = () => {
//   const user = useSelector((state) => state.auth.user);
//   const dispatch = useDispatch();

//   return (
//     <div className="w-full bg-[#0f0f0f] border-b border-gray-800 py-4">
//       <div className="max-w-6xl mx-auto flex items-center gap-3 text-gray-400">

//         {/* Left Navigation */}
//         <Home size={18} className="text-gray-500" />
//         <span>/</span>

//         <NavLink to="/" className="hover:text-white transition">
//           Home
//         </NavLink>

//         <span>/</span>

//         <NavLink to="/pastes" className="hover:text-white transition">
//           Pastes
//         </NavLink>

//         {/* Right side Auth Buttons */}
//         <div className="ml-auto flex items-center gap-4">

//           {!user ? (
//             <>
//               <NavLink 
//                 to="/login" 
//                 className="hover:text-white transition"
//               >
//                 Login
//               </NavLink>

//               <NavLink 
//                 to="/register" 
//                 className="hover:text-white transition"
//               >
//                 Register
//               </NavLink>
//             </>
//           ) : (
//             <>
//               <span className="text-gray-300">Hi, {user.name}</span>

//               <button
//                 onClick={() => dispatch(logout())}
//                 className="text-red-400 hover:text-red-300 transition"
//               >
//                 Logout
//               </button>
//             </>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
// import { NavLink } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/authSlice";

// const Navbar = () => {
//   const user = useSelector(s => s.auth.user);
//   const dispatch = useDispatch();

//   return (
//     <div className="w-full bg-[#0f0f0f] border-b border-gray-800 py-4">
//       <div className="max-w-6xl mx-auto flex items-center gap-3 text-gray-400 px-4">
//         <NavLink to="/" className="hover:text-white transition">Home</NavLink>
//         <span>/</span>
//         <NavLink to="/pastes" className="hover:text-white transition">Pastes</NavLink>

//         <div className="ml-auto flex items-center gap-4">
//           {!user ? (
//             <>
//               <NavLink to="/login" className="hover:text-white">Login</NavLink>
//               <NavLink to="/register" className="hover:text-white">Register</NavLink>
//             </>
//           ) : (
//             <>
//               <span className="text-gray-300">Hi, {user.name}</span>
//               <button onClick={() => dispatch(logout())} className="text-red-400 hover:text-red-300">Logout</button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const user = useSelector(s => s.auth.user);
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-[#0f0f0f] border-b border-gray-800 py-4">
      <div className="max-w-6xl mx-auto flex items-center gap-6 text-gray-400 px-4">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-2">
          {/* Replace this with any SVG you want */}
          <svg width="34" height="34" viewBox="0 0 128 128">
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#6EE7FF" />
                <stop offset="1" stop-color="#A855F7" />
              </linearGradient>
            </defs>
            <rect width="128" height="128" rx="26" fill="#0d0d0d" />
            <rect x="34" y="24" width="60" height="80" rx="14" stroke="url(#lg)" strokeWidth="4" fill="none" />
          </svg>

          <span className="text-white font-semibold text-lg">PasteApp</span>
        </NavLink>

        {/* Divider */}
        <span className="text-gray-600">|</span>

        {/* Navigation */}
        <NavLink to="/" className="hover:text-white transition">Home</NavLink>
        <span>/</span>
        <NavLink to="/pastes" className="hover:text-white transition">Pastes</NavLink>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-4">
          {!user ? (
            <>
              <NavLink to="/login" className="hover:text-white">Login</NavLink>
              <NavLink to="/register" className="hover:text-white">Register</NavLink>
            </>
          ) : (
            <>
              <span className="text-gray-300">Hi, {user.name}</span>
              <button
                onClick={() => dispatch(logout())}
                className="text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;



