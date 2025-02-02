import React from 'react';
import { Bell, MessageCircle, Gavel, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'debate' | 'dispute' | 'evidence' | 'judgment';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'debate',
    title: 'New Debate Invitation',
    message: 'John Smith has invited you to a debate about contract terms.',
    timestamp: '2h ago',
    read: false,
    link: '/debate/123'
  },
  {
    id: '2',
    type: 'dispute',
    title: 'Dispute Update',
    message: 'New evidence has been submitted in your ongoing dispute.',
    timestamp: '1d ago',
    read: false,
    link: '/dispute/456'
  },
  {
    id: '3',
    type: 'judgment',
    title: 'Judgment Ready',
    message: 'AI has rendered a judgment in your debate.',
    timestamp: '2d ago',
    read: true,
    link: '/debate/789'
  }
];

export function Notifications() {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'debate':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'dispute':
        return <Gavel className="h-5 w-5 text-purple-500" />;
      case 'evidence':
        return <LinkIcon className="h-5 w-5 text-green-500" />;
      case 'judgment':
        return <Bell className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Notifications</h1>
        </div>
        <div className="divide-y">
          {MOCK_NOTIFICATIONS.map(notification => (
            <Link
              key={notification.id}
              to={notification.link}
              className={`block p-4 hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-purple-50' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{notification.title}</h3>
                    <span className="text-sm text-gray-500">{notification.timestamp}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}