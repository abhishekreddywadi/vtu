import React from 'react';
import { useRevaluationStore } from '../../store/useRevaluationStore';
import { Subject } from '../../types';
import { Button } from '../ui/Button';
import { formatPrice } from '../../lib/utils';
import { Check, X } from 'lucide-react';

// Mock data - replace with API call
const availableSubjects: Subject[] = [
  {
    id: '1',
    code: 'CS401',
    name: 'Data Structures',
    semester: 4,
    marks: 35,
    fee: 1000,
  },
  {
    id: '2',
    code: 'CS402',
    name: 'Operating Systems',
    semester: 4,
    marks: 38,
    fee: 1000,
  },
  {
    id: '3',
    code: 'CS403',
    name: 'Computer Networks',
    semester: 4,
    marks: 32,
    fee: 1000,
  },
];

export const SubjectSelection: React.FC = () => {
  const { selectedSubjects, addSubject, removeSubject, calculateTotalFee } =
    useRevaluationStore();

  const isSelected = (subjectId: string) =>
    selectedSubjects.some((s) => s.id === subjectId);

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Select Subjects for Revaluation</h2>
        <p className="text-gray-600">Choose the subjects you want to apply for revaluation</p>
      </div>

      <div className="space-y-4">
        {availableSubjects.map((subject) => (
          <div
            key={subject.id}
            className="flex items-center justify-between rounded-lg border bg-white p-4"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{subject.code}</span>
                <span className="text-gray-600">-</span>
                <span>{subject.name}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span>Semester: {subject.semester}</span>
                <span className="mx-2">•</span>
                <span>Marks: {subject.marks}</span>
                <span className="mx-2">•</span>
                <span>Fee: {formatPrice(subject.fee)}</span>
              </div>
            </div>
            <Button
              variant={isSelected(subject.id) ? 'outline' : 'primary'}
              onClick={() =>
                isSelected(subject.id)
                  ? removeSubject(subject.id)
                  : addSubject(subject)
              }
              className="ml-4"
            >
              {isSelected(subject.id) ? (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Remove
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Select
                </>
              )}
            </Button>
          </div>
        ))}
      </div>

      {selectedSubjects.length > 0 && (
        <div className="rounded-lg bg-blue-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Selected Subjects: {selectedSubjects.length}</p>
              <p className="text-sm text-gray-600">
                Total Fee: {formatPrice(calculateTotalFee())}
              </p>
            </div>
            <Button onClick={() => window.location.href = '/dashboard/payment'}>
              Proceed to Payment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};