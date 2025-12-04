
// import { useEffect, useState } from "react";
// import { fetchPastes, deletePasteAPI } from "../api/pasteApi";
// import { useDispatch, useSelector } from "react-redux";
// import { setPastes, removePaste } from "../redux/pasteSlice";
// import { Link } from "react-router-dom";
// import { FiEdit, FiTrash2, FiEye, FiCopy, FiShare2 } from "react-icons/fi";
// import toast from "react-hot-toast";

// const Pastes = () => {
//   const dispatch = useDispatch();
//   const pastes = useSelector(s => s.paste.pastes);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchPastes().then(res => dispatch(setPastes(res.data))).catch(()=>{});
//   }, [dispatch]);

//   const filtered = pastes.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

//   const handleDelete = async (id) => {
//     try {
//       await deletePasteAPI(id);
//       dispatch(removePaste(id));
//       toast.success("Deleted");
//     } catch (err) { toast.error("Delete failed"); }
//   };

//   const handleShare = (paste) => {
//     const url = `${window.location.origin}/pastes/${paste._id}`;
//     if (navigator.share) navigator.share({ title: paste.title, text: paste.content, url }).catch(()=>{});
//     else { navigator.clipboard.writeText(url); toast.success("Link copied"); }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 px-3">
//       <input placeholder="Search paste..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="p-3 border rounded-xl w-full bg-[#0f0f0f] text-gray-300 border-gray-700"/>
//       <div className="mt-6 flex flex-col gap-5">
//         {filtered.map(paste => (
//           <div key={paste._id} className="border border-gray-800 bg-[#0c0c0c] p-5 rounded-xl">
//             <div className="font-bold text-xl text-white">{paste.title}</div>
//             <div className="text-gray-400 mt-1 whitespace-pre-wrap">{paste.content}</div>
//             <div className="flex gap-3 mt-4 text-sm">
//               <Link to={`/?pasteId=${paste._id}`} className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] hover:bg-[#222] border border-gray-700 rounded-lg text-gray-300"><FiEdit/> Edit</Link>
//               <Link to={`/pastes/${paste._id}`} className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] hover:bg-[#222] border border-gray-700 rounded-lg text-gray-300"><FiEye/> View</Link>
//               <button onClick={()=>handleDelete(paste._id)} className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] hover:bg-[#222] border border-gray-700 rounded-lg text-red-400"><FiTrash2/> Delete</button>
//               <button onClick={()=>{navigator.clipboard.writeText(paste.content); toast.success('Copied')}} className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] hover:bg-[#222] border border-gray-700 rounded-lg text-gray-300"><FiCopy/> Copy</button>
//               <button onClick={()=>handleShare(paste)} className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] hover:bg-[#222] border border-gray-700 rounded-lg text-purple-400"><FiShare2/> Share</button>
//             </div>
//             <div className="text-gray-500 text-sm mt-3">{new Date(paste.createdAt).toDateString()}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Pastes; 



import { useEffect, useState } from "react";
import { fetchPastes, deletePasteAPI } from "../api/pasteApi";
import { useDispatch, useSelector } from "react-redux";
import { setPastes, removePaste } from "../redux/pasteSlice";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiEye, FiCopy, FiShare2 } from "react-icons/fi";
import toast from "react-hot-toast";

const Pastes = () => {
  const dispatch = useDispatch();
  const pastes = useSelector((s) => s.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPastes()
      .then((res) => dispatch(setPastes(res.data)))
      .catch(() => {});
  }, [dispatch]);

  const filtered = pastes.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await deletePasteAPI(id);
      dispatch(removePaste(id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleShare = (paste) => {
    const url = `${window.location.origin}/pastes/${paste._id}`;
    if (navigator.share)
      navigator.share({ title: paste.title, text: paste.content, url }).catch(() => {});
    else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-3">

      {/* Search Bar */}
      <input
        placeholder="Search paste..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-3 rounded-xl w-full bg-[#0f0f0f] text-gray-300 border border-gray-700 
                   focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* Pastes List */}
      <div className="mt-6 flex flex-col gap-5 pb-10">
        {filtered.map((paste) => (
          <div
            key={paste._id}
            className="border border-gray-800 bg-[#0c0c0c] p-5 rounded-xl 
                       shadow-md hover:shadow-lg transition-all"
          >
            <div className="font-bold text-xl text-white break-words">{paste.title}</div>

            <div className="text-gray-400 mt-2 whitespace-pre-wrap break-words">
              {paste.content}
            </div>

            {/* Responsive Buttons */}
            <div className="flex flex-wrap gap-3 mt-4 text-sm">

              <Link
                to={`/?pasteId=${paste._id}`}
                className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] 
                           hover:bg-[#222] border border-gray-700 rounded-lg text-gray-300
                           transition-all"
              >
                <FiEdit /> Edit
              </Link>

              <Link
                to={`/pastes/${paste._id}`}
                className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] 
                           hover:bg-[#222] border border-gray-700 rounded-lg text-gray-300
                           transition-all"
              >
                <FiEye /> View
              </Link>

              <button
                onClick={() => handleDelete(paste._id)}
                className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] 
                           hover:bg-[#222] border border-gray-700 rounded-lg text-red-400
                           transition-all"
              >
                <FiTrash2 /> Delete
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                  toast.success("Copied");
                }}
                className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] 
                           hover:bg-[#222] border border-gray-700 rounded-lg text-gray-300
                           transition-all"
              >
                <FiCopy /> Copy
              </button>

              <button
                onClick={() => handleShare(paste)}
                className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a]
                           hover:bg-[#222] border border-gray-700 rounded-lg text-purple-400
                           transition-all"
              >
                <FiShare2 /> Share
              </button>
            </div>

            {/* Date */}
            <div className="text-gray-500 text-sm mt-3">
              {new Date(paste.createdAt).toDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pastes;

