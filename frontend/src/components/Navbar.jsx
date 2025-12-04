
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
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const user = useSelector(s => s.auth.user);
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-[#0f0f0f] border-b border-gray-800 py-4">
      <div className="max-w-6xl mx-auto flex items-center gap-3 text-gray-400 px-4">
        <NavLink to="/" className="hover:text-white transition">Home</NavLink>
        <span>/</span>
        <NavLink to="/pastes" className="hover:text-white transition">Pastes</NavLink>

        <div className="ml-auto flex items-center gap-4">
          {!user ? (
            <>
              <NavLink to="/login" className="hover:text-white">Login</NavLink>
              <NavLink to="/register" className="hover:text-white">Register</NavLink>
            </>
          ) : (
            <>
              <span className="text-gray-300">Hi, {user.name}</span>
              <button onClick={() => dispatch(logout())} className="text-red-400 hover:text-red-300">Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
