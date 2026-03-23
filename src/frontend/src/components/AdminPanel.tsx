import { Loader2, ShieldCheck, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Booking } from "../backend.d";
import { useActor } from "../hooks/useActor";

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const { actor, isFetching } = useActor();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getAllBookings()
      .then(setBookings)
      .catch(() => setError("Failed to load bookings."))
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col"
      style={{
        background: "rgba(5,8,12,0.97)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
      data-ocid="admin.panel"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(255,68,68,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(0,191,255,0.05) 0%, transparent 50%)",
        }}
      />

      {/* Header */}
      <div
        className="relative flex items-center justify-between px-6 py-5 shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,68,68,0.2)",
          background: "rgba(11,15,20,0.8)",
        }}
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5" style={{ color: "#FF4444" }} />
          <div>
            <p
              className="text-xs font-semibold tracking-[0.35em] uppercase"
              style={{ color: "rgba(255,68,68,0.7)" }}
            >
              Admin Panel
            </p>
            <h2
              className="font-black uppercase tracking-widest text-sm"
              style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #FF4444 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Test Drive Submissions
            </h2>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg transition-colors duration-200"
          style={{
            border: "1px solid rgba(255,68,68,0.3)",
            color: "#FF4444",
            background: "rgba(255,68,68,0.06)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,68,68,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,68,68,0.06)";
          }}
          data-ocid="admin.close_button"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto p-6">
        {loading || isFetching ? (
          <div
            className="flex flex-col items-center justify-center h-64 gap-4"
            data-ocid="admin.loading_state"
          >
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "#FF4444" }}
            />
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Loading bookings...
            </p>
          </div>
        ) : error ? (
          <div
            className="flex items-center justify-center h-64"
            data-ocid="admin.error_state"
          >
            <p className="text-sm" style={{ color: "#FF4444" }}>
              {error}
            </p>
          </div>
        ) : bookings.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center h-64 gap-3"
            data-ocid="admin.empty_state"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                border: "1px solid rgba(255,68,68,0.3)",
                background: "rgba(255,68,68,0.06)",
              }}
            >
              <ShieldCheck size={22} style={{ color: "rgba(255,68,68,0.5)" }} />
            </div>
            <p
              className="text-sm tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              No bookings yet
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-w-5xl mx-auto">
            <p
              className="text-xs tracking-widest uppercase mb-2"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {bookings.length} submission{bookings.length !== 1 ? "s" : ""}
            </p>
            {bookings.map((b, i) => (
              <motion.div
                key={`${b.email}-${b.preferredDate}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,68,68,0.12)",
                  boxShadow: "0 0 30px rgba(255,68,68,0.04)",
                }}
                data-ocid={`admin.item.${i + 1}`}
              >
                <div className="flex flex-col gap-1">
                  <span
                    className="text-xs uppercase tracking-widest"
                    style={{ color: "rgba(255,68,68,0.6)" }}
                  >
                    Name
                  </span>
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "#F2F5F7" }}
                  >
                    {b.name}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span
                    className="text-xs uppercase tracking-widest"
                    style={{ color: "rgba(255,68,68,0.6)" }}
                  >
                    Contact
                  </span>
                  <span className="text-sm" style={{ color: "#A0AEC0" }}>
                    {b.email}
                  </span>
                  <span className="text-sm" style={{ color: "#A0AEC0" }}>
                    {b.phone}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span
                    className="text-xs uppercase tracking-widest"
                    style={{ color: "rgba(255,68,68,0.6)" }}
                  >
                    Date / Time
                  </span>
                  <span className="text-sm" style={{ color: "#A0AEC0" }}>
                    {b.preferredDate} at {b.preferredTime}
                  </span>
                </div>
                {b.message && (
                  <div className="md:col-span-3 flex flex-col gap-1">
                    <span
                      className="text-xs uppercase tracking-widest"
                      style={{ color: "rgba(255,68,68,0.6)" }}
                    >
                      Message
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "rgba(242,245,247,0.65)" }}
                    >
                      {b.message}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
