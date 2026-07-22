import { notFound } from 'next/navigation'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { ToolLayout } from '@/components/layout/tool-layout'
import { createToolMetadata } from '@/lib/seo'
import { getToolIds, tools } from '@/lib/tools'

interface PageProps {
  params: Promise<{ toolId: string }>
}

export async function generateStaticParams() {
  return getToolIds().map((toolId) => ({ toolId }))
}

export async function generateMetadata({ params }: PageProps) {
  const { toolId } = await params
  const tool = tools[toolId]

  if (!tool) {
    return { title: 'Tool Not Found' }
  }

  return createToolMetadata(tool)
}

export default async function ToolPage({ params }: PageProps) {
  const { toolId } = await params
  const tool = tools[toolId]

  if (!tool) {
    notFound()
  }

  const ToolComponent = (await tool.component()).default

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <ToolLayout tool={tool}>
          <ToolComponent />
        </ToolLayout>
      </main>
      <Footer />
    </>
  )
}
