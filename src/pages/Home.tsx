import React from 'react';
import { Scale, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Debate {
  id: string;
  title: string;
  opponent: string;
  status: 'pending' | 'in_progress' | 'judged';
  lastUpdated: string;
  isChallenger: boolean;
}

const MOCK_DEBATES: Debate[] = [
  {
    id: '1',
    title: 'Contract Dispute Resolution',
    opponent: 'John Smith',
    status: 'pending',
    lastUpdated: '2h ago',
    isChallenger: true
  },
  {
    id: '2',
    title: 'Service Agreement Dispute',
    opponent: 'Jane Doe',
    status: 'in_progress',
    lastUpdated: '1d ago',
    isChallenger: false
  },
  {
    id: '3',
    title: 'Payment Dispute',
    opponent: 'Mike Johnson',
    status: 'judged',
    lastUpdated: '3d ago',
    isChallenger: true
  }
];

export function Home() {
  const { user } = useAuth();

  const getStatusBadge = (status: Debate['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center space-x-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-sm">
            <Clock className="h-4 w-4" />
            <span>Pending Response</span>
          </span>
        );
      case 'in_progress':
        <span className="flex items-center space-x-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-sm">
          <Clock className="h-4 w-4" />
          <span>In Progress</span>
        </span>;
      case 'judged':
        return (
          <span className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-sm">
            <CheckCircle className="h-4 w-4" />
            <span>Judged</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {!user ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-8">
            <Scale className="h-16 w-16 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Settle disputes fairly with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Present your case, let AI be the judge
          </p>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors">
            Get Started
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Debates</h2>
            <Link
              to="/new-debate"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Start New Debate
            </Link>
          </div>
          
          <div className="grid gap-4">
            {MOCK_DEBATES.map(debate => (
              <Link
                key={debate.id}
                to={`/debate/${debate.id}`}
                className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-purple-200 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{debate.title}</h3>
                    <p className="text-sm text-gray-600">
                      {debate.isChallenger ? 'vs' : 'from'} {debate.opponent}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className="text-sm text-gray-500">{debate.lastUpdated}</span>
                    {getStatusBadge(debate.status)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}