import React, { useState, useEffect } from 'react';
import { Copy, CheckCircle2, RefreshCw, Eye, EyeOff, Sliders } from 'lucide-react';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: 'Weak',
    color: 'bg-red-500',
  });
  
  // Generate password on mount or when parameters change
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, avoidAmbiguous]);
  
  // Calculate password strength
  useEffect(() => {
    calculatePasswordStrength(password);
  }, [password]);
  
  const generatePassword = () => {
    // Character sets
    const upperChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijkmnopqrstuvwxyz';
    const numberChars = '23456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const ambiguousChars = 'Il1O0';
    
    let chars = '';
    if (includeUppercase) chars += upperChars;
    if (includeLowercase) chars += lowerChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;
    
    // Remove ambiguous characters if option is selected
    if (avoidAmbiguous) {
      ambiguousChars.split('').forEach(char => {
        chars = chars.replace(char, '');
      });
    }
    
    // Make sure at least one character set is selected
    if (chars.length === 0) {
      setIncludeLowercase(true);
      chars = lowerChars;
    }
    
    let result = '';
    const charsLength = chars.length;
    
    // Generate random password
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    
    setPassword(result);
  };
  
  const calculatePasswordStrength = (pass: string) => {
    // Basic password strength calculation
    let score = 0;
    
    // Length check
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (pass.length >= 16) score += 1;
    
    // Character variety check
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    
    // Define strength levels
    let label = 'Very Weak';
    let color = 'bg-red-500';
    
    if (score >= 7) {
      label = 'Very Strong';
      color = 'bg-green-600';
    } else if (score >= 5) {
      label = 'Strong';
      color = 'bg-green-500';
    } else if (score >= 4) {
      label = 'Good';
      color = 'bg-yellow-500';
    } else if (score >= 3) {
      label = 'Moderate';
      color = 'bg-orange-500';
    } else if (score >= 2) {
      label = 'Weak';
      color = 'bg-red-500';
    }
    
    setPasswordStrength({ score, label, color });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Password Generator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate secure, random passwords with customizable options.
        </p>
      </div>
      
      {/* Password output */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            readOnly
            className="w-full py-3 px-4 pr-24 text-lg bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 font-mono"
          />
          <div className="absolute right-2 top-2 flex space-x-1">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <button
              onClick={generatePassword}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Generate new password"
            >
              <RefreshCw size={20} />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Copy to clipboard"
            >
              {copied ? <CheckCircle2 size={20} className="text-green-500" /> : <Copy size={20} />}
            </button>
          </div>
        </div>
        
        {/* Password strength indicator */}
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Password Strength:</span>
            <span className="text-sm font-medium">{passwordStrength.label}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`${passwordStrength.color} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${(passwordStrength.score / 7) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Sliders className="text-blue-600 dark:text-blue-400 mr-2" size={20} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Password Options</h2>
        </div>
        
        {/* Password Length Slider */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label htmlFor="length" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password Length: {length}
            </label>
            <span className="text-sm text-gray-500 dark:text-gray-400">8-32 characters</span>
          </div>
          <input
            id="length"
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>8</span>
            <span>16</span>
            <span>24</span>
            <span>32</span>
          </div>
        </div>
        
        {/* Character Options */}
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="uppercase"
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="uppercase" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Include Uppercase Letters (A-Z)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="lowercase"
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="lowercase" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Include Lowercase Letters (a-z)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="numbers"
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="numbers" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Include Numbers (0-9)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="symbols"
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="symbols" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Include Symbols (!@#$%^&*...)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="ambiguous"
              type="checkbox"
              checked={avoidAmbiguous}
              onChange={() => setAvoidAmbiguous(!avoidAmbiguous)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="ambiguous" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Avoid Ambiguous Characters (I, l, 1, O, 0)
            </label>
          </div>
        </div>
        
        <button
          onClick={generatePassword}
          className="mt-6 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Generate New Password
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;