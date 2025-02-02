import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Link as LinkIcon, CheckCircle, XCircle } from 'lucide-react';

interface Evidence {
  id: string;
  type: 'file' | 'url';
  content: string;
  validated: boolean;
  validating: boolean;
}

export function NewDebate() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [opponent, setOpponent] = useState('');
  const [position, setPosition] = useState('');
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [isPolishing, setIsPolishing] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // TODO: Create debate in Firebase
      navigate('/debate/new-id');
    }
  };

  const handlePolishWithAI = async () => {
    setIsPolishing(true);
    try {
      // TODO: Call AI endpoint to polish the position
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated delay
      setPosition(position + " [AI Enhanced]");
    } finally {
      setIsPolishing(false);
    }
  };

  const addEvidence = (type: 'file' | 'url', content: string) => {
    const newEvidence: Evidence = {
      id: Date.now().toString(),
      type,
      content,
      validated: false,
      validating: true
    };
    setEvidences([...evidences, newEvidence]);
    
    // Simulate AI validation
    setTimeout(() => {
      setEvidences(current =>
        current.map(e =>
          e.id === newEvidence.id
            ? { ...e, validated: true, validating: false }
            : e
        )
      );
    }, 2000);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).url;
    if (input.value) {
      addEvidence('url', input.value);
      input.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Start New Debate</h1>
            <span className="text-sm text-gray-500">Step {step} of 3</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div 
              className="h-full bg-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Who would you like to debate with?</h2>
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Enter their email address
              </label>
              <input
                type="email"
                value={opponent}
                onChange={(e) => setOpponent(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="email@example.com"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">What's your position?</h2>
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Clearly state your stance on the matter
              </label>
              <textarea
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                placeholder="I believe that..."
              />
              <button
                onClick={handlePolishWithAI}
                disabled={!position || isPolishing}
                className="flex items-center space-x-2 px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isPolishing ? 'Polishing...' : 'Polish with AI'}</span>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Add Evidence</h2>
            
            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-2">Drag and drop your evidence here</p>
              <p className="text-sm text-gray-500">or</p>
              <button className="mt-2 px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                Browse Files
              </button>
            </div>

            {/* URL Submission */}
            <form onSubmit={handleUrlSubmit} className="flex space-x-2">
              <input
                type="url"
                name="url"
                placeholder="Enter evidence URL"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <LinkIcon className="h-4 w-4" />
                <span>Add URL</span>
              </button>
            </form>

            {/* Evidence List */}
            {evidences.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Submitted Evidence</h3>
                <div className="space-y-2">
                  {evidences.map(evidence => (
                    <div
                      key={evidence.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        {evidence.type === 'url' ? (
                          <LinkIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <div className="h-4 w-4 bg-gray-500" />
                        )}
                        <span className="text-sm text-gray-600 truncate max-w-xs">
                          {evidence.content}
                        </span>
                      </div>
                      {evidence.validating ? (
                        <div className="animate-pulse text-yellow-500">
                          Validating...
                        </div>
                      ) : (
                        evidence.validated ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-end space-x-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {step === 3 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}