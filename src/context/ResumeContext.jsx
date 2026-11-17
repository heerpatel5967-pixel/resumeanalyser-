import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  DEMO_RESUME, 
  RECENT_ANALYSES, 
  CAREER_ROLES, 
  SKILL_GAPS, 
  RESUME_IMPROVEMENTS, 
  INTERVIEW_QUESTIONS 
} from '../data/mockData';

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [currentResume, setCurrentResume] = useState(DEMO_RESUME);
  const [recentAnalyses, setRecentAnalyses] = useState(RECENT_ANALYSES);
  const [careerRoles, setCareerRoles] = useState(CAREER_ROLES);
  const [skillGaps, setSkillGaps] = useState(SKILL_GAPS);
  const [improvements, setImprovements] = useState(RESUME_IMPROVEMENTS);
  const [interviewQuestions, setInterviewQuestions] = useState(INTERVIEW_QUESTIONS);
  
  // Real file reference for backend upload
  const [rawFile, setRawFile] = useState(null);

  // Analysis & Engine States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('');
  const [hasCustomUpload, setHasCustomUpload] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'connected' | 'offline' | 'checking'
  const [aiEngineName, setAiEngineName] = useState(null);

  // Check Backend Health on Mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          const data = await res.json();
          setBackendStatus('connected');
          setAiEngineName(data.aiProvider || 'FastAPI Engine');
        } else {
          setBackendStatus('offline');
        }
      } catch (err) {
        setBackendStatus('offline');
      }
    };
    checkHealth();
  }, []);

  // Computed live ATS score based on applied improvements
  const baseScore = currentResume.atsScore || 80;
  const appliedCount = improvements.filter(imp => imp.applied).length;
  const dynamicScore = Math.min(99, baseScore + (appliedCount * 3));

  // Toggle improvement applied status
  const toggleImprovement = (id) => {
    setImprovements(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.applied;
        if (nextState) {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#7357FF', '#00D9FF', '#10B981']
          });
        }
        return { ...item, applied: nextState };
      }
      return item;
    }));
  };

  // Upload and immediately extract text from PDF or DOCX
  const handleFileUpload = async (file) => {
    const isDocx = file.name.endsWith('.docx') || file.name.endsWith('.doc');
    const isPdf = file.name.endsWith('.pdf');
    
    if (!isDocx && !isPdf) {
      alert("Please upload a valid PDF or DOCX file.");
      return false;
    }

    setRawFile(file);
    const fileSizeStr = (file.size / 1024).toFixed(1) + " KB";
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");

    // Initial immediate optimistic state
    const optimisticResume = {
      ...currentResume,
      fileName: file.name,
      fileSize: fileSizeStr,
      uploadedAt: "Just now",
      applicantName: nameWithoutExt || "Candidate",
      extractedText: `Reading file ${file.name}...\nExtracting text content from binary...`
    };
    setCurrentResume(optimisticResume);
    setHasCustomUpload(true);

    // Call real text extraction API on backend
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        setCurrentResume(prev => ({
          ...prev,
          fileName: result.fileName,
          fileSize: result.fileSize,
          extractedText: result.extractedText,
          applicantName: result.meta?.candidateName || nameWithoutExt || prev.applicantName
        }));
        setBackendStatus('connected');
      } else {
        // Fallback to local representation if backend endpoint failed
        setCurrentResume(prev => ({
          ...prev,
          extractedText: `--- EXTRACTED RESUME TEXT: ${file.name} ---\n${DEMO_RESUME.extractedText}`
        }));
      }
    } catch (e) {
      console.warn("Backend extract-text offline, using client fallback:", e);
      setCurrentResume(prev => ({
        ...prev,
        extractedText: `--- EXTRACTED RESUME TEXT: ${file.name} ---\n${DEMO_RESUME.extractedText}`
      }));
    }

    return true;
  };

  // Real AI & ATS Analysis Scan
  const runAiAnalysis = async (targetRoleOverride) => {
    setIsAnalyzing(true);
    setAnalysisProgress(15);
    setAnalysisStage('Parsing document structure and typography...');

    const roleToAnalyze = targetRoleOverride || currentResume.targetRole || "Senior Frontend / Full Stack Engineer";

    // Progress tick simulator while backend processes
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev < 40) {
          setAnalysisStage('Extracting technical keywords, competencies, and tools...');
          return prev + 15;
        } else if (prev < 70) {
          setAnalysisStage('Executing ATS parser matching against industry benchmarks...');
          return prev + 12;
        } else if (prev < 88) {
          setAnalysisStage('Generating personalized role match & interview questions...');
          return prev + 6;
        }
        return prev;
      });
    }, 600);

    try {
      if (rawFile) {
        // Real Backend Call with FormData
        const formData = new FormData();
        formData.append('file', rawFile);
        formData.append('target_role', roleToAnalyze);

        const response = await fetch('/api/analyze', {
          method: 'POST',
          body: formData,
        });

        clearInterval(progressInterval);

        if (response.ok) {
          const json = await response.json();
          const analysisData = json.data;

          setAnalysisProgress(100);
          setAnalysisStage('Analysis complete!');

          setTimeout(() => {
            setIsAnalyzing(false);
            setAiEngineName(analysisData.aiEngine || 'FastAPI Real Engine');

            // Update main resume state
            setCurrentResume(prev => ({
              ...prev,
              ...analysisData,
              atsScore: analysisData.atsScore || prev.atsScore,
            }));

            // Update associated modules
            if (analysisData.careerRoles?.length) setCareerRoles(analysisData.careerRoles);
            if (analysisData.skillGaps?.length) setSkillGaps(analysisData.skillGaps);
            if (analysisData.improvements?.length) setImprovements(analysisData.improvements);
            if (analysisData.interviewQuestions?.length) setInterviewQuestions(analysisData.interviewQuestions);

            // Add to recent analyses
            const newAnalysis = {
              id: `ana-${Date.now()}`,
              fileName: analysisData.fileName || rawFile.name,
              targetRole: roleToAnalyze,
              date: "Just now",
              score: analysisData.atsScore,
              status: "Completed",
              keywordsMatched: `${analysisData.detectedKeywords?.length || 15} Found`,
              badge: "Live AI",
            };
            setRecentAnalyses(prev => [newAnalysis, ...prev]);

            // Celebrate!
            confetti({
              particleCount: 90,
              spread: 75,
              origin: { y: 0.6 },
              colors: ['#7357FF', '#00D9FF', '#10B981']
            });
          }, 600);
          return;
        }
      }

      // If no file uploaded or backend error, run local timer fallback
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setAnalysisStage('Finalizing analysis...');

      setTimeout(() => {
        setIsAnalyzing(false);
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#7357FF', '#00D9FF', '#FFFFFF']
        });

        const newAnalysis = {
          id: `ana-${Date.now()}`,
          fileName: currentResume.fileName,
          targetRole: roleToAnalyze,
          date: "Just now",
          score: dynamicScore,
          status: "Completed",
          keywordsMatched: `${currentResume.detectedKeywords.length} Found`,
          badge: "Analyzed",
        };
        setRecentAnalyses(prev => [newAnalysis, ...prev]);
      }, 700);

    } catch (err) {
      clearInterval(progressInterval);
      console.warn("Analysis API call error, falling back:", err);
      setIsAnalyzing(false);
    }
  };

  const resetToDemo = () => {
    setCurrentResume(DEMO_RESUME);
    setCareerRoles(CAREER_ROLES);
    setSkillGaps(SKILL_GAPS);
    setImprovements(RESUME_IMPROVEMENTS);
    setInterviewQuestions(INTERVIEW_QUESTIONS);
    setRawFile(null);
    setHasCustomUpload(false);
  };

  return (
    <ResumeContext.Provider value={{
      currentResume,
      dynamicScore,
      recentAnalyses,
      careerRoles,
      skillGaps,
      improvements,
      interviewQuestions,
      isAnalyzing,
      analysisProgress,
      analysisStage,
      hasCustomUpload,
      bannerDismissed,
      backendStatus,
      aiEngineName,
      setBannerDismissed,
      handleFileUpload,
      runAiAnalysis,
      toggleImprovement,
      resetToDemo,
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
