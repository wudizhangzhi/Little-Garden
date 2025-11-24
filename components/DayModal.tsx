import React, { useState, useEffect, useRef } from 'react';
import { FlowerRecord, FlowerType } from '../types';
import { RedFlowerIcon, BlueFlowerIcon, XIcon, TrashIcon } from './Icons';

interface DayModalProps {
  isOpen: boolean;
  dateKey: string | null;
  dateObj: Date | null;
  records: FlowerRecord[];
  onClose: () => void;
  onAdd: (type: FlowerType, content: string) => void;
  onDelete: (id: string) => void;
}

const DayModal: React.FC<DayModalProps> = ({ 
  isOpen, 
  dateKey, 
  dateObj,
  records, 
  onClose, 
  onAdd, 
  onDelete 
}) => {
  const [selectedType, setSelectedType] = useState<FlowerType>('red');
  const [inputText, setInputText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Animation ref for modal entrance
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setInputText('');
    } else {
      setTimeout(() => setIsAnimating(false), 200);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const handleAdd = () => {
    if (inputText.trim()) {
      onAdd(selectedType, inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const formattedDate = dateObj 
    ? dateObj.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' }) 
    : '';

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        ref={modalContentRef}
        className={`relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-amber-100 flex flex-col max-h-[90vh] transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-100 bg-amber-50/50 rounded-t-3xl">
          <h2 className="text-2xl font-bold text-amber-600 tracking-tight">
            {formattedDate}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-amber-400 hover:text-amber-600 bg-white hover:bg-amber-100 rounded-full transition-colors"
          >
            <XIcon />
          </button>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
          {records.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400 space-y-4">
               <div className="opacity-30 grayscale flex gap-4">
                 <RedFlowerIcon size={40} />
                 <BlueFlowerIcon size={40} />
               </div>
               <p className="text-lg font-medium">No flowers yet today!</p>
            </div>
          ) : (
            records.map((record) => (
              <div 
                key={record.id} 
                className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-transform hover:scale-[1.01] ${
                  record.type === 'red' 
                    ? 'bg-red-50 border-red-100' 
                    : 'bg-blue-50 border-blue-100'
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {record.type === 'red' ? (
                    <RedFlowerIcon size={32} />
                  ) : (
                    <BlueFlowerIcon size={32} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-lg leading-snug">{record.content}</p>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <button 
                  onClick={() => onDelete(record.id)}
                  className="text-gray-300 hover:text-red-400 p-2 -mr-2 -mt-2 transition-colors"
                  aria-label="Delete record"
                >
                  <TrashIcon />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Input Area */}
        <div className="p-6 bg-white border-t border-amber-100 rounded-b-3xl space-y-4">
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setSelectedType('red')}
              className={`flex-1 py-3 px-4 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all duration-200 ${
                selectedType === 'red' 
                  ? 'bg-red-50 border-red-400 text-red-600 shadow-md transform scale-105' 
                  : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-red-50 hover:border-red-200 hover:text-red-400 opacity-60 hover:opacity-100'
              }`}
            >
              <RedFlowerIcon size={24} />
              <span className="font-bold">Good Job!</span>
            </button>
            <button 
              onClick={() => setSelectedType('blue')}
              className={`flex-1 py-3 px-4 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all duration-200 ${
                selectedType === 'blue' 
                  ? 'bg-blue-50 border-blue-400 text-blue-600 shadow-md transform scale-105' 
                  : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-400 opacity-60 hover:opacity-100'
              }`}
            >
              <BlueFlowerIcon size={24} />
              <span className="font-bold">Needs Work</span>
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={selectedType === 'red' ? "What did they do well?" : "What needs improvement?"}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100 transition-all text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={handleAdd}
              disabled={!inputText.trim()}
              className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md active:scale-95"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayModal;