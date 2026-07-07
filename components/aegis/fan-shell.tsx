import { PortalNav } from '@/components/aegis/portal-nav'

export function FanShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="light min-h-screen bg-background text-foreground">
      <PortalNav label="FanHub" cta={{ href: '/command', text: 'Command Center' }} />
      <main className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-balance">{title}</h1>
            {subtitle && (
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </header>
        {children}
      </main>
    </div>
  )
}
