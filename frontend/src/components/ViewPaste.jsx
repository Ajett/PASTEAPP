

// import React from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FiCopy } from "react-icons/fi";
// import { motion } from "framer-motion";

// const ViewPaste = () => {
//   const { id } = useParams();
//   const allPastes = useSelector((state) => state.paste.pastes);
//   const paste = allPastes.find((p) => p._id === id);

//   if (!paste) return <p className="text-center text-gray-400">Paste not found.</p>;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="max-w-5xl mx-auto mt-10 px-4"
//     >
//       {/* Title */}
//       <motion.h1
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="text-2xl font-semibold text-white"
//       >
//         {paste.title}
//       </motion.h1>

//       {/* Editor Container */}
//       <div className="bg-[#111] border border-gray-800 mt-5 rounded-xl overflow-hidden shadow-xl">

//         {/* Mac style bar */}
//         <div className="px-4 py-3 bg-[#1c1c1c] flex items-center gap-2">
//           <div className="w-3 h-3 rounded-full bg-red-500"></div>
//           <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//           <div className="w-3 h-3 rounded-full bg-green-500"></div>

//           {/* Copy button */}
//           <motion.button
//             whileHover={{ scale: 1.15 }}
//             onClick={() => navigator.clipboard.writeText(paste.content)}
//             className="ml-auto text-gray-400 hover:text-white"
//           >
//             <FiCopy size={20} />
//           </motion.button>
//         </div>

//         {/* Content Box */}
//         <div className="relative flex">

//           {/* Line Numbers */}
//           <div className="bg-[#0a0a0a] text-gray-600 px-4 py-4 text-right select-none">
//             {paste.content.split("\n").map((_, index) => (
//               <div key={index}>{index + 1}</div>
//             ))}
//           </div>

//           {/* Content */}
//           <pre className="w-full whitespace-pre-wrap p-4 text-gray-300 bg-[#0c0c0c]">
//             {paste.content}
//           </pre>
//         </div>
//       </div>

//       {/* Created Date */}
//       <p className="text-gray-500 text-sm mt-3">
//         Created on: {new Date(paste.createdAt).toDateString()}
//       </p>
//     </motion.div>
//   );
// };

// export default ViewPaste;

import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiCopy } from "react-icons/fi";
import { motion } from "framer-motion";

const ViewPaste = () => {
  const { id } = useParams();
  const all = useSelector(s => s.paste.pastes);
  const paste = all.find(p => p._id === id);

  if (!paste) return <p className="text-center text-gray-400 mt-10">Paste not found.</p>;

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-semibold text-white">{paste.title}</h1>
      <div className="bg-[#111] border border-gray-800 mt-5 rounded-xl overflow-hidden shadow-xl">
        <div className="px-4 py-3 bg-[#1c1c1c] flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <motion.button whileHover={{ scale: 1.15 }} onClick={() => navigator.clipboard.writeText(paste.content)} className="ml-auto text-gray-400 hover:text-white"><FiCopy size={20}/></motion.button>
        </div>

        <div className="relative flex">
          <div className="bg-[#0a0a0a] text-gray-600 px-4 py-4 text-right select-none">
            {paste.content.split("\n").map((_, i)=> <div key={i}>{i+1}</div>)}
          </div>
          <pre className="w-full whitespace-pre-wrap p-4 text-gray-300 bg-[#0c0c0c]">{paste.content}</pre>
        </div>
      </div>

      <p className="text-gray-500 text-sm mt-3">Created on: {new Date(paste.createdAt).toDateString()}</p>
    </motion.div>
  );
};

export default ViewPaste;

