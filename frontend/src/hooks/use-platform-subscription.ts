/**
 * Platform Subscription Hook
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { authorApi } from '@/lib/api/endpoints';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { formatError } from '@/lib/api/error-handler';
import type { SubscribePlatformRequest, ChangePlatformPlanRequest } from '@/types/api';

export function usePlatformSubscription() {
  const queryClient = useQueryClient();

  const invalidateSubscription = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.author.subscription() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.author.account() });
  };

  const subscriptionQuery = useQuery({
    queryKey: QUERY_KEYS.author.subscription(),
    queryFn: authorApi.getPlatformSubscription,
    staleTime: 5 * 60 * 1000,
  });

  const plansQuery = useQuery({
    queryKey: QUERY_KEYS.author.plans(),
    queryFn: authorApi.listPlatformPlans,
    staleTime: 30 * 60 * 1000,
  });

  const subscribeMutation = useMutation({
    mutationFn: (data: SubscribePlatformRequest) => authorApi.subscribePlatform(data),
    onSuccess: (subscription) => {
      queryClient.setQueryData(QUERY_KEYS.author.subscription(), subscription);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.author.dashboard() });
      invalidateSubscription();
      toast.success('Subscription activated!', { description: 'Welcome to your new plan.' });
    },
    onError: (error: Error) => {
      toast.error('Subscription failed', { description: formatError(error).message });
    },
  });

  const changePlanMutation = useMutation({
    mutationFn: (data: ChangePlatformPlanRequest) => authorApi.changePlatformPlan(data),
    onSuccess: (subscription) => {
      queryClient.setQueryData(QUERY_KEYS.author.subscription(), subscription);
      invalidateSubscription();
      toast.success('Plan updated!', { description: 'Your new plan is now active.' });
    },
    onError: (error: Error) => {
      toast.error('Plan change failed', { description: formatError(error).message });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: authorApi.cancelPlatformSubscription,
    onSuccess: () => {
      invalidateSubscription();
      toast.success('Subscription cancelled', {
        description: 'Your subscription will end at the current billing period.',
      });
    },
    onError: (error: Error) => {
      toast.error('Cancellation failed', { description: formatError(error).message });
    },
  });

  const reactivateMutation = useMutation({
    mutationFn: authorApi.reactivatePlatformSubscription,
    onSuccess: () => {
      invalidateSubscription();
      toast.success('Subscription reactivated!', { description: 'Welcome back!' });
    },
    onError: (error: Error) => {
      toast.error('Reactivation failed', { description: formatError(error).message });
    },
  });

  return {
    subscription: subscriptionQuery.data,
    isLoadingSubscription: subscriptionQuery.isLoading,

    plans: plansQuery.data ?? [],
    isLoadingPlans: plansQuery.isLoading,

    subscribe: subscribeMutation.mutate,
    subscribeAsync: subscribeMutation.mutateAsync,
    isSubscribing: subscribeMutation.isPending,

    changePlan: changePlanMutation.mutate,
    changePlanAsync: changePlanMutation.mutateAsync,
    isChangingPlan: changePlanMutation.isPending,

    cancel: cancelMutation.mutate,
    cancelAsync: cancelMutation.mutateAsync,
    isCancelling: cancelMutation.isPending,

    reactivate: reactivateMutation.mutate,
    reactivateAsync: reactivateMutation.mutateAsync,
    isReactivating: reactivateMutation.isPending,
  };
}