import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Speak naturally",
    description:
      "Record a voice note or type your thoughts. No complicated forms or lengthy typing.",
  },
  {
    number: "02",
    title: "Choose your document",
    description:
      "Select the type of document you need, from visit notes and client memos to reports and letters.",
  },
  {
    number: "03",
    title: "Generate and download",
    description:
      "Turn your words into a clear, structured document and download it as a PDF.",
  },
];

const documentTypes = [
  "Legal memos",
  "Home care records",
  "Insurance claims",
  "Client memos",
  "Visit notes",
  "Showing reports",
  "Session summaries",
  "Expense reports",
  "Complaint letters",
  "Podcast notes",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-slate-950">
            Dicta<span className="text-blue-600">Doc</span>
          </Link>
          <nav className="flex items-center gap-6">
            <a href="#how-it-works" className="hidden text-sm font-medium text-slate-600 hover:text-blue-600 sm:inline">
              How it works
            </a>
            <Link href="/record" className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              Start Creating
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative">
        <div className="absolute inset-0 -z-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              Less paperwork. More productivity.
            </div>
            <h1 className="max-w-2xl text-5xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-6xl">
              Your voice.
              <br />
              Your documents.
              <br />
              <span className="text-blue-600">Done.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              DictaDoc turns the words you speak into professional, structured documents. Record your thoughts, choose a document type, and let DictaDoc do the paperwork.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/record" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                Start Creating <span className="ml-3" aria-hidden="true">→</span>
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700">
                See How It Works
              </a>
            </div>
            <p className="mt-5 text-sm text-slate-500">
              Speak it. Structure it. Download it.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2rem] bg-blue-200/40 blur-2xl" />
            <div className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl shadow-blue-900/10 sm:p-9">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm font-semibold text-slate-500">DICTADOC WORKSPACE</p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">Create a document</h2>
                </div>
                <div className="rounded-xl bg-blue-50 p-3 text-2xl" aria-hidden="true">✦</div>
              </div>
              <div className="mt-7 rounded-2xl bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white">●</div>
                  <div>
                    <p className="font-semibold text-slate-900">Your voice, captured</p>
                    <p className="text-sm text-slate-500">Record or enter your notes</p>
                  </div>
                </div>
                <div className="mt-5 flex h-12 items-center justify-center gap-1.5">
                  {Array.from({ length: 25 }).map((_, index) => (
                    <span key={index} className="w-1 rounded-full bg-blue-500" style={{ height: `${12 + ((index * 17) % 28)}px` }} />
                  ))}
                </div>
                <p className="mt-2 text-center text-xs text-slate-400">
                  From spoken thoughts to organised documents
                </p>
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                  <span className="text-sm font-medium text-slate-700">Choose a document type</span>
                  <span className="text-blue-600">→</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                  <span className="text-sm font-medium text-slate-700">Generate your document</span>
                  <span className="text-blue-600">→</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-blue-600 p-4 text-white">
                  <span className="text-sm font-semibold">Download your PDF</span>
                  <span>↓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Simple workflow</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            From voice note to finished document
          </h2>
          <p className="mt-5 leading-7 text-slate-600">
            Spend less time writing and formatting. DictaDoc helps turn your ideas into organised paperwork in three simple steps.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.number} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-sm font-extrabold tracking-widest text-blue-600">{feature.number}</p>
              <h3 className="mt-5 text-xl font-bold text-slate-950">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
              Paperwork after work? <span className="text-blue-600">Not anymore.</span>
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Create the documents you need without starting from a blank page.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {documentTypes.map((type) => (
              <span key={type} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to let your voice do the work?
          </h2>
          <p className="mt-5 leading-7 text-slate-300">
            Start with a voice note. Finish with a professional document.
          </p>
          <Link href="/record" className="mt-8 inline-flex items-center justify-center rounded-full bg-blue-500 px-8 py-4 font-bold text-white transition hover:bg-blue-400">
            Start Creating <span className="ml-3">→</span>
          </Link>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 pb-8 text-center text-sm text-slate-400">
        <div className="mx-auto max-w-7xl border-t border-slate-800 pt-7">
          <p>© 2026 DictaDoc. All rights reserved.</p>
          <p className="mt-2">Your voice. Your documents. Done.</p>
        </div>
      </footer>
    </main>
  );
}

