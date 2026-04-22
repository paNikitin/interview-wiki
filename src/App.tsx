/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Code2, 
  Cpu, 
  Database, 
  ChevronRight, 
  Layers, 
  Terminal,
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TOPICS } from './constants';
import { Category, Topic } from './types';

const CATEGORIES_CONFIG: Record<Category, { icon: any; color: string; bgColor: string; borderColor: string }> = {
  'Algorithms': { icon: Code2, color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-100' },
  'Data Structures': { icon: Layers, color: 'text-purple-700', bgColor: 'bg-purple-50', borderColor: 'border-purple-100' },
  'Python Internals': { icon: Terminal, color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-100' },
  'System Design': { icon: Database, color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100' },
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = useMemo(() => {
    return TOPICS.filter(topic => {
      const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           topic.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const progress = Math.round((TOPICS.length / 20) * 100); // Mock progress

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 flex flex-col p-4 md:p-6">
      {/* Header Navigation */}
      <header className="flex flex-col md:flex-row items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => { setSelectedTopic(null); setSelectedCategory('All'); setSearchQuery(''); }}>
            <span className="text-white font-bold text-xl uppercase">S</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">
            Backend <span className="text-indigo-600">Wiki</span>
          </h1>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search concepts..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-lg text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <nav className="flex items-center gap-6">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Learning Progress</span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{progress}% Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24 md:w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-indigo-600"
                />
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {selectedTopic ? (
            <TopicDetail 
              topic={selectedTopic} 
              onBack={() => setSelectedTopic(null)} 
            />
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Category Toggles */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                    selectedCategory === 'All' 
                    ? 'bg-slate-900 border-slate-900 text-white' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'
                  }`}
                >
                  All Topics
                </button>
                {(Object.keys(CATEGORIES_CONFIG) as Category[]).map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                      selectedCategory === cat 
                      ? `${CATEGORIES_CONFIG[cat].bgColor} ${CATEGORIES_CONFIG[cat].borderColor} ${CATEGORIES_CONFIG[cat].color} border-indigo-200 ring-2 ring-indigo-500/10` 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTopics.map((topic, index) => (
                  <TopicCard 
                    key={topic.id} 
                    topic={topic} 
                    index={index}
                    onClick={() => setSelectedTopic(topic)} 
                  />
                ))}
                {filteredTopics.length === 0 && (
                  <div className="col-span-full py-20 text-center">
                    <p className="text-slate-400 font-medium italic">No matching concepts found in our knowledge base.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Status Bar */}
      <footer className="mt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-[11px] font-medium tracking-tight gap-4 pt-6 border-t border-slate-200">
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5 font-bold text-indigo-600 uppercase tracking-widest"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> Session: Interview Ready</span>
          <span className="uppercase tracking-widest">Role: Senior Backend Python</span>
          <span className="uppercase tracking-widest">Target: Scalable Architectures</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
            Current Isolation Level: <span className="text-slate-900 font-bold uppercase">REPEATABLE READ</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

function TopicCard({ topic, index, onClick }: { topic: Topic; index: number; onClick: () => void }) {
  const config = CATEGORIES_CONFIG[topic.category];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col cursor-pointer hover:shadow-md transition-all group overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 ${config.bgColor} ${config.color} text-[10px] font-bold uppercase rounded border ${config.borderColor}`}>
            {topic.category}
          </span>
        </div>
        <Icon className={`w-4 h-4 ${config.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
        {topic.title}
      </h3>
      
      <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
        {topic.description}
      </p>

      {topic.complexity && (
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 italic">
            Time: {topic.complexity.time}
          </span>
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Learn More</span>
        <ChevronRight className="w-3 h-3 text-indigo-600" />
      </div>
    </motion.div>
  );
}

function TopicDetail({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const config = CATEGORIES_CONFIG[topic.category];
  const Icon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
    >
      {/* Detail Header */}
      <div className="bg-slate-50 p-6 border-b border-slate-200">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest mb-4 transition-colors group"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Back to Knowledge Base
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-3 ${config.bgColor} rounded-xl border ${config.borderColor}`}>
              <Icon className={`w-6 h-6 ${config.color}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{topic.title}</h2>
              <p className="text-slate-500 font-medium text-sm">{topic.description}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
             <span className={`px-2 py-1 ${config.bgColor} ${config.color} text-[10px] font-bold uppercase rounded border ${config.borderColor} mb-1`}>
              {topic.category}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Topic ID: {topic.id}</span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-10">
        {/* Main Content */}
        <div className="prose prose-slate max-w-none">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wide border-b border-slate-100 pb-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-500" />
            Core Concepts
          </h3>
          <p className="text-slate-600 leading-relaxed text-base">
            {topic.content}
          </p>
        </div>

        {/* Complexity & Stats Grid */}
        {topic.complexity && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              Computational Complexity
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(topic.complexity).map(([key, value]) => (
                <div key={key} className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{key}</p>
                  <p className="text-lg font-mono font-bold text-indigo-900">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {topic.comparison && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              Structural Comparison
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {topic.comparison.headers.map((h, i) => (
                      <th key={i} className="px-5 py-3 font-bold text-slate-500 uppercase text-[10px] tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topic.comparison.rows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      {row.map((cell, j) => (
                        <td key={j} className={`px-5 py-3.5 ${j === 0 ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Code Snippet */}
        {topic.code && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              Reference Implementation
            </h3>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-800 bg-slate-900">
              <div className="px-4 py-3 bg-slate-800/80 backdrop-blur-sm flex items-center justify-between border-b border-slate-700/50">
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-1.5 mr-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{topic.language || 'python'}</span>
                </div>
                <button className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[10px] font-bold">
                  <Copy className="w-3 h-3" />
                  COPY
                </button>
              </div>
              <SyntaxHighlighter 
                language={topic.language || 'python'} 
                style={vscDarkPlus}
                customStyle={{ 
                  margin: 0, 
                  padding: '1.5rem', 
                  fontSize: '13px', 
                  backgroundColor: 'transparent',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                {topic.code}
              </SyntaxHighlighter>
            </div>
            <p className="mt-4 text-[11px] text-slate-400 italic flex items-center gap-2">
              <AlertCircle className="w-3 h-3" />
              Note: This is a simplified reference model and may require adaptation for production.
            </p>
          </div>
        )}
      </div>

      <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" /> Back list
        </button>
        <div className="flex gap-4">
           <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1">
            <ExternalLink className="w-3 h-3" /> Official Docs
          </button>
        </div>
      </div>
    </motion.div>
  );
}
