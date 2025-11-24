import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, RedFlowerIcon, BlueFlowerIcon } from './components/Icons';
import { generateCalendarGrid, getMonthName, formatDateKey } from './utils/dateUtils';
import DayModal from './components/DayModal';
import { DailyRecords, FlowerRecord, FlowerType } from './types';

function App() {
  // --- State ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [records, setRecords] = useState<DailyRecords>(() => {
    try {
      const saved = localStorage.getItem('garden_records');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to load records", e);
      return {};
    }
  });
  
  // Selected date for the modal (null means no modal)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('garden_records', JSON.stringify(records));
  }, [records]);

  // --- Derived State ---
  const calendarGrid = useMemo(() => generateCalendarGrid(currentDate), [currentDate]);
  
  const selectedDateKey = selectedDate ? formatDateKey(selectedDate) : null;
  const currentRecords = selectedDateKey ? (records[selectedDateKey] || []) : [];

  // --- Handlers ---
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const openDay = (date: Date) => {
    setSelectedDate(date);
  };

  const closeDay = () => {
    setSelectedDate(null);
  };

  const addRecord = (type: FlowerType, content: string) => {
    if (!selectedDateKey) return;

    const newRecord: FlowerRecord = {
      id: crypto.randomUUID(),
      type,
      content,
      timestamp: Date.now(),
    };

    setRecords(prev => {
      const existing = prev[selectedDateKey] || [];
      return {
        ...prev,
        [selectedDateKey]: [...existing, newRecord]
      };
    });
  };

  const deleteRecord = (id: string) => {
    if (!selectedDateKey) return;

    setRecords(prev => {
      const existing = prev[selectedDateKey] || [];
      return {
        ...prev,
        [selectedDateKey]: existing.filter(r => r.id !== id)
      };
    });
  };

  const getStatsForDay = (dateKey: string) => {
    const dayRecords = records[dateKey] || [];
    const redCount = dayRecords.filter(r => r.type === 'red').length;
    const blueCount = dayRecords.filter(r => r.type === 'blue').length;
    return { redCount, blueCount };
  };

  return (
    <div className="min-h-screen pb-12 font-sans text-gray-700 selection:bg-amber-200">
      
      {/* --- Sticky Header & Controls --- */}
      <div className="sticky top-0 z-40 bg-brand-bg/95 backdrop-blur-md shadow-md border-b border-amber-200/50 transition-all">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row: Title & Month Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4">
            
            {/* Title */}
            <div className="flex items-center gap-2">
              <RedFlowerIcon size={32} className="animate-bounce" style={{ animationDuration: '3s' }} />
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary tracking-tight whitespace-nowrap drop-shadow-sm">
                Little Garden
              </h1>
              <BlueFlowerIcon size={32} className="animate-bounce" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-4 bg-white/50 rounded-full px-2 sm:px-4 py-1 border border-white/60 shadow-sm w-full sm:w-auto justify-between sm:justify-center">
              <button 
                onClick={prevMonth}
                className="p-1 sm:p-2 hover:bg-white rounded-full text-amber-500 transition-colors active:scale-90"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-lg sm:text-xl font-bold text-amber-600 min-w-[100px] sm:min-w-[140px] text-center">
                {getMonthName(currentDate)}
              </h2>
              <button 
                onClick={nextMonth}
                className="p-1 sm:p-2 hover:bg-white rounded-full text-amber-500 transition-colors active:scale-90"
                aria-label="Next Month"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 pb-2 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-amber-600/80 font-bold uppercase tracking-wider text-xs sm:text-sm py-1">
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Calendar Grid --- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-7 gap-2 sm:gap-4">
          {calendarGrid.map((dayItem) => {
            const { redCount, blueCount } = getStatsForDay(dayItem.dateKey);
            const isToday = dayItem.isToday;
            const isCurrentMonth = dayItem.isCurrentMonth;
            
            return (
              <div 
                key={dayItem.dateKey}
                onClick={() => openDay(dayItem.date)}
                className={`
                  relative aspect-[4/5] sm:aspect-square rounded-2xl p-1 sm:p-2 cursor-pointer transition-all duration-300
                  flex flex-col items-center justify-start
                  ${isToday 
                    ? 'bg-white ring-4 ring-amber-400/50 border-2 border-amber-500 shadow-xl scale-[1.03] z-20' 
                    : isCurrentMonth 
                      ? 'bg-white/95 border-2 border-amber-100/50 hover:border-amber-300 hover:shadow-md hover:-translate-y-1' 
                      : 'bg-stone-100/60 border-2 border-transparent text-gray-400/50 hover:bg-white/40 grayscale-[0.5]'
                  }
                `}
              >
                {/* Today Badge */}
                {isToday && (
                  <div className="absolute -top-3 -right-2 bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse z-30">
                    TODAY
                  </div>
                )}

                {/* Date Number */}
                <span className={`text-lg sm:text-2xl font-bold mb-1 transition-colors ${isToday ? 'text-amber-600 scale-110' : 'text-gray-600'}`}>
                  {dayItem.date.getDate()}
                </span>

                {/* Flower Counters / Visuals */}
                <div className="flex-1 w-full flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                  {redCount > 0 && (
                     <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                        <RedFlowerIcon size={20} className="sm:w-8 sm:h-8 drop-shadow-sm" />
                        <span className="text-xs font-bold text-red-500">{redCount}</span>
                     </div>
                  )}
                  {blueCount > 0 && (
                     <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 delay-75">
                        <BlueFlowerIcon size={20} className="sm:w-8 sm:h-8 drop-shadow-sm" />
                        <span className="text-xs font-bold text-blue-500">{blueCount}</span>
                     </div>
                  )}
                  
                  {redCount === 0 && blueCount === 0 && isCurrentMonth && (
                    <div className="w-2 h-2 rounded-full bg-amber-100 mt-2 opacity-50"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Detail Modal --- */}
      <DayModal 
        isOpen={!!selectedDate}
        dateKey={selectedDateKey}
        dateObj={selectedDate}
        records={currentRecords}
        onClose={closeDay}
        onAdd={addRecord}
        onDelete={deleteRecord}
      />

    </div>
  );
}

export default App;