import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { HiOutlineDatabase, HiOutlineCube } from "react-icons/hi";
import { IoPricetagOutline, IoEyeOutline, IoCalendarOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineCategory, MdOutlineColorLens } from "react-icons/md";

const DashboardTable = () => {
    const { user } = useContext(AuthContext);
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        if (!user?.email) return;
        fetch(`https://artify-server-sigma.vercel.app/my-gallery?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setMyData(data.data || []);
            });
    }, [user?.email, user?.accessToken]);

    return (
        <div className="bg-gray-900/40 p-4 md:p-8 rounded-2xl md:rounded-3xl border border-purple-500/10 shadow-xl overflow-hidden">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 md:p-3 bg-purple-500/10 rounded-xl md:rounded-2xl">
                        <HiOutlineDatabase className="text-2xl md:text-3xl text-purple-500" />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Artwork Inventory</h2>
                        <p className="text-gray-500 text-xs md:text-sm">Manage your gallery data</p>
                    </div>
                </div>
                <div className="bg-purple-600/10 border border-purple-500/20 px-4 py-1.5 md:px-5 md:py-2 rounded-xl md:rounded-2xl">
                    <span className="text-purple-400 font-bold text-base md:text-lg">{myData.length}</span>
                    <span className="text-purple-300/60 text-[10px] md:text-xs uppercase tracking-widest ml-2 font-medium">Items</span>
                </div>
            </div>

            {/* Responsive Wrapper */}
            <div className="w-full">
                {/* Table View: শুধুমাত্র মাঝারি (md) এবং বড় স্ক্রিনে দেখা যাবে */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="text-gray-500 uppercase text-[10px] tracking-[0.2em] border-b border-gray-800">
                                <th className="pb-4 font-semibold px-2">Masterpiece</th>
                                <th className="pb-4 font-semibold px-2"><MdOutlineCategory className="inline mb-1 mr-1" /> Category</th>
                                <th className="pb-4 font-semibold px-2 text-center"><IoPricetagOutline className="inline mb-1 mr-1" /> Price</th>
                                <th className="pb-4 font-semibold px-2 text-center"><AiOutlineHeart className="inline mb-1 mr-1" /> Likes</th>
                                <th className="pb-4 font-semibold px-2 text-center"><IoEyeOutline className="inline mb-1 mr-1" /> Visibility</th>
                                <th className="pb-4 font-semibold text-right px-2"><IoCalendarOutline className="inline mb-1 mr-1" /> Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {myData.map((item) => (
                                <tr key={item._id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="py-4 px-2">
                                        <div className="flex items-center gap-3">
                                            <img src={item.imageURL} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                            <p className="text-gray-200 font-medium text-sm truncate max-w-[120px]">{item.title}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-gray-400 text-xs">{item.category}</td>
                                    <td className="py-4 px-2 text-center text-purple-400 font-semibold text-sm">${item.price}</td>
                                    <td className="py-4 px-2 text-center">
                                        <span className="text-pink-500 text-xs font-bold">{item.likesCount}</span>
                                    </td>
                                    <td className="py-4 px-2 text-center">
                                        <span className={`text-[10px] font-bold ${item.visibility === 'Public' ? 'text-green-500' : 'text-yellow-500'}`}>
                                            {item.visibility}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 text-right text-gray-500 text-[11px]">
                                        {new Date(item.createdAt).toLocaleDateString('en-GB')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Card View: শুধুমাত্র মোবাইল স্ক্রিনে (md-র নিচে) দেখা যাবে */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {myData.map((item) => (
                        <div key={item._id} className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                            <div className="flex gap-4 items-center mb-4">
                                <img src={item.imageURL} alt="" className="w-16 h-16 rounded-xl object-cover" />
                                <div className="flex-1 overflow-hidden">
                                    <h3 className="text-gray-200 font-bold text-base truncate">{item.title}</h3>
                                    <p className="text-gray-500 text-xs italic">{item.medium}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-purple-400 font-bold text-lg">${item.price}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-y-2 border-t border-gray-700/50 pt-3">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-[10px] uppercase">Category</span>
                                    <span className="text-gray-300 text-xs">{item.category}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-gray-500 text-[10px] uppercase">Popularity</span>
                                    <span className="text-pink-500 text-xs font-bold">{item.likesCount} Likes</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-[10px] uppercase">Status</span>
                                    <span className={`text-xs font-bold ${item.visibility === 'Public' ? 'text-green-500' : 'text-yellow-500'}`}>{item.visibility}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-gray-500 text-[10px] uppercase">Added On</span>
                                    <span className="text-gray-400 text-xs">{new Date(item.createdAt).toLocaleDateString('en-GB')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {myData.length === 0 && (
                <div className="text-center py-10 md:py-20 text-gray-500 italic text-sm">
                    No data found in your records.
                </div>
            )}
        </div>
    );
};

export default DashboardTable;