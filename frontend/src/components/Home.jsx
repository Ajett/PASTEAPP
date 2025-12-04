


// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { setPastes, addPaste, updatePaste } from "../redux/pasteSlice";
// import { useState, useEffect } from "react";
// import { createPasteAPI, updatePasteAPI, fetchPastes } from "../api/pasteApi";
// import { motion } from "framer-motion";
// import { FiCopy, FiPlus, FiEdit } from "react-icons/fi";

// const Home = () => {
//   const [title, setTitle] = useState("");
//   const [value, setValue] = useState("");
//   const [syntax, setSyntax] = useState("text");
//   const [visibility, setVisibility] = useState("Public");

//   const [searchParams, setSearchParams] = useSearchParams();
//   const pasteId = searchParams.get("pasteId");

//   const dispatch = useDispatch();
//   const pastes = useSelector((state) => state.paste.pastes);

//   // Load all pastes from DB once
//   useEffect(() => {
//     fetchPastes().then((res) => {
//       dispatch(setPastes(res.data));
//     });
//   }, []);

//   // Fill existing content for editing
//   useEffect(() => {
//     if (pasteId) {
//       const paste = pastes.find((p) => p._id === pasteId);
//       if (paste) {
//         setTitle(paste.title);
//         setValue(paste.content);
//         setSyntax(paste.syntax);
//         setVisibility(paste.visibility);
//       }
//     }
//   }, [pasteId, pastes]);

//   async function handleSubmit() {
//     const paste = {
//       title,
//       content: value,
//       syntax,
//       visibility
//     };

//     if (pasteId) {
//       const res = await updatePasteAPI(pasteId, paste);
//       dispatch(updatePaste(res.data));
//     } else {
//       const res = await createPasteAPI(paste);
//       dispatch(addPaste(res.data));
//     }

//     setTitle("");
//     setValue("");
//     setSearchParams({});
//   }

//   return (
//     <div className="max-w-6xl mx-auto mt-8 px-4">

//       {/* Dropdown + Button */}
//       <div className="flex gap-4">

//         <select
//           className="bg-[#111] text-gray-300 px-3 py-2 rounded"
//           value={syntax}
//           onChange={(e) => setSyntax(e.target.value)}
//         >
//           <option value="text">Text</option>
//           <option value="code">Code</option>
//           <option value="markdown">Markdown</option>
//         </select>

//         <select
//           className="bg-[#111] text-gray-300 px-3 py-2 rounded"
//           value={visibility}
//           onChange={(e) => setVisibility(e.target.value)}
//         >
//           <option value="Public">Public</option>
//           <option value="Private">Private</option>
//         </select>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           onClick={handleSubmit}
//           className="bg-blue-600 text-white px-5 py-2 rounded flex items-center gap-2"
//         >
//           {pasteId ? <FiEdit /> : <FiPlus />}
//           {pasteId ? "Update Paste" : "Create Paste"}
//         </motion.button>
//       </div>

//       {/* Title */}
//       <input
//         className="w-full mt-5 bg-[#111] text-gray-300 px-4 py-3 rounded"
//         placeholder="Paste title..."
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       {/* Editor */}
//       <div className="bg-[#111] mt-4 rounded-xl">

//         {/* Mac top bar */}
//         <div className="px-4 py-2 bg-[#1c1c1c] flex items-center gap-3">
//           <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//           <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//           <div className="w-3 h-3 bg-green-500 rounded-full"></div>

//           <motion.button
//             whileHover={{ scale: 1.2 }}
//             onClick={() => navigator.clipboard.writeText(value)}
//             className="ml-auto text-gray-400 hover:text-white"
//           >
//             <FiCopy size={20} />
//           </motion.button>
//         </div>

//         {/* Textarea */}
//         <textarea
//           className="w-full min-h-[350px] bg-[#0d0d0d] p-5 text-gray-300"
//           value={value}
//           placeholder="Write your paste here..."
//           onChange={(e) => setValue(e.target.value)}
//         />
//       </div>
//     </div>
//   );
// };

// export default Home;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPastes, addPaste, updatePaste } from "../redux/pasteSlice";
import { fetchPastes, createPasteAPI, updatePasteAPI } from "../api/pasteApi";
import { useSearchParams } from "react-router-dom";
import { FiCopy, FiPlus, FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [syntax, setSyntax] = useState("text");
  const [visibility, setVisibility] = useState("Public");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const pastes = useSelector(s => s.paste.pastes);

  useEffect(() => {
    fetchPastes().then(res => dispatch(setPastes(res.data))).catch(()=>{});
  }, [dispatch]);

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find(p => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
        setSyntax(paste.syntax);
        setVisibility(paste.visibility);
      }
    }
  }, [pasteId, pastes]);

  async function handleSubmit() {
    const paste = { title, content: value, syntax, visibility };
    try {
      if (pasteId) {
        const res = await updatePasteAPI(pasteId, paste);
        dispatch(updatePaste(res.data));
        toast.success("Paste updated");
      } else {
        const res = await createPasteAPI(paste);
        dispatch(addPaste(res.data));
        toast.success("Paste created");
      }
      setTitle("");
      setValue("");
      setSearchParams({});
    } catch (err) {
      toast.error("Action failed");
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex gap-2">
          <select value={syntax} onChange={e=>setSyntax(e.target.value)} className="bg-[#111] text-gray-300 px-3 py-2 rounded">
            <option value="text">Text</option>
            <option value="code">Code</option>
            <option value="markdown">Markdown</option>
          </select>
          <select value={visibility} onChange={e=>setVisibility(e.target.value)} className="bg-[#111] text-gray-300 px-3 py-2 rounded">
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          <motion.button whileHover={{ scale: 1.05 }} onClick={handleSubmit} className="bg-blue-600 text-white px-5 py-2 rounded flex items-center gap-2">
            {pasteId ? <FiEdit /> : <FiPlus />} {pasteId ? "Update Paste" : "Create Paste"}
          </motion.button>
        </div>
      </div>

      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Paste title..." className="w-full mt-5 bg-[#111] text-gray-300 px-4 py-3 rounded"/>

      <div className="bg-[#111] mt-4 rounded-xl">
        <div className="px-4 py-2 bg-[#1c1c1c] flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>

          <motion.button whileHover={{ scale: 1.2 }} onClick={() => { navigator.clipboard.writeText(value); toast.success("Copied to clipboard"); }} className="ml-auto text-gray-400 hover:text-white">
            <FiCopy size={20} />
          </motion.button>
        </div>

        <textarea value={value} onChange={e=>setValue(e.target.value)} placeholder="Write your paste here..." className="w-full min-h-[300px] bg-[#0d0d0d] p-5 text-gray-300 rounded-b-xl"/>
      </div>
    </div>
  );
};

export default Home;
