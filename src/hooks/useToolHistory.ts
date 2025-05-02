import { useState, useEffect } from 'react';
import { ToolHistory } from '../types';

export const useToolHistory = () => {
  const [history, setHistory] = useState<ToolHistory[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('toolHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        // Convert string dates back to Date objects
        const formattedHistory = parsedHistory.map((item: any) => ({
          ...item,
          lastUsed: new Date(item.lastUsed)
        }));
        setHistory(formattedHistory);
      } catch (e) {
        console.error('Failed to parse tool history', e);
        setHistory([]);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('toolHistory', JSON.stringify(history));
  }, [history]);

  const recordToolUse = (toolId: string) => {
    setHistory(prev => {
      const existingTool = prev.find(item => item.id === toolId);
      
      if (existingTool) {
        // Update existing tool
        return prev.map(item => 
          item.id === toolId 
            ? { ...item, lastUsed: new Date(), useCount: item.useCount + 1 }
            : item
        );
      } else {
        // Add new tool to history
        return [...prev, { id: toolId, lastUsed: new Date(), useCount: 1 }];
      }
    });
  };

  const getRecentTools = (limit = 5) => {
    return [...history]
      .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime())
      .slice(0, limit);
  };

  const getMostUsedTools = (limit = 5) => {
    return [...history]
      .sort((a, b) => b.useCount - a.useCount)
      .slice(0, limit);
  };

  return {
    recordToolUse,
    getRecentTools,
    getMostUsedTools,
    history
  };
};