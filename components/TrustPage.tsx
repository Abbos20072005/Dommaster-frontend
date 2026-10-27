import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';
import React from 'react';

import type { TrustBlock, TrustPageContent, TrustPageSet } from '@/content/trust/types';

import { BaseLayout, MobileHeader } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { TrackedLink } from '@/components/TrackedLink';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const URL_PATTERN = /(https?:\/\/[^\s)]+[^\s).,;:])/g;

/** The text with its web addresses as links (the legal texts name several pages). */
const Linkified = ({ text }: { text: string }) => (
  <>
    {text.split(URL_PATTERN).map((part, index) =>
      index % 2 === 1 ? (
        <a
          className='text-primary break-all underline'
          href={part}
          key={index}
          rel='noreferrer'
          target='_blank'
        >
          {part}
        </a>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      )
    )}
  </>
);

const Block = ({ block }: { block: TrustBlock }) => {
  switch (block.type) {
    case 'p':
      return (
        <p className='text-[15px] leading-7'>
          <Linkified text={block.text} />
        </p>
      );
    case 'h2':
      return (
        <h2 className='scroll-mt-24 pt-4 text-lg font-bold md:text-2xl' id={block.id}>
          {block.text}
        </h2>
      );
    case 'meta':
      return <p className='text-muted-foreground text-sm'>{block.text}</p>;
    case 'list':
      return (
        <ul className='list-disc space-y-1.5 pl-5 text-[15px] leading-7'>
          {block.items.map((item) => (
            <li key={item}>
              <Linkified text={item} />
            </li>
          ))}
        </ul>
      );
    case 'steps':
      return (
        <ol className='space-y-3'>
          {block.items.map((item, index) => (
            <li className='flex gap-3 text-[15px] leading-7' key={item.title}>
              <span className='bg-primary/10 text-primary flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold'>
                {index + 1}
              </span>
              <span>
                <strong>{item.title}</strong> <Linkified text={item.text} />
              </span>
            </li>
          ))}
        </ol>
      );
    case 'table':
      return (
        <div className='border-border overflow-x-auto rounded-xl border'>
          <table className='w-full min-w-[480px] text-left text-sm leading-6'>
            {block.head && (
              <thead className='bg-muted'>
                <tr>
                  {block.head.map((cell) => (
                    <th className='px-4 py-2.5 font-bold' key={cell}>
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows.map((row, index) => (
                <tr className='border-border border-t align-top' key={index}>
                  {row.map((cell, cellIndex) => (
                    <td
                      className={cellIndex === 0 ? 'px-4 py-2.5 font-semibold' : 'px-4 py-2.5'}
                      key={cellIndex}
                    >
                      <Linkified text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'kv':
      return (
        <dl className='border-border divide-border divide-y rounded-xl border'>
          {block.rows.map((row) => (
            <div className='grid gap-1 px-4 py-3 text-[15px] sm:grid-cols-[200px_1fr]' key={row.key}>
              <dt className='text-muted-foreground'>{row.key}</dt>
              <dd className='font-medium'>
                {row.href ? (
                  <a className='text-primary' href={row.href}>
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      );
    case 'faq':
      return (
        <div className='space-y-2'>
          {block.items.map((item) => (
            <details
              className='border-border group rounded-xl border px-4 py-3 text-[15px] leading-7'
              key={item.q}
            >
              <summary className='cursor-pointer font-semibold'>{item.q}</summary>
              <p className='text-muted-foreground mt-2'>
                <Linkified text={item.a} />
              </p>
            </details>
          ))}
        </div>
      );
    case 'cta':
      return (
        <section className='bg-primary/5 border-primary/15 grid gap-3 rounded-2xl border p-5 md:p-6'>
          <h2 className='text-lg font-bold md:text-2xl'>{block.title}</h2>
          {block.text && <p className='text-[15px] leading-7'>{block.text}</p>}
          <div className='flex flex-wrap gap-2'>
            {block.buttons.map((button) => {
              const className = cn(
                'inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-bold transition-colors',
                button.variant === 'outline'
                  ? 'border-primary text-primary hover:bg-primary/5 border bg-white'
                  : 'bg-primary hover:bg-primary/90 text-white'
              );
              const external = /^(https?:|tel:|mailto:)/.test(button.href);

              if (button.event) {
                return (
                  <TrackedLink
                    className={className}
                    event={button.event}
                    href={button.href}
                    key={button.href}
                    {...(external && button.href.startsWith('http')
                      ? { rel: 'noreferrer', target: '_blank' }
                      : {})}
                  >
                    {button.text}
                  </TrackedLink>
                );
              }
              return external ? (
                <a className={className} href={button.href} key={button.href}>
                  {button.text}
                </a>
              ) : (
                <Link className={className} href={button.href} key={button.href}>
                  {button.text}
                </Link>
              );
            })}
          </div>
        </section>
      );
    case 'links':
      return (
        <p className='text-sm leading-7'>
          <span className='text-muted-foreground'>{block.label}: </span>
          {block.items.map((item, index) => (
            <React.Fragment key={item.href}>
              {index > 0 && ' · '}
              <Link className='text-primary underline' href={item.href}>
                {item.text}
              </Link>
            </React.Fragment>
          ))}
        </p>
      );
  }
};

/** The texts of the page in the language of the visitor (the missing language falls back to uz). */
const pickContent = (set: TrustPageSet, locale: string): TrustPageContent =>
  set[locale as keyof TrustPageSet] ?? set.uz;

/** `generateMetadata` of a trust page: its own title, description and canonical. */
export const getTrustMetadata = async (set: TrustPageSet): Promise<Metadata> => {
  const content = pickContent(set, await getLocale());

  return {
    title: { absolute: content.title },
    description: content.description,
    ...(content.noindex ? { robots: { index: false, follow: true } } : {})
  };
};

/** One template for the trust pages: breadcrumb, H1 and the blocks of the text. */
export const TrustPage = async ({ content: set }: { content: TrustPageSet }) => {
  const content = pickContent(set, await getLocale());

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 max-w-4xl space-y-4 md:mt-4'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Buildex</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{content.h1}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-xl font-bold md:text-3xl lg:text-4xl'>{content.h1}</h1>
        {content.blocks.map((block, index) => (
          <Block block={block} key={index} />
        ))}
      </BaseLayout>
    </div>
  );
};
