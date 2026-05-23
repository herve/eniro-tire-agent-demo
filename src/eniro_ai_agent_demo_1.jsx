import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Phone, CheckCircle2, Wrench, Flame, Droplets, Menu, Star, CalendarDays } from "lucide-react";

const companies = [
  {
    "name": "Liljeholmens Däck & Service",
    "address": "Trekantsvägen 7, 117 43 Stockholm",
    "fit": 97,
    "tag": "Snabbast tid",
    "reason": "Lediga tider före deadline, däckbyte och balansering på plats.",
    "price": "699–1 199 kr",
    "times": [
      "Idag 15:30",
      "Imorgon 08:00",
      "Imorgon 11:30"
    ],
    "phone": "08-xxx xx xx"
  },
  {
    "name": "Årsta Bil & Däckcenter",
    "address": "Årsta Skolgränd 12, 117 43 Stockholm",
    "fit": 92,
    "tag": "Däckhotell",
    "reason": "Bra val om kunden vill ha flexibel tid. Däckhotell finns men behövs inte i detta scenario.",
    "price": "799–1 499 kr",
    "times": [
      "Imorgon 09:30",
      "Imorgon 14:00",
      "Fredag 10:00"
    ],
    "phone": "08-xxx xx xx"
  },
  {
    "name": "Södermalm Bilservice",
    "address": "Hornsgatan 150, 117 28 Stockholm",
    "fit": 86,
    "tag": "Bilservice + däck",
    "reason": "Relevant om kunden även vill boka bilservice eller kontroll inför vintern.",
    "price": "899–1 699 kr",
    "times": [
      "Imorgon 13:00",
      "Fredag 08:30",
      "Fredag 15:00"
    ],
    "phone": "08-xxx xx xx"
  }
];

const steps = ["home", "diagnose", "matching", "results", "booking", "confirmed"];
const typedProblem = "Jag behöver byta till vinterdäck innan 1 december nära Liljeholmen";
const popularItems = ["Däckbyte", "Bilservice", "Däckhotell", "Bilbesiktning"];
const matchingBullets = ["Identifierar däckverkstäder", "Prioriterar tider före 1 december", "Matchar däckbyte och balansering utan däckhotell"];

const diagnosisChips = [
    { icon: "CalendarDays", title: "Deadline", text: "Byt innan 1 december för att undvika sista-minuten-brist." },
    { icon: "Wrench", title: "Däckbyte", text: "Montering, lufttryck och enkel säkerhetskontroll." },
    { icon: "Star", title: "Återkommande", text: "Naturlig återbokning till sommardäck på våren." }
];

const agentContent = {
    "diagnose": "Du behöver byta till vinterdäck före deadline. Behöver du också däckhotell?",
    "matching": "Jag söker däckverkstäder nära Liljeholmen med lediga tider före 1 december. Jag filtrerar på däckbyte utan däckhotell.",
    "results": "3 verkstäder har tider inom kort. Estimerat pris för däckbyte: cirka 699–1 199 kr.",
    "booking": "Välj en tid eller be verkstaden ringa upp. Du kan även lägga till däckhotell som återkommande tjänst.",
    "confirmed": "Bokningsförfrågan skickad. Verkstaden ringer dig för att bekräfta tiden."
};

const iconMap = { CalendarDays, Wrench, Star, Phone, Flame, Droplets };

export default function EniroAIAgentDemo() {
  const [stepIndex, setStepIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(companies[0].times[0]);
  const step = steps[stepIndex];

  const progress = useMemo(() => Math.round((stepIndex / (steps.length - 1)) * 100), [stepIndex]);

  const next = () => {
    if (stepIndex === 0 && !query) setQuery(typedProblem);
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };
  const prev = () => setStepIndex((i) => Math.max(i - 1, 0));
  const restart = () => {
    setQuery("");
    setSelectedSlot(companies[0].times[0]);
    setStepIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#f6f6f1] text-[#062f38]">
      <Hero query={query} setQuery={setQuery} step={step} next={next} />

      <main className="mx-auto max-w-6xl px-5 pb-16">
        <AnimatePresence mode="wait">
          {step === "home" && <HomeBelow key="home" />}
          {step === "diagnose" && <Diagnosis key="diagnose" />}
          {step === "matching" && <Matching key="matching" />}
          {step === "results" && <Results key="results" selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} next={next} />}
          {step === "booking" && <Booking key="booking" selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} next={next} />}
          {step === "confirmed" && <Confirmed key="confirmed" selectedSlot={selectedSlot} restart={restart} />}
        </AnimatePresence>

        <DemoControls stepIndex={stepIndex} progress={progress} prev={prev} next={next} restart={restart} />
      </main>
    </div>
  );
}

function EniroLogo() {
  return (
    <svg
      className="h-[34px] w-[136px] text-white"
      viewBox="0 0 284 71"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Eniro"
      role="img"
    >
      <path
        fill="currentColor"
        d="M283.5 35.4c0 19.6-15.9 35.4-35.4 35.4V58.1c12.5 0 22.7-10.2 22.7-22.7s-10.2-22.7-22.7-22.7-22.7 10.2-22.7 22.7h-12.8C212.6 15.9 228.5 0 248 0s35.5 15.9 35.5 35.4zM180 29.1v39.7h12.8V29.1c0-9 7.3-16.3 16.3-16.3V0C193 0 180 13 180 29.1zm-14.9-27h-12.8v66.6h12.8V2.1zM108.4 0c-16 0-29.1 13-29.1 29.1v39.7h12.8V29.1c0-9 7.3-16.3 16.3-16.3s16.3 7.3 16.3 16.3v39.7h12.8V29.1c0-16.1-13-29.1-29.1-29.1zm-73 0C15.9 0 0 15.9 0 35.4 0 55 15.9 70.9 35.4 70.9V58.1c-12.5 0-22.7-10.2-22.7-22.7s10.2-22.7 22.7-22.7c10.3 0 19 6.9 21.8 16.3H29.1v12.8h41.2c.4-2.1.6-4.2.6-6.4C70.9 15.9 55 0 35.4 0z"
      />
    </svg>
  );
}

function Hero({ query, setQuery, step, next }) {
  const agentOpen = step !== "home";
  return (
    <section className="relative overflow-hidden rounded-b-[4rem] bg-[#062f38] text-white shadow-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.18),transparent_30%),linear-gradient(135deg,rgba(0,0,0,0.35),rgba(0,0,0,0.8))]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(120deg,rgba(255,255,255,0.16)_0,transparent_34%),radial-gradient(circle_at_85%_35%,rgba(255,245,43,0.25),transparent_22%)]" />

      <div className="relative mx-auto max-w-7xl px-5 py-5">
        <nav className="flex items-center justify-between text-sm">
          <EniroLogo />
          <div className="hidden gap-8 md:flex">
            <span>⌾ Karta</span>
            <span>◇ Vägbeskrivning</span>
            <span>☎ Vem Ringde</span>
            <span>⚡ Marknadsföring</span>
            <span>✓ Verifiera ditt företag</span>
          </div>
          <Menu className="h-6 w-6" />
        </nav>

        <div className="mx-auto flex max-w-4xl flex-col items-center py-16">
          <motion.div
            layout
            className={`w-full overflow-hidden rounded-[2rem] bg-[#fff52b] text-[#062f38] shadow-2xl ${agentOpen ? "p-4" : "p-2"}`}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
          >
            <div className="flex items-center gap-3 rounded-full bg-[#fff52b] px-5 py-4">
              <input
                className="w-full bg-transparent text-lg outline-none placeholder:text-[#062f38]/80"
                placeholder="Sök företag, tjänster, person, adress, telefon"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={next} className="rounded-full bg-[#062f38] p-3 text-white transition hover:scale-105">
                <Search className="h-5 w-5" />
              </button>
            </div>

            <AnimatePresence>
              {agentOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 rounded-[1.5rem] bg-white p-5 text-[#062f38]"
                >
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <span className="rounded-full bg-[#e8f4f6] px-3 py-1">AI Eniro</span>
                    <span className="text-[#557078]">Analyserar behov och hittar tillgängliga tider</span>
                  </div>
                  <AgentPanelStep step={step} onNext={next} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {!agentOpen && (
            <>
              <PersonalizedTirePrompt onStart={next} />
              <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm">
                {popularItems.map((x) => (
                  <button key={x} className="rounded-full border border-white/60 px-4 py-2 backdrop-blur-sm">{x}</button>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </section>
  );
}

function PersonalizedTirePrompt({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-5 w-full rounded-[1.5rem] bg-[#dff1f4] p-6 text-[#062f38] shadow-xl md:p-8"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-[#557078]">Personlig påminnelse</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">Hej Thomas,</h1>
      <div className="mt-4 space-y-3 text-lg leading-relaxed">
        <p>Det är snart dags att byta till vinterdäck.</p>
        <p>Sista dagen är den 1 december.</p>
        <p>
          Vill du att Eniro hittar en verkstad nära Liljeholmen med snabba lediga tider och möjlighet till
          återkommande vårbokning?
        </p>
      </div>
      <button
        onClick={onStart}
        className="mt-6 rounded-full bg-[#062f38] px-6 py-3 font-bold text-white transition hover:scale-105"
      >
        Hitta lediga tider
      </button>
    </motion.div>
  );
}

function AgentPanelStep({ step, onNext }) {
  return (
    <div>
      <p className="text-lg leading-relaxed">{agentContent[step] || "Beskriv ditt behov direkt i sökfältet."}</p>

      {step === "diagnose" && (
        <div className="mt-5 rounded-[1.5rem] bg-[#dff1f4] p-5 text-[#062f38]">
          <p className="text-lg font-bold">Behöver du däckhotell?</p>
          <p className="mt-2 text-sm text-[#557078]">
            Det påverkar vilka verkstäder jag söker efter. I den här demon säger Thomas nej.
          </p>

          <div className="mt-4 flex gap-3">
            <button className="rounded-full border border-[#062f38]/30 bg-white px-5 py-2 font-semibold text-[#062f38]">
              Ja
            </button>
            <button
              onClick={onNext}
              className="rounded-full bg-[#062f38] px-5 py-2 font-semibold text-white transition hover:scale-105"
            >
              Nej
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DemoControls({ stepIndex, progress, prev, next, restart }) {
  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur">
      <div className="mb-3 flex items-center justify-between text-sm font-semibold">
        <span>Screen {stepIndex + 1}/6</span>
        <span>{progress}%</span>
      </div>
      <div className="mb-4 h-2 rounded-full bg-[#dbe6e8]"><div className="h-2 rounded-full bg-[#fff52b]" style={{ width: `${progress}%` }} /></div>
      <div className="flex flex-wrap gap-2">
        <button onClick={prev} className="rounded-full border px-4 py-2">Back</button>
        <button onClick={next} className="rounded-full bg-[#062f38] px-4 py-2 text-white">Next screen</button>
        <button onClick={restart} className="rounded-full border px-4 py-2">Restart</button>
      </div>
    </div>
  );
}

const fade = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

function HomeBelow() {
  return (
    <motion.div {...fade} className="mt-16 text-center">
      <h2 className="text-3xl font-bold">Populärt nära dig</h2>
      <p className="mt-2 text-[#557078]">Startläge: Eniros startsida innan sökfältet blir en bokningsagent.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {popularItems.map((x) => (
          <div key={x} className="flex h-36 items-end justify-center rounded-3xl bg-white p-4 shadow">
            <span className="rounded-full bg-[#dff1f4] px-4 py-2 text-sm font-semibold">{x}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Diagnosis() {
  return (
    <motion.section {...fade} className="mx-auto mt-10 max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="text-2xl font-bold">Planering inför vinterdäck</h2>
      <p className="mt-3 text-lg">Agenten identifierar deadline, plats och behov. Fokus är att säkra en tid före rusningen, inte bara visa en lista med verkstäder.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {diagnosisChips.map((chip) => (
          <Chip key={chip.title} iconName={chip.icon} title={chip.title} text={chip.text} />
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-[#f6f6f1] p-5 font-semibold">Rekommendation: boka däckverkstad med ledig tid före deadline. Däckhotell behövs inte.</div>
    </motion.section>
  );
}

function Chip({ iconName, title, text }) {
  const Icon = iconMap[iconName] || Star;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-3 inline-flex rounded-full bg-[#e8f4f6] p-3"><Icon className="h-5 w-5" /></div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-1 text-sm text-[#557078]">{text}</p>
    </motion.div>
  );
}

function Matching() {
  return (
    <motion.section {...fade} className="mx-auto mt-10 max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="text-2xl font-bold">Söker lokalt i Liljeholmen</h2>
      <p className="mt-3 text-lg">Agenten emulerar onsite search: kategori, lokalt område, tillgänglighet och bokningsintention.</p>
      <div className="mt-8 rounded-3xl bg-[#e8f4f6] p-8">
        <div className="flex items-center gap-3 font-semibold"><MapPin /> Liljeholmen, Stockholm</div>
        <div className="mt-6 space-y-3">
          {matchingBullets.map((x, i) => (
            <motion.div key={x} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: i * 0.3 }} className="rounded-full bg-white p-4 shadow-sm">
              <span className="font-semibold">{x}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function Results({ selectedSlot, setSelectedSlot, next }) {
  return (
    <motion.section {...fade} className="mt-10">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold">Top 3 tillgängliga däckverkstäder</h2>
          <p className="mt-2 text-[#557078]">Rankad primärt på tid före deadline, därefter närhet och återkommande värde.</p>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {companies.map((c, i) => (
          <CompanyCard key={c.name} company={c} rank={i + 1} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} recommended={i === 0} onBook={next} />
        ))}
      </div>
    </motion.section>
  );
}

function CompanyCard({ company, rank, selectedSlot, setSelectedSlot, recommended, onBook }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: rank * 0.12 }} className={`rounded-3xl bg-white p-5 shadow-xl ${recommended ? "ring-4 ring-[#fff52b]" : ""}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <span className="rounded-full bg-[#e8f4f6] px-3 py-1 text-xs font-bold">#{rank} {company.tag}</span>
          <h3 className="mt-3 text-xl font-bold">{company.name}</h3>
        </div>
        <div className="text-right text-2xl font-bold">{company.fit}%</div>
      </div>
      <p className="flex gap-2 text-sm text-[#557078]"><MapPin className="h-4 w-4 shrink-0" /> {company.address}</p>
      <p className="mt-3 text-sm">{company.reason}</p>
      <div className="mt-4 flex items-center gap-2 text-sm font-semibold"><Star className="h-4 w-4" /> Estimat: {company.price}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {company.times.map((t) => (
          <button key={t} onClick={() => setSelectedSlot(t)} className={`rounded-full px-3 py-2 text-sm font-semibold ${selectedSlot === t ? "bg-[#062f38] text-white" : "bg-[#f6f6f1]"}`}>{t}</button>
        ))}
      </div>
      {recommended && <button onClick={onBook} className="mt-5 w-full rounded-full bg-[#fff52b] px-4 py-3 font-bold text-[#062f38]">Boka vald tid</button>}
    </motion.div>
  );
}

function Booking({ selectedSlot, setSelectedSlot, next }) {
  const recommended = companies[0];
  return (
    <motion.section {...fade} className="mx-auto mt-10 max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
      <div className="flex items-center gap-3"><CalendarDays className="h-7 w-7" /><h2 className="text-3xl font-bold">Boka däckbyte</h2></div>
      <p className="mt-3 text-lg">Jag rekommenderar Liljeholmens Däck & Service eftersom de har snabbast lediga tid före deadline och tydlig däckkompetens.</p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {recommended.times.map((t) => (
          <button key={t} onClick={() => setSelectedSlot(t)} className={`rounded-2xl border p-5 text-left font-bold ${selectedSlot === t ? "border-[#062f38] bg-[#fff52b]" : "bg-white"}`}>{t}</button>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={next} className="rounded-full bg-[#062f38] px-6 py-3 font-bold text-white">Skicka bokningsförfrågan</button>
        <button onClick={next} className="rounded-full border px-6 py-3 font-bold"><Phone className="mr-2 inline h-4 w-4" /> Bli uppringd inom 15 min</button>
      </div>
      <p className="mt-5 text-sm text-[#557078]">Tillgänglighet och pris är uppskattningar för demo.</p>
    </motion.section>
  );
}

function Confirmed({ selectedSlot, restart }) {
  return (
    <motion.section {...fade} className="mx-auto mt-10 max-w-3xl rounded-3xl bg-white p-10 text-center shadow-xl">
      <CheckCircle2 className="mx-auto h-16 w-16 text-[#062f38]" />
      <h2 className="mt-4 text-3xl font-bold">Bokningsförfrågan skickad</h2>
      <p className="mt-3 text-lg">Liljeholmens Däck & Service ringer dig för att bekräfta tiden.</p>
      <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-[#f6f6f1] p-5 font-bold">Vald tid: {selectedSlot}</div>
      <button onClick={restart} className="mt-6 rounded-full bg-[#fff52b] px-6 py-3 font-bold">Starta om demo</button>
    </motion.section>
  );
}
