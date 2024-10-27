import { Skeleton } from '@mantine/core';

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <>
        
        <Skeleton height={50} radius="md" width='30%' />
        <Skeleton height={50} radius="md" width='30%' />
        <Skeleton height={50} radius="md" width='30%' />
      </>
    )
  }