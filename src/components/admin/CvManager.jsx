import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { Save, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function CvManager() {
  const [cvForm, setCvForm] = useState({ en: '', ja: '' });
  const [status, setStatus] = useState({ loading: false, saving: false, success: false, error: null });

  useEffect(() => {
    const fetchCv = async () => {
      setStatus((s) => ({ ...s, loading: true }));
      try {
        const { data } = await API.get('/settings/cv');
        if (data) {
          setCvForm({ en: data.en || '', ja: data.ja || '' });
        }
      } catch (err) {
        console.log('No custom CV settings saved yet.');
      } finally {
        setStatus((s) => ({ ...s, loading: false }));
      };
    };

    fetchCv();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, saving: true, success: false, error: null });

    try {
      await API.post('/settings/cv', cvForm);
      setStatus({ loading: false, saving: false, success: true, error: null });
      setTimeout(() => setStatus((s) => ({ ...s, success: false })), 3000);
    } catch (err) {
      console.error('Error saving CV links:', err);
      setStatus({
        loading: false,
        saving: false,
        success: false,
        error: err.response?.data?.message || 'Failed to update CV URLs.',
      });
    }
  };

  if (status.loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="border-b border-base-200 pb-3">
        <h3 className="text-lg font-bold">Manage CV / Resume Downloads</h3>
        <p className="text-xs text-base-content/60 mt-1">
          Paste Google Drive view links or public paths (like <code className="text-primary">/resume_en.pdf</code>).
        </p>
      </div>

      {status.success && (
        <div className="alert alert-success bg-success/10 border-success/20 text-success text-sm">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>CV URLs updated successfully!</span>
        </div>
      )}

      {status.error && (
        <div className="alert alert-error bg-error/10 border-error/20 text-error text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{status.error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-primary" />
              English CV URL / Path
            </span>
          </label>
          <input
            type="text"
            required
            placeholder="https://drive.google.com/... or /resume_en.pdf"
            value={cvForm.en}
            onChange={(e) => setCvForm({ ...cvForm, en: e.target.value })}
            className="input input-bordered w-full text-sm bg-base-200 focus:input-primary"
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-secondary" />
              Japanese CV URL / Path (履歴書)
            </span>
          </label>
          <input
            type="text"
            required
            placeholder="https://drive.google.com/... or /resume_ja.pdf"
            value={cvForm.ja}
            onChange={(e) => setCvForm({ ...cvForm, ja: e.target.value })}
            className="input input-bordered w-full text-sm bg-base-200 focus:input-primary"
          />
        </div>

        <button type="submit" disabled={status.saving} className="btn btn-primary btn-sm gap-2 mt-2">
          {status.saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Update CV Links
            </>
          )}
        </button>
      </form>
    </div>
  );
}