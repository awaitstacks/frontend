/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext";
import { toast } from "react-toastify";
import {
  Loader2,
  ArrowLeftCircle,
  UserCheck,
  CheckCircle2,
  Lock,
  RotateCcw,
  AlertCircle,
  Bus,
} from "lucide-react";

// ─── Seat Component ─────────────────────────────────────────────────────────
const Seat = ({
  label,
  isBooked,
  isLeader,
  isSelected,
  onSelect,
  positionInfo,
  occupantInitials,
  isDisabled,
}) => {
  const getStyles = () => {
    if (isLeader)
      return "bg-[#A32E25] text-white border-[#80241D] cursor-not-allowed shadow-inner opacity-90";
    if (isBooked)
      return "bg-red-100 text-red-700 border-red-200 cursor-not-allowed";
    if (isSelected)
      return "bg-indigo-600 text-white border-indigo-800 ring-4 ring-indigo-100 z-10 scale-105";
    if (isDisabled)
      return "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed";
    return "bg-green-50 border-green-200 text-green-800 hover:border-green-400 hover:bg-green-100 cursor-pointer shadow-sm";
  };

  return (
    <div
      onClick={!isBooked && !isLeader && !isDisabled ? onSelect : null}
      className={`relative flex flex-col items-center justify-center transition-all duration-200 
        w-full aspect-square max-w-[48px] sm:max-w-[60px] rounded-lg border-[1.5px] sm:border-2 font-bold
        ${getStyles()}`}
    >
      <span className="text-[9px] sm:text-xs lg:text-sm tracking-tight uppercase leading-none">
        {isSelected ? occupantInitials : label}
      </span>
      {!isSelected && (
        <span
          className={`text-[6px] sm:text-[8px] font-black mt-0.5 
          ${isLeader ? "text-red-200" : isBooked ? "text-red-500" : "text-green-600"}`}
        >
          {positionInfo}
        </span>
      )}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const SeatAllocation = () => {
  const { tnr } = useParams();
  const {
    getSeatAllocationByTNR,
    getBookingDetailsByTNR,
    confirmSeatSelection,
  } = useContext(TourAppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [seatData, setSeatData] = useState(null);
  const [booking, setBooking] = useState(null);
  const [activePassengerIdx, setActivePassengerIdx] = useState(0);
  const [selections, setSelections] = useState({});

  useEffect(() => {
    const initPage = async () => {
      setLoading(true);
      try {
        const [seatRes, bookingRes] = await Promise.all([
          getSeatAllocationByTNR(tnr),
          getBookingDetailsByTNR(tnr),
        ]);

        if (seatRes.success && bookingRes.success) {
          setSeatData(seatRes.data);
          setBooking(bookingRes.booking);

          const firstSelectable = bookingRes.booking.travellers.findIndex(
            (t) =>
              !t.cancelled?.byAdmin &&
              !t.cancelled?.byTraveller &&
              !t.seatLocked,
          );

          if (firstSelectable !== -1) {
            setActivePassengerIdx(firstSelectable);
          } else {
            const firstNonCancelled = bookingRes.booking.travellers.findIndex(
              (t) => !t.cancelled?.byAdmin && !t.cancelled?.byTraveller,
            );
            if (firstNonCancelled !== -1) {
              setActivePassengerIdx(firstNonCancelled);
            }
          }
        }
      } catch (err) {
        toast.error("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };
    initPage();
  }, [tnr]);

  // ─── Helpers ─────────────────────────────────────────────────────────────
  const hasLockedSeat = (traveller) => {
    return traveller?.seatLocked === true && traveller?.seatNumber;
  };

  // Only used for already locked seats (pre-selected before this page)
  const getVehicleNameForSeat = (seatLabel) => {
    if (!seatData?.vehicles || !seatLabel) return "Unknown Vehicle";
    for (const vehicle of seatData.vehicles) {
      if (
        vehicle.leaderRow?.includes(seatLabel) ||
        vehicle.passengerRows?.some((row) => row?.includes(seatLabel))
      ) {
        return vehicle.vehicleName || "Vehicle";
      }
    }
    return "Unknown Vehicle";
  };

  const getLockedSeatDisplay = (traveller) => {
    const seat = traveller?.seatNumber || "—";
    // For locked seats → prefer stored vehicleName if exists (future-proof)
    const vehicleName = traveller?.vehicleName || getVehicleNameForSeat(seat);
    return vehicleName ? `${seat} - ${vehicleName}` : seat;
  };

  const isTravellerSelectable = (traveller) => {
    return (
      traveller &&
      !traveller.cancelled?.byAdmin &&
      !traveller.cancelled?.byTraveller &&
      !hasLockedSeat(traveller)
    );
  };

  const getPositionLabel = (index, arrLen, side) => {
    if (
      typeof index !== "number" ||
      index < 0 ||
      typeof arrLen !== "number" ||
      arrLen <= 0
    ) {
      return "";
    }
    if (side === "left") return index === 0 ? "W" : "A";
    return index === arrLen - 1 ? "W" : index === 0 ? "A" : "M";
  };

  const handleSeatClick = (vehicleId, vehicleName, seatLabel) => {
    const activeTraveller = booking?.travellers?.[activePassengerIdx];
    if (!activeTraveller || hasLockedSeat(activeTraveller)) return;

    const existingEntry = Object.entries(selections).find(
      ([idx, sel]) =>
        sel.vehicleId === vehicleId && sel.seatLabel === seatLabel,
    );

    if (existingEntry && parseInt(existingEntry[0]) === activePassengerIdx) {
      const newSels = { ...selections };
      delete newSels[activePassengerIdx];
      setSelections(newSels);
      return;
    }

    if (existingEntry) {
      toast.warning("This seat is already assigned to another traveler.");
      return;
    }

    setSelections({
      ...selections,
      [activePassengerIdx]: { vehicleId, vehicleName, seatLabel },
    });
  };

  const resetAllSelections = () => {
    if (Object.keys(selections).length === 0) return;
    if (window.confirm("Clear all current selections?")) {
      setSelections({});
    }
  };

  const getOccupantInitials = (vehicleId, seatLabel) => {
    const travelerIdx = Object.keys(selections).find(
      (k) =>
        selections[k].vehicleId === vehicleId &&
        selections[k].seatLabel === seatLabel,
    );
    if (!travelerIdx || !booking?.travellers?.[travelerIdx]) return "";
    const t = booking.travellers[travelerIdx];
    return `${t.firstName?.[0] || ""}${t.lastName?.[0] || ""}`.toUpperCase();
  };

  const handleReserve = async () => {
    if (Object.keys(selections).length === 0) {
      return toast.error("Please select at least one seat.");
    }

    const confirmMessage =
      "Once seats are confirmed and locked, they cannot be changed or edited later.\n\nAre you sure you want to proceed?";

    if (!window.confirm(confirmMessage)) return;

    try {
      const result = await confirmSeatSelection(tnr, selections);

      if (result.success) {
        toast.success("Seats confirmed and locked successfully!");

        const [newSeatRes, newBookingRes] = await Promise.all([
          getSeatAllocationByTNR(tnr),
          getBookingDetailsByTNR(tnr),
        ]);

        if (newSeatRes.success) setSeatData(newSeatRes.data);
        if (newBookingRes.success) setBooking(newBookingRes.booking);

        setTimeout(() => {
          navigate("/seat-thank-you");
          window.scrollTo(0, 0);
        }, 1400);
      }
    } catch (err) {
      toast.error("Failed to confirm seats. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-48 lg:pt-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* LEFT COLUMN - Travelers */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                navigate("/tnr");
                window.scrollTo(0, 0);
              }}
              className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm"
            >
              <ArrowLeftCircle size={20} /> Back
            </button>
            <button
              onClick={resetAllSelections}
              disabled={Object.keys(selections).length === 0}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 font-bold text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-200 lg:sticky lg:top-6">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <UserCheck size={24} className="text-indigo-600" /> Travellers
            </h2>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {booking?.travellers?.map?.((t, idx) => {
                const isCancelled =
                  t.cancelled?.byAdmin || t.cancelled?.byTraveller;
                const isLocked = hasLockedSeat(t);
                const selectable = isTravellerSelectable(t);
                const isActive = activePassengerIdx === idx;
                const sel = selections[idx];

                let seatDisplay = "Select seat";

                if (isCancelled) {
                  seatDisplay = "CANCELLED";
                } else if (isLocked) {
                  seatDisplay = `Locked: ${getLockedSeatDisplay(t)}`;
                } else if (sel) {
                  // Use stored vehicleName from selection (this fixes the issue)
                  seatDisplay = `Selected: ${sel.seatLabel}${
                    sel.vehicleName ? ` - ${sel.vehicleName}` : ""
                  }`;
                }

                return (
                  <button
                    key={idx}
                    disabled={!selectable}
                    onClick={() => selectable && setActivePassengerIdx(idx)}
                    className={`w-full p-4 text-left rounded-2xl border-2 transition-all
                      ${
                        isCancelled
                          ? "opacity-70 cursor-not-allowed bg-red-50 border-red-200"
                          : isLocked
                            ? "bg-green-50 border-green-200 cursor-default"
                            : isActive
                              ? "bg-indigo-600 text-white shadow-lg border-indigo-700"
                              : "bg-white border-slate-200 hover:border-indigo-300"
                      }`}
                  >
                    <div className="flex justify-between items-center gap-3">
                      <div className="flex-1 truncate">
                        <p
                          className={`font-bold text-sm ${
                            isActive && !isLocked && !isCancelled
                              ? "text-white"
                              : isCancelled
                                ? "text-red-800"
                                : "text-slate-800"
                          }`}
                        >
                          {t.firstName} {t.lastName}
                        </p>
                        <p
                          className={`text-[10px] font-black mt-1 uppercase tracking-wide
                            ${
                              isCancelled
                                ? "text-red-700"
                                : isLocked
                                  ? "text-green-700"
                                  : sel
                                    ? "text-green-600"
                                    : "text-slate-500"
                            }`}
                        >
                          {seatDisplay}
                        </p>
                      </div>

                      <div className="flex-shrink-0">
                        {isCancelled && (
                          <AlertCircle size={18} className="text-red-600" />
                        )}
                        {isLocked && (
                          <Lock size={18} className="text-green-600" />
                        )}
                        {!isLocked && sel && (
                          <CheckCircle2
                            size={18}
                            className={
                              isActive ? "text-white" : "text-green-600"
                            }
                          />
                        )}
                      </div>
                    </div>
                  </button>
                );
              }) || (
                <p className="text-center text-slate-500 py-4">
                  No travellers found
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Seat Map */}
        <div className="lg:col-span-8 space-y-16 pb-20">
          {seatData?.vehicles?.length > 0 ? (
            seatData.vehicles.map((vehicle) => {
              const isReleased = vehicle.allowSeatSelection === true;

              if (!vehicle || !vehicle._id) return null;

              const passengerRows = Array.isArray(vehicle.passengerRows)
                ? vehicle.passengerRows
                : [];
              const leaderRow = Array.isArray(vehicle.leaderRow)
                ? vehicle.leaderRow
                : [];

              const allRows = [leaderRow, ...passengerRows].filter(
                (row) => Array.isArray(row) && row.length > 0,
              );

              if (allRows.length === 0) {
                return (
                  <div
                    key={vehicle._id}
                    className="text-center py-10 text-slate-500"
                  >
                    No seating layout available for {vehicle.vehicleName}
                  </div>
                );
              }

              const activeTraveller = booking?.travellers?.[activePassengerIdx];
              const travellerIsLocked = hasLockedSeat(activeTraveller);

              return (
                <div
                  key={vehicle._id}
                  className="relative w-full flex flex-col items-center"
                >
                  <div className="mb-8 flex flex-wrap justify-center gap-3">
                    <span className="bg-slate-800 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
                      {vehicle.vehicleName || "Vehicle"}
                    </span>
                  </div>

                  <div className="relative w-full max-w-[440px]">
                    {/* TYRES */}
                    <div className="absolute -left-3 top-24 w-4 h-12 bg-slate-800 rounded-l-md shadow-md z-0" />
                    <div className="absolute -right-3 top-24 w-4 h-12 bg-slate-800 rounded-r-md shadow-md z-0" />
                    <div className="absolute -left-3 bottom-24 w-4 h-12 bg-slate-800 rounded-l-md shadow-md z-0" />
                    <div className="absolute -right-3 bottom-24 w-4 h-12 bg-slate-800 rounded-r-md shadow-md z-0" />

                    <div
                      className={`relative z-10 bg-white border-2 border-slate-200 rounded-[50px] p-6 sm:p-10 shadow-xl transition-all duration-500 ${
                        !isReleased
                          ? "opacity-30 blur-[3px] pointer-events-none grayscale"
                          : ""
                      }`}
                    >
                      {/* Dashboard */}
                      <div className="flex justify-between items-center mb-10 border-b border-dashed border-slate-200 pb-6 px-4">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr]">
                          Front
                        </span>
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
                            <UserCheck size={20} />
                          </div>
                          <span className="text-[8px] font-black text-amber-800 mt-1.5 uppercase tracking-widest">
                            Driver
                          </span>
                        </div>
                      </div>

                      {/* Seating Grid */}
                      <div className="flex flex-col gap-4 sm:gap-6">
                        {allRows.map((row, rIdx) => {
                          const rowLength = row.length;
                          const leftCount = rowLength <= 3 ? 1 : 2;
                          const rightCount = rowLength - leftCount;

                          return (
                            <div
                              key={`row-${rIdx}`}
                              className="grid items-center gap-2 sm:gap-4"
                              style={{
                                gridTemplateColumns: `repeat(${leftCount}, minmax(0, 1fr)) 20px repeat(${rightCount}, minmax(0, 1fr))`,
                              }}
                            >
                              {/* Left seats */}
                              {row.slice(0, leftCount).map((seat, i) => (
                                <Seat
                                  key={`left-${rIdx}-${i}-${seat || "empty"}`}
                                  label={seat || "?"}
                                  positionInfo={
                                    leftCount > 0
                                      ? getPositionLabel(i, leftCount, "left")
                                      : ""
                                  }
                                  isLeader={rIdx === 0}
                                  isBooked={
                                    seat &&
                                    vehicle.bookedSeats?.some(
                                      (s) => s.seatNumber === seat,
                                    )
                                  }
                                  isSelected={Object.values(selections).some(
                                    (sel) =>
                                      sel.vehicleId === vehicle._id &&
                                      sel.seatLabel === seat,
                                  )}
                                  occupantInitials={getOccupantInitials(
                                    vehicle._id,
                                    seat,
                                  )}
                                  isDisabled={travellerIsLocked || !isReleased}
                                  onSelect={() =>
                                    seat &&
                                    handleSeatClick(
                                      vehicle._id,
                                      vehicle.vehicleName,
                                      seat,
                                    )
                                  }
                                />
                              ))}

                              {/* Aisle */}
                              {leftCount > 0 && rightCount > 0 && (
                                <div className="flex justify-center">
                                  <div className="h-full w-[1px] bg-slate-100" />
                                </div>
                              )}

                              {/* Right seats */}
                              {row.slice(leftCount).map((seat, i) => (
                                <Seat
                                  key={`right-${rIdx}-${i}-${seat || "empty"}`}
                                  label={seat || "?"}
                                  positionInfo={
                                    rightCount > 0
                                      ? getPositionLabel(i, rightCount, "right")
                                      : ""
                                  }
                                  isLeader={rIdx === 0}
                                  isBooked={
                                    seat &&
                                    vehicle.bookedSeats?.some(
                                      (s) => s.seatNumber === seat,
                                    )
                                  }
                                  isSelected={Object.values(selections).some(
                                    (sel) =>
                                      sel.vehicleId === vehicle._id &&
                                      sel.seatLabel === seat,
                                  )}
                                  occupantInitials={getOccupantInitials(
                                    vehicle._id,
                                    seat,
                                  )}
                                  isDisabled={travellerIsLocked || !isReleased}
                                  onSelect={() =>
                                    seat &&
                                    handleSeatClick(
                                      vehicle._id,
                                      vehicle.vehicleName,
                                      seat,
                                    )
                                  }
                                />
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Locked overlay */}
                    {!isReleased && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
                        <div className="bg-white/80 backdrop-blur-md border border-amber-200 p-6 rounded-[30px] shadow-2xl text-center max-w-[280px]">
                          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-600">
                            <Lock size={24} />
                          </div>
                          <h3 className="text-slate-900 font-black uppercase text-xs tracking-widest mb-2">
                            Seating Locked
                          </h3>
                          <p className="text-slate-500 text-[10px] font-bold leading-relaxed">
                            Seat selection for{" "}
                            <span className="text-slate-800">
                              {vehicle.vehicleName || "this vehicle"}
                            </span>{" "}
                            has not been released yet.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 text-slate-500">
              <Bus size={64} className="mx-auto text-slate-300 mb-6" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No vehicle allocation started yet
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                Vehicle assignment for this booking has not been initiated.
                Please wait for admin to allocate buses.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 sm:p-4 z-[100] shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
          <div className="text-center sm:text-left text-xs sm:text-sm w-full sm:w-auto">
            <p className="text-slate-500 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
              Selected
            </p>
            <p className="text-slate-800 font-black">
              {Object.keys(selections).length} /{" "}
              {booking?.travellers?.filter(isTravellerSelectable)?.length || 0}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 sm:p-3 text-xs text-slate-700 w-full sm:w-auto max-w-md">
            <p className="font-semibold mb-1.5 text-center sm:text-left text-[9px] sm:text-xs">
              Colors
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-green-50 border border-green-200 rounded"></div>
                <span className="text-[9px] sm:text-xs">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
                <span className="text-[9px] sm:text-xs">Booked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-indigo-600 rounded"></div>
                <span className="text-[9px] sm:text-xs">Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-[#A32E25] rounded"></div>
                <span className="text-[9px] sm:text-xs">Leader</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-slate-100 border border-slate-200 rounded"></div>
                <span className="text-[9px] sm:text-xs">Locked</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleReserve}
            disabled={Object.keys(selections).length === 0}
            className={`w-full sm:w-auto px-6 sm:px-10 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm transition-all shadow-xl
              ${
                Object.keys(selections).length > 0
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
          >
            {Object.keys(selections).length ===
            booking?.travellers?.filter(isTravellerSelectable)?.length
              ? "Confirm & Lock Seats"
              : `Lock ${Object.keys(selections).length}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatAllocation;
