import { AlertTriangle, CheckCircle, Loader2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import type { backendInterface } from "../backend";
import { createActorWithConfig } from "../config";
import { useAuth } from "../context/AuthContext";
import AuthSplash from "./AuthSplash";

interface BookTestDriveSectionProps {
  customizationSpec?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  configurationSpec: string;
  message: string;
}

const inputStyle: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(0,191,255,0.2)",
  borderRadius: "10px",
  color: "#F2F5F7",
  padding: "12px 16px",
  width: "100%",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const focusStyle: React.CSSProperties = {
  borderColor: "#00BFFF",
  boxShadow: "0 0 0 2px rgba(0,191,255,0.18)",
};

const labelStyle: React.CSSProperties = {
  color: "rgba(0,191,255,0.7)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
};

function NeonInput({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      <input
        id={id}
        {...props}
        style={{ ...inputStyle, ...(focused ? focusStyle : {}) }}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
      />
    </div>
  );
}

function NeonTextarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        rows={6}
        style={{
          ...inputStyle,
          ...(focused ? focusStyle : {}),
          resize: "vertical",
        }}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
      />
    </div>
  );
}

/** Retry a promise-returning function up to maxAttempts times with exponential backoff */
async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelayMs = 800,
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts - 1) {
        await new Promise((r) => setTimeout(r, baseDelayMs * 2 ** attempt));
      }
    }
  }
  throw lastError;
}

export default function BookTestDriveSection({
  customizationSpec,
}: BookTestDriveSectionProps) {
  const { isLoggedIn } = useAuth();
  const actorRef = useRef<backendInterface | null>(null);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    configurationSpec: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showInlineAuth, setShowInlineAuth] = useState(false);
  const [specBannerDismissed, setSpecBannerDismissed] = useState(false);

  // Pre-warm the actor in background so submission is instant
  useEffect(() => {
    createActorWithConfig()
      .then((a) => {
        actorRef.current = a;
      })
      .catch(() => {
        /* will retry on submit */
      });
  }, []);

  // Pre-fill configurationSpec when customizationSpec changes
  useEffect(() => {
    if (customizationSpec) {
      setForm((prev) => ({ ...prev, configurationSpec: customizationSpec }));
      setSpecBannerDismissed(false);
    }
  }, [customizationSpec]);

  function handleChange(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowInlineAuth(true);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await withRetry(async () => {
        // Use cached actor or create fresh one
        const actor = actorRef.current ?? (await createActorWithConfig());
        actorRef.current = actor;

        const combined = form.configurationSpec
          ? `${form.configurationSpec}\n\n--- User Message ---\n${form.message}`
          : form.message;

        await actor.submitBooking(
          form.name,
          form.email,
          form.phone,
          form.preferredDate,
          form.preferredTime,
          combined,
        );
      });
      setSuccess(true);
    } catch (err) {
      console.error("Booking error:", err);
      // On error, clear cached actor so next attempt creates fresh
      actorRef.current = null;
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setSuccess(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      configurationSpec: customizationSpec ?? "",
      message: "",
    });
  }

  const showSpecBanner =
    !!customizationSpec && !specBannerDismissed && !success;

  return (
    <section
      id="book-test-drive"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#07090D" }}
    >
      {/* Ghost watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0.025 }}
      >
        <span
          className="font-black uppercase tracking-widest"
          style={{ fontSize: "clamp(60px, 18vw, 200px)", color: "#00BFFF" }}
        >
          BOOK
        </span>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,191,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-semibold tracking-[0.4em] uppercase mb-3"
            style={{ color: "#00BFFF" }}
          >
            Ultimate M Performance
          </p>
          <h2
            className="font-black uppercase leading-none"
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              background:
                "linear-gradient(135deg, #FFFFFF 0%, #00BFFF 60%, #FFFFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Book Your Test Drive
          </h2>
          <p
            className="mt-4 text-sm tracking-wide"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Experience the ultimate M performance firsthand
          </p>
          <div
            className="mx-auto mt-4 h-[2px] w-24 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #00BFFF, transparent)",
            }}
          />
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="relative rounded-2xl p-8 md:p-12"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(0,191,255,0.15)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 0 60px rgba(0,191,255,0.08), 0 40px 80px rgba(0,0,0,0.5)",
          }}
        >
          <AnimatePresence mode="wait">
            {success ? (
              /* Success state */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center justify-center gap-6 py-8 text-center"
                data-ocid="book.success_state"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: "50%",
                    background: "rgba(0,191,255,0.1)",
                    border: "2px solid rgba(0,191,255,0.5)",
                    boxShadow: "0 0 40px rgba(0,191,255,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircle
                    className="w-10 h-10"
                    style={{ color: "#00BFFF" }}
                  />
                </motion.div>
                <div>
                  <h3
                    className="font-black uppercase text-2xl tracking-widest mb-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #FFFFFF 0%, #00BFFF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Booking Confirmed
                  </h3>
                  <p
                    style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}
                  >
                    We&apos;ll contact you within 24 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-2 px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
                  style={{
                    background: "rgba(0,191,255,0.1)",
                    border: "1px solid rgba(0,191,255,0.4)",
                    color: "#00BFFF",
                  }}
                  data-ocid="book.secondary_button"
                >
                  Book Another
                </button>
              </motion.div>
            ) : (
              /* Form */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                data-ocid="book.modal"
              >
                {/* Config applied banner */}
                <AnimatePresence>
                  {showSpecBanner && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                      data-ocid="book.success_state"
                    >
                      <div
                        className="flex items-center justify-between gap-3 rounded-xl px-4 py-3"
                        style={{
                          background: "rgba(0,191,255,0.08)",
                          border: "1px solid rgba(0,191,255,0.35)",
                          boxShadow: "0 0 20px rgba(0,191,255,0.1)",
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: "#00BFFF" }}
                          />
                          <p
                            className="text-xs font-semibold"
                            style={{ color: "#00BFFF" }}
                          >
                            Your configuration has been applied — see the
                            Configuration field below
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSpecBannerDismissed(true)}
                          className="flex-shrink-0 p-0.5 rounded"
                          style={{ color: "rgba(0,191,255,0.5)" }}
                          data-ocid="book.close_button"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                  >
                    <NeonInput
                      label="Full Name"
                      type="text"
                      placeholder="John M. Smith"
                      required
                      value={form.name}
                      onChange={handleChange("name")}
                      data-ocid="book.input"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <NeonInput
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={form.email}
                      onChange={handleChange("email")}
                      data-ocid="book.input"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                  >
                    <NeonInput
                      label="Phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      required
                      value={form.phone}
                      onChange={handleChange("phone")}
                      data-ocid="book.input"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <NeonInput
                      label="Preferred Date"
                      type="date"
                      required
                      value={form.preferredDate}
                      onChange={handleChange("preferredDate")}
                      data-ocid="book.input"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                    className="md:col-span-2"
                  >
                    <NeonInput
                      label="Preferred Time"
                      type="time"
                      required
                      value={form.preferredTime}
                      onChange={handleChange("preferredTime")}
                      data-ocid="book.input"
                    />
                  </motion.div>
                </div>

                {/* Configuration read-only field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.38 }}
                  className="flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span style={labelStyle}>Your Configuration</span>
                    {form.configurationSpec && (
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(0,191,255,0.12)",
                          color: "rgba(0,191,255,0.7)",
                          border: "1px solid rgba(0,191,255,0.25)",
                        }}
                      >
                        ✓ Applied
                      </span>
                    )}
                  </div>
                  <textarea
                    readOnly
                    rows={8}
                    value={form.configurationSpec}
                    placeholder="Apply your configuration from the section above..."
                    style={{
                      ...inputStyle,
                      backgroundColor: "rgba(0,191,255,0.03)",
                      border: form.configurationSpec
                        ? "1px solid rgba(0,191,255,0.3)"
                        : "1px solid rgba(255,255,255,0.07)",
                      resize: "none",
                      cursor: "default",
                      fontFamily: "monospace",
                      fontSize: "11px",
                      lineHeight: 1.6,
                      color: form.configurationSpec
                        ? "rgba(255,255,255,0.65)"
                        : "rgba(255,255,255,0.25)",
                    }}
                    data-ocid="book.textarea"
                  />
                </motion.div>

                {/* Message (editable) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.42 }}
                >
                  <NeonTextarea
                    label="Message (Optional)"
                    placeholder="Any additional requests or notes..."
                    value={form.message}
                    onChange={handleChange("message")}
                    data-ocid="book.textarea"
                  />
                </motion.div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-center"
                    style={{ color: "#FF4D4D" }}
                    data-ocid="book.error_state"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full font-bold tracking-[0.2em] uppercase text-sm transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                      background: loading
                        ? "rgba(0,191,255,0.2)"
                        : "linear-gradient(135deg, rgba(0,191,255,0.3) 0%, rgba(0,191,255,0.15) 100%)",
                      border: "1px solid rgba(0,191,255,0.5)",
                      color: loading ? "rgba(0,191,255,0.6)" : "#00BFFF",
                      boxShadow: loading
                        ? "none"
                        : "0 0 30px rgba(0,191,255,0.25)",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                    data-ocid="book.submit_button"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      "Confirm Test Drive"
                    )}
                  </button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
        {/* Inline login required warning + AuthSplash overlay */}
        <AnimatePresence>
          {showInlineAuth && (
            <>
              <AuthSplash onClose={() => setShowInlineAuth(false)} />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl p-6 mt-4 mx-4"
                style={{
                  border: "1.5px solid rgba(255,80,60,0.6)",
                  background: "rgba(255,40,20,0.06)",
                  boxShadow: "0 0 40px rgba(255,80,40,0.18)",
                }}
                data-ocid="book.modal"
              >
                <button
                  type="button"
                  onClick={() => setShowInlineAuth(false)}
                  className="absolute top-3 right-3 p-1 rounded-full transition-colors"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                  data-ocid="book.close_button"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle
                    className="w-6 h-6 mt-0.5 flex-shrink-0"
                    style={{ color: "#FF5030" }}
                  />
                  <div>
                    <h4
                      className="font-black uppercase tracking-widest text-base mb-1"
                      style={{ color: "#FF5030" }}
                    >
                      ⚠️ Login Required
                    </h4>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      You must be signed in to confirm your test drive booking.
                      This step is mandatory.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowInlineAuth(true)}
                    className="flex-1 py-2.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,191,255,0.25) 0%, rgba(0,191,255,0.1) 100%)",
                      border: "1px solid rgba(0,191,255,0.5)",
                      color: "#00BFFF",
                    }}
                    data-ocid="book.primary_button"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInlineAuth(true)}
                    className="flex-1 py-2.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.6)",
                    }}
                    data-ocid="book.secondary_button"
                  >
                    Create Account
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
