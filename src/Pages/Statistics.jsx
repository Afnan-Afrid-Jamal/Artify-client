import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Statistics = () => {
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

    const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#7c3aed', '#6d28d9', '#4c1d95', '#ddd6fe'];

    const pieData = myData.map(item => ({
        name: item.title || 'Untitled',
        value: item.likesCount || 0
    }));

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-500 mb-6">
                Likes Distribution
            </h2>

            {/* Container for Chart */}
            <div className="w-full h-[400px] md:h-[500px] bg-gray-900/50 rounded-2xl p-2 md:p-6 border border-purple-500/20 shadow-2xl overflow-hidden">
                {myData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}

                                label={({ name, percent }) =>
                                    window.innerWidth < 640
                                        ? `${(percent * 100).toFixed(0)}%`
                                        : `${name} ${(percent * 100).toFixed(0)}%`
                                }

                                outerRadius={window.innerWidth < 640 ? 70 : 130}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #7c3aed',
                                    borderRadius: '10px',
                                    fontSize: '12px'
                                }}
                            />
                            <Legend
                                iconSize={10}
                                layout="horizontal"
                                verticalAlign="bottom"
                                align="center"
                                wrapperStyle={{ fontSize: '10px', marginTop: '10px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 italic text-sm">
                        Loading Statistics...
                    </div>
                )}
            </div>

            {/* Responsive Grid for Stats Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                <div className="bg-gray-900 p-6 rounded-xl border-b-4 border-purple-500 text-center">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Total Artworks</p>
                    <h3 className="text-3xl font-bold">{myData.length}</h3>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl border-b-4 border-violet-500 text-center">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Total Likes</p>
                    <h3 className="text-3xl font-bold">
                        {myData.reduce((sum, item) => sum + (item.likesCount || 0), 0)}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Statistics;