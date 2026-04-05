import { AtSign, Phone, MapPin, ArrowRight, MapPinned } from 'lucide-react';
import { useState, type FormEvent } from 'react';

/* ─── Sub-components ─── */

const contactDetails = [
  {
    icon: AtSign,
    label: 'Email us',
    value: 'hello@spandan.ai',
    href: 'mailto:hello@spandan.ai',
  },
  {
    icon: Phone,
    label: 'Call us',
    value: '+1 (800) SPANDAN',
    href: 'tel:+1800SPANDAN',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Mayfair, London',
  },
];

const ContactSidebar = () => (
  <div className="lg:col-span-5 space-y-12">
    <div className="space-y-6">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase">
        <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
        Concierge Service
      </span>
      <h1 className="text-5xl md:text-7xl font-display font-extrabold text-foreground tracking-tighter leading-[0.9]">
        Let's talk.
      </h1>
      <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
        Ready to elevate your hospitality experience? Our AI-driven maître d' is waiting to
        transform your guest journey.
      </p>
    </div>

    {/* Contact details */}
    <div className="space-y-8 pt-8 border-t border-border">
      {contactDetails.map((item) => (
        <div key={item.label} className="flex items-start gap-4 group">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
            <item.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              {item.label}
            </p>
            {item.href ? (
              <a
                className="text-lg font-semibold text-primary hover:opacity-80 transition-colors"
                href={item.href}
              >
                {item.value}
              </a>
            ) : (
              <p className="text-lg font-semibold text-foreground">{item.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Map image */}
    <div className="relative rounded-2xl overflow-hidden h-48 shadow-lg group">
      <img
        alt="Interior of a luxury modern restaurant"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm6iUaYhrUvZUWKple-QYaJtsVPbQdxyFxu90WaMgOUDdjHBMsd9HscF88ADXk4lWbbiZKDoDZHsetFpC2GhFyZmWAzObEw9beUAExpkPnhYhB628z4xCrLVlfR6-SfeH6Qk2vtunSBzxcHKAwl7Bnz0I-KZUyyQfuMKCTasJnRGmeqV-w8KlWOXotuHW4CGEjTriTLtrk_7fsbHEGx1pzggW967uq3aZIxaGcQnGmNItRpuaJMOCfXgcEZiljN8_EUMLpxhReNJM"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <MapPinned className="h-4 w-4 text-white" />
        <span className="text-white text-sm font-medium">Headquarters</span>
      </div>
    </div>
  </div>
);

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="lg:col-span-7 bg-card rounded-3xl p-8 lg:p-12 shadow-lg relative overflow-hidden flex items-center justify-center min-h-125">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
            <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-foreground">Thank you!</h3>
          <p className="text-muted-foreground">Our team will get back to you within 4 business hours.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-primary font-semibold hover:opacity-80 transition-colors"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 bg-card rounded-3xl p-8 lg:p-12 shadow-lg relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary to-primary/60 opacity-10 blur-3xl -mr-16 -mt-16" />

      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Name
            </label>
            <input
              className="w-full bg-background border-0 rounded-lg px-4 py-4 text-foreground focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50 transition-all"
              placeholder="Julianne Smith"
              type="text"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Restaurant Name
            </label>
            <input
              className="w-full bg-background border-0 rounded-lg px-4 py-4 text-foreground focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50 transition-all"
              placeholder="Le Bistro de Luxe"
              type="text"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Email
            </label>
            <input
              className="w-full bg-background border-0 rounded-lg px-4 py-4 text-foreground focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50 transition-all"
              placeholder="julianne@lebistro.com"
              type="email"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Phone
            </label>
            <input
              className="w-full bg-background border-0 rounded-lg px-4 py-4 text-foreground focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50 transition-all"
              placeholder="+44 20 7946 0958"
              type="tel"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Message
          </label>
          <textarea
            className="w-full bg-background border-0 rounded-lg px-4 py-4 text-foreground focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50 transition-all resize-none"
            placeholder="How can we help your establishment?"
            rows={4}
            required
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-linear-to-br from-primary to-primary/80 text-primary-foreground font-bold py-5 rounded-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all hover:scale-[0.98] active:scale-95 shadow-xl shadow-primary/20"
          >
            Request a Demo
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-center mt-6 text-xs text-muted-foreground">
            Our team typically responds within 4 business hours.
          </p>
        </div>
      </form>
    </div>
  );
};

/* ─── Page ─── */

export const LandingContactPage = () => {
  return (
    <div className="pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        <ContactSidebar />
        <ContactForm />
      </div>
    </div>
  );
};
