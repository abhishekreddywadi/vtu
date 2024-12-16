import { create } from 'zustand';
import { Subject, RevaluationRequest } from '../types';

interface RevaluationState {
  selectedSubjects: Subject[];
  requests: RevaluationRequest[];
  addSubject: (subject: Subject) => void;
  removeSubject: (subjectId: string) => void;
  clearSelection: () => void;
  addRequest: (request: RevaluationRequest) => void;
  calculateTotalFee: () => number;
}

export const useRevaluationStore = create<RevaluationState>((set, get) => ({
  selectedSubjects: [],
  requests: [],
  addSubject: (subject) =>
    set((state) => ({
      selectedSubjects: [...state.selectedSubjects, subject],
    })),
  removeSubject: (subjectId) =>
    set((state) => ({
      selectedSubjects: state.selectedSubjects.filter((s) => s.id !== subjectId),
    })),
  clearSelection: () => set({ selectedSubjects: [] }),
  addRequest: (request) =>
    set((state) => ({
      requests: [...state.requests, request],
    })),
  calculateTotalFee: () => {
    const { selectedSubjects } = get();
    return selectedSubjects.reduce((total, subject) => total + subject.fee, 0);
  },
}));