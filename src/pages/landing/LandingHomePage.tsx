import {
  ArrowRight,
  PhoneMissed,
  Bot,
  CalendarDays,
  BookOpen,
  BarChart3,
  Languages,
  Phone,
  PhoneOff,
  MicOff,
  Mic,
  Shield,
  Clock,
  Users,
  Zap,
  Star,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useVapi } from '@/hooks/useVapi';

/* ─── Sub-components ─── */

const HeroBadge = () => (
  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
    <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
    Next-Gen Hospitality
  </span>
);

const HeroSection = () => (
  <section className="max-w-7xl mx-auto px-6 mb-32">
    <div className="grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7">
        <HeroBadge />
        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-foreground tracking-tighter leading-[1.05] mb-8">
          Your restaurantz{' '}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
            never misses
          </span>{' '}
          a call.
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
          Spandan AI handles reservations, FAQs, and peak-hour surges with the grace of a master
          maître d'. Focus on the kitchen while we handle the phone.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/contact"
            className="px-8 py-4 bg-linear-to-br from-primary to-primary/80 text-primary-foreground font-bold rounded-lg shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-2 group"
          >
            Book a Demo
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 bg-muted text-foreground font-bold rounded-lg hover:bg-muted/80 transition-all"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="lg:col-span-5 relative">
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-destructive/10 rounded-full blur-3xl -z-10" />
        <img
          alt="Elegant Restaurant Interior"
          className="rounded-xl shadow-2xl object-cover aspect-square"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGBLImoxc26fcleXE3wpi9gAcd2fC04S_qBXbUblvqcrqf5Pz_NgP9kCeRs_2Cvt0fPBLFiQJVbmcggFjyEuqrX58Wsgq4r6L7wW6O1iABzgSdzqgtqR556T6_sOmLAhqdhbE8FKfCk6i8fh1qlohWmFXfgeCGGgnfhhMYqiZa0cIc84POrHGAnbEgVKnZycIEiiUKWoBSwrBLA4UzGpCnCDXVCqqL452uJ-eJk0jiteM5h22xF36dq_Qb2nbdp631odKK8a8pRzI"
        />
      </div>
    </div>
  </section>
);

/* ─── Trusted By Section ─── */
const TrustedBySection = () => (
  <section className="max-w-7xl mx-auto px-6 mb-32">
    <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
      Trusted by leading restaurants worldwide
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-40">
      {['Le Comptoir', 'Nobu', 'Gaggan', 'Noma'].map((name) => (
        <span key={name} className="text-2xl font-display font-bold text-foreground tracking-tight">
          {name}
        </span>
      ))}
    </div>
  </section>
);

/* ─── AI Call Booth with Vapi ─── */
const CallBoothSection = () => {
  const { status, isMuted, volumeLevel, startCall, endCall, toggleMute } = useVapi('demo');

  const isActive = status === 'active';
  const isConnecting = status === 'connecting';
  const isEnding = status === 'ending';
  const isBusy = isConnecting || isEnding;

  return (
    <section className="max-w-4xl mx-auto px-6 mb-40">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-display font-bold tracking-tight mb-4">
          Experience the Spandan Voice
        </h2>
        <p className="text-muted-foreground">
          Click below to start a live conversation with our AI host.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-2xl p-1 shadow-2xl overflow-hidden">
        <div className="bg-zinc-900 rounded-xl p-8 flex flex-col items-center text-center border border-white/10">
          {/* Window controls */}
          <div className="mb-10 w-full flex justify-between items-center opacity-50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <span className="text-[10px] font-mono text-white tracking-widest uppercase">
              SPANDAN_V_4.2_CONNECTED
            </span>
          </div>

          {/* Pulse animation */}
          <div className="relative w-40 h-40 mb-10 flex items-center justify-center">
            {isActive && (
              <div
                className="absolute inset-0 rounded-full border-2 border-green-500/40 animate-ping"
              />
            )}
            {!isActive && (
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
            )}
            <div className="absolute inset-4 rounded-full border border-primary/40" />
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                isActive
                  ? 'bg-linear-to-tr from-green-500 to-green-400 shadow-green-500/30'
                  : 'bg-linear-to-tr from-primary to-primary/70 shadow-primary/30'
              }`}
              style={isActive ? { transform: `scale(${1 + volumeLevel * 0.15})` } : undefined}
            >
              <BarChart3 className="h-10 w-10 text-white" />
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <h3 className="text-2xl font-display font-bold text-white tracking-tight">
              AI CALL BOOTH
            </h3>
            <p className="text-zinc-400 font-mono text-sm max-w-xs">
              {isActive
                ? 'Spandan is listening... Ask about a reservation or our menu.'
                : isConnecting
                  ? 'Connecting to Spandan...'
                  : 'Ready to take a reservation or answer menu questions.'}
            </p>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                isActive ? 'bg-green-500/10' : 'bg-green-500/10'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-green-500'}`}
              />
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">
                {isActive ? 'Live Call' : isConnecting ? 'Connecting...' : 'Status: Active'}
              </span>
            </div>
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
                className="w-full py-4 bg-destructive text-white font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <Phone className="h-5 w-5" />
                {isConnecting ? 'Connecting...' : 'Start Call'}
              </button>
            )}
          </div>

          <p className="mt-6 text-[10px] text-zinc-500 font-mono">
            ENCRYPTED END-TO-END VIA VAPI PROTOCOL
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── How It Works ─── */
const steps = [
  {
    icon: Phone,
    step: '01',
    title: 'Guest Calls',
    description: 'A customer dials your restaurant number during peak hours or after closing.',
  },
  {
    icon: Bot,
    step: '02',
    title: 'Spandan Answers',
    description: 'Our AI picks up instantly, greeting the caller in their preferred language.',
  },
  {
    icon: CalendarDays,
    step: '03',
    title: 'Action Taken',
    description: 'Reservation booked, question answered, or order placed — all without staff input.',
  },
  {
    icon: BarChart3,
    step: '04',
    title: 'Insights Logged',
    description: 'Every interaction is transcribed and analyzed for your dashboard.',
  },
];

const HowItWorksSection = () => (
  <section className="max-w-7xl mx-auto px-6 mb-32">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-display font-extrabold tracking-tighter mb-4">
        How it works
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto">
        From ring to resolution in seconds. No training, no scripts, no delays.
      </p>
    </div>

    <div className="grid md:grid-cols-4 gap-8">
      {steps.map((s, i) => (
        <div key={s.step} className="relative group">
          {i < steps.length - 1 && (
            <div className="hidden md:block absolute top-10 left-full w-full h-px bg-border -z-10" />
          )}
          <div className="bg-card p-8 rounded-xl shadow-sm hover:shadow-lg transition-all text-center">
            <span className="text-xs font-bold text-primary tracking-widest mb-4 block">
              STEP {s.step}
            </span>
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-bold text-lg mb-2">{s.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ─── Problem / Solution ─── */
const ProblemSolutionSection = () => (
  <section className="bg-muted/40 py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-display font-extrabold tracking-tighter leading-tight">
              The hospitality gap that's <br />
              costing you <span className="text-destructive">revenue.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              During a rush, your staff has to choose: the guest in front of them, or the phone
              ringing in the back. Both are vital, but one always suffers.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-sm flex gap-5 items-start">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <PhoneMissed className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">60% of Calls Go Unanswered</h4>
                <p className="text-sm text-muted-foreground">
                  Most callers don't leave voicemails—they simply call the next restaurant on the
                  list.
                </p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm flex gap-5 items-start border-l-4 border-primary">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Instant AI Interaction</h4>
                <p className="text-sm text-muted-foreground">
                  Spandan picks up on the first ring, handling 10+ calls simultaneously without
                  breaking a sweat.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4 pt-12">
            <div className="bg-card p-2 rounded-lg shadow-xl">
              <img
                alt="Busy waiter"
                className="rounded-md object-cover grayscale opacity-50 h-64 w-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1Ghr9za60yHWOQsqnLbGnWtj7KR91pTS1Z4GcuHUl8Ytqj9kVHdkiHD5dFBptVltrp9pzwSAp5RRBOjyAI-UDj4w2XN7sOyjqpH6eBaruMXxpCArQiVzNbuA7JnayxZ5IB8xwT0o_o8l_3ZuJFH7rJHIKL3lL06jW1tYSPI9_AlZJVI2bdiWdYykVcyNE3E72k-IaJk9gEbevVtEh8AXuIZHIuJb9REFjFLCuEQpOq053SqET7If7SrRvDvwhWItcPVgRXe-QnsI"
              />
            </div>
            <div className="bg-primary p-8 rounded-lg text-primary-foreground">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">
                Capture Rate
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-destructive p-8 rounded-lg text-white">
              <div className="text-4xl font-bold mb-2">0ms</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">Wait Time</div>
            </div>
            <div className="bg-card p-2 rounded-lg shadow-xl">
              <img
                alt="Happy dining"
                className="rounded-md object-cover h-64 w-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA12n6Y_Sl9yoxdk-ehnA1GMH_AQpyQdQPQxW3YzdnB1dCQbJfM9ka0pl_ajE-jsGtOU-BG0BLDQ7XBhDstRfNnKh6S5kB1QPG9n9bw5dvPYdgUlR0G1BbegvzkTwHH7jQIzkRJabjfVuJ3GERBOi1Vv23ovM1VOTR0FIpWcsfFkKHlgCoF-E1aqFAvC5gtBeRC997jK6ja8l5FeUoZRdZzhvpfhsau48-zGNubxhbov28VCZaFC60Udpdtn7w0Pgq9pMhi69bnqEQ"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Features Bento Grid ─── */
const features = [
  {
    icon: CalendarDays,
    title: 'Real-Time Reservations',
    description:
      'Direct integration with OpenTable, Resy, and SevenRooms. Our AI checks live availability and confirms bookings instantly without human intervention.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBG65AmGcXCfU7Kv-uayRby6R08giZ3Q9F9NGUx9Qpu4XW4icSLmIrQPRFT9YUkHTalCQpfXrhhT3VFAIDktpin5IwK2iF926gkypEKZG3vf8SiUvNGtpAwFPBvKtifKY38lMeRKyofDU_YIqirPP3IXuR2pM8otJg9uEqMB1UcLmpyTMGQxUuQQ0x8PIY9b5HLJ8udZyXBSJwJOKQrS6UX3sRnuhAJnfEYyICQIB5r0nYjJ6Eoc5_nhSGIMEYWxytHG1ZVY6wuXwM',
  },
  {
    icon: BookOpen,
    title: 'Menu & Allergy Intelligence',
    description:
      'Our AI memorizes your entire menu, wine list, and allergy protocols. It answers specific questions about ingredients and pairings with professional poise.',
  },
  {
    icon: BarChart3,
    title: 'Call Analytics',
    description:
      'Analyze call volume peaks and common guest inquiries to optimize your staffing and menu.',
  },
  {
    icon: Languages,
    title: 'Multi-Lingual',
    description:
      'Seamlessly switch between 40+ languages to serve your global guest base with zero friction.',
  },
];

const FeaturesSection = () => (
  <section className="max-w-7xl mx-auto px-6 py-40">
    <div className="text-center mb-20">
      <h2 className="text-4xl font-display font-extrabold tracking-tighter mb-4">
        Intelligent in every interaction.
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        More than just a voice bot. Spandan integrates with your existing workflow to create a
        seamless digital-to-physical experience.
      </p>
    </div>

    <div className="grid md:grid-cols-4 md:grid-rows-2 gap-6">
      <div className="md:col-span-2 md:row-span-2 bg-card p-10 rounded-xl shadow-sm group hover:shadow-xl transition-all flex flex-col justify-between">
        <div>
          <CalendarDays className="h-10 w-10 text-primary mb-6" />
          <h3 className="text-2xl font-bold mb-4">{features[0].title}</h3>
          <p className="text-muted-foreground leading-relaxed">{features[0].description}</p>
        </div>
        <div className="pt-8">
          <img
            alt="Restaurant Seating"
            className="rounded-lg h-48 w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            src={features[0].image}
          />
        </div>
      </div>

      <div className="md:col-span-2 bg-primary text-primary-foreground p-10 rounded-xl flex flex-col justify-center">
        <BookOpen className="h-10 w-10 mb-6" />
        <h3 className="text-2xl font-bold mb-2">{features[1].title}</h3>
        <p className="opacity-80">{features[1].description}</p>
      </div>

      <div className="bg-muted p-8 rounded-xl flex flex-col justify-center">
        <BarChart3 className="h-8 w-8 text-destructive mb-4" />
        <h4 className="font-bold mb-2">{features[2].title}</h4>
        <p className="text-xs text-muted-foreground">{features[2].description}</p>
      </div>

      <div className="bg-card border border-border p-8 rounded-xl flex flex-col justify-center">
        <Languages className="h-8 w-8 text-accent mb-4" />
        <h4 className="font-bold mb-2">{features[3].title}</h4>
        <p className="text-xs text-muted-foreground">{features[3].description}</p>
      </div>
    </div>
  </section>
);

/* ─── Stats Section ─── */
const stats = [
  { icon: Clock, value: '<1s', label: 'Average Pickup Time' },
  { icon: Users, value: '500+', label: 'Restaurants Served' },
  { icon: TrendingUp, value: '22%', label: 'Revenue Increase' },
  { icon: Star, value: '4.9/5', label: 'Client Satisfaction' },
];

const StatsSection = () => (
  <section className="max-w-7xl mx-auto px-6 mb-32">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div key={s.label} className="bg-card rounded-xl p-8 text-center shadow-sm">
          <s.icon className="h-6 w-6 text-primary mx-auto mb-4" />
          <div className="text-3xl font-display font-extrabold text-foreground mb-1">{s.value}</div>
          <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ─── Testimonials ─── */
const testimonials = [
  {
    quote:
      "Spandan transformed our dinner service. We haven't missed a reservation call in 6 months.",
    author: 'Maria Chen',
    role: 'GM, Sakura Bistro',
  },
  {
    quote:
      'Our staff can finally focus on the guests in front of them. The AI handles the phones flawlessly.',
    author: 'James Morton',
    role: 'Head Chef, The Gilded Fork',
  },
  {
    quote:
      "We've seen a 30% increase in bookings since implementing Spandan. The ROI is undeniable.",
    author: 'Priya Sharma',
    role: 'Owner, Masala & Co.',
  },
];

const TestimonialsSection = () => (
  <section className="bg-muted/40 py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-extrabold tracking-tighter mb-4">
          Loved by restaurateurs
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Hear from the chefs, managers, and owners who trust Spandan every night.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.author} className="bg-card p-8 rounded-xl shadow-sm">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-foreground leading-relaxed mb-6">"{t.quote}"</p>
            <div>
              <p className="font-bold text-sm">{t.author}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Security / Trust Banner ─── */
const TrustSection = () => (
  <section className="max-w-7xl mx-auto px-6 py-24">
    <div className="bg-card rounded-2xl p-12 shadow-sm">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight mb-4">
            Enterprise-grade privacy & security
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Every call is encrypted end-to-end. We never store raw audio. Transcripts are anonymized
            and your data remains fully under your control.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {[
            { icon: Shield, label: 'SOC 2 Compliant' },
            { icon: Zap, label: '99.99% Uptime' },
            { icon: Bot, label: 'GDPR Ready' },
            { icon: Users, label: 'Role-Based Access' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─── CTA ─── */
const CtaSection = () => (
  <section className="max-w-7xl mx-auto px-6 mb-40">
    <div className="bg-linear-to-br from-primary to-primary/80 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-destructive/20 rounded-full -ml-20 -mb-20 blur-3xl" />

      <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tighter mb-6 relative z-10">
        Start your 14-day free trial.
      </h2>
      <p className="text-white/70 text-xl max-w-2xl mx-auto mb-12 relative z-10">
        Join 500+ restaurants who have eliminated missed calls and increased their booking revenue by
        an average of 22%.
      </p>

      <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
        <Link
          to="/contact"
          className="px-10 py-5 bg-white text-primary font-bold rounded-lg shadow-xl hover:scale-105 transition-transform"
        >
          Get Started Now
        </Link>
        <Link
          to="/contact"
          className="px-10 py-5 bg-white/10 text-white font-bold rounded-lg backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
        >
          Talk to Sales
        </Link>
      </div>
    </div>
  </section>
);

/* ─── Page ─── */

export const LandingHomePage = () => {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <CallBoothSection />
      <HowItWorksSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <TrustSection />
      <CtaSection />
    </>
  );
};
