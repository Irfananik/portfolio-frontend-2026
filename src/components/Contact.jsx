import { useState } from 'react';
import API from '../api/axios';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      await API.post('/contacts', formData);
      setStatus({ loading: false, success: true, error: null });
      // Reset form fields upon successful submission
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setStatus({
        loading: false,
        success: false,
        error: err.response?.data?.message || t.ui.submitError,
      });
    }
  };

  return (
    <section id="contact" className="py-12 border-t border-base-300">
      <div className="space-y-8">
        {/* Section Heading */}
        <div className="flex items-center gap-3">
          <Mail className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">{t.sections.contactTitle}</h2>
            <p className="text-sm text-base-content/70 mt-1">
              {t.ui.contactDescription}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left Column: Direct Contact Info (2 Cols) */}
          <div className="lg:col-span-2 bg-base-200 border border-base-300 rounded-2xl p-6 space-y-6">
            <h3 className="text-xl font-bold text-base-content border-b border-base-300/80 pb-3">
              {t.ui.contactInformation}
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-base-content/60 font-semibold uppercase block">{t.ui.email}</span>
                  <a href="mailto:your.email@example.com" className="font-medium hover:text-primary transition-colors">
                    argmbhuiyanjp@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-base-content/60 font-semibold uppercase block">{t.ui.phone}</span>
                  <a href="tel:+81000000000" className="font-medium hover:text-primary transition-colors">
                    +81 (0) +81 (0) 70-35406363
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-base-content/60 font-semibold uppercase block">{t.ui.location}</span>
                  <span className="font-medium">Kyoto, Japan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (3 Cols) */}
          <div className="lg:col-span-3 bg-base-200 border border-base-300 rounded-2xl p-6 sm:p-8">
            {/* Success Alert */}
            {status.success && (
              <div className="alert alert-success bg-success/10 border-success/20 text-success mb-6">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>{t.ui.thankYou}</span>
              </div>
            )}

            {/* Error Alert */}
            {status.error && (
              <div className="alert alert-error bg-error/10 border-error/20 text-error mb-6">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Input */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">
                      {t.ui.yourName} <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Morshed Bhuiyan"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-base-100 focus:input-primary transition-colors"
                  />
                </div>

                {/* Email Input */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">
                      {t.ui.emailAddress} <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="argmbhuiyanjp@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-base-100 focus:input-primary transition-colors"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">
                    {t.ui.phoneNumber} <span className="text-xs text-base-content/40 lowercase">{t.ui.optional}</span>
                  </span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+81 80-1234-5678"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-base-100 focus:input-primary transition-colors"
                />
              </div>

              {/* Message Textarea */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">
                    {t.ui.message} <span className="text-error">*</span>
                  </span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={t.ui.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full bg-base-100 focus:textarea-primary transition-colors leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.loading}
                className="btn btn-primary w-full sm:w-auto gap-2 text-sm font-medium mt-2"
              >
                {status.loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.ui.sending}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t.ui.sendMessage}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}