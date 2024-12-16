import React from 'react';
import { useRevaluationStore } from '../../store/useRevaluationStore';
import { Button } from '../ui/Button';
import { formatPrice } from '../../lib/utils';
import { CreditCard } from 'lucide-react';

export const PaymentSummary: React.FC = () => {
  const { selectedSubjects, calculateTotalFee } = useRevaluationStore();

  const handlePayment = async () => {
    // Implement payment gateway integration here
    try {
      // Mock payment success
      const requestId = Math.random().toString(36).substring(7);
      const newRequest = {
        id: requestId,
        userId: '1', // Get from auth store
        subjects: selectedSubjects,
        status: 'pending',
        totalFee: calculateTotalFee(),
        paymentStatus: 'completed',
        createdAt: new Date(),
      };
      
      // Add to store and redirect
      useRevaluationStore.getState().addRequest(newRequest);
      useRevaluationStore.getState().clearSelection();
      window.location.href = '/dashboard/status';
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Payment Summary</h2>
        <p className="text-gray-600">Review and complete your payment</p>
      </div>

      <div className="bg-white rounded-lg border p-6 space-y-4">
        <div className="space-y-2">
          {selectedSubjects.map((subject) => (
            <div key={subject.id} className="flex justify-between">
              <span>{subject.code} - {subject.name}</span>
              <span>{formatPrice(subject.fee)}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total Amount</span>
            <span>{formatPrice(calculateTotalFee())}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={handlePayment}
        className="w-full"
        size="lg"
      >
        <CreditCard className="mr-2 h-5 w-5" />
        Pay Now
      </Button>
    </div>
  );
};