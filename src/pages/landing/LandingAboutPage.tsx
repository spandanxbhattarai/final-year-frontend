import {
  Sparkles,
  CheckCircle,
  Ear,
  MessageSquare,
  PhoneCall,
  ListOrdered,
  Armchair,
  Quote,
  Target,
  Heart,
  Lightbulb,
  ArrowRight,
  Utensils,
  Clock,
  Globe,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── Sub-components ─── */

const HeroSection = () => (
  <section className="max-w-7xl mx-auto px-6 mb-32">
    <div className="max-w-3xl">
      <span className="text-destructive text-xs uppercase tracking-[0.2em] mb-4 block font-bold">
        The Digital Maître d'
      </span>
      <h1 className="text-5xl md:text-7xl font-display font-extrabold text-foreground tracking-tighter leading-[1.1] mb-8">
        Quietly managing the noise, so you can master the{' '}
        <span className="text-primary italic">moment</span>.
      </h1>
      <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
        Spandan was born from a simple realization: the best hospitality isn't found in a ringing
        phone or a cluttered screen. It's found in the eyes of a guest being truly heard.
      </p>
    </div>
  </section>
);

/* ─── Our Story ─── */
const StorySection = () => (
  <section className="max-w-7xl mx-auto px-6 mb-32">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-6">
        <h2 className="text-3xl font-display font-bold tracking-tight">
          Why we built Spandan
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          It started in a cramped kitchen in Delhi, where a chef watched three calls ring out during
          Friday dinner service. Each unanswered ring was a lost reservation, a frustrated guest, a
          missed connection. That chef asked a simple question:{' '}
          <em className="text-foreground font-medium">
            "What if the phone never had to compete with the stove?"
          </em>
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We assembled a team of AI engineers, hospitality veterans, and voice technology pioneers
          to build something that didn't just answer calls — it understood them. Spandan
          doesn't read from a script. It listens, adapts, and responds with the nuance your
          guests expect from a world-class establishment.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Utensils className="h-4 w-4" />
            Founded 2023
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Globe className="h-4 w-4" />
            12 Countries
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Clock className="h-4 w-4" />
            10M+ Calls Handled
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -top-8 -right-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
        <img
          className="w-full rounded-xl shadow-xl object-cover aspect-4/3"
          alt="Team working in a modern office"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6p6c828PhkgjxKw6vW66ljC3x6iUuIYxfdk3tE4sf5damczryS_Bh3MnY6qrt7IPLyhsAaA5TXzTeF3stxWbqdM6-rc1xLfgveQpQCkdH9HEOGAYtBIJwkcp7kRaLDguENjwH1ykGTZPNUixz_lIbK_l3DOiDne1DhPNwS9i8iGEoKvYwgQVzRP2sdBnzDeRu5K5CQEiAnq3f0jkcZ5WmBxw3T60ao4HwPUPbesPe4IrSulp7Ply4TeSQmm7Fq5MVK0nUpNf-pSE"
        />
      </div>
    </div>
  </section>
);

/* ─── Values ─── */
const values = [
  {
    icon: Target,
    title: 'Precision',
    description: 'Every interaction is measured, refined, and optimized. We don\'t do "good enough".',
  },
  {
    icon: Heart,
    title: 'Empathy',
    description: 'Technology should feel warm. Our AI mirrors the care your staff would give.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We push the boundaries of conversational AI to stay ahead of guest expectations.',
  },
];

const ValuesSection = () => (
  <section className="bg-muted/40 py-24 px-6 mb-32">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-display font-bold tracking-tight mb-4">Our core values</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The principles that guide every line of code and every conversation.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {values.map((v) => (
          <div key={v.title} className="bg-card p-8 rounded-xl text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <v.icon className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-lg font-bold mb-3">{v.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Principles Bento Grid ─── */
const PrinciplesBentoSection = () => (
  <section className="max-w-7xl mx-auto px-6 mb-32">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Large storytelling card */}
      <div className="md:col-span-8 bg-card rounded-xl p-10 shadow-sm relative overflow-hidden group">
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-bold mb-6">Automation Feels Natural</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            We don't believe in technology for technology's sake. We believe in technology that
            disappears. Our AI doesn't replace the human touch; it protects it from the friction of
            operational chaos.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              <CheckCircle className="h-4 w-4" />
              Zero Latency
            </span>
            <span className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">
              <Ear className="h-4 w-4" />
              Human-Parity Speech
            </span>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
      </div>

      {/* Technology card */}
      <div className="md:col-span-4 bg-linear-to-br from-primary to-primary/80 rounded-xl p-10 flex flex-col justify-between text-primary-foreground">
        <Sparkles className="h-10 w-10 mb-6" />
        <div>
          <h3 className="text-2xl font-bold mb-3">Technology Simplifies</h3>
          <p className="text-sm opacity-90 leading-relaxed">
            Reducing 100+ manual tasks into a single, intelligent flow.
          </p>
        </div>
      </div>

      {/* Focus on hospitality */}
      <div className="md:col-span-5 bg-muted/50 rounded-xl p-10 flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-4">Focus on Hospitality</h3>
        <p className="text-muted-foreground leading-relaxed">
          When the phone stops ringing in the middle of a rush, your staff can finally breathe.
          Spandan handles the logistics; you handle the guests.
        </p>
      </div>

      {/* Image card */}
      <div className="md:col-span-7 rounded-xl overflow-hidden min-h-75 relative">
        <img
          className="w-full h-full object-cover"
          alt="Warm interior of a high-end restaurant with focused staff"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6p6c828PhkgjxKw6vW66ljC3x6iUuIYxfdk3tE4sf5damczryS_Bh3MnY6qrt7IPLyhsAaA5TXzTeF3stxWbqdM6-rc1xLfgveQpQCkdH9HEOGAYtBIJwkcp7kRaLDguENjwH1ykGTZPNUixz_lIbK_l3DOiDne1DhPNwS9i8iGEoKvYwgQVzRP2sdBnzDeRu5K5CQEiAnq3f0jkcZ5WmBxw3T60ao4HwPUPbesPe4IrSulp7Ply4TeSQmm7Fq5MVK0nUpNf-pSE"
        />
        <div className="absolute inset-0 bg-primary/10" />
      </div>
    </div>
  </section>
);

/* ─── The Intelligent Suite ─── */
const suiteItems = [
  {
    icon: MessageSquare,
    title: 'Conversational AI',
    description: 'Intelligent dialogue that understands context, tone, and specific dietary nuances.',
  },
  {
    icon: PhoneCall,
    title: 'Call Automation',
    description: 'Intercept incoming calls instantly. No more busy signals during peak hours.',
  },
  {
    icon: ListOrdered,
    title: 'Order Handling',
    description: 'Direct POS integration for takeaway and delivery orders, sans manual entry.',
  },
  {
    icon: Armchair,
    title: 'Reservation Mgmt',
    description: 'Smart pacing and table allocation that maximizes yield without overbooking.',
  },
];

const IntelligentSuiteSection = () => (
  <section className="max-w-7xl mx-auto px-6 mb-32">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-display font-extrabold mb-4">The Intelligent Suite</h2>
      <div className="h-1 w-20 bg-destructive mx-auto rounded-full" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {suiteItems.map((item) => (
        <div
          key={item.title}
          className="bg-card p-8 rounded-xl border border-transparent hover:border-primary/20 transition-all group"
        >
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <item.icon className="h-6 w-6 text-primary" />
          </div>
          <h4 className="text-lg font-bold mb-3">{item.title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  </section>
);

/* ─── Timeline / Milestones ─── */
const milestones = [
  { year: '2023', event: 'Spandan founded in Delhi by a team of AI engineers and hospitality veterans.' },
  { year: '2024', event: 'Launched v1 with 50 beta restaurants. 98% pickup rate achieved in first month.' },
  { year: '2025', event: 'Expanded to 12 countries. Multi-lingual support for 40+ languages launched.' },
  { year: '2026', event: 'Serving 500+ restaurants. 10 million calls handled with <1s average pickup.' },
];

const MilestonesSection = () => (
  <section className="max-w-4xl mx-auto px-6 mb-32">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-display font-bold tracking-tight mb-4">Our journey so far</h2>
      <p className="text-muted-foreground">From idea to industry leader in three years.</p>
    </div>
    <div className="space-y-0">
      {milestones.map((m, i) => (
        <div key={m.year} className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
              {m.year.slice(-2)}
            </div>
            {i < milestones.length - 1 && <div className="w-px flex-1 bg-border" />}
          </div>
          <div className="pb-10">
            <span className="text-sm font-bold text-primary">{m.year}</span>
            <p className="text-muted-foreground mt-1 leading-relaxed">{m.event}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ─── Vision Quote ─── */
const VisionSection = () => (
  <section className="bg-muted/40 py-24">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <Quote className="h-12 w-12 text-destructive mx-auto mb-8" />
      <blockquote className="text-3xl md:text-4xl font-display font-light text-foreground leading-tight mb-8">
        "The future of dining isn't more tablets on tables; it's the{' '}
        <span className="font-bold text-primary">quiet intelligence</span> that allows the chef and
        the server to do what they love."
      </blockquote>
      <cite className="text-sm uppercase tracking-widest text-muted-foreground not-italic">
        — The Spandan Ethos
      </cite>
    </div>
  </section>
);

/* ─── CTA Banner ─── */
const AboutCtaSection = () => (
  <section className="max-w-7xl mx-auto px-6 py-24">
    <div className="bg-card rounded-2xl p-12 md:p-16 shadow-sm text-center">
      <h2 className="text-3xl font-display font-bold tracking-tight mb-4">
        Ready to join the movement?
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto mb-8">
        See how Spandan can transform your restaurant's guest experience — one call at a time.
      </p>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-br from-primary to-primary/80 text-primary-foreground font-bold rounded-lg shadow-xl hover:shadow-primary/20 transition-all group"
      >
        Get in Touch
        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </section>
);

/* ─── Page ─── */

export const LandingAboutPage = () => {
  return (
    <>
      <HeroSection />
      <StorySection />
      <ValuesSection />
      <PrinciplesBentoSection />
      <IntelligentSuiteSection />
      <MilestonesSection />
      <VisionSection />
      <AboutCtaSection />
    </>
  );
};
