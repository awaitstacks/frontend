
// import { useContext, useState } from "react";
// import { TourAppContext } from "../context/TourAppContext";
// import { assets } from "../assets/assets.js";

// const Enquirypage = ({ onClose }) => {
//     const { createEnquiry, enquiryLoading } = useContext(TourAppContext);
//     const [submitted, setSubmitted] = useState(false);
//     const [counts, setCounts] = useState({ a: 1, c: 0, i: 0 });
//     const [formData, setFormData] = useState({
//         fullName: "", mobileNumber: "", email: "", city: "",
//         destination: "", tourType: "", preferredTravelDate: "",
//         numberOfDays: "", numberOfNights: "", specialRequests: "", source: "",
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => {
//             const updated = { ...prev, [name]: value };
//             if (name === "numberOfDays") {
//                 const days = Number(value);
//                 updated.numberOfNights = days > 0 ? String(days - 1) : "";
//             }
//             return updated;
//         });
//     };

//     const changeCount = (key, delta) => {
//         setCounts((prev) => {
//             const updated = { ...prev, [key]: Math.max(0, prev[key] + delta) };
//             if (key === "a" && updated[key] < 1) updated[key] = 1;
//             return updated;
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const result = await createEnquiry({
//             ...formData,
//             adults: counts.a, children: counts.c, infants: counts.i,
//             numberOfDays: Number(formData.numberOfDays),
//             numberOfNights: Number(formData.numberOfNights),
//         });
//         if (result.success) {
//             setSubmitted(true);
//             setTimeout(() => {
//                 setSubmitted(false);
//                 setFormData({ fullName: "", mobileNumber: "", email: "", city: "", destination: "", tourType: "", preferredTravelDate: "", numberOfDays: "", numberOfNights: "", specialRequests: "", source: "" });
//                 setCounts({ a: 1, c: 0, i: 0 });
//                 if (onClose) onClose();
//             }, 5000);
//         }
//     };

//     const fieldStyle = { width: "100%", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px 12px 12px 36px", fontSize: "14px", color: "#0f172a", outline: "none", boxSizing: "border-box", background: "#fff", height: "45px" };
//     const labelStyle = { fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" };
//     const sectionHeadStyle = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", paddingBottom: "10px", borderBottom: "2px solid #f1f5f9" };

//     return (
//         <>
//             <style>{`
//                 @keyframes spin { to { transform: rotate(360deg); } }

//                 .enq-overlay {
//                     position: fixed; inset: 0;
//                     background-color: rgba(0,0,0,0.65);
//                     z-index: 9999;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     padding: 20px;
//                     overflow-y: auto;
//                 }

//                 .enq-modal {
//                     background: #fff;
//                     border-radius: 20px;
//                     overflow: hidden;
//                     width: 100%;
//                     max-width: 900px;
//                     box-shadow: 0 30px 80px rgba(0,0,0,0.35);
//                     display: flex;
//                     flex-direction: column;
//                     max-height: calc(100vh - 40px);
//                 }

//                 .enq-scroll-body {
//                     overflow-y: auto;
//                     flex: 1;
//                     -webkit-overflow-scrolling: touch;
//                 }

//                 /* Desktop & Tab — 2 col (2 rows) */
//                 @media (min-width: 768px) {
//                     .enq-grid-4 {
//                         grid-template-columns: repeat(2, 1fr) !important;
//                     }
//                     .enq-grid-pax {
//                         grid-template-columns: repeat(2, 1fr) !important;
//                     }
//                 }

//                 /* Mobile — single column */
//                 @media (max-width: 767px) {
//                     .enq-overlay { padding: 16px; }
//                     .enq-modal { border-radius: 16px; max-height: calc(100vh - 32px); }
//     .enq-header { 
//         padding: 12px 44px 12px 16px !important; 
//         min-height: 70px !important; 
//     }
//     .enq-header h2 { font-size: 16px !important; }
//     .enq-header p { font-size: 11px !important; margin-top: 4px !important; }
//     .enq-header img { width: 24px !important; height: 24px !important; }
//     .enq-header .enq-close-btn { 
//         top: 10px !important; right: 10px !important;
//         width: 28px !important; height: 28px !important; 
//     }
//                     .enq-form-body { padding: 14px 16px !important; gap: 14px !important; }
//                     .enq-submit-wrap { padding: 0 16px 24px !important; }

//                     /* Single column for all grids on mobile */
//                     .enq-grid-4 { grid-template-columns: 1fr !important; gap: 12px !important; }
//                     .enq-grid-pax { grid-template-columns: 1fr !important; gap: 12px !important; }
//                     .enq-grid-2 { grid-template-columns: 1fr !important; gap: 12px !important; }

//                     .enq-sec-head { margin-bottom: 10px !important; padding-bottom: 8px !important; }
//                     .enq-sec-head span { font-size: 15px !important; }
//                     .enq-sec-head .enq-sec-icon { width: 26px !important; height: 26px !important; font-size: 13px !important; }
//                     .enq-field-label { font-size: 13px !important; margin-bottom: 5px !important; }

//                         /* Tour Details rows — single column on mobile */
//     .enq-tour-row1 { grid-template-columns: 1fr !important; }
//     .enq-tour-row2 { grid-template-columns: 1fr !important; }


//                     /* Bigger inputs on mobile */
//                     .enq-input { font-size: 14px !important; padding: 14px 12px 14px 36px !important; height: 45px !important; }
//                     .enq-select { font-size: 14px !important; padding: 14px 12px 14px 36px !important; height: 45px !important; }
//                     .enq-icon { font-size: 14px !important; left: 10px !important; }

//                     .enq-pax-card { padding: 14px !important; }
//                     .enq-pax-label { font-size: 13px !important; margin-bottom: 10px !important; }
//                     .enq-pax-sub { font-size: 10px !important; }
//                     .enq-pax-btn { width: 34px !important; height: 34px !important; font-size: 20px !important; }
//                     .enq-pax-count { font-size: 18px !important; }
//                     .enq-total-card { padding: 14px !important; }
//                     .enq-total-label { font-size: 13px !important; }
//                     .enq-total-count { font-size: 28px !important; }
//                     .enq-textarea { font-size: 14px !important; padding: 12px !important; }
//                     .enq-submit-btn { font-size: 15px !important; padding: 14px !important; }
//                     .enq-success { padding: 40px 20px !important; }
//                     .enq-success h3 { font-size: 18px !important; }
//                     .enq-success p { font-size: 13px !important; }
//                 }
//             `}</style>

//             <div className="enq-overlay" onClick={(ev) => { if (ev.target === ev.currentTarget) onClose?.(); }}>
//                 <div className="enq-modal">

//                     {/* Header — fixed top */}
//                     <div className="enq-header" style={{
//                         position: "relative",
//                         minHeight: "80px",        // ← was 100px
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         padding: "16px 48px 16px 24px",  // ← right padding for close button space
//                         overflow: "hidden",
//                         background: "linear-gradient(135deg, #1a3c5e 0%, #1a3c5e 50%, #1d6a4a 100%)",
//                         flexShrink: 0
//                     }}>
//                         <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(65, 169, 89, 0.92) 40%, rgba(239, 40, 9, 0.85) 100%)" }} />
//                         <button onClick={onClose} className="enq-close-btn" style={{ position: "absolute", top: "14px", right: "14px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", fontSize: "16px", fontWeight: "bold", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
//                         <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: 700, position: "relative", zIndex: 2, margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
//                             <img src={assets.mapImg} alt="map" style={{ width: "38px", height: "38px", objectFit: "contain", mixBlendMode: "multiply" }} />
//                             ENQUIRE NOW
//                         </h2>
//                         <p style={{ color: "#bfdbfe", fontSize: "13px", marginTop: "5px", position: "relative", zIndex: 2 }}>
//                             📍 Fill in the details below and our team will get back to you soon!
//                         </p>
//                     </div>

//                     {/* Scrollable body */}
//                     <div className="enq-scroll-body">
//                         {submitted ? (
//                             <div className="enq-success" style={{ textAlign: "center", padding: "60px 32px" }}>
//                                 <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
//                                     <svg style={{ width: "36px", height: "36px" }} fill="none" stroke="#16a34a" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
//                                     </svg>
//                                 </div>
//                                 <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>Enquiry Submitted Successfully!</h3>
//                                 <p style={{ fontSize: "14px", color: "#64748b", maxWidth: "340px", margin: "0 auto 20px", lineHeight: 1.7 }}>
//                                     Our travel expert will contact you within <strong>24 hours</strong> with a personalised itinerary.
//                                 </p>
//                                 <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "10px 18px", fontSize: "13px", color: "#166534" }}>
//                                     📱 We'll reach you on your mobile number
//                                 </div>
//                             </div>
//                         ) : (
//                             <form onSubmit={handleSubmit}>
//                                 <div className="enq-form-body" style={{ padding: "18px 32px", display: "flex", flexDirection: "column", gap: "16px" }}>

//                                     {/* Section 1 - Personal Details */}
//                                     <div>
//                                         <div className="enq-sec-head" style={sectionHeadStyle}>
//                                             <div className="enq-sec-icon" style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>👤</div>
//                                             <span style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Personal Details</span>
//                                         </div>
//                                         <div className="enq-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
//                                             {[
//                                                 { label: "Full Name", name: "fullName", icon: "👤", placeholder: "Enter your full name", required: true },
//                                                 { label: "Mobile Number", name: "mobileNumber", icon: "📞", placeholder: "+91 XXXXX XXXXX", required: true },
//                                                 { label: "Email Address", name: "email", icon: "✉️", placeholder: "you@example.com", type: "email", },
//                                                 { label: "City / Location", name: "city", icon: "📍", placeholder: "e.g. Chennai" },
//                                             ].map((f) => (
//                                                 <div key={f.name}>
//                                                     <label className="enq-field-label" style={labelStyle}>{f.label} {f.required && <span style={{ color: "#ef4444" }}>*</span>}</label>
//                                                     <div style={{ position: "relative" }}>
//                                                         <span className="enq-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px" }}>{f.icon}</span>
//                                                         <input className="enq-input" name={f.name} value={formData[f.name]} onChange={handleChange} required={f.required} type={f.type || "text"} placeholder={f.placeholder} style={fieldStyle} />
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* Section 2 - Tour Details */}
//                                     <div>
//                                         <div className="enq-sec-head" style={sectionHeadStyle}>
//                                             <div className="enq-sec-icon" style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>🗺️</div>
//                                             <span style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Tour Details</span>
//                                         </div>
//                                         {/* Row 1: Destination + Tour Type */}
//                                         <div className="enq-tour-row1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
//                                             <div>
//                                                 <label className="enq-field-label" style={labelStyle}>Destination <span style={{ color: "#ef4444" }}>*</span></label>
//                                                 <div style={{ position: "relative" }}>
//                                                     <span className="enq-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px" }}>🌍</span>
//                                                     <input className="enq-input" name="destination" value={formData.destination}
//                                                         onChange={(e) => {
//                                                             const val = e.target.value;
//                                                             setFormData((prev) => ({ ...prev, destination: val.charAt(0).toUpperCase() + val.slice(1) }));
//                                                         }}
//                                                         required placeholder="e.g. Manali, Bali" style={fieldStyle} />
//                                                 </div>
//                                             </div>
//                                             <div>
//                                                 <label className="enq-field-label" style={labelStyle}>Tour Type <span style={{ color: "#ef4444" }}>*</span></label>
//                                                 <div style={{ position: "relative" }}>
//                                                     <span className="enq-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", zIndex: 1 }}>🏷️</span>
//                                                     <select className="enq-select enq-input" name="tourType" value={formData.tourType} onChange={handleChange} required style={{ ...fieldStyle, appearance: "none" }}>
//                                                         <option value="">Select tour type</option>
//                                                         <option>Group tour(fixed departure)</option>
//                                                         <option>Customized/Private tour</option>
//                                                         <option>Friends</option><option>Family</option>
//                                                         <option>Corporate/Team Outing</option>
//                                                         <option>Honeymoon</option>
//                                                         <option>pilgrimage tour</option>
//                                                         <option>Others</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         {/* Row 2: Travel Date + Days + Nights */}
//                                         <div className="enq-tour-row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
//                                             <div>
//                                                 <label className="enq-field-label" style={labelStyle}>Preferred Travel Date </label>
//                                                 <div style={{ position: "relative" }}>
//                                                     <span className="enq-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px" }}>📅</span>
//                                                     <input
//                                                         className="enq-input"
//                                                         name="preferredTravelDate"
//                                                         value={formData.preferredTravelDate}
//                                                         onChange={handleChange}
//                                                         type="date"
//                                                         min={new Date().toISOString().split("T")[0]}
//                                                         style={fieldStyle}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div>
//                                                 <label className="enq-field-label" style={labelStyle}>No. of Days </label>
//                                                 <div style={{ position: "relative" }}>
//                                                     <span className="enq-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px" }}>🌤️</span>
//                                                     <input className="enq-input" name="numberOfDays" value={formData.numberOfDays} onChange={handleChange} min="1" placeholder="5" style={fieldStyle} />
//                                                 </div>
//                                             </div>
//                                             <div>
//                                                 <label className="enq-field-label" style={labelStyle}>No. of Nights</label>
//                                                 <div style={{ position: "relative" }}>
//                                                     <span className="enq-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px" }}>🌙</span>
//                                                     <input className="enq-input" name="numberOfNights" value={formData.numberOfNights} onChange={handleChange} min="0" placeholder="4" style={fieldStyle} />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Section 3 - Travellers */}
//                                     <div>
//                                         <div className="enq-sec-head" style={sectionHeadStyle}>
//                                             <div className="enq-sec-icon" style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>👥</div>
//                                             <span style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Travellers</span>
//                                         </div>
//                                         <div className="enq-grid-pax" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
//                                             {[
//                                                 { key: "a", label: "Adults", icon: "👤", color: "#2563eb", bg: "#dbeafe" },
//                                                 { key: "c", label: "Children", sub: "(6–10 years)", icon: "👦", color: "#059669", bg: "#d1fae5" },
//                                                 { key: "i", label: "Infants", sub: "(0–5 years)", icon: "👶", color: "#d97706", bg: "#fef3c7" },
//                                             ].map((t) => (
//                                                 <div key={t.key} className="enq-pax-card" style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "10px 12px", textAlign: "center" }}>
//                                                     <p className="enq-pax-label" style={{ fontSize: "13px", fontWeight: 600, color: t.color, marginBottom: "8px" }}>
//                                                         {t.icon} {t.label} {t.sub && <span className="enq-pax-sub" style={{ color: "#94a3b8", fontWeight: 400, fontSize: "10px" }}>{t.sub}</span>}
//                                                     </p>
//                                                     <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
//                                                         <button type="button" onClick={() => changeCount(t.key, -1)} className="enq-pax-btn" style={{ width: "28px", height: "28px", borderRadius: "6px", background: t.bg, border: "none", color: t.color, fontSize: "18px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
//                                                         <span className="enq-pax-count" style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", minWidth: "20px", textAlign: "center" }}>{counts[t.key]}</span>
//                                                         <button type="button" onClick={() => changeCount(t.key, 1)} className="enq-pax-btn" style={{ width: "28px", height: "28px", borderRadius: "6px", background: t.bg, border: "none", color: t.color, fontSize: "18px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                             <div className="enq-total-card" style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
//                                                 <p className="enq-total-label" style={{ fontSize: "14px", fontWeight: 600, color: "#2563eb", marginBottom: "4px" }}>👥 Total Travellers</p>
//                                                 <p className="enq-total-count" style={{ fontSize: "28px", fontWeight: 700, color: "#2563eb", margin: 0 }}>{counts.a + counts.c + counts.i}</p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Section 4 - Additional Info */}
//                                     <div>
//                                         <div className="enq-sec-head" style={sectionHeadStyle}>
//                                             <div className="enq-sec-icon" style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#ffedd5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>💬</div>
//                                             <span style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Additional Info</span>
//                                         </div>
//                                         <div className="enq-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
//                                             <div>
//                                                 <label className="enq-field-label" style={labelStyle}>Special Requests / Remarks</label>
//                                                 <textarea className="enq-textarea" name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows={3} placeholder="e.g. honeymoon couple, vegetarian meals, wheelchair access..."
//                                                     style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px", fontSize: "14px", color: "#0f172a", outline: "none", resize: "none", boxSizing: "border-box", background: "#fff" }} />
//                                             </div>
//                                             <div>
//                                                 <label className="enq-field-label" style={labelStyle}>How did you hear about us?</label>
//                                                 <div style={{ position: "relative" }}>
//                                                     <span className="enq-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", zIndex: 1 }}>📣</span>
//                                                     <select className="enq-select enq-input" name="source" value={formData.source} onChange={handleChange} style={{ ...fieldStyle, appearance: "none" }}>
//                                                         <option value="">Select Source</option>
//                                                         <option>Regular</option>
//                                                         <option>Google</option><option>Facebook</option><option>Instagram</option>
//                                                         <option>YouTube</option><option>Friends & Family</option>
//                                                         <option>Whatsapp/Referral</option><option>Others</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>

//                                 {/* Submit */}
//                                 <div className="enq-submit-wrap" style={{ padding: "0 36px 24px" }}>
//                                     <button type="submit" disabled={enquiryLoading} className="enq-submit-btn"
//                                         style={{ width: "100%", padding: "14px", background: enquiryLoading ? "#93c5fd" : "#0572efff", color: "#fff", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: 700, cursor: enquiryLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", letterSpacing: "0.3px" }}>
//                                         {enquiryLoading
//                                             ? <><div style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> Submitting...</>
//                                             : <>✈️ Submit Enquiry</>}
//                                     </button>
//                                 </div>
//                             </form>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Enquirypage;


import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TourAppContext } from "../context/TourAppContext";
import { assets } from "../assets/assets.js";

const EMPTY_FORM = {
    fullName: "", mobileNumber: "", email: "", city: "",
    destination: "", tourType: "", preferredTravelDate: "",
    numberOfDays: "", numberOfNights: "", specialRequests: "", source: "",
};

const TOUR_TYPES = [
    "Group tour(fixed departure)",
    "Customized/Private tour",
    "Friends",
    "Family",
    "Corporate/Team Outing",
    "Honeymoon",
    "pilgrimage tour",
    "Others",
];

const SOURCES = [
    "Regular", "Google", "Facebook", "Instagram", "YouTube",
    "Friends & Family", "Whatsapp/Referral", "Others",
];

const PAX = [
    { key: "a", label: "Adults", icon: "👤", color: "#2563eb", bg: "#dbeafe" },
    { key: "c", label: "Children", sub: "(6–10 years)", icon: "👦", color: "#059669", bg: "#d1fae5" },
    { key: "i", label: "Infants", sub: "(0–5 years)", icon: "👶", color: "#d97706", bg: "#fef3c7" },
];

const Enquirypage = ({ onClose }) => {
    const { createEnquiry, enquiryLoading } = useContext(TourAppContext);
    const [submitted, setSubmitted] = useState(false);
    const [counts, setCounts] = useState({ a: 1, c: 0, i: 0 });
    const [formData, setFormData] = useState(EMPTY_FORM);

    // Lock the page behind the modal so it doesn't scroll / shift on phones.
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    // Esc closes the modal on desktop.
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose?.();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updated = { ...prev, [name]: value };
            if (name === "numberOfDays") {
                const days = Number(value);
                updated.numberOfNights = days > 0 ? String(days - 1) : "";
            }
            if (name === "destination") {
                updated.destination = value.charAt(0).toUpperCase() + value.slice(1);
            }
            return updated;
        });
    };

    const changeCount = (key, delta) => {
        setCounts((prev) => {
            const updated = { ...prev, [key]: Math.max(0, prev[key] + delta) };
            if (key === "a" && updated.a < 1) updated.a = 1;
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await createEnquiry({
            ...formData,
            adults: counts.a,
            children: counts.c,
            infants: counts.i,
            numberOfDays: Number(formData.numberOfDays),
            numberOfNights: Number(formData.numberOfNights),
        });
        if (result.success) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData(EMPTY_FORM);
                setCounts({ a: 1, c: 0, i: 0 });
                onClose?.();
            }, 5000);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    // Reusable input with a leading emoji icon.
    const IconField = ({ icon, children }) => (
        <div className="enq-field-wrap">
            <span className="enq-icon" aria-hidden="true">{icon}</span>
            {children}
        </div>
    );

    const SectionHead = ({ icon, bg, title }) => (
        <div className="enq-sec-head">
            <div className="enq-sec-icon" style={{ background: bg }}>{icon}</div>
            <span>{title}</span>
        </div>
    );

    return createPortal(
        <>
            <style>{`
                @keyframes enq-spin { to { transform: rotate(360deg); } }

                /* ── Overlay + modal ───────────────────────────────── */
                .enq-overlay {
                    position: fixed;
                    inset: 0;
                    height: 100vh;
                    height: 100dvh;                 /* real visible height on phones */
                    background: rgba(0, 0, 0, 0.65);
                    z-index: 2147483000;            /* above navbar / any fixed header */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    padding: 20px;
                    padding-top: max(20px, env(safe-area-inset-top));
                    padding-bottom: max(20px, env(safe-area-inset-bottom));
                    overflow: hidden;
                }
                .enq-modal {
                    background: #fff;
                    border-radius: 20px;
                    overflow: hidden;
                    width: 100%;
                    max-width: 900px;
                    max-height: 100%;               /* always fits inside the overlay */
                    min-height: 0;
                    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
                    display: flex;
                    flex-direction: column;
                }
                .enq-scroll-body {
                    flex: 1;
                    min-height: 0;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior: contain;
                }

                /* ── Header ────────────────────────────────────────── */
                .enq-header {
                    position: relative;
                    flex-shrink: 0;
                    min-height: 80px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 16px 56px 16px 24px;
                    overflow: hidden;
                    background: linear-gradient(135deg, rgba(65,169,89,0.95) 40%, rgba(239,40,9,0.88) 100%);
                }
                .enq-header h2 {
                    color: #fff; font-size: 24px; font-weight: 700; margin: 0;
                    display: flex; align-items: center; gap: 10px;
                }
                .enq-header h2 img { width: 38px; height: 38px; object-fit: contain; }
                .enq-header p { color: #eaf7ff; font-size: 13px; margin: 5px 0 0; }
                .enq-close-btn {
                    position: absolute; top: 14px; right: 14px;
                    width: 34px; height: 34px; border-radius: 50%;
                    background: rgba(255,255,255,0.25); border: none; color: #fff;
                    font-size: 16px; font-weight: 700; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                }
                .enq-close-btn:hover { background: rgba(255,255,255,0.4); }

                /* ── Form ──────────────────────────────────────────── */
                .enq-form-body { padding: 18px 32px; display: flex; flex-direction: column; gap: 18px; }
                .enq-sec-head {
                    display: flex; align-items: center; gap: 10px;
                    margin-bottom: 14px; padding-bottom: 10px; border-bottom: 2px solid #f1f5f9;
                }
                .enq-sec-head span { font-size: 18px; font-weight: 700; color: #1e293b; }
                .enq-sec-icon {
                    width: 30px; height: 30px; border-radius: 8px; font-size: 15px;
                    display: flex; align-items: center; justify-content: center;
                }
                .enq-label { font-size: 13px; font-weight: 600; color: #374151; display: block; margin-bottom: 6px; }
                .enq-label .req { color: #ef4444; }
                .enq-field-wrap { position: relative; }
                .enq-icon {
                    position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
                    font-size: 14px; z-index: 1; pointer-events: none;
                }
                .enq-input {
                    width: 100%; height: 46px; box-sizing: border-box;
                    border: 1px solid #e2e8f0; border-radius: 8px; background: #fff;
                    padding: 0 12px 0 38px; font-size: 14px; color: #0f172a; outline: none;
                    appearance: none; -webkit-appearance: none;
                }
                .enq-input:focus, .enq-textarea:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
                .enq-textarea {
                    width: 100%; box-sizing: border-box; border: 1px solid #e2e8f0; border-radius: 8px;
                    padding: 12px; font-size: 14px; color: #0f172a; outline: none; resize: none; background: #fff;
                }

                .enq-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
                .enq-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
                .enq-grid-pax { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }

                .enq-pax-card {
                    background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;
                    padding: 10px 12px; text-align: center;
                }
                .enq-pax-label { font-size: 13px; font-weight: 600; margin: 0 0 8px; }
                .enq-pax-sub { color: #94a3b8; font-weight: 400; font-size: 10px; }
                .enq-pax-row { display: flex; align-items: center; justify-content: center; gap: 12px; }
                .enq-pax-btn {
                    width: 32px; height: 32px; border-radius: 8px; border: none;
                    font-size: 18px; font-weight: 700; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                }
                .enq-pax-count { font-size: 17px; font-weight: 700; color: #0f172a; min-width: 22px; }
                .enq-total-card {
                    background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px;
                    padding: 12px; text-align: center;
                }
                .enq-total-card p { margin: 0; color: #2563eb; }
                .enq-total-label { font-size: 14px; font-weight: 600; margin-bottom: 4px !important; }
                .enq-total-count { font-size: 28px; font-weight: 700; }

                .enq-submit-wrap { padding: 0 32px 24px; }
                .enq-submit-btn {
                    width: 100%; padding: 14px; border: none; border-radius: 12px;
                    color: #fff; font-size: 16px; font-weight: 700; letter-spacing: 0.3px;
                    display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer;
                    background: #0572ef;
                }
                .enq-submit-btn:disabled { background: #93c5fd; cursor: not-allowed; }
                .enq-spinner {
                    width: 18px; height: 18px; border-radius: 50%;
                    border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
                    animation: enq-spin 0.7s linear infinite;
                }

                .enq-success { text-align: center; padding: 60px 32px; }
                .enq-success-icon {
                    width: 70px; height: 70px; border-radius: 50%; background: #dcfce7;
                    display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;
                }
                .enq-success h3 { font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 8px; }
                .enq-success p { font-size: 14px; color: #64748b; max-width: 340px; margin: 0 auto 20px; line-height: 1.7; }
                .enq-success-note {
                    display: inline-flex; align-items: center; gap: 8px;
                    background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px;
                    padding: 10px 18px; font-size: 13px; color: #166534;
                }

                /* ── Tablet ────────────────────────────────────────── */
                @media (max-width: 900px) {
                    .enq-grid-pax { grid-template-columns: repeat(2, 1fr); }
                }

                /* ── Mobile ────────────────────────────────────────── */
                @media (max-width: 767px) {
                    .enq-overlay {
                        align-items: flex-start;    /* start from top, never cut above */
                        padding: 10px;
                        padding-top: calc(env(safe-area-inset-top, 0px) + 24px);
                        padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
                    }
                    .enq-modal {
                        border-radius: 16px;
                        max-height: calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - 40px);
                    }

                    .enq-header { min-height: 64px; padding: 12px 52px 12px 16px; }
                    .enq-header h2 { font-size: 17px; gap: 8px; }
                    .enq-header h2 img { width: 26px; height: 26px; }
                    .enq-header p { font-size: 11.5px; margin-top: 4px; }
                    .enq-close-btn { top: 50%; transform: translateY(-50%); right: 12px; width: 32px; height: 32px; }

                    .enq-form-body { padding: 14px 16px; gap: 16px; }
                    .enq-sec-head { margin-bottom: 10px; padding-bottom: 8px; }
                    .enq-sec-head span { font-size: 15px; }
                    .enq-sec-icon { width: 26px; height: 26px; font-size: 13px; }

                    .enq-grid-2, .enq-grid-3, .enq-grid-pax { grid-template-columns: 1fr; gap: 12px; }

                    /* iPhone zooms in when a field is under 16px — keep it 16px */
                    .enq-input, .enq-textarea { font-size: 16px; }

                    /* Travellers — same as before: label on top, − count + below, centered */
                    .enq-pax-card { padding: 14px 12px; }
                    .enq-pax-label { margin-bottom: 10px; }
                    .enq-pax-btn { width: 38px; height: 38px; font-size: 20px; }
                    .enq-total-card { padding: 14px 12px; }
                    .enq-total-count { font-size: 30px; }

                    .enq-submit-wrap { padding: 0 16px 20px; padding-bottom: max(20px, env(safe-area-inset-bottom)); }
                    .enq-submit-btn { font-size: 15px; }
                    .enq-success { padding: 40px 20px; }
                    .enq-success h3 { font-size: 18px; }
                    .enq-success p { font-size: 13px; }
                }
            `}</style>

            <div
                className="enq-overlay"
                onClick={(ev) => {
                    if (ev.target === ev.currentTarget) onClose?.();
                }}
            >
                <div className="enq-modal" role="dialog" aria-modal="true" aria-labelledby="enq-title">
                    {/* Header — stays at the top, never scrolls away */}
                    <div className="enq-header">
                        <button type="button" onClick={onClose} className="enq-close-btn" aria-label="Close">
                            ✕
                        </button>
                        <h2 id="enq-title">
                            <img src={assets.mapImg} alt="" />
                            ENQUIRE NOW
                        </h2>
                        <p>📍 Fill in the details below and our team will get back to you soon!</p>
                    </div>

                    {/* Only this part scrolls */}
                    <div className="enq-scroll-body">
                        {submitted ? (
                            <div className="enq-success">
                                <div className="enq-success-icon">
                                    <svg width="36" height="36" fill="none" stroke="#16a34a" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3>Enquiry Submitted Successfully!</h3>
                                <p>
                                    Our travel expert will contact you within <strong>24 hours</strong> with a personalised itinerary.
                                </p>
                                <div className="enq-success-note">📱 We'll reach you on your mobile number</div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="enq-form-body">
                                    {/* 1 — Personal Details */}
                                    <section>
                                        <SectionHead icon="👤" bg="#dbeafe" title="Personal Details" />
                                        <div className="enq-grid-2">
                                            {[
                                                { label: "Full Name", name: "fullName", icon: "👤", placeholder: "Enter your full name", required: true, autoComplete: "name" },
                                                { label: "Mobile Number", name: "mobileNumber", icon: "📞", placeholder: "+91 XXXXX XXXXX", required: true, type: "tel", autoComplete: "tel" },
                                                { label: "Email Address", name: "email", icon: "✉️", placeholder: "you@example.com", type: "email", autoComplete: "email" },
                                                { label: "City / Location", name: "city", icon: "📍", placeholder: "e.g. Chennai", autoComplete: "address-level2" },
                                            ].map((f) => (
                                                <div key={f.name}>
                                                    <label className="enq-label" htmlFor={`enq-${f.name}`}>
                                                        {f.label} {f.required && <span className="req">*</span>}
                                                    </label>
                                                    {IconField({
                                                        icon: f.icon,
                                                        children: (
                                                            <input
                                                                id={`enq-${f.name}`}
                                                                className="enq-input"
                                                                name={f.name}
                                                                value={formData[f.name]}
                                                                onChange={handleChange}
                                                                required={f.required}
                                                                type={f.type || "text"}
                                                                inputMode={f.type === "tel" ? "tel" : undefined}
                                                                autoComplete={f.autoComplete}
                                                                placeholder={f.placeholder}
                                                            />
                                                        ),
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* 2 — Tour Details */}
                                    <section>
                                        <SectionHead icon="🗺️" bg="#d1fae5" title="Tour Details" />
                                        <div className="enq-grid-2" style={{ marginBottom: 14 }}>
                                            <div>
                                                <label className="enq-label" htmlFor="enq-destination">
                                                    Destination <span className="req">*</span>
                                                </label>
                                                {IconField({
                                                    icon: "🌍",
                                                    children: (
                                                        <input
                                                            id="enq-destination"
                                                            className="enq-input"
                                                            name="destination"
                                                            value={formData.destination}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="e.g. Manali, Bali"
                                                        />
                                                    ),
                                                })}
                                            </div>
                                            <div>
                                                <label className="enq-label" htmlFor="enq-tourType">
                                                    Tour Type <span className="req">*</span>
                                                </label>
                                                {IconField({
                                                    icon: "🏷️",
                                                    children: (
                                                        <select
                                                            id="enq-tourType"
                                                            className="enq-input"
                                                            name="tourType"
                                                            value={formData.tourType}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="">Select tour type</option>
                                                            {TOUR_TYPES.map((t) => (
                                                                <option key={t}>{t}</option>
                                                            ))}
                                                        </select>
                                                    ),
                                                })}
                                            </div>
                                        </div>
                                        <div className="enq-grid-3">
                                            <div>
                                                <label className="enq-label" htmlFor="enq-date">Preferred Travel Date</label>
                                                {IconField({
                                                    icon: "📅",
                                                    children: (
                                                        <input
                                                            id="enq-date"
                                                            className="enq-input"
                                                            name="preferredTravelDate"
                                                            value={formData.preferredTravelDate}
                                                            onChange={handleChange}
                                                            type="date"
                                                            min={today}
                                                        />
                                                    ),
                                                })}
                                            </div>
                                            <div>
                                                <label className="enq-label" htmlFor="enq-days">No. of Days</label>
                                                {IconField({
                                                    icon: "🌤️",
                                                    children: (
                                                        <input
                                                            id="enq-days"
                                                            className="enq-input"
                                                            name="numberOfDays"
                                                            value={formData.numberOfDays}
                                                            onChange={handleChange}
                                                            type="number"
                                                            inputMode="numeric"
                                                            min="1"
                                                            placeholder="5"
                                                        />
                                                    ),
                                                })}
                                            </div>
                                            <div>
                                                <label className="enq-label" htmlFor="enq-nights">No. of Nights</label>
                                                {IconField({
                                                    icon: "🌙",
                                                    children: (
                                                        <input
                                                            id="enq-nights"
                                                            className="enq-input"
                                                            name="numberOfNights"
                                                            value={formData.numberOfNights}
                                                            onChange={handleChange}
                                                            type="number"
                                                            inputMode="numeric"
                                                            min="0"
                                                            placeholder="4"
                                                        />
                                                    ),
                                                })}
                                            </div>
                                        </div>
                                    </section>

                                    {/* 3 — Travellers */}
                                    <section>
                                        <SectionHead icon="👥" bg="#ede9fe" title="Travellers" />
                                        <div className="enq-grid-pax">
                                            {PAX.map((t) => (
                                                <div key={t.key} className="enq-pax-card">
                                                    <p className="enq-pax-label" style={{ color: t.color }}>
                                                        {t.icon} {t.label} {t.sub && <span className="enq-pax-sub">{t.sub}</span>}
                                                    </p>
                                                    <div className="enq-pax-row">
                                                        <button
                                                            type="button"
                                                            className="enq-pax-btn"
                                                            onClick={() => changeCount(t.key, -1)}
                                                            style={{ background: t.bg, color: t.color }}
                                                            aria-label={`Fewer ${t.label}`}
                                                        >
                                                            −
                                                        </button>
                                                        <span className="enq-pax-count">{counts[t.key]}</span>
                                                        <button
                                                            type="button"
                                                            className="enq-pax-btn"
                                                            onClick={() => changeCount(t.key, 1)}
                                                            style={{ background: t.bg, color: t.color }}
                                                            aria-label={`More ${t.label}`}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="enq-total-card">
                                                <p className="enq-total-label">👥 Total Travellers</p>
                                                <p className="enq-total-count">{counts.a + counts.c + counts.i}</p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* 4 — Additional Info */}
                                    <section>
                                        <SectionHead icon="💬" bg="#ffedd5" title="Additional Info" />
                                        <div className="enq-grid-2">
                                            <div>
                                                <label className="enq-label" htmlFor="enq-requests">Special Requests / Remarks</label>
                                                <textarea
                                                    id="enq-requests"
                                                    className="enq-textarea"
                                                    name="specialRequests"
                                                    value={formData.specialRequests}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    placeholder="e.g. honeymoon couple, vegetarian meals, wheelchair access..."
                                                />
                                            </div>
                                            <div>
                                                <label className="enq-label" htmlFor="enq-source">How did you hear about us?</label>
                                                {IconField({
                                                    icon: "📣",
                                                    children: (
                                                        <select
                                                            id="enq-source"
                                                            className="enq-input"
                                                            name="source"
                                                            value={formData.source}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select Source</option>
                                                            {SOURCES.map((s) => (
                                                                <option key={s}>{s}</option>
                                                            ))}
                                                        </select>
                                                    ),
                                                })}
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <div className="enq-submit-wrap">
                                    <button type="submit" disabled={enquiryLoading} className="enq-submit-btn">
                                        {enquiryLoading ? (
                                            <>
                                                <span className="enq-spinner" /> Submitting...
                                            </>
                                        ) : (
                                            <>✈️ Submit Enquiry</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

export default Enquirypage;
