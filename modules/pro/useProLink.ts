'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { trackEvent } from '@/lib/analytics';
import { postProOrderLink, postProOrderUnlink } from '@/utils/api/requests';

import { getApiError } from './apiError';

/** a link that waits for the customer's "yes": some items are in another project (409, code 37) */
export interface LinkConflict {
  orderId: number;
  projectId: number;
  itemIds?: number[];
  count: number;
}

/**
 * Linking the items of an order to a project and taking them out (BLD-295). The requests are
 * made here, not by `useMutation`, because a 409 is an expected answer ("move them?"): it must
 * not show an error toast.
 */
export const useProLink = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [pending, setPending] = React.useState(false);
  const [conflict, setConflict] = React.useState<LinkConflict | null>(null);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['orders'] });
    queryClient.invalidateQueries({ queryKey: ['pro'] });
  };

  const showError = (error: unknown) => {
    const { code } = getApiError(error);
    toast.error(code ? t(`errorMessages.${code}`) : t('errorMessages.default'));
  };

  /** `itemIds` empty = every item of the order */
  const link = async (orderId: number, projectId: number, itemIds?: number[], force = false) => {
    setPending(true);
    try {
      await postProOrderLink({
        orderId,
        data: {
          project_id: projectId,
          ...(itemIds?.length ? { item_ids: itemIds } : {}),
          ...(force ? { force: true } : {})
        }
      });
      trackEvent('pro_items_linked', {
        mode: itemIds?.length ? 'items' : 'whole_order',
        ...(itemIds?.length ? { items_count: itemIds.length } : {})
      });
      toast.success(t('Linked to project'));
      setConflict(null);
      refresh();
      return true;
    } catch (error) {
      const { code, status, data } = getApiError(error);
      if (status === 409 && code === 37) {
        setConflict({
          orderId,
          projectId,
          itemIds,
          count: data?.detail?.conflicting_item_ids?.length ?? 0
        });
      } else {
        showError(error);
      }
      return false;
    } finally {
      setPending(false);
    }
  };

  const unlink = async (orderId: number, itemIds?: number[]) => {
    setPending(true);
    try {
      await postProOrderUnlink({
        orderId,
        data: itemIds?.length ? { item_ids: itemIds } : {}
      });
      trackEvent('pro_items_unlinked', itemIds?.length ? { items_count: itemIds.length } : {});
      toast.success(t('Removed from project'));
      refresh();
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      setPending(false);
    }
  };

  const confirmConflict = () =>
    conflict ? link(conflict.orderId, conflict.projectId, conflict.itemIds, true) : undefined;

  return {
    link,
    unlink,
    pending,
    conflict,
    confirmConflict,
    cancelConflict: () => setConflict(null)
  };
};
