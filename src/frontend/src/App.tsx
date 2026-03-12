import { Toaster } from "@/components/ui/sonner";
import {
  Camera,
  ChevronRight,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

const MENU_DATA: Record<string, { name: string; price: number }[]> = {
  Starters: [
    { name: "Paneer Tikka", price: 240 },
    { name: "Hara Bhara Kebab", price: 210 },
    { name: "Veg Manchurian Dry", price: 220 },
    { name: "Chilli Paneer", price: 240 },
    { name: "Crispy Corn", price: 190 },
    { name: "Veg Spring Roll", price: 180 },
    { name: "Corn Cheese Balls", price: 210 },
    { name: "Aloo Tikki", price: 150 },
  ],
  Soups: [
    { name: "Tomato Soup", price: 120 },
    { name: "Sweet Corn Soup", price: 140 },
    { name: "Hot & Sour Soup", price: 150 },
    { name: "Manchow Soup", price: 150 },
    { name: "Veg Clear Soup", price: 130 },
  ],
  "Paneer Specials": [
    { name: "Paneer Butter Masala", price: 260 },
    { name: "Shahi Paneer", price: 250 },
    { name: "Kadai Paneer", price: 250 },
    { name: "Paneer Lababdar", price: 270 },
    { name: "Palak Paneer", price: 240 },
    { name: "Matar Paneer", price: 230 },
    { name: "Paneer Tikka Masala", price: 270 },
  ],
  "Veg Curries": [
    { name: "Mixed Veg Curry", price: 220 },
    { name: "Veg Kolhapuri", price: 230 },
    { name: "Aloo Gobi", price: 200 },
    { name: "Dum Aloo", price: 210 },
    { name: "Malai Kofta", price: 260 },
    { name: "Baingan Bharta", price: 220 },
    { name: "Navratan Korma", price: 250 },
  ],
  Dal: [
    { name: "Dal Tadka", price: 190 },
    { name: "Dal Fry", price: 180 },
    { name: "Dal Makhani", price: 240 },
  ],
  Rice: [
    { name: "Veg Biryani", price: 220 },
    { name: "Paneer Biryani", price: 250 },
    { name: "Jeera Rice", price: 170 },
    { name: "Veg Pulao", price: 190 },
    { name: "Steamed Rice", price: 120 },
  ],
  "Indo-Chinese": [
    { name: "Veg Fried Rice", price: 200 },
    { name: "Schezwan Fried Rice", price: 220 },
    { name: "Veg Noodles", price: 190 },
    { name: "Hakka Noodles", price: 200 },
    { name: "Veg Manchurian Gravy", price: 220 },
    { name: "Chilli Paneer Gravy", price: 240 },
  ],
  Breads: [
    { name: "Butter Naan", price: 50 },
    { name: "Garlic Naan", price: 60 },
    { name: "Plain Naan", price: 45 },
    { name: "Tandoori Roti", price: 25 },
    { name: "Butter Roti", price: 30 },
    { name: "Lachha Paratha", price: 60 },
    { name: "Missi Roti", price: 55 },
    { name: "Stuffed Kulcha", price: 80 },
  ],
  "South Indian": [
    { name: "Plain Dosa", price: 120 },
    { name: "Masala Dosa", price: 180 },
    { name: "Cheese Dosa", price: 200 },
    { name: "Paneer Dosa", price: 210 },
    { name: "Rava Dosa", price: 170 },
    { name: "Idli Sambar", price: 120 },
    { name: "Medu Vada", price: 140 },
  ],
  "Fast Food": [
    { name: "Veg Sandwich", price: 120 },
    { name: "Grilled Sandwich", price: 150 },
    { name: "Cheese Sandwich", price: 170 },
    { name: "Veg Burger", price: 140 },
    { name: "Cheese Burger", price: 170 },
    { name: "French Fries", price: 120 },
    { name: "Cheese Fries", price: 150 },
    { name: "Pav Bhaji", price: 180 },
  ],
  Desserts: [
    { name: "Gulab Jamun", price: 120 },
    { name: "Rasmalai", price: 140 },
    { name: "Gajar Halwa", price: 160 },
    { name: "Kulfi", price: 120 },
    { name: "Ice Cream", price: 100 },
    { name: "Falooda", price: 170 },
  ],
  Beverages: [
    { name: "Masala Chai", price: 40 },
    { name: "Hot Coffee", price: 80 },
    { name: "Cold Coffee", price: 120 },
    { name: "Sweet Lassi", price: 100 },
    { name: "Salted Lassi", price: 90 },
    { name: "Mango Lassi", price: 120 },
    { name: "Fresh Lime Soda", price: 80 },
    { name: "Soft Drinks", price: 60 },
    { name: "Mineral Water", price: 30 },
  ],
};

const SIGNATURE_DISHES = [
  {
    name: "Paneer Butter Masala",
    price: 260,
    tag: "Chef's Favourite",
    img: "/assets/generated/dish-paneer-butter-masala.dim_600x600.jpg",
  },
  {
    name: "Veg Biryani",
    price: 220,
    tag: "House Special",
    img: "/assets/generated/dish-veg-biryani.dim_600x600.jpg",
  },
  {
    name: "Dal Makhani",
    price: 240,
    tag: "Slow-Cooked",
    img: "/assets/generated/dish-dal-makhani.dim_600x600.jpg",
  },
  {
    name: "Butter Naan",
    price: 50,
    tag: "Tandoor Fresh",
    img: "/assets/generated/dish-butter-naan.dim_600x600.jpg",
  },
  {
    name: "Masala Dosa",
    price: 180,
    tag: "South Indian",
    img: "/assets/generated/dish-masala-dosa.dim_600x600.jpg",
  },
  {
    name: "Gulab Jamun",
    price: 120,
    tag: "Sweet Finish",
    img: "/assets/generated/dish-gulab-jamun.dim_600x600.jpg",
  },
];

const REVIEWS = [
  {
    text: "One of the best dining experiences in Mandsaur. The Paneer Butter Masala and Butter Naan were outstanding. The ambiance is warm and the service is excellent.",
    name: "Rahul Sharma",
    title: "Regular Guest",
  },
  {
    text: "Delicious food and great family atmosphere. Every visit feels special and the staff always makes us feel at home. Truly a gem in Mandsaur.",
    name: "Priya Verma",
    title: "Happy Guest",
  },
  {
    text: "Authentic taste and friendly staff. The spices are perfectly balanced — every dish tells a story of tradition passed down through generations.",
    name: "Amit Joshi",
    title: "Regular Visitor",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reservations", href: "#reservations" },
  { label: "Contact", href: "#contact" },
];

// ── DESIGN ATOMS ──

function OrnamentDivider({ light = false }: { light?: boolean }) {
  const gem = light ? "rgba(212,175,55,0.8)" : "#d4af37";
  const line = light ? "rgba(212,175,55,0.2)" : "rgba(212,175,55,0.28)";
  return (
    <div
      className="flex items-center justify-center gap-2 mt-4"
      aria-hidden="true"
    >
      <span
        style={{
          display: "block",
          width: 52,
          height: 1,
          background: `linear-gradient(to right, transparent, ${line})`,
        }}
      />
      <span
        style={{
          display: "block",
          width: 5,
          height: 5,
          borderRadius: "1px",
          background: gem,
          transform: "rotate(45deg)",
        }}
      />
      <span
        style={{ display: "block", width: 20, height: 1, background: line }}
      />
      <span
        style={{
          display: "block",
          width: 7,
          height: 7,
          borderRadius: "1px",
          background: gem,
          transform: "rotate(45deg)",
        }}
      />
      <span
        style={{ display: "block", width: 20, height: 1, background: line }}
      />
      <span
        style={{
          display: "block",
          width: 5,
          height: 5,
          borderRadius: "1px",
          background: gem,
          transform: "rotate(45deg)",
        }}
      />
      <span
        style={{
          display: "block",
          width: 52,
          height: 1,
          background: `linear-gradient(to left, transparent, ${line})`,
        }}
      />
    </div>
  );
}

function OrnamentLeft() {
  return (
    <div className="flex items-center gap-3 mt-4" aria-hidden="true">
      <span
        style={{
          display: "block",
          width: 7,
          height: 7,
          borderRadius: "1px",
          background: "#d4af37",
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          display: "block",
          width: 52,
          height: 1,
          background: "linear-gradient(to right, #d4af37, transparent)",
        }}
      />
    </div>
  );
}

function WaveDivider({
  from,
  to,
  flip = false,
}: { from: string; to: string; flip?: boolean }) {
  const path = flip
    ? "M0,0 C480,56 960,56 1440,0 L1440,56 L0,56 Z"
    : "M0,56 C480,0 960,0 1440,56 L1440,0 L0,0 Z";
  return (
    <div className="wave-divider" style={{ background: from }}>
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        style={{ height: 56 }}
        aria-hidden="true"
      >
        <path d={path} fill={to} />
      </svg>
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
      ))}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  light = false,
  centered = true,
}: { eyebrow: string; title: string; light?: boolean; centered?: boolean }) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""}`}>
      <p
        className="text-[#d4af37] font-semibold uppercase mb-3"
        style={{ fontSize: "0.67rem", letterSpacing: "0.42em" }}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-serif font-bold leading-tight ${light ? "text-white" : "text-[#7b1e2b]"}`}
        style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
      >
        {title}
      </h2>
      {centered ? <OrnamentDivider light={light} /> : <OrnamentLeft />}
    </div>
  );
}

// ── MAIN APP ──

export default function App() {
  const { actor } = useActor();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState("Starters");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: "2",
    date: "",
    time: "",
    requests: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const preferredTime = `${formData.date} ${formData.time}`;
      if (!actor) throw new Error("Not connected");
      await actor.submitReservation(
        formData.name,
        formData.phone,
        formData.email,
        BigInt(Number.parseInt(formData.guests, 10)),
        preferredTime,
        formData.requests || null,
      );
      setSubmitted(true);
      toast.success("Table reserved successfully!");
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong. Please try again.");
      toast.error("Reservation failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8ee] text-gray-900">
      <Toaster />

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#7b1e2b] shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="text-[#d4af37] text-2xl font-serif leading-none">
                𝓢
              </span>
              <span
                className="text-[#d4af37] font-serif font-bold"
                style={{ fontSize: "1.05rem", letterSpacing: "0.22em" }}
              >
                SHARNAM
              </span>
            </a>
            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid={`nav.link.${i + 1}`}
                  className="nav-link text-[#fff8ee]/80 hover:text-[#d4af37] font-medium uppercase transition-colors"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.12em" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reservations"
                data-ocid="nav.reservation_button"
                className="btn-gold ml-1 px-5 py-2.5 bg-[#d4af37] text-[#7b1e2b] font-bold uppercase rounded-sm hover:bg-[#c9a227] transition-colors shadow-md"
                style={{ fontSize: "0.68rem", letterSpacing: "0.14em" }}
              >
                Reserve Table
              </a>
            </div>
            <button
              type="button"
              className="md:hidden text-[#d4af37] p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-[#9b3545]">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid={`nav.link.${i + 1}`}
                  className="block px-4 py-3 text-[#fff8ee]/80 hover:text-[#d4af37] text-sm font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reservations"
                data-ocid="nav.reservation_button"
                className="block mx-4 mt-3 px-4 py-2.5 bg-[#d4af37] text-[#7b1e2b] text-center text-sm font-bold tracking-wide rounded-sm"
              >
                Reserve Table
              </a>
            </div>
          )}
        </nav>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-dining.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(18,2,5,0.97) 0%, rgba(18,2,5,0.6) 42%, rgba(18,2,5,0.25) 100%)",
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-16">
          <p
            className="text-[#d4af37] font-semibold uppercase mb-7"
            style={{ fontSize: "0.63rem", letterSpacing: "0.55em" }}
          >
            Est. 2009 &nbsp;·&nbsp; Mandsaur, Madhya Pradesh
          </p>
          <h1
            className="font-serif font-bold text-white leading-none mb-1"
            style={{
              fontSize: "clamp(3.5rem, 13vw, 8.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Sharnam
          </h1>
          <p
            className="font-serif italic text-[#d4af37] mb-8"
            style={{ fontSize: "clamp(1rem, 2.8vw, 1.75rem)" }}
          >
            Taste the Tradition of India
          </p>
          {/* jewelled rule */}
          <div
            className="flex items-center justify-center gap-3 mb-9"
            aria-hidden="true"
          >
            <span
              style={{
                display: "block",
                width: 64,
                height: 1,
                background: "rgba(212,175,55,0.35)",
              }}
            />
            <span
              style={{
                display: "block",
                width: 7,
                height: 7,
                borderRadius: "1px",
                background: "#d4af37",
                transform: "rotate(45deg)",
              }}
            />
            <span
              style={{
                display: "block",
                width: 64,
                height: 1,
                background: "rgba(212,175,55,0.35)",
              }}
            />
          </div>
          <p
            className="text-[#fff8ee]/65 max-w-xl mx-auto mb-12 leading-[1.8]"
            style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)" }}
          >
            Authentic flavors, warm hospitality, and unforgettable dining in the
            heart of Mandsaur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#dishes"
              data-ocid="hero.primary_button"
              className="btn-gold inline-block px-10 py-4 bg-[#d4af37] text-[#7b1e2b] font-bold uppercase rounded-sm hover:bg-[#c9a227] transition-colors shadow-xl"
              style={{ fontSize: "0.75rem", letterSpacing: "0.18em" }}
            >
              View Menu
            </a>
            <a
              href="#reservations"
              data-ocid="hero.secondary_button"
              className="inline-block px-10 py-4 font-bold uppercase rounded-sm hover:bg-[#d4af37] hover:text-[#7b1e2b] transition-all"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                border: "1px solid rgba(212,175,55,0.7)",
                color: "#d4af37",
              }}
            >
              Reserve Table
            </a>
          </div>
        </div>
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
          aria-hidden="true"
        >
          <ChevronRight
            className="w-5 h-5 rotate-90"
            style={{ color: "rgba(212,175,55,0.5)" }}
          />
        </div>
        {/* cream wave at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 wave-divider"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 56"
            preserveAspectRatio="none"
            style={{ height: 56, display: "block", width: "100%" }}
            aria-hidden="true"
          >
            <path
              d="M0,56 C360,18 1080,40 1440,10 L1440,56 L0,56 Z"
              fill="#fff8ee"
            />
          </svg>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="pt-14 pb-0 bg-[#fff8ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionHeader
                eyebrow="Our Story"
                title="About Sharnam"
                centered={false}
              />
              <p
                className="text-gray-600 leading-[1.9] mb-10"
                style={{ fontSize: "1.02rem" }}
              >
                At Sharnam, we believe food is more than a meal — it is an
                experience. Our chefs prepare authentic Indian dishes using
                traditional recipes, rich spices, and the freshest ingredients.
                Whether you are visiting for a family dinner, celebration, or
                casual meal, Sharnam offers warm hospitality and unforgettable
                flavors.
              </p>
              <div className="grid grid-cols-3 gap-5">
                {[
                  { stat: "15+", label: "Years of\nTradition" },
                  { stat: "200+", label: "Menu\nItems" },
                  { stat: "1000+", label: "Happy\nGuests" },
                ].map((item) => (
                  <div key={item.stat} className="stat-item">
                    <div
                      className="font-serif font-bold text-[#7b1e2b]"
                      style={{ fontSize: "2rem", lineHeight: 1 }}
                    >
                      {item.stat}
                    </div>
                    <div
                      className="text-gray-400 mt-1.5 whitespace-pre-line"
                      style={{
                        fontSize: "0.68rem",
                        letterSpacing: "0.08em",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(123,30,43,0.06) 100%)",
                }}
              />
              <img
                src="/assets/generated/about-chef.dim_800x600.jpg"
                alt="Chef preparing authentic Indian cuisine at Sharnam"
                className="relative w-full rounded-xl shadow-2xl object-cover"
                style={{ maxHeight: "480px" }}
              />
              <div
                className="absolute -bottom-5 -left-5 bg-[#7b1e2b] text-[#d4af37] px-6 py-4 rounded-lg shadow-2xl"
                style={{ borderLeft: "3px solid #d4af37" }}
              >
                <p
                  className="font-serif font-bold"
                  style={{ fontSize: "1rem" }}
                >
                  Authentic Since 2009
                </p>
                <p
                  className="text-[#fff8ee]/60 mt-0.5"
                  style={{ fontSize: "0.67rem", letterSpacing: "0.12em" }}
                >
                  MANDSAUR · MADHYA PRADESH
                </p>
              </div>
            </div>
          </div>
        </div>
        <WaveDivider from="#fff8ee" to="#7b1e2b" flip />
      </section>

      {/* SIGNATURE DISHES */}
      <section id="dishes" className="pt-20 pb-0 bg-[#7b1e2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <SectionHeader
            eyebrow="Chef's Selection"
            title="Our Signature Dishes"
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SIGNATURE_DISHES.map((dish, i) => (
              <div
                key={dish.name}
                data-ocid={`dishes.item.${i + 1}`}
                className="dish-card bg-[#fff8ee] rounded-xl overflow-hidden group"
              >
                <div className="dish-img-wrap aspect-square">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="dish-img-overlay">
                    <span className="font-serif text-white text-sm font-semibold tracking-wide">
                      {dish.name}
                    </span>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <p
                    className="text-[#d4af37] uppercase font-semibold mb-1.5"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
                  >
                    {dish.tag}
                  </p>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3
                      className="font-serif font-semibold text-[#7b1e2b] leading-snug"
                      style={{ fontSize: "1.02rem" }}
                    >
                      {dish.name}
                    </h3>
                    <p
                      className="font-serif font-bold text-[#d4af37] flex-shrink-0"
                      style={{ fontSize: "1.2rem" }}
                    >
                      ₹{dish.price}
                    </p>
                  </div>
                  <div
                    className="mt-3"
                    style={{
                      height: 1,
                      background:
                        "linear-gradient(to right, rgba(212,175,55,0.45), transparent)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <WaveDivider from="#7b1e2b" to="#fff8ee" />
      </section>

      {/* FULL MENU */}
      <section id="menu" className="pt-20 pb-0 bg-[#fff8ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <SectionHeader eyebrow="Explore" title="Our Full Menu" />
          <div className="overflow-x-auto pb-2 mb-8 -mx-1 px-1">
            <div className="flex gap-2 min-w-max">
              {Object.keys(MENU_DATA).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  data-ocid="menu.tab"
                  className={`menu-tab px-4 py-2 rounded-full font-semibold border whitespace-nowrap uppercase ${activeMenuTab === cat ? "bg-[#d4af37] text-[#7b1e2b] border-[#d4af37] shadow-md" : "bg-white text-[#7b1e2b] border-[#7b1e2b]/20"}`}
                  style={{ fontSize: "0.68rem", letterSpacing: "0.08em" }}
                  onClick={() => setActiveMenuTab(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
            style={{ border: "1px solid rgba(212,175,55,0.12)" }}
          >
            <div
              className="flex items-center gap-3 mb-6 pb-4"
              style={{ borderBottom: "1px solid rgba(212,175,55,0.18)" }}
            >
              <span
                style={{
                  display: "block",
                  width: 4,
                  height: 26,
                  background: "linear-gradient(to bottom, #d4af37, #c9a227)",
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              />
              <h3
                className="font-serif font-bold text-[#7b1e2b]"
                style={{ fontSize: "1.5rem" }}
              >
                {activeMenuTab}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {MENU_DATA[activeMenuTab].map((item) => (
                <div
                  key={`${activeMenuTab}-${item.name}`}
                  className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-[#fff8ee] transition-colors group cursor-default"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      style={{
                        display: "block",
                        width: 5,
                        height: 5,
                        borderRadius: "1px",
                        background: "rgba(212,175,55,0.65)",
                        transform: "rotate(45deg)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      className="text-gray-700 group-hover:text-[#7b1e2b] transition-colors"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {item.name}
                    </span>
                  </div>
                  <span
                    className="font-serif font-semibold text-[#d4af37] ml-6 flex-shrink-0"
                    style={{ fontSize: "0.92rem" }}
                  >
                    ₹{item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <WaveDivider from="#fff8ee" to="#7b1e2b" flip />
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="pt-20 pb-0 bg-[#7b1e2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <SectionHeader
            eyebrow="Testimonials"
            title="What Our Guests Say"
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <div
                key={review.name}
                data-ocid={`reviews.item.${i + 1}`}
                className="review-card bg-[#6b1424] rounded-xl p-7"
                style={{ border: "1px solid rgba(212,175,55,0.22)" }}
              >
                <StarRating />
                <p
                  className="font-serif italic leading-[1.8] mb-6 relative z-10"
                  style={{
                    fontSize: "0.96rem",
                    color: "rgba(255,248,238,0.82)",
                  }}
                >
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 relative z-10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #d4af37, #c9a227)",
                      boxShadow: "0 2px 10px rgba(212,175,55,0.45)",
                    }}
                  >
                    <span className="font-serif font-bold text-[#7b1e2b] text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p
                      className="font-semibold text-[#d4af37]"
                      style={{ fontSize: "0.88rem" }}
                    >
                      {review.name}
                    </p>
                    <p
                      className="mt-0.5"
                      style={{
                        fontSize: "0.66rem",
                        letterSpacing: "0.1em",
                        color: "rgba(255,248,238,0.4)",
                      }}
                    >
                      {review.title.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <WaveDivider from="#7b1e2b" to="#fff8ee" />
      </section>

      {/* GALLERY */}
      <section id="gallery" className="pt-20 pb-24 bg-[#fff8ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Moments" title="Our Gallery" />
          <div
            data-ocid="gallery.empty_state"
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="aspect-square rounded-xl flex flex-col items-center justify-center gap-3 transition-transform hover:scale-[1.02]"
                style={{
                  background:
                    n % 2 === 0
                      ? "linear-gradient(135deg, rgba(123,30,43,0.055) 0%, rgba(212,175,55,0.09) 100%)"
                      : "linear-gradient(135deg, rgba(212,175,55,0.07) 0%, rgba(123,30,43,0.055) 100%)",
                  border: "1.5px dashed rgba(212,175,55,0.32)",
                }}
              >
                <Camera
                  className="w-7 h-7"
                  style={{ color: "rgba(123,30,43,0.28)" }}
                />
                <p
                  className="font-medium text-center px-4"
                  style={{
                    color: "rgba(123,30,43,0.38)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  Photos Coming Soon
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-center font-serif italic"
            style={{ color: "rgba(123,30,43,0.4)", fontSize: "0.9rem" }}
          >
            Delicious moments from Sharnam will be added soon.
          </p>
        </div>
      </section>

      {/* RESERVATION */}
      <section id="reservations" className="pb-0 bg-[#fff8ee]">
        <div
          className="max-w-xs mx-auto flex items-center gap-4 pb-14"
          aria-hidden="true"
        >
          <span
            style={{
              flex: 1,
              height: 1,
              background: "rgba(212,175,55,0.28)",
              display: "block",
            }}
          />
          <span
            style={{
              display: "block",
              width: 5,
              height: 5,
              borderRadius: "1px",
              background: "rgba(212,175,55,0.5)",
              transform: "rotate(45deg)",
            }}
          />
          <span
            style={{
              flex: 1,
              height: 1,
              background: "rgba(212,175,55,0.28)",
              display: "block",
            }}
          />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Book a Table" title="Reserve Your Table" />
          <p
            className="text-center text-gray-500 -mt-8 mb-10"
            style={{ fontSize: "1rem" }}
          >
            Book your table and experience the finest Indian dining in Mandsaur.
          </p>
          {submitted ? (
            <div
              data-ocid="reservation.success_state"
              className="bg-[#7b1e2b] text-center rounded-2xl p-14 shadow-2xl"
              style={{ border: "1px solid rgba(212,175,55,0.3)" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #c9a227)",
                  boxShadow: "0 4px 20px rgba(212,175,55,0.5)",
                }}
              >
                <Star className="w-7 h-7 text-[#7b1e2b] fill-[#7b1e2b]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#d4af37] mb-3">
                Your table has been reserved!
              </h3>
              <p className="text-[#fff8ee]/65 leading-relaxed">
                We&apos;ll confirm shortly. Thank you for choosing Sharnam.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleReservation}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
              style={{ border: "1px solid rgba(212,175,55,0.14)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="res-name"
                    className="block font-semibold text-[#7b1e2b] mb-1.5"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
                  >
                    FULL NAME *
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    data-ocid="reservation.input"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your full name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-[#d4af37] transition-all bg-[#fdfaf4]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="res-phone"
                    className="block font-semibold text-[#7b1e2b] mb-1.5"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
                  >
                    PHONE NUMBER *
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    data-ocid="reservation.input"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-[#d4af37] transition-all bg-[#fdfaf4]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="res-email"
                    className="block font-semibold text-[#7b1e2b] mb-1.5"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="res-email"
                    type="email"
                    data-ocid="reservation.input"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-[#d4af37] transition-all bg-[#fdfaf4]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="res-guests"
                    className="block font-semibold text-[#7b1e2b] mb-1.5"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
                  >
                    NUMBER OF GUESTS *
                  </label>
                  <select
                    id="res-guests"
                    data-ocid="reservation.select"
                    required
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-[#d4af37] transition-all bg-[#fdfaf4]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n}{" "}
                        {n === 10 ? "or more" : n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="res-date"
                    className="block font-semibold text-[#7b1e2b] mb-1.5"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
                  >
                    PREFERRED DATE *
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    data-ocid="reservation.input"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-[#d4af37] transition-all bg-[#fdfaf4]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="res-time"
                    className="block font-semibold text-[#7b1e2b] mb-1.5"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
                  >
                    PREFERRED TIME *
                  </label>
                  <input
                    id="res-time"
                    type="time"
                    data-ocid="reservation.input"
                    required
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-[#d4af37] transition-all bg-[#fdfaf4]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="res-requests"
                    className="block font-semibold text-[#7b1e2b] mb-1.5"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
                  >
                    SPECIAL REQUESTS
                  </label>
                  <textarea
                    id="res-requests"
                    data-ocid="reservation.textarea"
                    value={formData.requests}
                    onChange={(e) =>
                      setFormData({ ...formData, requests: e.target.value })
                    }
                    placeholder="Any dietary requirements, allergies, or special occasions..."
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-[#d4af37] transition-all resize-none bg-[#fdfaf4]"
                  />
                </div>
              </div>
              {submitError && (
                <p className="mt-4 text-red-600 text-sm text-center">
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                data-ocid="reservation.submit_button"
                disabled={submitting}
                className="btn-gold mt-6 w-full py-4 bg-[#7b1e2b] text-[#d4af37] font-bold uppercase rounded-lg hover:bg-[#6a1922] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.18em",
                  border: "1px solid rgba(212,175,55,0.35)",
                }}
              >
                {submitting ? "Reserving..." : "Reserve Table"}
              </button>
            </form>
          )}
        </div>
        <div className="mt-20">
          <WaveDivider from="#fff8ee" to="#7b1e2b" flip />
        </div>
      </section>

      {/* LOCATION */}
      <section id="contact" className="pt-20 pb-0 bg-[#7b1e2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <SectionHeader eyebrow="Visit Us" title="Find Us" light />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-7">
              {[
                {
                  Icon: MapPin,
                  label: "Address",
                  content:
                    "Sharnam Restaurant\nMandsaur, Madhya Pradesh\nIndia – 458001",
                  sub: "",
                },
                {
                  Icon: Phone,
                  label: "Phone",
                  content: "Contact us for reservations",
                  sub: "",
                },
                {
                  Icon: Clock,
                  label: "Opening Hours",
                  content: "Monday – Sunday",
                  sub: "11:00 AM – 10:30 PM",
                },
                {
                  Icon: Mail,
                  label: "Email",
                  content: "info@sharnamrestaurant.com",
                  sub: "",
                },
              ].map(({ Icon, label, content, sub }) => (
                <div key={label} className="flex gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #d4af37, #c9a227)",
                      boxShadow: "0 2px 12px rgba(212,175,55,0.35)",
                    }}
                  >
                    <Icon className="w-4 h-4 text-[#7b1e2b]" />
                  </div>
                  <div>
                    <h3
                      className="font-serif font-semibold text-[#d4af37] mb-1"
                      style={{ fontSize: "1.02rem" }}
                    >
                      {label}
                    </h3>
                    <p
                      className="text-[#fff8ee]/65 leading-relaxed whitespace-pre-line"
                      style={{ fontSize: "0.88rem" }}
                    >
                      {content}
                    </p>
                    {sub && (
                      <p
                        className="text-[#d4af37] font-semibold mt-0.5"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {sub}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                height: "420px",
                border: "1px solid rgba(212,175,55,0.22)",
              }}
            >
              <iframe
                data-ocid="contact.map_marker"
                src="https://maps.google.com/maps?q=Mandsaur,Madhya+Pradesh,India&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sharnam Restaurant Location"
              />
            </div>
          </div>
        </div>
        <WaveDivider from="#7b1e2b" to="#3d0c12" />
      </section>

      {/* FOOTER */}
      <footer className="bg-[#3d0c12] text-[#fff8ee] pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-[#d4af37] text-3xl font-serif leading-none">
                  𝓢
                </span>
                <span
                  className="text-[#d4af37] font-serif font-bold"
                  style={{ fontSize: "1.05rem", letterSpacing: "0.22em" }}
                >
                  SHARNAM
                </span>
              </div>
              <p
                className="font-serif italic mb-4"
                style={{ fontSize: "0.88rem", color: "rgba(255,248,238,0.5)" }}
              >
                Taste the Tradition of India
              </p>
              <div
                style={{
                  height: 1,
                  width: 36,
                  background: "rgba(212,175,55,0.35)",
                  marginBottom: 12,
                }}
              />
              <p
                className="leading-relaxed"
                style={{ fontSize: "0.76rem", color: "rgba(255,248,238,0.35)" }}
              >
                Authentic Indian cuisine crafted with love and tradition in the
                heart of Mandsaur, Madhya Pradesh.
              </p>
            </div>
            <div>
              <h4
                className="font-serif text-[#d4af37] font-semibold mb-5"
                style={{ fontSize: "0.7rem", letterSpacing: "0.22em" }}
              >
                QUICK LINKS
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="transition-colors flex items-center gap-2 group"
                      style={{
                        fontSize: "0.84rem",
                        color: "rgba(255,248,238,0.5)",
                      }}
                    >
                      <ChevronRight
                        className="w-3 h-3 group-hover:text-[#d4af37] transition-colors"
                        style={{ color: "rgba(212,175,55,0.35)" }}
                      />
                      <span className="group-hover:text-[#d4af37] transition-colors">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="font-serif text-[#d4af37] font-semibold mb-5"
                style={{ fontSize: "0.7rem", letterSpacing: "0.22em" }}
              >
                CONTACT US
              </h4>
              <ul className="space-y-3 mb-7">
                {[
                  { Icon: MapPin, text: "Mandsaur, Madhya Pradesh, India" },
                  { Icon: Phone, text: "Contact us for reservations" },
                  { Icon: Mail, text: "info@sharnamrestaurant.com" },
                ].map(({ Icon, text }) => (
                  <li key={text} className="flex items-start gap-2.5">
                    <Icon
                      className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                      style={{ color: "rgba(212,175,55,0.6)" }}
                    />
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(255,248,238,0.45)",
                      }}
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
              <h4
                className="font-serif text-[#d4af37] font-semibold mb-3"
                style={{ fontSize: "0.7rem", letterSpacing: "0.22em" }}
              >
                FOLLOW US
              </h4>
              <div className="flex gap-2.5">
                {[
                  {
                    label: "Instagram",
                    isLucide: true,
                    Icon: Instagram,
                    path: "",
                  },
                  {
                    label: "Facebook",
                    isLucide: false,
                    Icon: null,
                    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                  },
                  {
                    label: "Google Reviews",
                    isLucide: false,
                    Icon: null,
                    path: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
                  },
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      background: "rgba(123,30,43,0.55)",
                      border: "1px solid rgba(212,175,55,0.18)",
                      color: "rgba(255,248,238,0.6)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #d4af37, #c9a227)";
                      e.currentTarget.style.color = "#7b1e2b";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(123,30,43,0.55)";
                      e.currentTarget.style.color = "rgba(255,248,238,0.6)";
                    }}
                  >
                    {s.isLucide && s.Icon ? (
                      <s.Icon className="w-4 h-4" />
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d={s.path} />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6"
            style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}
          >
            <p style={{ fontSize: "0.75rem", color: "rgba(255,248,238,0.3)" }}>
              &copy; {new Date().getFullYear()} Sharnam Restaurant. All rights
              reserved.
            </p>
            <p style={{ fontSize: "0.73rem", color: "rgba(255,248,238,0.25)" }}>
              Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d4af37] transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
