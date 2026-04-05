import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  BarChart3,
  UtensilsCrossed,
  CalendarDays,
  BookOpen,
  HelpCircle,
  XCircle,
  Search,
} from 'lucide-react';
import { useVapi } from '@/hooks/useVapi';

const tips = [
  {
    icon: CalendarDays,
    label: 'Make a Reservation',
    example: 'Id like to book a table for 4 this Friday at 7 PM.',
  },
  {
    icon: BookOpen,
    label: 'Ask About the Menu',
    example: '"What appetizers do you have?" or "What are your main courses?"',
  },
  {
    icon: HelpCircle,
    label: 'Ask Operating Hours',
    example: '"What time do you open on Saturday?"',
  },
  {
    icon: Search,
    label: 'Look Up a Reservation',
    example: '"I have a reservation under my phone number."',
  },
  {
    icon: XCircle,
    label: 'Cancel a Reservation',
    example: '"I need to cancel my reservation."',
  },
];

export const RestaurantTestPage = () => {
  const { status, isMuted, volumeLevel, startCall, endCall, toggleMute } = useVapi();

  const isActive = status === 'active';
  const isConnecting = status === 'connecting';
  const isEnding = status === 'ending';
  const isBusy = isConnecting || isEnding;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight font-display">Spandan AI Test</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                isActive
                  ? 'bg-green-500/10 text-green-500'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'
                }`}
              />
              {isActive ? 'Live Call' : isConnecting ? 'Connecting...' : 'Ready'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Call Booth - Main Area */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-900 rounded-2xl p-1 shadow-2xl">
              <div className="bg-zinc-900 rounded-xl p-8 flex flex-col items-center text-center border border-white/10">
                {/* Window controls */}
                <div className="mb-8 w-full flex justify-between items-center opacity-50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] font-mono text-white tracking-widest uppercase">
                    SPANDAN_AI_RESTAURANT_TEST
                  </span>
                </div>

                {/* Pulse animation */}
                <div className="relative w-36 h-36 mb-8 flex items-center justify-center">
                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-green-500/40 animate-ping" />
                  )}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
                  )}
                  <div className="absolute inset-4 rounded-full border border-primary/40" />
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-tr from-green-500 to-green-400 shadow-green-500/30'
                        : 'bg-gradient-to-tr from-primary to-primary/70 shadow-primary/30'
                    }`}
                    style={isActive ? { transform: `scale(${1 + volumeLevel * 0.15})` } : undefined}
                  >
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <h3 className="text-xl font-display font-bold text-white tracking-tight">
                    RESTAURANT AI BOOTH
                  </h3>
                  <p className="text-zinc-400 font-mono text-sm max-w-xs">
                    {isActive
                      ? 'Spandan is listening... Try asking about reservations, menu, or hours.'
                      : isConnecting
                        ? 'Connecting to Spandan...'
                        : isEnding
                          ? 'Ending call...'
                          : 'Press the button below to start a test call with the restaurant AI.'}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 w-full max-w-sm">
                  {isActive ? (
                    <>
                      <button
                        onClick={toggleMute}
                        className="p-4 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-all"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={endCall}
                        className="flex-1 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-3"
                      >
                        <PhoneOff className="h-5 w-5" />
                        End Call
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={startCall}
                      disabled={isBusy}
                      className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      <Phone className="h-5 w-5" />
                      {isConnecting ? 'Connecting...' : 'Start Test Call'}
                    </button>
                  )}
                </div>

                <p className="mt-6 text-[10px] text-zinc-500 font-mono">
                  ENCRYPTED END-TO-END VIA VAPI PROTOCOL
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Tips */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold tracking-tight mb-2">What to try</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Start a call and try these commands. The AI will interact with your real backend.
            </p>

            <div className="space-y-3">
              {tips.map((tip) => (
                <div
                  key={tip.label}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <tip.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-semibold text-sm">{tip.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-11 italic">{tip.example}</p>
                </div>
              ))}
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mt-6">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground">Note:</span> This page uses your
                configured VAPI assistant. Tool calls (reservations, menu queries, etc.) will
                execute against your live backend at <code className="text-primary">/api/vapi</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
