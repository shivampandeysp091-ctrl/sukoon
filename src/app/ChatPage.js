"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Mic, MicOff, Send, Plus, User, ArrowLeft, Image as ImageIcon, Volume2, StopCircle } from 'lucide-react';

export default function ChatPage({ onBack }) {
    // --- State Variables ---
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm Sukoon. How are you feeling today?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // Voice States
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [allVoices, setAllVoices] = useState([]);

    const messagesEndRef = useRef(null);

    // --- 1. Auto-Scroll to bottom ---
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // --- 2. Load Browser Voices ---
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            setAllVoices(voices);
        };
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    // Helper: Find Best Female Voice (Flexible Language)
    const getFemaleVoice = () => {
        // Priority: Google Hindi (Reads English with Indian accent) -> Google US English -> Any Female
        return allVoices.find(v => v.name.includes("Google हिन्दी")) ||
               allVoices.find(v => v.name.includes("Google Hindi")) ||
               allVoices.find(v => v.name.includes("Google US English")) ||
               allVoices.find(v => v.name.includes("Zira")) || 
               allVoices.find(v => v.name.includes("Female"));
    };

    // --- 3. Text-to-Speech (Speaker) - Language Agnostic ---
    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop previous speech

            const utterance = new SpeechSynthesisUtterance(text);
            const selectedVoice = getFemaleVoice();

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                // Agar Hindi voice select hui hai to lang hi-IN rakho (English bhi padh legi)
                // Agar English voice hai to en-US rakho
                utterance.lang = selectedVoice.lang; 
            }
            
            utterance.rate = 1;       // Normal speed
            utterance.pitch = 1;      // Normal pitch

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        }
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    // --- 4. Speech-to-Text (Mic Logic) - STRICTLY ENGLISH ---
    const startListening = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            alert("Voice typing works best on Google Chrome or Edge.");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        // 🔴 CHANGE: Setting strictly to English
        recognition.lang = 'en-US'; 
        
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            // Append new spoken text to existing input
            setInput((prev) => prev ? prev + " " + transcript : transcript);
        };

        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event) => {
            console.error("Mic Error:", event.error);
            setIsListening(false);
        };

        try {
            recognition.start();
        } catch (e) {
            console.error(e);
        }
    };

    // --- 5. Handle Send (Backend Connection) ---
    const handleSend = async () => {
        if (!input.trim()) return;

        // Stop speaking if AI is currently talking
        stopSpeaking();

        const userMsg = { id: Date.now(), text: input, sender: "user" };
        setMessages(prev => [...prev, userMsg]);

        const currentInput = input;
        setInput(""); // Clear input
        setLoading(true);

        try {
            // Backend Call
            const res = await fetch("https://sukoon-backend-ul6s.onrender.com/chat", {
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

            // Update UI with Bot Reply
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now() + 1,
                    text: data.reply,
                    sender: "bot"
                }
            ]);

            // 🔴 TRIGGER VOICE: Speak whatever comes from backend
            speakText(data.reply);

        } catch (error) {
            console.log(error);
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now() + 1,
                    text: "Sorry, I’m having trouble connecting to the server.",
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

            {/* --- Header --- */}
            <header className="relative z-10 w-full px-6 py-4 flex justify-between items-center bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-sm">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => { stopSpeaking(); onBack(); }} 
                        className="p-2 hover:bg-white/30 rounded-full transition-colors text-gray-700"
                    >
                        <ArrowLeft size={28} />
                    </button>

                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8D63C6] via-[#6731AD] to-[#400095] bg-clip-text text-transparent">
                            Sukoon
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-500 font-medium -mt-1 ml-0.5 tracking-widest uppercase">chatbot</span>
                            {isSpeaking && (
                                <span className="text-[10px] text-[#6731AD] font-bold animate-pulse flex items-center gap-1">
                                    <Volume2 size={10} /> Speaking...
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Stop Speaking Button */}
                    {isSpeaking && (
                        <button 
                            onClick={stopSpeaking} 
                            className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition animate-pulse"
                            title="Stop Speaking"
                        >
                            <StopCircle size={20} />
                        </button>
                    )}
                    <div className="bg-black/80 p-2.5 rounded-full cursor-pointer hover:scale-110 transition-transform">
                        <User size={20} className="text-white" />
                    </div>
                </div>
            </header>

            {/* --- Chat Content --- */}
            <main className="relative z-10 flex-1 w-full max-w-full md:max-w-4xl flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-hide">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            
                            <div className={`flex items-end gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                
                                <div className={`max-w-[85%] md:max-w-[70%] px-6 py-4 rounded-[2rem] text-sm md:text-base shadow-sm transition-all relative group ${
                                    msg.sender === "user"
                                        ? "bg-[#6B8AFD]/90 text-white rounded-br-none backdrop-blur-md"
                                        : "bg-white/70 text-gray-700 rounded-bl-none border border-white/40 backdrop-blur-md"
                                }`}>
                                    {msg.text}
                                </div>

                                {/* Replay Button (Only for Bot messages) */}
                                {msg.sender === "bot" && (
                                    <button 
                                        onClick={() => speakText(msg.text)}
                                        className="p-2 bg-white/40 rounded-full hover:bg-white/80 transition text-[#6731AD] opacity-0 group-hover:opacity-100 md:opacity-100"
                                        title="Listen again"
                                    >
                                        <Volume2 size={16} />
                                    </button>
                                )}
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
                    <div className={`max-w-4xl mx-auto flex items-center bg-white/20 backdrop-blur-xl rounded-[2.5rem] border shadow-2xl px-4 py-2 transition-all focus-within:bg-white/30 ${isListening ? 'border-red-400 ring-2 ring-red-200' : 'border-white/40'}`}>
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
                            placeholder={isListening ? "Listening... (English)" : "Type a message..."}
                            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-base px-2"
                        />
                        
                        <div className="flex items-center gap-1 -ml-5 sm:ml-2">
                            {/* --- MIC BUTTON (Strictly English) --- */}
                            <button 
                                onClick={startListening}
                                className={`p-3 transition-colors rounded-full ${
                                    isListening 
                                    ? "bg-red-500 text-white animate-pulse" 
                                    : "text-gray-500 hover:text-[#6731AD] hover:bg-white/20"
                                }`}
                                title="Click to Speak (English)"
                            >
                                {isListening ? <MicOff size={22} /> : <Mic size={22} />}
                            </button>
                            
                            <button onClick={handleSend} className="p-3 bg-[#6731AD] text-white rounded-full shadow-lg hover:scale-105 transition-transform">
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}