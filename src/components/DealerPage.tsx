import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle, ArrowLeft, Building2, MapPin, Phone, Mail, User } from 'lucide-react';



type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function DealerPage() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setErrorMessage('Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          <a href="#" className="flex items-center gap-2 h-9">
            <img src="/hinge22.png" alt="Hinge Cabinetry" className="h-9 w-auto" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-brand-charcoal transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Main Site
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-surface-platinum">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-brand-charcoal/50 text-xs tracking-[0.3em] uppercase mb-4">Dealer Partnerships</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-[1.1] mb-6">
            Partner With Hinge
          </h1>
          <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            We're expanding our network of authorized dealers and welcome inquiries from showrooms, design firms, and trade professionals who share our commitment to quality.
          </p>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: 'Two Product Lines',
                desc: 'Offer clients both full-custom precision cabinetry and our value-engineered Select Series — covering every project scope and budget.',
              },
              {
                title: 'Dedicated Support',
                desc: 'Our team works directly with dealer partners on quoting, design assist, and project coordination from spec to delivery.',
              },
              {
                title: 'Quality Built In',
                desc: 'Every unit ships with 3/4" plywood construction, premium Blum hardware, and our signature 1/16" tolerance standard.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="text-center md:text-left">
                <h3 className="text-brand-charcoal font-semibold text-lg mb-2">{title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-charcoal mb-3">Dealer Inquiry</h2>
            <p className="text-neutral-500 max-w-md mx-auto">
              Tell us about your business and we'll follow up to discuss partnership opportunities.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-surface-platinum border border-neutral-200 rounded-xl p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={28} className="text-emerald-600" />
              </div>
              <h3 className="text-brand-charcoal text-xl font-semibold mb-2">Inquiry Submitted</h3>
              <p className="text-neutral-500 text-sm max-w-sm mx-auto mb-6">
                Thank you for your interest. A member of our team will review your information and reach out within two business days.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-sm text-neutral-500 hover:text-brand-charcoal transition-colors underline underline-offset-4"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" data-netlify="true" name="Dealer Inquiry">
              <input type="hidden" name="form-name" value="Dealer Inquiry" />
              <p className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>
              {/* Contact Name */}
              <div>
                <label htmlFor="dealer-name" className="flex items-center gap-2 text-sm font-medium text-brand-charcoal mb-2">
                  <User size={14} className="text-neutral-400" />
                  Contact Name
                </label>
                <input
                  id="dealer-name"
                  type="text"
                  name="name"
                  required
                  className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none focus:border-brand-charcoal/40 focus:ring-1 focus:ring-brand-charcoal/20 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              {/* Business Name */}
              <div>
                <label htmlFor="dealer-business" className="flex items-center gap-2 text-sm font-medium text-brand-charcoal mb-2">
                  <Building2 size={14} className="text-neutral-400" />
                  Business Name
                </label>
                <input
                  id="dealer-business"
                  type="text"
                  name="business_name"
                  required
                  className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none focus:border-brand-charcoal/40 focus:ring-1 focus:ring-brand-charcoal/20 transition-colors"
                  placeholder="Company or showroom name"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dealer-email" className="flex items-center gap-2 text-sm font-medium text-brand-charcoal mb-2">
                    <Mail size={14} className="text-neutral-400" />
                    Email
                  </label>
                  <input
                    id="dealer-email"
                    type="email"
                    name="email"
                    required
                    className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none focus:border-brand-charcoal/40 focus:ring-1 focus:ring-brand-charcoal/20 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="dealer-phone" className="flex items-center gap-2 text-sm font-medium text-brand-charcoal mb-2">
                    <Phone size={14} className="text-neutral-400" />
                    Phone
                  </label>
                  <input
                    id="dealer-phone"
                    type="tel"
                    name="phone"
                    className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none focus:border-brand-charcoal/40 focus:ring-1 focus:ring-brand-charcoal/20 transition-colors"
                    placeholder="(555) 000-0000"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="dealer-location" className="flex items-center gap-2 text-sm font-medium text-brand-charcoal mb-2">
                  <MapPin size={14} className="text-neutral-400" />
                  Location / Market Area
                </label>
                <input
                  id="dealer-location"
                  type="text"
                  name="location"
                  className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none focus:border-brand-charcoal/40 focus:ring-1 focus:ring-brand-charcoal/20 transition-colors"
                  placeholder="City, state, or region you serve"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="dealer-message" className="block text-sm font-medium text-brand-charcoal mb-2">
                  Tell Us About Your Business
                </label>
                <textarea
                  id="dealer-message"
                  name="message"
                  rows={4}
                  className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none focus:border-brand-charcoal/40 focus:ring-1 focus:ring-brand-charcoal/20 transition-colors resize-none"
                  placeholder="Briefly describe your business, clientele, and what interests you about carrying Hinge..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-brand-charcoal text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-brand-jet transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Inquiry
                  </>
                )}
              </button>

              <p className="text-neutral-400 text-xs text-center">
                We typically respond within two business days.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-ink py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <img src="/hinge2.png" alt="Hinge Cabinetry" className="h-7 w-auto brightness-0 invert opacity-60" />
          <p className="text-neutral-600 text-xs">&copy; 2026 Hinge Cabinetry. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
