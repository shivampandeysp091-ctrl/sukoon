"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Mic, Send, Plus, User, ArrowLeft, Image as ImageIcon } from 'lucide-react';


// Add onBack to the component props
export default function ChatPage({ onBack }) {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm Sukoon. How are you feeling today?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);

    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
        const res = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: currentInput
            })
        });

        if (!res.ok) {
            throw new Error("Backend error");
        }

        const data = await res.json();

        setMessages(prev => [
            ...prev,
            {
                id: Date.now() + 1,
                text: data.reply,
                sender: "bot"
            }
        ]);
    } catch (error) {
        console.log(error)
        setMessages(prev => [
            ...prev,
            {
                id: Date.now() + 1,
                text: "Sorry, I’m having trouble connecting right now.",
                sender: "bot"
            }
        ]);
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="relative min-h-screen w-full flex flex-col items-center bg-[#E5EBFB] font-sans overflow-hidden">
            
            <div className="absolute inset-0 z-0">
                <Image src="/images/bg-main.jpg" alt="Background" fill className="object-cover object-bottom opacity-50" priority />
            </div>

            {/* --- Updated Header with Back Arrow --- */}
            <header className="relative z-10 w-full px-6 py-4 flex justify-between items-center bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-sm">
                <div className="flex items-center gap-4">
                    {/* BACK ARROW BUTTON */}
                    <button 
                        onClick={onBack} 
                        className="p-2 hover:bg-white/30 rounded-full transition-colors text-gray-700"
                    >
                        <ArrowLeft size={28} />
                    </button>

                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8D63C6] via-[#6731AD] to-[#400095] bg-clip-text text-transparent">
                            Sukoon
                        </h1>
                        <span className="text-[10px] text-gray-500 font-medium -mt-1 ml-0.5 tracking-widest uppercase">chatbot</span>
                    </div>
                </div>

                <div className="bg-black/80 p-2.5 rounded-full cursor-pointer hover:scale-110 transition-transform">
                    <User size={20} className="text-white" />
                </div>
            </header>

            {/* ... Rest of your Chat Content and Input Area ... */}
            <main className="relative z-10 flex-1 w-full max-w-full md:max-w-4xl flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-hide">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[85%] md:max-w-[70%] px-6 py-4 rounded-[2rem] text-sm md:text-base shadow-sm transition-all ${
                                msg.sender === "user"
                                    ? "bg-[#6B8AFD]/90 text-white rounded-br-none backdrop-blur-md"
                                    : "bg-white/70 text-gray-700 rounded-bl-none border border-white/40 backdrop-blur-md"
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white/40 px-5 py-2 rounded-full text-xs text-gray-500 animate-pulse border border-white/20 backdrop-blur-sm">
                                Sukoon is typing...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* --- Input Section --- */}
                <div className="p-4 md:p-8 w-full">
                    <div className="max-w-4xl mx-auto flex items-center bg-white/20 backdrop-blur-xl rounded-[2.5rem] border border-white/40 shadow-2xl px-4 py-2 transition-all focus-within:bg-white/30">
                        <button className="p-3 text-gray-600 hover:text-[#6731AD] transition-colors rounded-full hover:bg-white/20">
                            <Plus size={22} />
                        </button>
                        <button className="p-3 text-gray-600 hover:text-[#6731AD] transition-colors rounded-full hover:bg-white/20">
                            <ImageIcon size={22} />
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-base px-2"
                        />
                        <div className="flex items-center gap-1 ml-2">
                            <button className="p-3 text-gray-500 hover:text-[#6731AD] transition-colors rounded-full hover:bg-white/20">
                                <Mic size={22} />
                            </button>
                            <button onClick={handleSend} className="p-3 bg-[#6731AD] text-white rounded-full shadow-lg">
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}