"use client";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ username, password }),

        });
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            window.location.href = "/dashboard"
        } else {
            console.error("Login fallito", data)
        }
    }

    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm p-8 border rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-center mb-6">Accedi</h1>
                <div className="flex flex-col gap-1 mb-4">
                    <label className="text-sm font-medium text-gray-700">Username</label>
                    <input
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1 mb-6">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="w-full bg-blue-500 text-white rounded py-2 font-medium hover:bg-blue-600 transition-colors"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
        // <div className="flex flex-col items-center justify-center">
        //     <div>
        //         <label>Username:</label>
        //         <input
        //             value={username}
        //             onChange={(e) => setUsername(e.target.value)}
        //         />
        //     </div>
        //     <div>
        //         <label>password:</label>
        //         <input
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //         />
        //     </div>
        //     <div>
        //         <button onClick={handleLogin}>
        //             login
        //         </button>
        //     </div>

        // </div>
    );
}