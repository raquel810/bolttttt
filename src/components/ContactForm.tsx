import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
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

  if (status === 'success') {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={28} className="text-emerald-400" />
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">Message Sent</h3>
        <p className="text-white/50 text-sm max-w-sm mx-auto mb-6">
          Thank you for reaching out. Our team will review your inquiry and respond within one business day.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-white/60 hover:text-white transition-colors underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8" data-netlify="true" name="Request a Quote">
      <input type="hidden" name="form-name" value="Request a Quote" />
      <p className="hidden">
        <label>
          Don't fill this out: <input name="bot-field" />
        </label>
      </p>

      <h3 className="text-white text-lg font-semibold mb-1">Request a Quote</h3>
      <p className="text-white/40 text-sm mb-6">Tell us about your project and we'll get back to you promptly.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="cf-name" className="block text-white/60 text-xs tracking-wide uppercase mb-1.5">
            Name
          </label>
          <input
            id="cf-name"
            type="text"
            name="name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-white/60 text-xs tracking-wide uppercase mb-1.5">
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="cf-phone" className="block text-white/60 text-xs tracking-wide uppercase mb-1.5">
            Phone
          </label>
          <input
            id="cf-phone"
            type="tel"
            name="phone"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors"
            placeholder="(555) 000-0000"
          />
        </div>
        <div>
          <label htmlFor="cf-series" className="block text-white/60 text-xs tracking-wide uppercase mb-1.5">
            Interested In
          </label>
          <select
            id="cf-series"
            name="series"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors appearance-none"
          >
            <option value="" className="bg-brand-jet">Select a product line</option>
            <option value="Custom Series" className="bg-brand-jet">Hinge Custom Series</option>
            <option value="Select Series" className="bg-brand-jet">Hinge Select Series</option>
            <option value="Both / Not Sure" className="bg-brand-jet">Both / Not Sure</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="cf-message" className="block text-white/60 text-xs tracking-wide uppercase mb-1.5">
          Project Details
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors resize-none"
          placeholder="Describe your project scope, timeline, and any specific requirements..."
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 mb-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-white text-brand-charcoal font-semibold px-6 py-3 rounded-lg hover:bg-surface-platinum transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <div className="w-4 h-4 border-2 border-brand-charcoal/30 border-t-brand-charcoal rounded-full animate-spin"></div>
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Inquiry
          </>
        )}
      </button>

      <p className="text-white/30 text-xs text-center mt-4">
        We typically respond within one business day.
      </p>
    </form>
  );
}
