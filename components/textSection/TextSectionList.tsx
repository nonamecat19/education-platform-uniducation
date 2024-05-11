'use client'
import { CompleteTextSection } from '@/lib/db/schema'
import { trpc } from '@/lib/trpc/client'
import TextSectionModal from './TextSectionModal'

export default function TextSectionList({
  textSection,
}: {
  textSection: CompleteTextSection[]
}) {
  const { data: t } = trpc.textSection.getTextSection.useQuery(undefined, {
    initialData: { textSection },
    refetchOnMount: false,
  })

  if (t.textSection.length === 0) {
    return <EmptyState />
  }

  return (
    <ul>
      {t.textSection.map((textSection) => (
        <TextSection textSection={textSection} key={textSection.id} />
      ))}
    </ul>
  )
}

const TextSection = ({ textSection }: { textSection: CompleteTextSection }) => {
  return (
    <li className='flex justify-between my-2'>
      <div className='w-full'>
        <div>{textSection.unitId}</div>
      </div>
      <TextSectionModal textSection={textSection} />
    </li>
  )
}

const EmptyState = () => {
  return (
    <div className='text-center'>
      <h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
        No text section
      </h3>
      <p className='mt-1 text-sm text-muted-foreground'>
        Get started by creating a new text section.
      </p>
      <div className='mt-6'>
        <TextSectionModal emptyState={true} />
      </div>
    </div>
  )
}
