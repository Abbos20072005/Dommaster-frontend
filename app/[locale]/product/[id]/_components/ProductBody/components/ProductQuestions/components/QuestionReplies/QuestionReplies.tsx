'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { AuthDialog } from '@/components/modules/auth';
import { ProductQuestionReplyForm } from '@/components/modules/product';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/utils/stores';

import { useQuestionReplies } from './hooks';
import { QuestionReplyItem } from './QuestionReplyItem';

interface Props {
  question: ProductQuestion;
}

export const QuestionReplies = ({ question }: Props) => {
  const t = useTranslations();
  const { user } = useAuth();
  const [openReplies, setOpenReplies] = React.useState(false);
  const [openReplyForm, setOpenReplyForm] = React.useState(false);
  const { state, functions } = useQuestionReplies({ enabled: openReplies, question });

  return (
    <div>
      <div className='flex items-center gap-4'>
        {state.totalCount > 0 && (
          <button
            className='hover:text-secondary text-muted-foreground text-sm transition-colors'
            onClick={() => setOpenReplies((prev) => !prev)}
          >
            {openReplies ? t('Hide replies') : t('See replies')} ({state.totalCount})
          </button>
        )}
        {user ? (
          <button
            className='hover:text-secondary text-muted-foreground text-sm transition-colors'
            onClick={() => setOpenReplyForm(true)}
          >
            {t('Reply')}
          </button>
        ) : (
          <AuthDialog className='hover:text-secondary text-muted-foreground text-sm transition-colors'>
            {t('Reply')}
          </AuthDialog>
        )}
      </div>
      <Collapsible onOpenChange={setOpenReplyForm} open={openReplyForm}>
        <CollapsibleContent className='py-4'>
          <ProductQuestionReplyForm
            onCancel={() => setOpenReplyForm(false)}
            onSuccess={() => setOpenReplyForm(false)}
            questionId={question.id}
          />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible onOpenChange={setOpenReplies} open={openReplies}>
        <CollapsibleContent className='py-4'>
          {state.isLoading ? (
            <div className='flex justify-center py-10'>
              <Spinner className='size-4' />
            </div>
          ) : (
            <div className='ml-4 md:ml-8'>
              <div className='space-y-3 text-sm md:space-y-4'>
                {state.replies?.map((reply) => (
                  <QuestionReplyItem key={reply.id} reply={reply} question={question} />
                ))}
                {state.hasNextPage && (
                  <Button
                    disabled={state.isFetchingNextPage}
                    size='sm'
                    variant='outline'
                    onClick={functions.onLoadMore}
                  >
                    <Spinner show={state.isFetchingNextPage} />
                    {t('Load more')}
                  </Button>
                )}
              </div>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
