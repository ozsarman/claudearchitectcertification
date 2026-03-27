import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface ExamStats {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  percentage: number;
  timeSpent: number; // in seconds
  timeRemaining: number; // in seconds
  moduleStats: Record<number, {
    moduleName: string;
    total: number;
    correct: number;
    incorrect: number;
    unanswered: number;
    percentage: number;
  }>;
}

interface ExamContextType {
  isExamMode: boolean;
  startExam: () => void;
  endExam: () => void;
  timeRemaining: number;
  isTimeUp: boolean;
  examStats: ExamStats | null;
  userAnswers: Record<string, string>;
  setUserAnswers: (answers: Record<string, string>) => void;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExamMode, setIsExamMode] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120 * 60); // 120 minutes in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [examStats, setExamStats] = useState<ExamStats | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [examStartTime, setExamStartTime] = useState<number | null>(null);

  // Timer effect
  useEffect(() => {
    if (!isExamMode || isTimeUp) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isExamMode, isTimeUp]);

  const startExam = useCallback(() => {
    setIsExamMode(true);
    setTimeRemaining(120 * 60);
    setIsTimeUp(false);
    setExamStats(null);
    setUserAnswers({});
    setExamStartTime(Date.now());
  }, []);

  const endExam = useCallback(() => {
    setIsExamMode(false);
    setExamStartTime(null);
  }, []);

  const value: ExamContextType = {
    isExamMode,
    startExam,
    endExam,
    timeRemaining,
    isTimeUp,
    examStats,
    userAnswers,
    setUserAnswers
  };

  return (
    <ExamContext.Provider value={value}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error("useExam must be used within ExamProvider");
  }
  return context;
};
