import { CheckCircle, Loader2, Lock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
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
        rows={4}
        style={{
          ...inputStyle,
          ...(focused ? focusStyle : {}),
          resize: "none",
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

export default function BookTestDriveSection() {
  const { actor } = useActor();
  const { isLoggedIn } = useAuth();
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!actor) throw new Error("Not connected");
      await actor.submitBooking(
        form.name,
        form.email,
        form.phone,
        form.preferredDate,
        form.preferredTime,
        form.message,
      );
      setSuccess(true);
    } catch (_err) {
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
      message: "",
    });
  }

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
            {!isLoggedIn ? (
              /* Not logged in — gated CTA */
              <motion.div
                key="gated"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center gap-6 py-10 text-center"
                data-ocid="book.panel"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 180, delay: 0.15 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    border: "2px solid rgba(0,191,255,0.35)",
                    background: "rgba(0,191,255,0.07)",
                    boxShadow: "0 0 36px rgba(0,191,255,0.18)",
                  }}
                >
                  <Lock className="w-8 h-8" style={{ color: "#00BFFF" }} />
                </motion.div>
                <div>
                  <h3
                    className="font-black uppercase text-xl tracking-widest mb-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #FFFFFF 0%, #00BFFF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Sign In to Book Your Test Drive
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "14px",
                      maxWidth: "340px",
                      lineHeight: 1.6,
                    }}
                  >
                    You must be signed in to schedule an exclusive test drive
                    experience with the BMW M5 CS.
                  </p>
                </div>
                <p
                  className="text-xs tracking-widest uppercase px-4 py-2 rounded-full"
                  style={{
                    border: "1px solid rgba(0,191,255,0.2)",
                    color: "rgba(0,191,255,0.55)",
                    background: "rgba(0,191,255,0.05)",
                  }}
                >
                  🔒 Sign in via the top of the page to continue
                </p>
              </motion.div>
            ) : success ? (
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

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <NeonTextarea
                    label="Message (Optional)"
                    placeholder="Any specific preferences or questions..."
                    value={form.message}
                    onChange={handleChange("message")}
                    data-ocid="book.textarea"
                  />
                </motion.div>

                {error && (
                  <p
                    className="text-sm text-center"
                    style={{ color: "#FF4D4D" }}
                    data-ocid="book.error_state"
                  >
                    {error}
                  </p>
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
      </div>
    </section>
  );
}
