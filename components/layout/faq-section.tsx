import type { ToolFaq } from '@/lib/tools'

interface FaqSectionProps {
  items: ToolFaq[]
}

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <section aria-labelledby="faq-heading" className="border-t border-border/60 bg-muted/20 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="faq-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-8 grid max-w-3xl gap-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-border/70 bg-card/80 p-5 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
