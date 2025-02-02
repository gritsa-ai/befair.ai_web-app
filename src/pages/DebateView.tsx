import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface Evidence {
  id: string;
  type: 'file' | 'url';
  content: string;
  validated: boolean;
}

const MOCK_DEBATE = {
  id: '123',
  status: 'judged',
  challenger: {
    name: 'John Smith',
    position: 'I believe that the terms of our agreement were not met...',
    evidence: [
      { id: '1', type: 'file', content: 'contract.pdf', validated: true },
      { id: '2', type: 'url', content: 'https://example.com/evidence', validated: true }
    ] as Evidence[]
  },
  defender: {
    name: 'Jane Doe',
    position: 'The agreement was fulfilled according to the specified terms...',
    evidence: [
      { id: '3', type: 'file', content: 'proof_of_delivery.pdf', validated: true }
    ] as Evidence[]
  },
  judgment: {
    decision: 'In favor of the defender',
    reasoning: 'After careful review of the evidence provided, it is clear that the terms of the agreement were met. The proof of delivery demonstrates that the services were rendered according to the specified timeline and quality standards.',
    date: '2024-03-15'
  }
};

export function DebateView() {
  const { id } = useParams();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="border-b pb-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Debate #{id}</h1>
            <span className={`px-3 py-1 rounded-full text-sm ${
              MOCK_DEBATE.status === 'judged'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {MOCK_DEBATE.status === 'judged' ? 'Judged' : 'In Progress'}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <span className="text-sm font-medium">{MOCK_DEBATE.challenger.name}</span>
            </div>
            <span className="text-gray-400">vs</span>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <span className="text-sm font-medium">{MOCK_DEBATE.defender.name}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="font-medium">Challenger's Position</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">{MOCK_DEBATE.challenger.position}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Evidence</h3>
              {MOCK_DEBATE.challenger.evidence.map(evidence => (
                <div key={evidence.id} className="border rounded-lg p-3 flex items-center justify-between">
                  <span className="text-sm text-gray-600">{evidence.content}</span>
                  {evidence.validated ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-medium">Defender's Position</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">{MOCK_DEBATE.defender.position}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Evidence</h3>
              {MOCK_DEBATE.defender.evidence.map(evidence => (
                <div key={evidence.id} className="border rounded-lg p-3 flex items-center justify-between">
                  <span className="text-sm text-gray-600">{evidence.content}</span>
                  {evidence.validated ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <h2 className="font-medium mb-4">AI Judgment</h2>
          {MOCK_DEBATE.status === 'judged' ? (
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Decision:</span>
                <span className="text-purple-700">{MOCK_DEBATE.judgment.decision}</span>
              </div>
              <div>
                <span className="font-medium">Reasoning:</span>
                <p className="mt-2 text-gray-700">{MOCK_DEBATE.judgment.reasoning}</p>
              </div>
              <div className="text-sm text-gray-500">
                Judgment rendered on {new Date(MOCK_DEBATE.judgment.date).toLocaleDateString()}
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <p className="text-gray-700">
                Waiting for both parties to submit their evidence...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}