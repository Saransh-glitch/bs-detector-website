import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  ShieldCheck, 
  Calendar, 
  Activity, 
  Users, 
  FileText, 
  Moon, 
  Sun, 
  ChevronRight, 
  Cpu, 
  CheckCircle,
  AlertCircle,
  Clock,
  Menu,
  X,
  Lock,
  Download,
  BarChart3,
  Search,
  Zap
} from 'lucide-react';

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-medium transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]",
    secondary: "bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 hover:border-cyan-500/50",
    outline: "border border-slate-600 hover:border-slate-400 text-current bg-transparent",
    ghost: "bg-transparent hover:bg-slate-500/10 text-current"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const FeatureCard = ({ icon: Icon, title, description, isDark }) => (
  <div className={`
    group relative p-8 rounded-2xl border transition-all duration-500
    ${isDark 
      ? 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/30 hover:bg-slate-800/80' 
      : 'bg-white/60 border-slate-200 hover:border-cyan-500/30 hover:bg-white'
    }
    backdrop-blur-sm overflow-hidden
  `}>
    <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    
    <div className="relative z-10">
      <div className={`
        w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3
        ${isDark ? 'bg-slate-800 text-cyan-400' : 'bg-slate-100 text-cyan-600'}
      `}>
        <Icon size={24} />
      </div>
      <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h3>
      <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {description}
      </p>
    </div>
  </div>
);

const AnimatedMockup = ({ isDark }) => {
  const [lines, setLines] = useState([]);
  const [phase, setPhase] = useState('live'); // 'live', 'processing', 'report'
  const [isTranscribing, setIsTranscribing] = useState(false);

  const script = [
    { type: 'interviewer', text: "Can you elaborate on your team leadership experience at TechCorp?" },
    { type: 'candidate', text: "Sure, I led a team of 15 engineers focusing on backend infrastructure." },
    { type: 'interviewer', text: "That's a large team. What was the biggest challenge you faced?" },
    { type: 'candidate', text: "We had to migrate a legacy database in two weeks while maintaining 99.9% uptime." }
  ];

  useEffect(() => {
    let timeout;
    let currentIndex = 0;

    const runSequence = () => {
      // Phase 1: Live Transcription Logic
      if (phase === 'live') {
        if (currentIndex < script.length) {
          const item = script[currentIndex];
          setLines(prev => [...prev, item]);
          setIsTranscribing(true);
          setTimeout(() => setIsTranscribing(false), 600);
          
          currentIndex++;
          timeout = setTimeout(runSequence, 1800);
        } else {
          // End of script, wait then move to processing
          timeout = setTimeout(() => {
            setLines([]); 
            setPhase('processing');
          }, 1500);
        }
      } 
      // Phase 2: Processing Animation Logic
      else if (phase === 'processing') {
        // Just a delay to show the spinner
        timeout = setTimeout(() => {
          setPhase('report');
        }, 2500);
      }
      // Phase 3: Report Display Logic
      else if (phase === 'report') {
        // Show report for a while then reset
        timeout = setTimeout(() => {
          setLines([]);
          currentIndex = 0;
          setPhase('live');
        }, 6000); 
      }
    };

    // Run the sequence logic immediately whenever phase changes
    runSequence();

    return () => clearTimeout(timeout);
  }, [phase]); 

  return (
    <div className={`
      relative rounded-xl overflow-hidden shadow-2xl border transition-all duration-500
      ${isDark ? 'bg-slate-900 border-slate-700 shadow-cyan-900/20' : 'bg-white border-slate-200 shadow-slate-200'}
    `}>
      {/* Window Header */}
      <div className={`px-4 py-3 border-b flex items-center justify-between ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className={`text-xs font-mono opacity-50 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {phase === 'live' && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>}
          {phase === 'processing' && <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>}
          {phase === 'report' && <span className="w-2 h-2 rounded-full bg-cyan-500"></span>}
          {phase === 'live' ? 'Live Transcription' : (phase === 'processing' ? 'Encrypting & Analyzing...' : 'Interview Intelligence Report')}
        </div>
        <div className="w-10" />
      </div>

      {/* Content Area */}
      <div className="p-6 min-h-[420px] flex flex-col relative">
        
        {/* VIEW 1: Live Transcription */}
        {phase === 'live' && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            {lines.map((line, idx) => (
              <div 
                key={idx}
                className={`
                  max-w-[90%] rounded-lg p-3 text-sm animate-in fade-in slide-in-from-bottom-2 duration-500
                  ${line.type === 'interviewer' ? (isDark ? 'bg-slate-800 self-end text-slate-300' : 'bg-slate-100 self-end text-slate-700') : ''}
                  ${line.type === 'candidate' ? (isDark ? 'bg-slate-800/50 self-start text-white border-l-2 border-cyan-500' : 'bg-white self-start text-slate-900 border border-slate-100 shadow-sm border-l-cyan-500') : ''}
                `}
              >
                {line.type === 'interviewer' && <span className="block text-xs opacity-50 mb-1">Hiring Manager</span>}
                {line.type === 'candidate' && <span className="block text-xs opacity-50 mb-1">Candidate</span>}
                {line.text}
              </div>
            ))}
            
            {/* Live Indicator */}
            <div className={`
              absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border backdrop-blur-md transition-all duration-300
              ${isTranscribing 
                ? 'border-cyan-500 text-cyan-500 bg-cyan-500/10' 
                : (isDark ? 'border-slate-700 text-slate-500 bg-slate-800/80' : 'border-slate-200 text-slate-400 bg-white/80')}
            `}>
              <div className={`w-2 h-2 rounded-full ${isTranscribing ? 'bg-cyan-500 animate-pulse' : 'bg-slate-500'}`} />
              {isTranscribing ? 'Transcribing...' : 'Live Session Active'}
            </div>
          </div>
        )}

        {/* VIEW 2: Processing State */}
        {phase === 'processing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in duration-500 z-20 bg-opacity-90">
            <div className="relative">
               <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-cyan-500 animate-spin mb-4"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <Lock size={20} className="text-cyan-500" />
               </div>
            </div>
            <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Generating Insights</h3>
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Purging audio • Cross-referencing resume</p>
          </div>
        )}

        {/* VIEW 3: Post Analysis Report */}
        {phase === 'report' && (
          <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-8 fade-in duration-700 h-full w-full">
            {/* Top Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs opacity-60 mb-1">Resume Match</div>
                <div className="text-2xl font-bold text-green-500 flex items-center gap-2">
                  98% <CheckCircle size={18} />
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs opacity-60 mb-1">Speaking Pace</div>
                <div className="text-2xl font-bold text-cyan-500">Normal</div>
              </div>
            </div>

            {/* Key Insight Card */}
            <div className={`p-4 rounded-xl border flex-1 ${isDark ? 'bg-cyan-900/10 border-cyan-500/30' : 'bg-cyan-50 border-cyan-100'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Search size={16} className="text-cyan-500" />
                <span className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>Key Insight Detected</span>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Candidate demonstrated strong technical leadership. Specifically referenced <span className="font-bold text-cyan-500">legacy migration</span> experience which aligns with the "Sr. Engineer" requirement in the job description.
              </p>
            </div>

            {/* Topics Tags */}
            <div className="flex gap-2 flex-wrap mt-2">
              {['Leadership', 'Migration', 'Database', 'High Uptime'].map((tag, i) => (
                <span key={i} className={`text-xs px-2 py-1 rounded-md border ${isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className={`mt-auto text-center text-xs opacity-40 pt-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Report generated in 1.4s
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

const MainApp = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    // Ensure this filename matches exactly what you put in the 'public' folder
    link.href = '/BSDetector_Setup.exe'; 
    link.download = 'BSDetector_Setup.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const themeClasses = isDark 
    ? 'bg-slate-950 text-slate-100' 
    : 'bg-slate-50 text-slate-900';

  const accentText = isDark ? 'text-cyan-400' : 'text-cyan-600';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${themeClasses} font-sans selection:bg-cyan-500/30 selection:text-cyan-200`}>
      
      {/* Navigation */}
      <nav className={`
        fixed w-full z-50 transition-all duration-300 border-b
        ${scrolled 
          ? (isDark ? 'bg-slate-950/80 border-slate-800 backdrop-blur-md' : 'bg-white/80 border-slate-200 backdrop-blur-md') 
          : 'bg-transparent border-transparent py-4'}
      `}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-cyan-500 text-slate-900' : 'bg-cyan-600 text-white'}`}>
              <Zap size={20} fill="currentColor" />
            </div>
            <span>BS <span className={accentText}>Detector</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-cyan-500 transition-colors">Features</a>
            <a href="#privacy" className="hover:text-cyan-500 transition-colors">Privacy</a>
            <a href="#pricing" className="hover:text-cyan-500 transition-colors">Pricing</a>
            <button 
              onClick={toggleTheme} 
              className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Button 
              variant="primary" 
              className="py-2 px-4 text-sm"
              onClick={() => scrollToSection('download')}
            >
              Get Started
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleTheme} className="p-2">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden fixed inset-0 z-40 pt-24 px-6 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
          <div className="flex flex-col gap-6 text-lg font-medium">
            <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#privacy" onClick={() => setIsMenuOpen(false)}>Privacy</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <Button variant="primary" onClick={() => { setIsMenuOpen(false); handleDownload(); }}>
              Download for Windows
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="download" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${isDark ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-500/20' : 'bg-cyan-50 text-cyan-700 border border-cyan-100'}`}>
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              Live for Windows 11
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Interview with <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-cyan-400 to-purple-400' : 'from-cyan-600 to-purple-600'}`}>
                Absolute Clarity.
              </span>
            </h1>
            
            <p className={`text-lg lg:text-xl max-w-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              The AI companion that transcribes interviews in real-time and detects inconsistencies in detailed post-interview reports. Make decisions based on facts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" onClick={handleDownload}>
                <Download size={20} />
                Download for Windows
              </Button>
              <Button variant="secondary">
                View Interactive Demo
              </Button>
            </div>

            <div className={`text-sm flex items-center gap-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-cyan-500" /> No recording stored
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-cyan-500" /> GDPR Compliant
              </div>
            </div>
          </div>

          {/* Hero Visual/Mockup */}
          <div className="relative">
            <div className={`absolute -inset-4 rounded-3xl blur-xl opacity-30 bg-gradient-to-r from-cyan-500 to-purple-500 -z-10`} />
            <AnimatedMockup isDark={isDark} />
            
            {/* Floating Badges */}
            <div className={`
              absolute -right-4 top-10 p-4 rounded-xl border backdrop-blur-md shadow-xl animate-bounce-slow
              ${isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white/90 border-slate-100'}
            `}>
              <div className="flex items-center gap-3">
                <div className="bg-green-500/10 p-2 rounded-lg text-green-500">
                  <Activity size={20} />
                </div>
                <div>
                  <div className="text-xs opacity-60">Transcription Accuracy</div>
                  <div className="font-bold">99% Accurate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className={`py-24 px-6 ${isDark ? 'bg-slate-900/30' : 'bg-slate-50/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Beyond Simple Notes</h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              BS Detector doesn't just listen. It understands context, checks facts, and organizes your hiring process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              isDark={isDark}
              icon={Mic}
              title="Live Transcription"
              description="Uses system audio and mic input to transcribe speech instantly in real-time. No upload required."
            />
            <FeatureCard 
              isDark={isDark}
              icon={Users}
              title="Smart Diarization"
              description="Automatically distinguishes between interviewer and candidate voices during the live session."
            />
            <FeatureCard 
              isDark={isDark}
              icon={ShieldCheck}
              title="Fact Check Engine"
              description="Post-interview analysis cross-references claims with resume data to flag potential exaggerations."
            />
            <FeatureCard 
              isDark={isDark}
              icon={Calendar}
              title="Calendar Sync"
              description="Connects with Google & Outlook. Reschedule or extend interviews directly from the dashboard."
            />
            <FeatureCard 
              isDark={isDark}
              icon={FileText}
              title="Instant Briefs"
              description="Get a one-page executive summary and risk assessment immediately after the call ends."
            />
            <FeatureCard 
              isDark={isDark}
              icon={Lock}
              title="Zero-Retention Policy"
              description="Audio is processed in RAM and discarded immediately. Only text insights are encrypted and saved."
            />
          </div>
        </div>
      </section>

      {/* How it Works / Workflow & Privacy Section */}
      <section id="privacy" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
               {/* Abstract visual representation of data flow */}
               <div className={`relative z-10 p-8 rounded-3xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-xl'}`}>
                  <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl shrink-0 ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
                        <Mic className={accentText} size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Audio Input</h4>
                        <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Captures system audio & microphone streams securely.</p>
                      </div>
                    </div>
                     {/* Connector */}
                     <div className={`h-8 w-0.5 ml-8 border-l-2 border-dashed ${isDark ? 'border-slate-700' : 'border-slate-300'}`}></div>
                    
                    {/* Step 2 */}
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl shrink-0 ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
                        <Cpu className={accentText} size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Real-Time Transcription</h4>
                        <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>AI converts speech to text and labels speakers in real-time RAM.</p>
                      </div>
                    </div>
                    {/* Connector */}
                    <div className={`h-8 w-0.5 ml-8 border-l-2 border-dashed ${isDark ? 'border-slate-700' : 'border-slate-300'}`}></div>

                    {/* Step 3 */}
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl shrink-0 ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
                        <FileText className={accentText} size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Structured Post-Analysis</h4>
                        <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Audio is purged. Deep analysis runs on text logs after the call.</p>
                      </div>
                    </div>
                  </div>
               </div>
               
               {/* Decorative elements behind */}
               <div className="absolute top-10 -left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-[80px] -z-10" />
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">Privacy by Design. <br/>Not by Afterthought.</h2>
              <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                We understand the sensitive nature of HR data. That's why BS Detector operates on a strict <strong className={accentText}>Zero-Retention Audio Policy</strong>.
              </p>
              
              <ul className="space-y-4">
                {[
                  "No audio files are ever written to disk",
                  "Processing happens locally or via ephemeral secure streams",
                  "SOC-2 Type II Compliant Architecture",
                  "Full Candidate Consent Mode available"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-cyan-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={`py-24 px-6 ${isDark ? 'bg-slate-900/50' : 'bg-slate-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Choose the plan that fits your hiring volume.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className={`p-8 rounded-2xl border flex flex-col ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="mb-6">
                <h3 className="font-bold text-xl">Starter</h3>
                <div className="text-3xl font-bold mt-2">$0<span className="text-sm font-normal opacity-60">/mo</span></div>
                <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>For freelance recruiters.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm">
                <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-500" /> 5 Interviews / month</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-500" /> Basic Summary</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-500" /> Real-time Transcription</li>
              </ul>
              <Button variant="outline" className="w-full">Get Started</Button>
            </div>

            {/* Pro */}
            <div className={`relative p-8 rounded-2xl border-2 flex flex-col transform md:-translate-y-4 ${isDark ? 'bg-slate-900 border-cyan-500' : 'bg-white border-cyan-500'} shadow-2xl shadow-cyan-500/10`}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              <div className="mb-6">
                <h3 className="font-bold text-xl">Professional</h3>
                <div className="text-3xl font-bold mt-2">$49<span className="text-sm font-normal opacity-60">/mo</span></div>
                <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>For growing HR teams.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm">
                <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-500" /> Unlimited Interviews</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-500" /> Risk & Fact Checking</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-500" /> Calendar Integration</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-500" /> Candidate Comparison</li>
              </ul>
              <Button variant="primary" className="w-full">Start Free Trial</Button>
            </div>

            {/* Enterprise */}
            <div className={`p-8 rounded-2xl border flex flex-col ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="mb-6">
                <h3 className="font-bold text-xl">Enterprise</h3>
                <div className="text-3xl font-bold mt-2">Custom</div>
                <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>For large organizations.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm">
                <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-500" /> ATS Integration</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-500" /> Custom Compliance Rules</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-500" /> Dedicated Success Manager</li>
              </ul>
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className={`absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-slate-900 to-slate-950`}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">Stop hiring on a hunch.</h2>
          <p className={`text-xl mb-10 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Join 4,000+ hiring managers using BS Detector to conduct fairer, smarter, and more efficient interviews.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Button variant="primary" className="px-8 py-4 text-lg" onClick={handleDownload}>
                Download for Windows
             </Button>
          </div>
          <p className="mt-6 text-sm opacity-50">Requires Windows 10/11 • macOS coming soon</p>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 border-t ${isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
               <span className={isDark ? 'text-white' : 'text-slate-900'}>BS <span className="text-cyan-500">Detector</span></span>
            </div>
            <p className="max-w-xs text-sm">
              Empowering hiring teams with real-time intelligence and bias-free documentation tools.
            </p>
          </div>
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-cyan-500">Features</a></li>
              <li><a href="#" className="hover:text-cyan-500">Pricing</a></li>
              <li><a href="#" className="hover:text-cyan-500">Changelog</a></li>
              <li><a href="#" className="hover:text-cyan-500">Download</a></li>
            </ul>
          </div>
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-cyan-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan-500">Terms of Service</a></li>
              <li><a href="#" className="hover:text-cyan-500">Security</a></li>
              <li><a href="#" className="hover:text-cyan-500">DPA</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-xs text-center">
          © 2024 BS Detector Inc. All rights reserved.
        </div>
      </footer>

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default MainApp;