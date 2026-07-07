import Link from 'next/link'
import { ArrowLeft, FileText, ShieldCheck, Lock } from 'lucide-react'
import { AegisLogo } from '@/components/aegis/logo'

const DOCS = [
  { href: '/legal/privacy', label: 'Privacy Policy', icon: Lock },
  { href: '/legal/terms', label: 'Terms of Service', icon: FileText },
  { href: '/legal/security', label: 'Security', icon: ShieldCheck },
]

export type LegalSection = { heading: string; body: string[] }

export function LegalLayout({
  title,
  updated,
  intro,
  sections,
  active,
}: {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
  active: string
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Back to home"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <AegisLogo />
            <span className="hidden rounded-full border border-border/70 px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-flex">
              Legal
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[220px_1fr] lg:px-8">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Documents
          </p>
          <nav className="flex flex-col gap-1">
            {DOCS.map((d) => {
              const isActive = d.href === active
              return (
                <Link
                  key={d.href}
                  href={d.href}
                  className={`inline-flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'border border-primary/30 bg-primary/10 font-medium text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <d.icon className="h-4 w-4" />
                  {d.label}
                </Link>
              )
            })}
          </nav>
          <div className="mt-6 rounded-xl border border-border/70 bg-card/60 p-4 text-xs leading-relaxed text-muted-foreground">
            This is a concept product built for the Google Hack2Skill PromptWars hackathon. Not
            affiliated with FIFA. Demonstration content only.
          </div>
        </aside>

        {/* Content */}
        <article className="min-w-0">
          <h1 className="font-display text-4xl font-bold tracking-tight text-balance">{title}</h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Last updated · {updated}
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">{intro}</p>

          <div className="mt-10 space-y-10">
            {sections.map((s, i) => (
              <section key={s.heading}>
                <h2 className="font-display text-xl font-semibold">
                  <span className="mr-2 text-primary">{String(i + 1).padStart(2, '0')}</span>
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {s.body.map((p, j) => (
                    <p key={j} className="text-sm leading-relaxed text-foreground/85 text-pretty">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 border-t border-border/60 pt-6 text-sm text-muted-foreground">
            Questions about this document? Contact{' '}
            <span className="font-medium text-foreground">legal@pitchcontrol.example</span>.
          </div>
        </article>
      </div>
    </div>
  )
}
