import { FaqQuestionItem } from '@/components/FaqQuestionItem';
import { localizeFaqHtml } from '@/lib/faq';

interface Props {
  locale: string;
  topics: FaqTopic[];
  /** the level of the title of a topic: under an `h1` it is an `h2` */
  heading?: 'h2' | 'h3';
  /** show the title of a topic even when it is the only one (a page with a list of topics) */
  titles?: boolean;
}

/**
 * The questions of the FAQ by topics. The question is plain text, so React escapes it; the answer
 * is the limited HTML the server has already cleaned. The `id` of a topic is its slug: `/faq#returns`
 * opens the page at that topic.
 */
export const FaqTopics = ({ topics, locale, heading: Heading = 'h2', titles }: Props) => (
  <div className='space-y-6'>
    {topics.map((topic) => (
      <section className='scroll-mt-24 space-y-2' id={topic.slug} key={topic.id}>
        {/* a page with one topic has no use for its title */}
        {(titles || topics.length > 1) && (
          <Heading className='pt-2 text-lg font-bold md:text-2xl'>{topic.name}</Heading>
        )}
        {topic.questions.map((item) => (
          <FaqQuestionItem
            html={localizeFaqHtml(item.answer, locale)}
            id={item.id}
            key={item.id}
            locale={locale}
            question={item.question}
            topic={topic.slug}
          />
        ))}
      </section>
    ))}
  </div>
);
