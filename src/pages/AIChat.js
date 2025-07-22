import React, { useState, useRef, useEffect } from 'react';

const quickActions = [
  { label: 'Coding Doubt', value: 'I have a coding question.' },
  { label: 'Homework Check', value: 'Can you check my homework?' },
  { label: 'Explain a Concept', value: 'Can you explain this concept to me?' },
  { label: 'Practice Quiz', value: 'Give me a practice quiz.' },
  { label: 'Study Tips', value: 'How can I study better for exams?' },
];

// Mock chat history data
const mockChatHistory = [
  { id: 1, title: 'Math Homework', lastMessage: 'Can you help with algebra?', date: '2024-06-01' },
  { id: 2, title: 'Physics Doubt', lastMessage: 'Explain Newton’s laws', date: '2024-06-02' },
  { id: 3, title: 'General Chat', lastMessage: 'Thank you!', date: '2024-06-03' },
];

const initialMessages = [
  { sender: 'ai', text: 'Hello! I am your AI Tutor. How can I assist you today?' },
];

const AIChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState(mockChatHistory);
  const [currentChatId, setCurrentChatId] = useState(mockChatHistory[0]?.id || null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: 'ai', text: 'Thank you for your message! An AI Tutor will assist you shortly.' }]);
    }, 1000);
  };

  const handleQuickAction = (value) => {
    setInput(value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleSelectChat = (id) => {
    setCurrentChatId(id);
    // For demo, reset messages to initial (in real app, load chat by id)
    setMessages(initialMessages);
  };

  const handleNewChat = () => {
    const newId = chatHistory.length + 1;
    const newChat = {
      id: newId,
      title: `New Chat ${newId}`,
      lastMessage: '',
      date: new Date().toISOString().slice(0, 10),
    };
    setChatHistory([{...newChat}, ...chatHistory]);
    setCurrentChatId(newId);
    setMessages(initialMessages);
  };

  // Edit, Delete, Archive handlers
  const handleEditChat = (id) => {
    const newTitle = prompt('Edit chat title:');
    if (newTitle) {
      setChatHistory(chats => chats.map(chat => chat.id === id ? { ...chat, title: newTitle } : chat));
    }
    setMenuOpenId(null);
  };
  const handleDeleteChat = (id) => {
    setChatHistory(chats => chats.filter(chat => chat.id !== id));
    setMenuOpenId(null);
    if (currentChatId === id && chatHistory.length > 1) {
      setCurrentChatId(chatHistory[0].id);
      setMessages(initialMessages);
    }
  };
  const handleArchiveChat = (id) => {
    setChatHistory(chats => chats.map(chat => chat.id === id ? { ...chat, archived: true } : chat));
    setMenuOpenId(null);
  };
  const handleUnarchiveChat = (id) => {
    setChatHistory(chats => chats.map(chat => chat.id === id ? { ...chat, archived: false } : chat));
    setMenuOpenId(null);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar with chat history */}
      <aside className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">AI Tutor Chat</h2>
          <button
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full hover:bg-blue-600 transition"
            title="New Chat"
            onClick={handleNewChat}
          >
            <i className="ri-add-line text-xl"></i>
          </button>
        </div>
        <div className="flex mb-4 gap-2">
          <button
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition ${!showArchived ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
            onClick={() => setShowArchived(false)}
          >
            Recent
          </button>
          <button
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition ${showArchived ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
            onClick={() => setShowArchived(true)}
          >
            Archived
          </button>
        </div>
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">{showArchived ? 'Archived Chats' : 'Recent Chats'}</h3>
          <div className="flex flex-col gap-1">
            {(showArchived ? chatHistory.filter(chat => chat.archived) : chatHistory.filter(chat => !chat.archived)).map(chat => (
              <div key={chat.id} className="relative group">
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg transition font-medium text-sm mb-1 ${
                    chat.id === currentChatId
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleSelectChat(chat.id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="truncate font-semibold">{chat.title}</span>
                    <span className="text-xs text-gray-400 ml-2">{chat.date}</span>
                    <button
                      className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={e => { e.stopPropagation(); setMenuOpenId(menuOpenId === chat.id ? null : chat.id); }}
                      title="More options"
                    >
                      <i className="ri-more-2-fill"></i>
                    </button>
                  </div>
                </button>
                {menuOpenId === chat.id && (
                  <div className="absolute right-8 top-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 min-w-[120px]">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleEditChat(chat.id)}
                    >
                      Edit
                    </button>
                    {showArchived ? (
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => handleUnarchiveChat(chat.id)}
                      >
                        Unarchive
                      </button>
                    ) : (
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => handleArchiveChat(chat.id)}
                      >
                        Archive
                      </button>
                    )}
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleDeleteChat(chat.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto pt-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 flex items-center justify-center bg-primary rounded-full text-white mr-3">
                <i className="ri-robot-line"></i>
              </div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">AI Tutor</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Ask anything about your studies!</p>
          </div>
        </div>
      </aside>
      {/* Main chat area */}
      <main className="flex-1 flex flex-col justify-between">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition"
                  onClick={() => handleQuickAction(action.value)}
                >
                  {action.label}
                </button>
              ))}
            </div>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                    <i className="ri-robot-line"></i>
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-xs text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white ml-auto'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white ml-3">
                    <i className="ri-user-line"></i>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-2xl mx-auto flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <button
              className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition"
              onClick={handleSend}
            >
              <i className="ri-send-plane-line"></i>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIChat; 