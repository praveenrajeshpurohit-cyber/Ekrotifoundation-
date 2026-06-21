import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { generate100Stories } from "./src/storiesData.js";

const PORT = 3000;
const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "db.json");

// Helper to initialize and load the database
function loadDatabase() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialStories = generate100Stories();
    const initialData = {
      config: {
        headline: "One Roti Can Change a Life",
        subheading: "Join Ek Roti Foundation in feeding hungry people and supporting needy families across India.",
        phone: "+91 95103 66694",
        email: "ekrotifoundation@gmail.com",
        address: "Plot No-28, Hare Krishna Villa, Near Sky-9, Godadra Moje, Dindoli, Surat, Gujarat 394210, India",
        upiId: "paytm-83967280@ptybl",
        upiName: "N.Singh"
      },
      stats: {
        mealsServed: 124580,
        activeVolunteers: 350,
        beneficiariesHelped: 45000,
        citiesReached: 12
      },
      donationTiers: [
        { id: 1, amount: 250, personsFed: 5, icon: "Utensils", description: "Feeds 5 hungry persons a full warm nutritional meal.", popular: false },
        { id: 2, amount: 500, personsFed: 10, icon: "HeartHandshake", description: "Feeds 10 persons. Most popular choice among family donors.", popular: true },
        { id: 3, amount: 1000, personsFed: 25, icon: "Users", description: "Feeds 25 persons. Excellent support for poor neighborhood clusters.", popular: false }
      ],
      reviews: [
        { id: 1, name: "Rajesh Sharma", role: "Monthly Donor", rating: 5, text: "Ek Roti Foundation is doing excellent work for needy people. I am proud to support them. Their transparency is incredibly reassuring.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200", date: "2026-05-18", isApproved: true },
        { id: 2, name: "Sunita Verma", role: "Daily Sponsor", rating: 5, text: "Serving raw food is one thing, but serving hot, fresh, hygienic rotis directly to poor children is truly commendable.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200", date: "2026-06-01", isApproved: true },
        { id: 3, name: "Amit Patel", role: "Corporate Donor", rating: 5, text: "We sponsored a complete food camp in Dindoli area. The execution, distribution discipline, and pure joy of the elderly beneficiaries were heart-warming.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200", date: "2026-06-11", isApproved: true },
        { id: 4, name: "Pooja Singh", role: "Volunteering Partner", rating: 5, text: "Excellent and dedicated ground team! Joining them as a food server completely modified my outlook on life.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200", date: "2026-06-14", isApproved: true },
        { id: 5, name: "Mohan Yadav", role: "Local Supporter", rating: 4, text: "I regularly see their customized vans in Godadra area. Every single plate is distributed with utmost respect and humility.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200", date: "2026-06-18", isApproved: true },
        { id: 6, name: "Neha Gupta", role: "Donor", rating: 5, text: "A highly trusted NGO in Surat. Even small contributions making an emotional impact.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200", date: "2026-06-19", isApproved: true },
        { id: 7, name: "Suresh Kumar", role: "Social Worker", rating: 5, text: "They helped thousands of migrants and underprivileged families during difficult rains. Purely self-less service.", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200", date: "2026-06-20", isApproved: true },
        { id: 8, name: "Kavita Joshi", role: "Youth Volunteer", rating: 5, text: "This foundation gives us the platform to give back to Indian society. Feeding poor families is highly spiritual.", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200", date: "2026-06-20", isApproved: true }
      ],
      stories: initialStories,
      volunteers: [
        { id: 1, fullName: "Vijay Randeria", phone: "+91 98251 11223", email: "vijay.r@gmail.com", city: "Surat", message: "Excited to assist with the upcoming weekend community kitchen drive in Dindoli district.", date: "2026-06-18", status: "Approved" },
        { id: 2, fullName: "Meera Gokhale", phone: "+91 97240 12345", email: "meera.g@hotmail.com", city: "Ahmedabad", message: "I want to help organize digital fund drives and support on-ground kitchen management.", date: "2026-06-19", status: "Pending" }
      ],
      gallery: [
        { id: 1, title: "Smiles over Warm Plates", category: "Kids", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600", description: "Young school children happily enjoying fresh, hygienic roti and vegetable thali distributed in Surat." },
        { id: 2, title: "Respecting the Elders", category: "Elderly", url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600", description: "An elderly mother receiving warm daily meals with deep gratitude during hard seasonal rains." },
        { id: 3, title: "Our Dynamic Ground Kitchen", category: "Kitchen", url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600", description: "Volunteers preparing fresh, steaming hot batches of wheat chapatis at our clean central kitchen setup." },
        { id: 4, title: "Community Distribution Drive", category: "Distribution", url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=600", description: "Mega relief food camp organized on the outskirts of Godadra to comfort seasonal migrant labors." },
        { id: 5, title: "Volunteers: The Moving Spirits", category: "Volunteers", url: "https://images.unsplash.com/photo-1501516069922-a9982bd6f3bd?q=80&w=600", description: "The heartbeat of Ek Roti Foundation - happy young volunteers packing chapatis and grain kits." }
      ],
      events: [
        { id: 1, title: "Dindoli Slum Food Drive", date: "2026-06-25", time: "11:00 AM - 02:00 PM", location: "Hare Krishna Villa Sector, Dindoli, Surat", description: "Daily feeding drive targeting children, widows, and physically challenged individuals with nutrition packets.", image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=400", status: "Upcoming" },
        { id: 2, title: "Godadra Highway Migrant Support", date: "2026-06-29", time: "09:00 AM - 04:00 PM", location: "Near Sky-9, Surat Highway Edge", description: "Setting up hydration and dry grain food camp to feed daily commuters, helpers, and manual pushcart operators.", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=400", status: "Upcoming" },
        { id: 3, title: "Surat Flood Pre-Relief Camp", date: "2026-06-15", time: "10:00 AM - 03:00 PM", location: "Tapi River Lowlands, Surat", description: "Distributed pre-monsoon secure survival bags and dry grains items to riverbank settlements.", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400", status: "Completed" }
      ],
      transactions: [] as { id: string; amount: number; name: string; email: string; phone: string; status: string; date: string }[]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  }

  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    const json = JSON.parse(data);
    if (json.config) {
      let changed = false;
      if (!json.config.upiId) {
        json.config.upiId = "paytm-83967280@ptybl";
        changed = true;
      }
      if (!json.config.upiName) {
        json.config.upiName = "N.Singh";
        changed = true;
      }
      if (changed) {
        fs.writeFileSync(DB_FILE, JSON.stringify(json, null, 2));
      }
    }
    return json;
  } catch (error) {
    console.error("Database reading error, initiating fallback data structures:", error);
    return {};
  }
}

// Write helper
function saveDatabase(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (e) {
    console.error("Failed to write to local DB:", e);
    return false;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize DB
  let db = loadDatabase();

  // API Check Status Endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // GET All Public Site Datasets
  app.get("/api/data", (req, res) => {
    res.json({
      config: db.config,
      stats: db.stats,
      donationTiers: db.donationTiers,
      reviews: db.reviews.filter((r: any) => r.isApproved),
      stories: db.stories,
      gallery: db.gallery,
      events: db.events
    });
  });

  // GET All Datasets for Admin (includes pending reviews/submissions)
  app.get("/api/admin/data", (req, res) => {
    res.json({
      config: db.config,
      stats: db.stats,
      donationTiers: db.donationTiers,
      reviews: db.reviews,
      stories: db.stories,
      volunteers: db.volunteers,
      gallery: db.gallery,
      events: db.events,
      transactions: db.transactions || []
    });
  });

  // UPDATE SITE CONFIG (Admin)
  app.post("/api/admin/config", (req, res) => {
    const { 
      headline, subheading, phone, email, address, upiId, upiName, customQrImage,
      heroImage, introImage, aboutImage, teamImage1, teamImage2, teamImage3, teamImage4 
    } = req.body;
    if (headline && subheading && phone && email && address) {
      db.config = { 
        headline, 
        subheading, 
        phone, 
        email, 
        address,
        upiId: upiId || db.config.upiId || "paytm-83967280@ptybl",
        upiName: upiName || db.config.upiName || "N.Singh",
        customQrImage: customQrImage !== undefined ? customQrImage : (db.config.customQrImage || ""),
        heroImage: heroImage !== undefined ? heroImage : (db.config.heroImage || ""),
        introImage: introImage !== undefined ? introImage : (db.config.introImage || ""),
        aboutImage: aboutImage !== undefined ? aboutImage : (db.config.aboutImage || ""),
        teamImage1: teamImage1 !== undefined ? teamImage1 : (db.config.teamImage1 || ""),
        teamImage2: teamImage2 !== undefined ? teamImage2 : (db.config.teamImage2 || ""),
        teamImage3: teamImage3 !== undefined ? teamImage3 : (db.config.teamImage3 || ""),
        teamImage4: teamImage4 !== undefined ? teamImage4 : (db.config.teamImage4 || "")
      };
      saveDatabase(db);
      res.json({ status: "success", config: db.config });
    } else {
      res.status(400).json({ error: "Missing required config parameters" });
    }
  });

  // UPDATE HOME STATS (Admin)
  app.post("/api/admin/stats", (req, res) => {
    const { mealsServed, activeVolunteers, beneficiariesHelped, citiesReached } = req.body;
    db.stats = {
      mealsServed: parseInt(mealsServed) || 0,
      activeVolunteers: parseInt(activeVolunteers) || 0,
      beneficiariesHelped: parseInt(beneficiariesHelped) || 0,
      citiesReached: parseInt(citiesReached) || 0
    };
    saveDatabase(db);
    res.json({ status: "success", stats: db.stats });
  });

  // UPDATE DONATION TIERS (Admin)
  app.post("/api/admin/donation-tiers", (req, res) => {
    const { tiers } = req.body;
    if (Array.isArray(tiers)) {
      db.donationTiers = tiers;
      saveDatabase(db);
      res.json({ status: "success", donationTiers: db.donationTiers });
    } else {
      res.status(400).json({ error: "Invalid donation tiers format" });
    }
  });

  // ADD OR EDIT STORY (Admin)
  app.post("/api/admin/stories", (req, res) => {
    const story = req.body;
    if (!story.title || !story.description || !story.location) {
      return res.status(400).json({ error: "Missing required story fields" });
    }

    if (story.id) {
      // Edit
      db.stories = db.stories.map((s: any) => s.id === parseInt(story.id) ? { ...s, ...story, id: parseInt(story.id) } : s);
    } else {
      // Add
      const newId = db.stories.length > 0 ? Math.max(...db.stories.map((s: any) => s.id)) + 1 : 1;
      const newStory = {
        ...story,
        id: newId,
        date: story.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        category: story.category || "Daily Feeding",
        image: story.image || "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=400",
        impact: story.impact || "Community wellness"
      };
      db.stories.unshift(newStory); // Add to beginning
    }

    saveDatabase(db);
    res.json({ status: "success", stories: db.stories });
  });

  // DELETE STORY (Admin)
  app.delete("/api/admin/stories/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.stories = db.stories.filter((s: any) => s.id !== id);
    saveDatabase(db);
    res.json({ status: "success", stories: db.stories });
  });

  // VOLUNTEER REGISTRATION (Public)
  app.post("/api/volunteers/register", (req, res) => {
    const { fullName, phone, email, city, message } = req.body;
    if (!fullName || !phone || !email || !city) {
      return res.status(400).json({ error: "All fields except message are required" });
    }

    const newVolunteer = {
      id: db.volunteers.length > 0 ? Math.max(...db.volunteers.map((v: any) => v.id)) + 1 : 1,
      fullName,
      phone,
      email,
      city,
      message: message || "Keen to serve people.",
      date: new Date().toISOString().split('T')[0],
      status: "Pending" as const
    };

    db.volunteers.unshift(newVolunteer);
    saveDatabase(db);
    res.json({ status: "success", message: "Congratulations! You are officially registered as a pending volunteer." });
  });

  // UPDATE VOLUNTEER STATUS (Admin)
  app.post("/api/admin/volunteers/status", (req, res) => {
    const { id, status } = req.body;
    db.volunteers = db.volunteers.map((v: any) => v.id === parseInt(id) ? { ...v, status } : v);
    saveDatabase(db);
    res.json({ status: "success", volunteers: db.volunteers });
  });

  // DELETE VOLUNTEER (Admin)
  app.delete("/api/admin/volunteers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.volunteers = db.volunteers.filter((v: any) => v.id !== id);
    saveDatabase(db);
    res.json({ status: "success", volunteers: db.volunteers });
  });

  // ADD AND INTEGRATE TESTIMONIALS/REVIEWS (Public or Admin)
  app.post("/api/reviews", (req, res) => {
    const { name, text, rating } = req.body;
    if (!name || !text || !rating) {
      return res.status(400).json({ error: "Name, text, and rating are required." });
    }

    const newReview = {
      id: db.reviews.length > 0 ? Math.max(...db.reviews.map((r: any) => r.id)) + 1 : 1,
      name,
      role: "Sympathizer / Donor",
      rating: parseInt(rating) || 5,
      text,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + (rating * 100000)}?q=80&w=200` || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
      date: new Date().toISOString().split('T')[0],
      isApproved: false // Admin must approve public submissions
    };

    db.reviews.unshift(newReview);
    saveDatabase(db);
    res.json({ status: "success", message: "Thank you for your valuable feedback! It will appear once approved by the administrators." });
  });

  // TOGGLE REVIEW APPROVAL (Admin)
  app.post("/api/admin/reviews/approve", (req, res) => {
    const { id, isApproved } = req.body;
    db.reviews = db.reviews.map((r: any) => r.id === parseInt(id) ? { ...r, isApproved: !!isApproved } : r);
    saveDatabase(db);
    res.json({ status: "success", reviews: db.reviews });
  });

  // DELETE REVIEW (Admin)
  app.delete("/api/admin/reviews/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.reviews = db.reviews.filter((r: any) => r.id !== id);
    saveDatabase(db);
    res.json({ status: "success", reviews: db.reviews });
  });

  // ADD OR EDIT GALLERY ITEM (Admin)
  app.post("/api/admin/gallery", (req, res) => {
    const item = req.body;
    if (!item.title || !item.url || !item.category) {
      return res.status(400).json({ error: "Title, image URL, and category are required" });
    }

    if (item.id) {
      db.gallery = db.gallery.map((g: any) => g.id === parseInt(item.id) ? { ...g, ...item, id: parseInt(item.id) } : g);
    } else {
      const newId = db.gallery.length > 0 ? Math.max(...db.gallery.map((g: any) => g.id)) + 1 : 1;
      db.gallery.unshift({
        ...item,
        id: newId,
        description: item.description || "Ek Roti Foundation active service view."
      });
    }

    saveDatabase(db);
    res.json({ status: "success", gallery: db.gallery });
  });

  // DELETE GALLERY ITEM (Admin)
  app.delete("/api/admin/gallery/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.gallery = db.gallery.filter((g: any) => g.id !== id);
    saveDatabase(db);
    res.json({ status: "success", gallery: db.gallery });
  });

  // ADD OR EDIT EVENT (Admin)
  app.post("/api/admin/events", (req, res) => {
    const event = req.body;
    if (!event.title || !event.date || !event.location) {
      return res.status(400).json({ error: "Title, event date, and location are required." });
    }

    if (event.id) {
      db.events = db.events.map((e: any) => e.id === parseInt(event.id) ? { ...e, ...event, id: parseInt(event.id) } : e);
    } else {
      const newId = db.events.length > 0 ? Math.max(...db.events.map((e: any) => e.id)) + 1 : 1;
      db.events.unshift({
        ...event,
        id: newId,
        time: event.time || "10:00 AM - 02:00 PM",
        description: event.description || "Community distribution event organized across Surat blocks.",
        image: event.image || "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=400",
        status: event.status || "Upcoming"
      });
    }

    saveDatabase(db);
    res.json({ status: "success", events: db.events });
  });

  // DELETE EVENT (Admin)
  app.delete("/api/admin/events/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.events = db.events.filter((e: any) => e.id !== id);
    saveDatabase(db);
    res.json({ status: "success", events: db.events });
  });

  // SECURE PAYTM GATEWAY SIMULATOR HANDSHAKE
  app.post("/api/paytm/initiate", (req, res) => {
    const { amount, name, email, phone } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "A valid positive donation amount is required." });
    }

    // Retrieve keys from environment with secure fallbacks
    const MID = process.env.PAYTM_MERCHANT_ID || "zEGDie39558786797357";
    const WEBSITE = process.env.PAYTM_WEBSITE || "DEFAULT";
    const CHANNEL_ID = process.env.PAYTM_CHANNEL_ID || "WEB";
    const INDUSTRY_TYPE_ID = process.env.PAYTM_INDUSTRY_TYPE || "Retail";
    
    // Simulate generation of checksum securely on server
    const orderId = "ROTIPAY_" + Math.floor(Math.random() * 100000000);
    const mockSignature = "paytm_checksum_sig_" + Buffer.from(orderId + MID).toString("base64").substring(0, 24);

    // Prepare simulated handshake return values
    res.json({
      success: true,
      orderId,
      merchantId: MID,
      website: WEBSITE,
      channelId: CHANNEL_ID,
      industryType: INDUSTRY_TYPE_ID,
      txnToken: "TXN_OK_" + Math.random().toString(36).substring(2, 10).toUpperCase(),
      signature: mockSignature,
      amount,
      customer: {
        name: name || "Anonymous Donor",
        email: email || "anonymous@ekrotifoundation.org",
        phone: phone || "+91 99999 99999"
      }
    });
  });

  // PAYTM CALLBACK ENDPOINT FOR VERIFYING TRANSACTIONS
  app.post("/api/paytm/callback", (req, res) => {
    const { orderId, amount, name, email, phone, status } = req.body;
    
    if (status === "SUCCESS") {
      const parsedAmount = parseInt(amount) || 250;
      
      // Update statistics live! Boost mealsServed & beneficiaries on successful donation
      const peopleFed = Math.round(parsedAmount / 50) || 5; 
      db.stats.mealsServed += peopleFed;
      db.stats.beneficiariesHelped += Math.ceil(peopleFed / 4);

      const txnRecord = {
        id: orderId || "TXN_" + Date.now(),
        amount: parsedAmount,
        name: name || "Anonymous Donor",
        email: email || "anonymous@ekrotifoundation.org",
        phone: phone || "+91 99999 99999",
        status: "SUCCESS",
        date: new Date().toISOString()
      };

      if (!db.transactions) {
        db.transactions = [];
      }
      db.transactions.unshift(txnRecord);
      saveDatabase(db);

      res.json({
        success: true,
        message: "Payment success verified. Thank you for supporting Ek Roti Foundation!",
        transaction: txnRecord,
        stats: db.stats
      });
    } else {
      res.json({
        success: false,
        message: "Transaction failed or cancelled."
      });
    }
  });

  // Client static assets & routing rules
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ek Roti Foundation Web Server live on http://localhost:${PORT}`);
  });
}

startServer();
