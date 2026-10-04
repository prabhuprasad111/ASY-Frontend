import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hello! I am the ASY AI Assistant. Ask me anything about the Similipal Dashboard data, SHGs, or Livelihood projects.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let reply = "I'm analyzing the latest telemetry...";
      const lowerInput = userMsg.text.toLowerCase();
      
      if (lowerInput.includes('tourism') || lowerInput.includes('gudgudia')) {
        reply = "Eco-Tourism projects in Gudgudia show the highest profit margins (average 142% income increase). I recommend scaling homestays there.";
      } else if (lowerInput.includes('shg') || lowerInput.includes('edc')) {
        reply = "Currently, we have 177 Active Groups (30 EDCs and 147 SHGs). They've achieved 85% average fund utilization!";
      } else if (lowerInput.includes('revenue') || lowerInput.includes('profit')) {
        reply = "Total revenue is currently ₹1.33 Cr with a net profit of ₹36.5 Lakhs. NTFP accounts for ₹202.2L of the generated income.";
      } else {
        reply = "Based on the master data, progress is steady. Livelihood projects have yielded a 93% average income increase overall.";
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '60px', height: '60px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
          color: 'white', border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', zIndex: 9999,
          transition: 'transform 0.2s',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)'
        }}
      >
        {isOpen ? '✕' : '✨'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '100px', right: '24px',
          width: '350px', height: '500px',
          background: '#ffffff', borderRadius: '16px',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', zIndex: 9998,
          border: '1px solid #e5e7eb'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
            padding: '16px', color: 'white',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <span style={{ fontSize: '20px' }}>✨</span>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>ASY AI Assistant</div>
              <div style={{ fontSize: '0.8rem', color: '#a5b4fc' }}>Online • Ready to help</div>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1, padding: '16px', overflowY: 'auto',
            background: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '12px'
          }}>
            {messages.map(m => (
              <div key={m.id} style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%', padding: '10px 14px',
                borderRadius: '12px', fontSize: '0.9rem', lineHeight: '1.4',
                background: m.sender === 'user' ? '#4f46e5' : '#ffffff',
                color: m.sender === 'user' ? '#ffffff' : '#111827',
                boxShadow: m.sender === 'user' ? 'none' : '0 1px 2px rgba(0,0,0,0.05)',
                border: m.sender === 'user' ? 'none' : '1px solid #e5e7eb',
                borderBottomRightRadius: m.sender === 'user' ? '2px' : '12px',
                borderBottomLeftRadius: m.sender === 'ai' ? '2px' : '12px',
              }}>
                {m.text}
              </div>
            ))}
            {isTyping && (
              <div style={{
                alignSelf: 'flex-start', background: '#ffffff', border: '1px solid #e5e7eb',
                padding: '10px 14px', borderRadius: '12px', borderBottomLeftRadius: '2px',
                color: '#6b7280', fontSize: '0.9rem', display: 'flex', gap: '4px', alignItems: 'center'
              }}>
                <span className="dot-typing">●</span><span className="dot-typing" style={{animationDelay: '0.2s'}}>●</span><span className="dot-typing" style={{animationDelay: '0.4s'}}>●</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} style={{
            padding: '12px', background: '#ffffff',
            borderTop: '1px solid #e5e7eb', display: 'flex', gap: '8px'
          }}>
            <input 
              type="text" 
              placeholder="Type your question..." 
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{
                flex: 1, padding: '10px 14px', borderRadius: '20px',
                border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem',
                background: '#f3f4f6'
              }}
            />
            <button type="submit" disabled={!input.trim() || isTyping} style={{
              background: input.trim() && !isTyping ? '#4f46e5' : '#9ca3af',
              color: 'white', border: 'none', borderRadius: '50%',
              width: '40px', height: '40px', cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              ➤
            </button>
          </form>
        </div>
      )}
      
      <style>{`
        @keyframes blink { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }
        .dot-typing { animation: blink 1.4s infinite both; }
      `}</style>
    </>
  );
}
