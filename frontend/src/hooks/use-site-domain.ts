/**
 * Site Domain Hook
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { sitesApi } from '@/lib/api/endpoints';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { formatError } from '@/lib/api/error-handler';
import type { AddDomainRequest } from '@/types/api';

export function useSiteDomain(siteId: string) {
  const queryClient = useQueryClient();

  const domainQuery = useQuery({
    queryKey: QUERY_KEYS.sites.domain(siteId),
    queryFn: () => sitesApi.getDomain(siteId),
    enabled: !!siteId,
    staleTime: 5 * 60 * 1000,
  });

  const setDomainData = (domain: unknown) => {
    queryClient.setQueryData(QUERY_KEYS.sites.domain(siteId), domain);
  };

  const addDomainMutation = useMutation({
    mutationFn: (data: AddDomainRequest) => sitesApi.addDomain(siteId, data),
    onSuccess: (domain) => {
      setDomainData(domain);
      toast.success('Domain added', {
        description: 'Configure your DNS records to complete setup.',
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to add domain', { description: formatError(error).message });
    },
  });

  const verifyDomainMutation = useMutation({
    mutationFn: () => sitesApi.verifyDomain(siteId),
    onSuccess: (domain) => {
      setDomainData(domain);
      toast.success('Domain verified!', { description: 'Your custom domain is now active.' });
    },
    onError: (error: Error) => {
      toast.error('Verification failed', { description: formatError(error).message });
    },
  });

  const removeDomainMutation = useMutation({
    mutationFn: () => sitesApi.removeDomain(siteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sites.domain(siteId) });
      toast.success('Domain removed');
    },
    onError: (error: Error) => {
      toast.error('Failed to remove domain', { description: formatError(error).message });
    },
  });

  const provisionSslMutation = useMutation({
    mutationFn: () => sitesApi.provisionSsl(siteId),
    onSuccess: (domain) => {
      setDomainData(domain);
      toast.success('SSL certificate provisioned!');
    },
    onError: (error: Error) => {
      toast.error('SSL provisioning failed', { description: formatError(error).message });
    },
  });

  return {
    domain: domainQuery.data,
    isLoading: domainQuery.isLoading,
    isError: domainQuery.isError,

    addDomain: addDomainMutation.mutate,
    addDomainAsync: addDomainMutation.mutateAsync,
    isAddingDomain: addDomainMutation.isPending,

    verifyDomain: verifyDomainMutation.mutate,
    verifyDomainAsync: verifyDomainMutation.mutateAsync,
    isVerifyingDomain: verifyDomainMutation.isPending,

    removeDomain: removeDomainMutation.mutate,
    removeDomainAsync: removeDomainMutation.mutateAsync,
    isRemovingDomain: removeDomainMutation.isPending,

    provisionSsl: provisionSslMutation.mutate,
    provisionSslAsync: provisionSslMutation.mutateAsync,
    isProvisioningSsl: provisionSslMutation.isPending,

    refetch: domainQuery.refetch,
  };
}