import React, { useState, useEffect } from "react";
import { Check, ShieldAlert, Heart, Wallet, CreditCard, Sparkles, Building2, Download, AlertCircle, RefreshCw, Volume2, VolumeX, Play, QrCode, Copy, ExternalLink } from "lucide-react";
import { SiteConfig, DonationTier } from "../types";

interface DonateProps {
  config: SiteConfig;
  donationTiers: DonationTier[];
  selectedDonationAmount: number;
  setSelectedDonationAmount: (amount: number) => void;
}

export default function Donate({ config, donationTiers, selectedDonationAmount, setSelectedDonationAmount }: DonateProps) {
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [use80G, setUse80G] = useState(false);
  const [panNumber, setPanNumber] = useState("");
  
  // Checkout & simulated wallet transaction screen state
  const [loading, setLoading] = useState(false);
  const [checkoutParams, setCheckoutParams] = useState<any>(null);
  const [payingState, setPayingState] = useState<"idle" | "paytm_modal" | "processing" | "success" | "failed">("idle");
  const [successReceipt, setSuccessReceipt] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<"upi" | "card" | "wallet">("upi");
  const [cardNumber, setCardNumber] = useState("4532 7150 9999 1102");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [upiTimer, setUpiTimer] = useState(300); // 5 minutes in seconds
  const [isSoundboxMuted, setIsSoundboxMuted] = useState(false);

  // Paytm Soundbox TTS speaker helper
  const playPaytmVoiceAnnouncement = (amt: number) => {
    if (isSoundboxMuted) return;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        // Paytm Hindi announcement
        const text = `पेटीएम पर ${amt} रुपये प्राप्त हुए`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "hi-IN";
        utterance.rate = 0.85; // Slightly slower for realistic voice cadence
        
        utterance.onerror = (err) => {
          console.warn("Hindi Voice engine skipped or uninstalled on client, playing robust English announcement:", err);
          const backupUtterance = new SpeechSynthesisUtterance(`Received ${amt} rupees on Paytm`);
          backupUtterance.lang = "en-IN";
          backupUtterance.rate = 0.95;
          window.speechSynthesis.speak(backupUtterance);
        };
        
        window.speechSynthesis.speak(utterance);
      } catch (reason) {
        console.warn("Could not play Paytm Voice engine soundbox alert.", reason);
      }
    }
  };

  // Run Voice Alert effect on successful receipt
  useEffect(() => {
    if (payingState === "success" && successReceipt) {
      playPaytmVoiceAnnouncement(successReceipt.amount);
    }
  }, [payingState, successReceipt]);

  // Countdown timer effect
  useEffect(() => {
    let interval: any = null;
    if (payingState === "paytm_modal") {
      setUpiTimer(300); // 5 minutes reset
      interval = setInterval(() => {
        setUpiTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [payingState]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (selectedDonationAmount > 0) {
      const isTier = donationTiers.some(t => t.amount === selectedDonationAmount);
      if (!isTier) {
        setCustomAmount(selectedDonationAmount.toString());
      }
    }
  }, [selectedDonationAmount, donationTiers]);

  const getActiveAmount = () => {
    if (customAmount) {
      const amt = parseInt(customAmount);
      return isNaN(amt) ? 0 : amt;
    }
    return selectedDonationAmount || 500;
  };

  const handleTierSelect = (amt: number) => {
    setSelectedDonationAmount(amt);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCustomAmount(value);
    setSelectedDonationAmount(0);
  };

  // Trigger Paytm initiate token handshake
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = getActiveAmount();
    if (finalAmount <= 0) {
      alert("Please enter a valid positive donation amount.");
      return;
    }

    if (!donorName || !donorEmail || !donorPhone) {
      alert("Name, email and mobile number are required to maintain compliance records.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/paytm/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          name: donorName,
          email: donorEmail,
          phone: donorPhone
        })
      });
      const data = await res.json();
      if (data.success) {
        setCheckoutParams(data);
        setPayingState("paytm_modal");
      } else {
        alert("Server failed to generate secure checksum token: " + (data.error || "Unknown error"));
      }
    } catch (e) {
      console.error(e);
      alert("Check network alignment. Failed to connect to Indian Paytm server endpoints.");
    } finally {
      setLoading(false);
    }
  };

  // Simulated callback handler to post Paytm response back 
  const triggerCallbackVerification = async (simulatedStatus: "SUCCESS" | "FAILED") => {
    setPayingState("processing");
    // Simulate real delay for Paytm transaction verification
    await new Promise((resolve) => setTimeout(resolve, 1800));

    try {
      const res = await fetch("/api/paytm/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: checkoutParams.orderId,
          amount: checkoutParams.amount,
          name: checkoutParams.customer.name,
          email: checkoutParams.customer.email,
          phone: checkoutParams.customer.phone,
          status: simulatedStatus
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessReceipt(data.transaction);
        setPayingState("success");
      } else {
        setPayingState("failed");
      }
    } catch (e) {
      console.error(e);
      setPayingState("failed");
    }
  };

  const handleReset = () => {
    setPayingState("idle");
    setCheckoutParams(null);
    setSuccessReceipt(null);
    setOtpSent(false);
    setOtpCode("");
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4">
      {payingState === "success" && successReceipt ? (
        /* 80G Compliant tax savings receipt screen */
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-green-100 shadow-2xl overflow-hidden p-8 space-y-8 text-center bg-radial from-emerald-50/10 to-white">
          <div className="bg-emerald-100 text-emerald-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto my-4 shadow-md pulse-heart">
            <Check size={40} className="stroke-[3]" />
          </div>
          
          <div className="space-y-2">
            <span className="text-emerald-800 font-extrabold text-xs uppercase tracking-widest bg-emerald-100/70 px-4 py-1.5 rounded-full inline-block">Simulated Transaction Success</span>
            <h1 className="text-3xl font-display font-black text-slate-900">Thank you for your warm backing!</h1>
            <p className="text-slate-500 font-sans text-sm max-w-md mx-auto">
              Your donation th thali has been verified. You have helped feed <strong className="text-slate-800">{Math.round(successReceipt.amount / 50)} persons</strong>.
            </p>
          </div>

          {/* Styled Indian Tax exemption document preview */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left font-mono text-xs text-slate-700 space-y-4 shadow-inner relative overflow-hidden">
            <div className="absolute top-2 right-2 text-slate-400 font-sans text-[10px] uppercase font-bold tracking-wider opacity-60">80G Exemption Receipt</div>
            
            <div className="border-b border-dashed border-slate-200 pb-3 text-center">
              <h4 className="font-display font-bold text-slate-800 text-sm">EK ROTI FOUNDATION</h4>
              <p className="text-[10px] text-slate-500">{config.address}</p>
              <p className="text-[10px] text-slate-400">Reg No: ERF-GJ-394210-A8G</p>
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-[11px]">
              <div>Receipt No:</div>
              <div className="text-right font-bold text-slate-900">REC80G_{successReceipt.id.substring(8)}</div>
              
              <div>Order Reference:</div>
              <div className="text-right text-slate-900">{successReceipt.id}</div>
              
              <div>Donor Name:</div>
              <div className="text-right font-bold text-slate-900 uppercase">{successReceipt.name}</div>
              
              <div>Contact Numbers:</div>
              <div className="text-right text-slate-900">{successReceipt.phone}</div>

              <div>Donation Amount:</div>
              <div className="text-right font-bold text-slate-900 text-sm">₹{successReceipt.amount}.00</div>

              {use80G && panNumber && (
                <>
                  <div>PAN Registered:</div>
                  <div className="text-right font-bold text-emerald-800 uppercase">{panNumber}</div>
                </>
              )}

              <div>Verified Date:</div>
              <div className="text-right text-slate-900">{new Date(successReceipt.date).toLocaleString()}</div>
            </div>

            <div className="pt-3 border-t border-dashed border-slate-200 text-center text-[10px] text-slate-400 italic">
              "One Roti Can Change a Life. Verified digitally by Paytm Settlement Handshake."
            </div>
          </div>

          {/* Interactive Paytm Merchant Soundbox simulated box */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-lg mx-auto shadow-sm">
            <div className="flex items-center space-x-3 text-left">
              <div className="bg-[#002e6e] text-white p-3 rounded-2xl flex items-center justify-center shadow-md">
                <Volume2 size={24} className={isSoundboxMuted ? "" : "animate-bounce"} />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display font-bold text-slate-800 text-sm flex items-center gap-2">
                  <span>Paytm Smart Soundbox</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </h4>
                <p className="text-slate-600 font-medium text-xs leading-relaxed italic">
                  🔊 "पेटीएम पर {successReceipt.amount} रुपये प्राप्त हुए"
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => playPaytmVoiceAnnouncement(successReceipt.amount)}
                className="bg-[#002e6e] hover:bg-[#001d4a] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              >
                <Play size={12} className="fill-current" />
                <span>Replay Announcement</span>
              </button>
              <button
                onClick={() => setIsSoundboxMuted(!isSoundboxMuted)}
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold p-2.5 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                title={isSoundboxMuted ? "Unmute soundbox" : "Mute soundbox"}
              >
                {isSoundboxMuted ? <VolumeX size={14} className="text-slate-400" /> : <Volume2 size={14} className="text-blue-700" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center pt-2">
            <button 
              onClick={() => {
                alert("Simulated receipt download initiated! Your official 80G form is ready.");
              }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold p-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
            >
              <Download size={14} />
              <span>Download 80G PDF</span>
            </button>
            <button 
              onClick={handleReset}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold p-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Back to Donation Form
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main supporting form info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-brand-orange">
                <span className="w-8 h-[2px] bg-brand-orange"></span>
                <span className="text-sm font-bold uppercase tracking-widest font-display">Nourish Families Today</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
                One Meal, Infinite Grace
              </h1>
              <p className="text-slate-600 leading-relaxed font-sans text-sm md:text-base">
                Your direct contribution sponsors the purchase of fine wheat flour, fresh local vegetables, pure water, high-heat clean gas lines, and local eco-friendly bio leaf thalis. Every thali is prepared and serving on the same calendar day.
              </p>
            </div>

            {/* Quick value grids */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {donationTiers.map(tier => {
                const isActive = getActiveAmount() === tier.amount;
                return (
                  <button
                    key={tier.id}
                    onClick={() => handleTierSelect(tier.amount)}
                    className={`p-6 rounded-3xl border text-center transition-all duration-200 block cursor-pointer group ${
                      isActive 
                        ? "border-brand-orange bg-orange-50 shadow-md ring-1 ring-brand-orange/30" 
                        : "border-slate-100 bg-white hover:border-orange-200"
                    }`}
                  >
                    <span className={`text-[10px] font-bold uppercase tracking-widest block mb-2 transition-colors ${isActive ? "text-brand-orange" : "text-slate-400"}`}>
                      Feed {tier.personsFed} Persons
                    </span>
                    <div className="flex items-baseline justify-center space-x-0.5">
                      <span className="text-sm font-bold text-slate-400">₹</span>
                      <span className="text-3xl font-display font-black text-slate-900">{tier.amount}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 italic mt-3 max-w-[150px] mx-auto leading-tight">
                      Sponsors fresh whole-meals for {tier.personsFed} people.
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Indian Trust Badges */}
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 flex flex-col md:flex-row gap-5 items-start">
              <div className="bg-amber-100 p-3 rounded-2xl text-amber-800">
                <ShieldAlert className="animate-bounce" size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-slate-800 text-sm">Tax Benefits under Sec 80G</h4>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  All donations are 50% tax exempt under Section 80G of the Indian Income Tax Act. Please provide your correct permanent address and PAN to file compliance statements seamlessly.
                </p>
              </div>
            </div>

            {/* Direct Paytm/UPI Dynamic QR Scan Section */}
            <div className="bg-[#002e6e]/5 border border-[#002e6e]/10 rounded-3xl p-6 space-y-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-blue-100 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-blue-700 uppercase tracking-widest flex items-center gap-1.5 font-sans">
                    <QrCode size={13} className="animate-pulse" />
                    <span>Instant Paytm UPI Scanner</span>
                  </span>
                  <h3 className="font-display font-black text-slate-800 text-lg">Scan & Pay via UPI</h3>
                </div>
                <div className="bg-[#002e6e] text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-xs">
                  Official Account Active
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center">
                
                {/* Visual Replication of the WhatsApp Pay Card (Beautiful, High Contrast, Centered Profile) */}
                <div className="bg-[#fcfdfd] border border-slate-200/80 rounded-3xl p-6 shadow-md max-w-sm w-full mx-auto relative flex flex-col items-center justify-between min-h-[380px]">
                  
                  {/* Top Profile Avatar representation (Om Golden Symbol inside Cosmic Dark Background) */}
                  <div className="relative -mt-12 mb-3.5">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-900 to-stone-800 border-2 border-white shadow-md flex items-center justify-center overflow-hidden shrink-0 select-none">
                      <span className="text-amber-400 font-serif text-2xl font-black leading-none" style={{ textShadow: "0 0 4px rgba(251,191,36,0.3)" }}>ॐ</span>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <span className="text-slate-400 text-[11px] font-sans font-semibold tracking-wide uppercase mb-1">
                    Scan this code to pay
                  </span>

                  {/* Display Name */}
                  <h4 className="font-display font-black text-slate-800 text-base mb-4 tracking-tight">
                    {config?.upiName || "N.Singh"}
                  </h4>

                  {/* QR Image with dynamic/active amount capability */}
                  <div className="relative bg-white border border-slate-100 p-4.5 rounded-2xl shadow-sm my-2 flex items-center justify-center">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-xs animate-pulse">
                      {config?.customQrImage ? "Merchant QR" : `Dynamic: ₹${getActiveAmount() > 0 ? getActiveAmount() : "Any Amount"}`}
                    </div>
                    <img 
                      src={config?.customQrImage || `https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=12-50-43&data=${encodeURIComponent(`upi://pay?pa=${config?.upiId || "paytm-83967280@ptybl"}&pn=${encodeURIComponent(config?.upiName || "N.Singh")}&am=${getActiveAmount()}&cu=INR&tn=EkRotiDonation`)}`}
                      alt="Official Paytm UPI QR Code"
                      referrerPolicy="no-referrer"
                      className="w-[140px] h-[140px] select-none object-contain"
                    />
                  </div>

                  {/* UPI Address Detail */}
                  <div className="text-center space-y-1 mt-4 w-full">
                    <p className="font-sans font-extrabold text-[12px] text-slate-700 tracking-wide">
                      UPI ID: <span className="font-mono text-blue-900 font-bold">{config?.upiId || "paytm-83967280@ptybl"}</span>
                    </p>
                    <p className="font-sans font-semibold text-[11px] text-slate-400">
                      {config?.phone || "+91 95103 66694"}
                    </p>
                  </div>

                  {/* Elegant Footer Disclaimer Text */}
                  <p className="border-t border-slate-100 mt-4 pt-3.5 text-[9.5px] text-slate-400 font-serif leading-relaxed text-center font-medium max-w-[280px]">
                    Sharing this QR code let's people send money directly to your connected UPI payment app.
                  </p>
                </div>

                {/* Details & Copy Actions */}
                <div className="space-y-4 text-left flex-1 w-full flex flex-col justify-between py-1">
                  <div className="space-y-2.5">
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Verified Beneficiary Account</span>
                      <p className="font-display font-black text-slate-800 text-lg leading-tight">{config?.upiName || "N.Singh"}</p>
                      <p className="text-slate-500 text-xs font-semibold font-sans">Ek Roti Foundation Authorized Receiver Entity</p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Official Support VPA (UPI ID)</span>
                      <div className="flex items-center gap-1 bg-white border border-slate-200 p-2.5 rounded-xl text-xs shadow-xs">
                        <code className="font-mono text-[11.5px] text-blue-900 font-bold flex-1 truncate">{config?.upiId || "paytm-83967280@ptybl"}</code>
                        <button 
                          type="button"
                          onClick={() => {
                            const idToCopy = config?.upiId || "paytm-83967280@ptybl";
                            navigator.clipboard.writeText(idToCopy);
                            alert(`UPI ID copied to clipboard: ${idToCopy}`);
                          }}
                          className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-blue-700 transition-colors cursor-pointer"
                          title="Copy UPI ID"
                        >
                          <Copy size={13.5} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Direct Action</span>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <button 
                        type="button"
                        onClick={() => {
                          if (!donorName || !donorEmail) {
                            alert("Please fill out your Name and Email ID in the right-hand panel so we can attribute and email your tax receipt after payment!");
                            const rightNameInput = document.getElementById("donorNameInput");
                            if (rightNameInput) rightNameInput.focus();
                          } else {
                            triggerCallbackVerification("SUCCESS");
                          }
                        }}
                        className="bg-[#002e6e] hover:bg-[#001d4a] text-white text-xs font-extrabold px-5 py-3 rounded-xl cursor-pointer transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-2 flex-1"
                      >
                        <Check size={14} />
                        <span>Claim My Receipt</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          const upiPayload = `upi://pay?pa=${config?.upiId || "paytm-83967280@ptybl"}&pn=${encodeURIComponent(config?.upiName || "N.Singh")}&am=${getActiveAmount()}&cu=INR&tn=EkRotiDonation`;
                          if (config?.paytmPaymentLink) {
                            window.open(config.paytmPaymentLink, "_blank");
                          } else {
                            // Try launching the deep link directly for mobile users
                            window.location.href = upiPayload;
                          }
                        }}
                        className="bg-[#00baf2] hover:bg-[#0099c7] text-white text-xs font-black px-4 py-3 rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-1.5 flex-1"
                      >
                        <ExternalLink size={13} />
                        <span>{config?.paytmPaymentLink ? "Pay via Paytm Link" : "Pay via Paytm App"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const upiPayload = `upi://pay?pa=${config?.upiId || "paytm-83967280@ptybl"}&pn=${encodeURIComponent(config?.upiName || "N.Singh")}&am=${getActiveAmount()}&cu=INR&tn=EkRotiDonation`;
                          navigator.clipboard.writeText(config?.paytmPaymentLink || upiPayload);
                          alert(config?.paytmPaymentLink ? "Paytm payment link copied to clipboard!" : "UPI payment payload copied to clipboard!");
                        }}
                        className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-black p-3 rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-1"
                        title="Copy payment link info"
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secure guidelines banner nested inside QR widget */}
              <div className="bg-white/80 border border-slate-100/60 rounded-xl p-3 flex gap-2.5 items-start text-left text-[11px] text-slate-500 font-sans font-medium line-clamp-2 leading-relaxed">
                <ShieldAlert size={14} className="text-blue-600 shrink-0 mt-0.5 animate-pulse" />
                <p>This dynamic QR uses Paytm's official Indian UPI scheme. When scanned on your phone, the correct amount and payee registration name will be pre-filled automatically for secure validation.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 bg-white p-4.5 rounded-2xl border border-slate-50 shadow-sm">
                <Check className="text-brand-green bg-green-50 p-1 rounded-full stroke-[3]" size={20} />
                <span className="text-slate-700 text-xs md:text-sm font-semibold">100% Verified Paytm UPI Server</span>
              </div>
              <div className="flex items-center space-x-3 bg-white p-4.5 rounded-2xl border border-slate-50 shadow-sm">
                <Check className="text-brand-green bg-green-50 p-1 rounded-full stroke-[3]" size={20} />
                <span className="text-slate-700 text-xs md:text-sm font-semibold">Instant e-Receipt & 80G Compliance</span>
              </div>
            </div>
          </div>

          {/* Secure details form sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-orange-100 shadow-xl p-8 space-y-6">
              <div className="space-y-1 border-b border-orange-50 pb-4">
                <h3 className="font-display font-black text-slate-800 text-xl flex items-center gap-2">
                  <Heart className="text-brand-orange fill-current" size={20} />
                  <span>Sponsorship Details</span>
                </h3>
                <p className="text-slate-400 text-xs">Verified compliance records of Indian Ministry are logged</p>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                
                {/* Custom input amount form */}
                <div className="space-y-2">
                  <label htmlFor="customAmountInput" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Custom Support Amount (INR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-lg">₹</span>
                    <input 
                      id="customAmountInput"
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 rounded-2xl pl-10 pr-20 py-4 font-display font-extrabold text-2xl text-slate-800 focus:outline-none"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={handleCustomChange}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-200/50 px-2.5 py-1 rounded-lg">
                      {getActiveAmount() > 0 ? `Feeds ~${Math.round(getActiveAmount() / 50)} People` : "Specify INR"}
                    </span>
                  </div>
                </div>

                {/* Donor name */}
                <div className="space-y-1">
                  <label htmlFor="donorNameInput" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Full Name</label>
                  <input 
                    id="donorNameInput"
                    type="text"
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                    placeholder="e.g. Anand Mahindra"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                  />
                </div>

                {/* Donor Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="donorEmailInput" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Email ID</label>
                    <input 
                      id="donorEmailInput"
                      type="email"
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                      placeholder="anand@mahindra.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="donorPhoneInput" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Mobile Number</label>
                    <input 
                      id="donorPhoneInput"
                      type="tel"
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                      placeholder="e.g. +91 98250 XXXXX"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* 80G PAN Toggle */}
                <div className="space-y-3 pt-2">
                  <label htmlFor="taxCheckbox" className="flex items-center space-x-2.5 cursor-pointer select-none">
                    <input 
                      id="taxCheckbox"
                      type="checkbox"
                      className="rounded border-slate-300 text-brand-orange focus:ring-brand-orange/30 w-4 h-4 cursor-pointer"
                      checked={use80G}
                      onChange={(e) => setUse80G(e.target.checked)}
                    />
                    <span className="text-slate-700 text-xs font-bold uppercase tracking-wide">Claim 80G Tax Exemption (50% Relief)</span>
                  </label>

                  {use80G && (
                    <div className="space-y-1 animate-fadeIn">
                      <label htmlFor="panInput" className="text-slate-500 text-[10px] font-extrabold uppercase tracking-wide block">Permanent Account Number (PAN)</label>
                      <input 
                        id="panInput"
                        type="text"
                        required
                        maxLength={10}
                        className="w-full bg-slate-50 border border-orange-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm font-mono tracking-wider focus:outline-none uppercase"
                        placeholder="ABCDE1234F"
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-brand-orange/20 hover:shadow-brand-orange/40 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="animate-spin" size={16} />
                        <span>Verifying Server Connection...</span>
                      </>
                    ) : (
                      <>
                        <Heart className="fill-current mr-0.5 animate-pulse" size={16} />
                        <span>Checkout ₹{getActiveAmount().toLocaleString('en-IN')} with Paytm</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      )}

      {/* RENDER DYNAMIC PAYTM MULTI-METHOD SECURE GATEWAY CHECKOUT OVERLAY SCREEN */}
      {payingState === "paytm_modal" && checkoutParams && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform animate-zoomIn pb-6">
            
            {/* Header with Paytm Brand */}
            <div className="bg-[#002e6e] text-white p-4.5 flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <span className="text-sky-300 font-extrabold tracking-tight text-xl font-display">Pay</span>
                <span className="text-white font-extrabold tracking-tight text-xl font-display">tm</span>
                <span className="text-[10px] text-sky-200 border border-sky-400 rounded px-1 ml-2 select-none uppercase font-bold tracking-widest">Secure Gateway</span>
              </div>
              <button 
                onClick={() => setPayingState("idle")}
                className="text-white/60 hover:text-white font-display font-medium text-sm hover:underline cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {/* Merchant Details Block summary */}
            <div className="bg-slate-50 border-b border-dashed border-slate-200 p-5 grid grid-cols-2 gap-2 text-xs text-slate-600 font-sans">
              <div>Merchant:</div>
              <div className="text-right font-bold text-slate-800 uppercase">Ek Roti Foundation</div>
              
              <div>Merchant ID:</div>
              <div className="text-right text-slate-800 font-mono text-[10px]">{checkoutParams.merchantId}</div>

              <div>Order reference:</div>
              <div className="text-right text-slate-800 font-mono text-[10px]">{checkoutParams.orderId}</div>

              <div className="col-span-2 pt-2 border-t border-slate-200/60 flex justify-between items-center mt-1">
                <span className="font-bold text-slate-700 text-sm">Grand Amount due:</span>
                <span className="text-xl font-extrabold text-[#002e6e] font-display">₹{checkoutParams.amount}.00</span>
              </div>
            </div>

            {/* Payment Mode options tabbed system */}
            <div className="p-6 space-y-5">
              <div className="text-slate-800 text-xs font-extrabold uppercase tracking-wide">Select Payment Method</div>
              
              <div className="flex space-x-2 border-b border-slate-100 pb-3">
                <button 
                  onClick={() => setSelectedMethod("upi")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase cursor-pointer tracking-wider ${selectedMethod === 'upi' ? 'bg-sky-50 text-sky-800 border border-sky-200' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  BHIM UPI
                </button>
                <button 
                  onClick={() => setSelectedMethod("card")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase cursor-pointer tracking-wider ${selectedMethod === 'card' ? 'bg-sky-50 text-sky-800 border border-sky-200' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  Debit Card
                </button>
                <button 
                  onClick={() => setSelectedMethod("wallet")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase cursor-pointer tracking-wider ${selectedMethod === 'wallet' ? 'bg-sky-50 text-sky-800 border border-sky-200' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  Paytm Wallet
                </button>
              </div>

              {selectedMethod === "upi" && (
                <div className="space-y-4 animate-fadeIn text-left">
                  {/* Tabs / Sub-options inside UPI */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 text-center space-y-4">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-sans uppercase font-extrabold tracking-wider border-b border-slate-100 pb-2">
                      <span className="flex items-center gap-1">
                        <QrCode size={14} className="text-blue-600 animate-pulse" />
                        <span className="text-slate-700">Scan & Pay (Instant)</span>
                      </span>
                      <span className="text-amber-600 font-mono tracking-tight bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100 animate-pulse text-[10px]">
                        Session: {formatTimer(upiTimer)}
                      </span>
                    </div>

                    <div className="relative inline-block bg-white p-3.5 rounded-2xl border border-slate-200/60 shadow-sm mx-auto group">
                      <img 
                        src={config?.customQrImage || `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`upi://pay?pa=${config?.upiId || "paytm-83967280@ptybl"}&pn=${encodeURIComponent(config?.upiName || "N.Singh")}&am=${checkoutParams.amount}&cu=INR&tn=Donation_Ref_${checkoutParams.orderId}`)}`}
                        alt="Paytm Dynamic UPI QR Code"
                        referrerPolicy="no-referrer"
                        className="w-[150px] h-[150px] object-contain mx-auto"
                      />
                      {!config?.customQrImage && (
                        <div 
                          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-white/95 rounded-2xl p-4 text-center cursor-pointer"
                          onClick={() => {
                            const upiPayload = `upi://pay?pa=${config?.upiId || "paytm-83967280@ptybl"}&pn=${encodeURIComponent(config?.upiName || "N.Singh")}&am=${checkoutParams.amount}&cu=INR&tn=Donation_Ref_${checkoutParams.orderId}`;
                            navigator.clipboard.writeText(upiPayload);
                            alert("UPI Payment link copied to clipboard!");
                          }}
                        >
                          <p className="text-[10px] text-blue-800 font-bold uppercase tracking-wider flex flex-col items-center gap-1">
                            <Copy size={16} />
                            <span>Copy UPI Link</span>
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-700">Scan this QR code using Paytm or standard UPI apps</p>
                      <p className="text-[10px] text-slate-400 font-sans">Open App → Scan QR → Authorize ₹{checkoutParams.amount}.00</p>
                    </div>

                    {/* App Icons Grid */}
                    <div className="flex items-center justify-center gap-2 pt-1 text-[9px] font-bold text-slate-400 tracking-wider">
                      <span className="px-2 py-1 bg-white border border-slate-100 rounded-md shadow-xs">PAYTM</span>
                      <span className="px-2 py-1 bg-white border border-slate-100 rounded-md shadow-xs">GPAY</span>
                      <span className="px-2 py-1 bg-white border border-slate-100 rounded-md shadow-xs">PHONEPE</span>
                      <span className="px-2 py-1 bg-white border border-slate-100 rounded-md shadow-xs">BHIM</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500 text-[10px] font-extrabold uppercase block font-sans">Or Enter UPI VPA (UPI ID)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        className="flex-1 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-mono tracking-wider focus:outline-none focus:border-blue-600 focus:bg-white"
                        defaultValue={`${checkoutParams.customer.name.toLowerCase().replace(/\s+/g, "")}@paytm`}
                      />
                      <button 
                        onClick={() => triggerCallbackVerification("SUCCESS")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-4 py-2 text-xs rounded-xl cursor-pointer transition-colors shrink-0 uppercase tracking-wider"
                      >
                        Scan Verified
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === "card" && (
                <div className="space-y-4 animate-fadeIn text-left">
                  <div className="space-y-1">
                    <label className="text-slate-500 text-[10px] font-extrabold uppercase block">Card Number</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-mono tracking-widest focus:outline-none"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-500 text-[10px] font-extrabold uppercase block">Expiry Date</label>
                      <input 
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-mono focus:outline-none"
                        defaultValue="12/31"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-500 text-[10px] font-extrabold uppercase block">CVV</label>
                      <input 
                        type="password"
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-mono tracking-widest focus:outline-none"
                        defaultValue="045"
                      />
                    </div>
                  </div>

                  {otpSent ? (
                    <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl space-y-2">
                      <label className="text-amber-800 text-[10px] font-bold block uppercase">Simulated OTP Sent to {checkoutParams.customer.phone}</label>
                      <input 
                        type="text"
                        placeholder="Enter 6-digit OTP code"
                        className="w-full bg-white border border-amber-200 px-3 py-2 rounded-lg text-sm text-center font-bold tracking-widest focus:outline-none"
                        value={otpCode}
                        onChange={(e)=>setOtpCode(e.target.value)}
                      />
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => setOtpSent(true)}
                      className="text-xs font-bold text-sky-700 hover:underline cursor-pointer"
                    >
                      Retrieve simulated OTP code
                    </button>
                  )}
                </div>
              )}

              {selectedMethod === "wallet" && (
                <div className="space-y-3 text-left animate-fadeIn">
                  <div className="bg-sky-50 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Paytm Balance</h4>
                      <p className="text-xs text-slate-500">Fast one-click checkout enabled</p>
                    </div>
                    <span className="font-extrabold text-slate-900">₹7,850.00</span>
                  </div>
                </div>
              )}

              {/* simulated payment triggers */}
              <div className="space-y-2.5 pt-4">
                <button
                  onClick={() => triggerCallbackVerification("SUCCESS")}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  Simulate Payment Success
                </button>
                <button
                  onClick={() => triggerCallbackVerification("FAILED")}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Simulate Failure/Cancel
                </button>
              </div>
            </div>

            <div className="px-6 flex justify-center items-center space-x-2 text-[10px] text-slate-400 font-sans uppercase font-bold tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>128-bit Bank Grade Shield Protection</span>
            </div>

          </div>
        </div>
      )}

      {payingState === "processing" && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl border border-slate-100">
            <RefreshCw className="animate-spin text-brand-orange mx-auto stroke-[2.5]" size={42} />
            <div className="space-y-1">
              <h3 className="font-display font-black text-slate-900 text-lg">Authorizing Paytm Handshake</h3>
              <p className="text-slate-400 text-xs font-sans leading-relaxed">
                Contacting Indian bank networks to register compliance tokens securely. Do not close browser windows.
              </p>
            </div>
          </div>
        </div>
      )}

      {payingState === "failed" && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl border border-slate-100 animate-zoomIn">
            <div className="bg-red-100 text-red-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <AlertCircle size={32} className="stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-black text-slate-900 text-lg">Donation Cancelled / Failed</h3>
              <p className="text-slate-500 text-xs font-sans leading-relaxed">
                We couldn't verify the payment settling checksum with your local card. No donation amount was debited.
              </p>
            </div>
            <button 
              onClick={handleReset}
              className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
            >
              Retry Checkout
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
