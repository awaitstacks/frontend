
import { useContext, useState } from "react";
import { TourAppContext } from "../context/TourAppContext";
import { assets } from "../assets/assets.js";

const Enquirypage = ({ onClose }) => {
    const { createEnquiry, enquiryLoading } = useContext(TourAppContext);
    const [submitted, setSubmitted] = useState(false);
    const [counts, setCounts] = useState({ a: 1, c: 0, i: 0 });
    const [formData, setFormData] = useState({
        fullName: "", mobileNumber: "", email: "", city: "",
        destination: "", tourType: "", preferredTravelDate: "",
        numberOfDays: "", numberOfNights: "", specialRequests: "", source: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updated = { ...prev, [name]: value };
            if (name === "numberOfDays") {
                const days = Number(value);
                updated.numberOfNights = days > 0 ? String(days - 1) : "";
            }
            return updated;
        });
    };

    const changeCount = (key, delta) => {
        setCounts((prev) => {
            const updated = { ...prev, [key]: Math.max(0, prev[key] + delta) };
            if (key === "a" && updated[key] < 1) updated[key] = 1;
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await createEnquiry({
            ...formData,
            adults: counts.a, children: counts.c, infants: counts.i,
            numberOfDays: Number(formData.numberOfDays),
            numberOfNights: Number(formData.numberOfNights),
        });
        if (result.success) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({ fullName: "", mobileNumber: "", email: "", city: "", destination: "", tourType: "", preferredTravelDate: "", numberOfDays: "", numberOfNights: "", specialRequests: "", source: "" });
                setCounts({ a: 1, c: 0, i: 0 });
                if (onClose) onClose();
            }, 5000);
        }
    };

    const fieldStyle = { width: "100%", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px 12px 12px 36px", fontSize: "14px", color: "#0f172a", outline: "none", boxSizing: "border-box", background: "#fff", height: "45px" };
    const labelStyle = { fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" };
    const sectionHeadStyle = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", paddingBottom: "10px", borderBottom: "2px solid #f1f5f9" };

    return (
        <>
            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }

                .enq-overlay {
                    position: fixed; inset: 0;
                    background-color: rgba(0,0,0,0.65);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    overflow-y: auto;
                }

                .enq-modal {
                    background: #fff;
                    border-radius: 20px;
                    overflow: hidden;
                    width: 100%;
                    max-width: 900px;
                    box-shadow: 0 30px 80px rgba(0,0,0,0.35);
                    display: flex;
                    flex-direction: column;
                    max-height: calc(100vh - 40px);
                }

                .enq-scroll-body {
                    overflow-y: auto;
                    flex: 1;
                    -webkit-overflow-scrolling: touch;
                }

                /* Desktop & Tab — 2 col (2 rows) */
                @media (min-width: 768px) {
                    .enq-grid-4 {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .enq-grid-pax {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }

                /* Mobile — single column */
                @media (max-width: 767px) {
                    .enq-overlay { padding: 16px; }
                    .enq-modal { border-radius: 16px; max-height: calc(100vh - 32px); }
    .enq-header { 
        padding: 12px 44px 12px 16px !important; 
        min-height: 70px !important; 
    }
    .enq-header h2 { font-size: 16px !important; }
    .enq-header p { font-size: 11px !important; margin-top: 4px !important; }
    .enq-header img { width: 24px !important; height: 24px !important; }
    .enq-header .enq-close-btn { 
        top: 10px !important; right: 10px !important;
        width: 28px !important; height: 28px !important; 
    }
                    .enq-form-body { padding: 14px 16px !important; gap: 14px !important; }
                    .enq-submit-wrap { padding: 0 16px 24px !important; }

                    /* Single column for all grids on mobile */
                    .enq-grid-4 { grid-template-columns: 1fr !important; gap: 12px !important; }
                    .enq-grid-pax { grid-template-columns: 1fr !important; gap: 12px !important; }
                    .enq-grid-2 { grid-template-columns: 1fr !important; gap: 12px !important; }

                    .enq-sec-head { margin-bottom: 10px !important; padding-bottom: 8px !important; }
                    .enq-sec-head span { font-size: 15px !important; }
                    .enq-sec-head .enq-sec-icon { width: 26px !important; height: 26px !important; font-size: 13px !important; }
                    .enq-field-label { font-size: 13px !important; margin-bottom: 5px !important; }

                        /* Tour Details rows — single column on mobile */
    .enq-tour-row1 { grid-template-columns: 1fr !important; }
    .enq-tour-row2 { grid-template-columns: 1fr !important; }


                    /* Bigger inputs on mobile */
                    .enq-input { font-size: 14px !important; padding: 14px 12px 14px 36px !important; height: 45px !important; }
                    .enq-select { font-size: 14px !important; padding: 14px 12px 14px 36px !important; height: 45px !important; }
                    .enq-icon { font-size: 14px !important; left: 10px !important; }

                    .enq-pax-card { padding: 14px !important; }
                    .enq-pax-label { font-size: 13px !important; margin-bottom: 10px !important; }
                    .enq-pax-sub { font-size: 10px !important; }
                    .enq-pax-btn { width: 34px !important; height: 34px !important; font-size: 20px !important; }
                    .enq-pax-count { font-size: 18px !important; }
                    .enq-total-card { padding: 14px !important; }
                    .enq-total-label { font-size: 13px !important; }
                    .enq-total-count { font-size: 28px !important; }
                    .enq-textarea { font-size: 14px !important; padding: 12px !important; }
                    .enq-submit-btn { font-size: 15px !important; padding: 14px !important; }
                    .enq-success { padding: 40px 20px !important; }
                    .enq-success h3 { font-size: 18px !important; }
                    .enq-success p { font-size: 13px !important; }
                }
            `}</style>

            <div className="enq-overlay" onClick={(ev) => { if (ev.target === ev.currentTarget) onClose?.(); }}>
                <div className="enq-modal">

                    {/* Header — fixed top */}
                    <div className="enq-header" style={{
                        position: "relative",
                        minHeight: "80px",        // ← was 100px
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "16px 48px 16px 24px",  // ← right padding for close button space
                        overflow: "hidden",
                        background: "linear-gradient(135deg, #1a3c5e 0%, #1a3c5e 50%, #1d6a4a 100%)",
                        flexShrink: 0
                    }}>
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(65, 169, 89, 0.92) 40%, rgba(239, 40, 9, 0.85) 100%)" }} />
                        <button onClick={onClose} className="enq-close-btn" style={{ position: "absolute", top: "14px", right: "14px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", fontSize: "16px", fontWeight: "bold", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                        <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: 700, position: "relative", zIndex: 2, margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                            <img src={assets.mapImg} alt="map" style={{ width: "38px", height: "38px", objectFit: "contain", mixBlendMode: "multiply" }} />
                            ENQUIRE NOW
                        </h2>
                        <p style={{ color: "#bfdbfe", fontSize: "13px", marginTop: "5px", position: "relative", zIndex: 2 }}>
                            📍 Fill in the details below and our team will get back to you soon!
                        </p>
                    </div>

                    {/* Scrollable body */}
                    <div className="enq-scroll-body">
                        {submitted ? (
                            <div className="enq-success" style={{ textAlign: "center", padding: "60px 32px" }}>
                                <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                                    <svg style={{ width: "36px", height: "36px" }} fill="none" stroke="#16a34a" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>Enquiry Submitted Successfully!</h3>
                                <p style={{ fontSize: "14px", color: "#64748b", maxWidth: "340px", margin: "0 auto 20px", lineHeight: 1.7 }}>
                                    Our travel expert will contact you within <strong>24 hours</strong> with a personalised itinerary.
                                </p>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "10px 18px", fontSize: "13px", color: "#166534" }}>
                                    📱 We'll reach you on your mobile number
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="enq-form-body" style={{ padding: "18px 32px", display: "flex", flexDirection: "column", gap: "16px" }}>

                                    {/* Section 1 - Personal Details */}
                                    <div>
                                        <div className="enq-sec-head" style={sectionHeadStyle}>
                                            <div className="enq-sec-icon" style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>👤</div>
                                            <span style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Personal Details</span>
                                        </div>
                                        <div className="enq-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
                                            {[
                                                { label: "Full Name", name: "fullName", icon: "👤", placeholder: "Enter your full name", required: true },
                                                { label: "Mobile Number", name: "mobileNumber", icon: "📞", placeholder: "+91 XXXXX XXXXX", required: true },
                                                { label: "Email Address", name: "email", icon: "✉️", placeholder: "you@example.com", type: "email", },
                                                { label: "City / Location", name: "city", icon: "📍", placeholder: "e.g. Chennai" },
                                            ].map((f) => (
                                                <div key={f.name}>
                                                    <label className="enq-field-label" style={labelStyle}>{f.label} {f.required && <span style={{ color: "#ef4444" }}>*</span>}</label>
                                                    <div style={{ position: "relative" }}>
                                                        <span className="enq-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px" }}>{f.icon}</span>
                                                        <input className="enq-input" name={f.name} value={formData[f.name]} onChange={handleChange} required={f.required} type={f.type || "text"} placeholder={f.placeholder} style={fieldStyle} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Section 2 - Tour Details */}
                                    <div>
                                        <div className="enq-sec-head" style={sectionHeadStyle}>
                                            <div className="enq-sec-icon" style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>🗺️</div>
                                            <span style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Tour Details</span>
                                        </div>
                                        {/* Row 1: Destination + Tour Type */}
                                        <div className="enq-tour-row1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                                            <div>
                                                <label className="enq-field-label" style={labelStyle}>Destination <span style={{ color: "#ef4444" }}>*</span></label>
                                                <div style={{ position: "relative" }}>
                                                    <span className="enq-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px" }}>🌍</span>
                                                    <input className="enq-input" name="destination" value={formData.destination}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setFormData((prev) => ({ ...prev, destination: val.charAt(0).toUpperCase() + val.slice(1) }));
                                                        }}
                                                        required placeholder="e.g. Manali, Bali" style={fieldStyle} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="enq-field-label" style={labelStyle}>Tour Type <span style={{ color: "#ef4444" }}>*</span></label>
                                                <div style={{ position: "relative" }}>
                                                    <span className="enq-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", zIndex: 1 }}>🏷️</span>
                                                    <select className="enq-select enq-input" name="tourType" value={formData.tourType} onChange={handleChange} required style={{ ...fieldStyle, appearance: "none" }}>
                                                        <option value="">Select tour type</option>
                                                        <option>Group tour(fixed departure)</option>
                                                        <option>Customized/Private tour</option>
                                                        <option>Friends</option><option>Family</option>
                                                        <option>Corporate/Team Outing</option>
                                                        <option>Honeymoon</option>
                                                        <option>pilgrimage tour</option>
                                                        <option>Others</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Row 2: Travel Date + Days + Nights */}
                                        <div className="enq-tour-row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
                                            <div>
                                                <label className="enq-field-label" style={labelStyle}>Preferred Travel Date </label>
                                                <div style={{ position: "relative" }}>
                                                    <span className="enq-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px" }}>📅</span>
                                                    <input
                                                        className="enq-input"
                                                        name="preferredTravelDate"
                                                        value={formData.preferredTravelDate}
                                                        onChange={handleChange}
                                                        type="date"
                                                        min={new Date().toISOString().split("T")[0]}
                                                        style={fieldStyle}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="enq-field-label" style={labelStyle}>No. of Days </label>
                                                <div style={{ position: "relative" }}>
                                                    <span className="enq-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px" }}>🌤️</span>
                                                    <input className="enq-input" name="numberOfDays" value={formData.numberOfDays} onChange={handleChange} min="1" placeholder="5" style={fieldStyle} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="enq-field-label" style={labelStyle}>No. of Nights</label>
                                                <div style={{ position: "relative" }}>
                                                    <span className="enq-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px" }}>🌙</span>
                                                    <input className="enq-input" name="numberOfNights" value={formData.numberOfNights} onChange={handleChange} min="0" placeholder="4" style={fieldStyle} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 3 - Travellers */}
                                    <div>
                                        <div className="enq-sec-head" style={sectionHeadStyle}>
                                            <div className="enq-sec-icon" style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>👥</div>
                                            <span style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Travellers</span>
                                        </div>
                                        <div className="enq-grid-pax" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
                                            {[
                                                { key: "a", label: "Adults", icon: "👤", color: "#2563eb", bg: "#dbeafe" },
                                                { key: "c", label: "Children", sub: "(6–10 years)", icon: "👦", color: "#059669", bg: "#d1fae5" },
                                                { key: "i", label: "Infants", sub: "(0–5 years)", icon: "👶", color: "#d97706", bg: "#fef3c7" },
                                            ].map((t) => (
                                                <div key={t.key} className="enq-pax-card" style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "10px 12px", textAlign: "center" }}>
                                                    <p className="enq-pax-label" style={{ fontSize: "13px", fontWeight: 600, color: t.color, marginBottom: "8px" }}>
                                                        {t.icon} {t.label} {t.sub && <span className="enq-pax-sub" style={{ color: "#94a3b8", fontWeight: 400, fontSize: "10px" }}>{t.sub}</span>}
                                                    </p>
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                                                        <button type="button" onClick={() => changeCount(t.key, -1)} className="enq-pax-btn" style={{ width: "28px", height: "28px", borderRadius: "6px", background: t.bg, border: "none", color: t.color, fontSize: "18px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                                                        <span className="enq-pax-count" style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", minWidth: "20px", textAlign: "center" }}>{counts[t.key]}</span>
                                                        <button type="button" onClick={() => changeCount(t.key, 1)} className="enq-pax-btn" style={{ width: "28px", height: "28px", borderRadius: "6px", background: t.bg, border: "none", color: t.color, fontSize: "18px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="enq-total-card" style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
                                                <p className="enq-total-label" style={{ fontSize: "14px", fontWeight: 600, color: "#2563eb", marginBottom: "4px" }}>👥 Total Travellers</p>
                                                <p className="enq-total-count" style={{ fontSize: "28px", fontWeight: 700, color: "#2563eb", margin: 0 }}>{counts.a + counts.c + counts.i}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 4 - Additional Info */}
                                    <div>
                                        <div className="enq-sec-head" style={sectionHeadStyle}>
                                            <div className="enq-sec-icon" style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#ffedd5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>💬</div>
                                            <span style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Additional Info</span>
                                        </div>
                                        <div className="enq-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                                            <div>
                                                <label className="enq-field-label" style={labelStyle}>Special Requests / Remarks</label>
                                                <textarea className="enq-textarea" name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows={3} placeholder="e.g. honeymoon couple, vegetarian meals, wheelchair access..."
                                                    style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px", fontSize: "14px", color: "#0f172a", outline: "none", resize: "none", boxSizing: "border-box", background: "#fff" }} />
                                            </div>
                                            <div>
                                                <label className="enq-field-label" style={labelStyle}>How did you hear about us?</label>
                                                <div style={{ position: "relative" }}>
                                                    <span className="enq-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", zIndex: 1 }}>📣</span>
                                                    <select className="enq-select enq-input" name="source" value={formData.source} onChange={handleChange} style={{ ...fieldStyle, appearance: "none" }}>
                                                        <option value="">Select Source</option>
                                                        <option>Regular</option>
                                                        <option>Google</option><option>Facebook</option><option>Instagram</option>
                                                        <option>YouTube</option><option>Friends & Family</option>
                                                        <option>Whatsapp/Referral</option><option>Others</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Submit */}
                                <div className="enq-submit-wrap" style={{ padding: "0 36px 24px" }}>
                                    <button type="submit" disabled={enquiryLoading} className="enq-submit-btn"
                                        style={{ width: "100%", padding: "14px", background: enquiryLoading ? "#93c5fd" : "#0572efff", color: "#fff", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: 700, cursor: enquiryLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", letterSpacing: "0.3px" }}>
                                        {enquiryLoading
                                            ? <><div style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> Submitting...</>
                                            : <>✈️ Submit Enquiry</>}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Enquirypage;
