import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Bell, Menu, X, Home, User, LogOut, MessageCircle, Gavel } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Navigation() {
  const { user, signIn, signOut } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await signIn(email, password);
      setShowAuth(false);
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setShowMenu(false);
    } catch (err) {
      console.error('Failed to sign out:', err);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-purple-600" />
              <span className="font-bold text-xl">beFair.ai</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to="/new-debate"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    New Case
                  </Link>
                  <Link to="/notifications" className="p-2 hover:bg-gray-100 rounded-full relative">
                    <Bell className="h-6 w-6 text-gray-600" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                  </Link>
                  <button 
                    onClick={() => setShowMenu(!showMenu)} 
                    className="relative p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Menu className="h-6 w-6 text-gray-600" />
                  </button>

                  {/* Dropdown Menu */}
                  {showMenu && (
                    <div className="absolute right-4 top-16 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <Link
                        to="/"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowMenu(false)}
                      >
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                      </Link>
                      <Link
                        to="/debates"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowMenu(false)}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Debates</span>
                      </Link>
                      <Link
                        to="/disputes"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowMenu(false)}
                      >
                        <Gavel className="h-4 w-4" />
                        <span>Disputes</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowMenu(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button 
                  onClick={() => setShowAuth(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowAuth(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="text-gray-600 mt-1">
                {isSignUp ? 'Start resolving disputes fairly' : 'Sign in to your account'}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-purple-600 text-sm hover:underline"
              >
                {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}