"use client";
import { useState, useEffect } from "react";
export default function Dashboard() {

    const [requests, setRequests] = useState([]);
    const [activeTab, setActiveTab] = useState("mail")
    const getAllRequests = async () => {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (response.ok) {
            setRequests(data);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            window.location.href = "/login"
            return
        }

        getAllRequests()  // ← chiamato una volta al caricamento
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem("access_token")

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        window.location.href = "/login"
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="mb-2">Dashboard</h1>
            <div className="flex">
                <button className={`m-4 p-1 rounded border ${activeTab === "mail" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                 onClick={() => setActiveTab("mail")}>
                    Mail
                </button>
                <button className={`m-4 p-1 rounded border ${activeTab === "foto" ?"bg-blue-500 text-white" : "bg-gray-100"}`}
                 onClick={() => setActiveTab("foto")}>
                    Foto
                </button>
            </div>

            {requests
                .filter(req => req.request_type === activeTab)
                .map((req) => (
                    <div key={req.id} className="p-4 border rounded mb-2 w-96 shadow-sm">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">#{req.id} - {req.request_type}</span>
                            <span className={`px-2 py-1 rounded text-sm ${req.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                                {req.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{new Date(req.created_at).toLocaleString("it-IT")}</p>
                    </div>
                ))}
            <button className="border rounded p-2 bg-red-500 text-white"onClick={handleLogout}>
                Logout
            </button>

        </div>

    )
}