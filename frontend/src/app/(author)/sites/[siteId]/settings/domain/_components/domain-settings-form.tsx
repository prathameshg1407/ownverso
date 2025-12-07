// ==== FILE: src/app/(author)/sites/[siteId]/settings/domain/_components/domain-settings-form.tsx ====
/**
 * Domain Settings Form
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Loader2,
  Globe,
  CheckCircle2,
  AlertCircle,
  Copy,
  RefreshCw,
  Shield,
  Trash2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useSiteDomain } from '@/hooks';
import { addDomainSchema, type AddDomainFormData } from '@/lib/validation/site.schema';
import { toast } from 'sonner';

interface DomainSettingsFormProps {
  siteId: string;
}

export function DomainSettingsForm({ siteId }: DomainSettingsFormProps) {
  const {
    domain,
    isLoading,
    addDomain,
    isAddingDomain,
    verifyDomain,
    isVerifyingDomain,
    removeDomain,
    isRemovingDomain,
    provisionSsl,
    isProvisioningSsl,
  } = useSiteDomain(siteId);

  const form = useForm<AddDomainFormData>({
    resolver: zodResolver(addDomainSchema),
    defaultValues: {
      customDomain: '',
    },
  });

  const onSubmit = (data: AddDomainFormData) => {
    addDomain(data);
    form.reset();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  if (isLoading) {
    return <SettingsFormSkeleton />;
  }

  const hasDomain = !!domain?.customDomain;

  return (
    <div className="space-y-6">
      {/* Current Domain Status */}
      {hasDomain ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Custom Domain</CardTitle>
                <CardDescription>
                  Your site is connected to a custom domain
                </CardDescription>
              </div>
              <Badge variant={domain.customDomainVerified ? 'default' : 'secondary'}>
                {domain.customDomainVerified ? (
                  <>
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Verified
                  </>
                ) : (
                  <>
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Pending Verification
                  </>
                )}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Domain Info */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{domain.customDomain}</p>
                  <p className="text-sm text-muted-foreground">
                    {domain.sslEnabled ? 'SSL enabled' : 'SSL not configured'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!domain.customDomainVerified && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => verifyDomain()}
                    disabled={isVerifyingDomain}
                  >
                    {isVerifyingDomain ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    Verify
                  </Button>
                )}
                {domain.customDomainVerified && !domain.sslEnabled && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => provisionSsl()}
                    disabled={isProvisioningSsl}
                  >
                    {isProvisioningSsl ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Shield className="mr-2 h-4 w-4" />
                    )}
                    Enable SSL
                  </Button>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove custom domain?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will disconnect your custom domain from this site.
                        Visitors will only be able to access your site via the
                        default Ownverso URL.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => removeDomain()}
                        disabled={isRemovingDomain}
                        className="bg-destructive text-destructive-foreground"
                      >
                        Remove Domain
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* DNS Records */}
            {!domain.customDomainVerified && domain.dnsRecords.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">DNS Configuration</h4>
                <p className="text-sm text-muted-foreground">
                  Add these DNS records to your domain provider to verify ownership.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {domain.dnsRecords.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Badge variant="outline">{record.type}</Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.name}
                        </TableCell>
                        <TableCell className="max-w-xs truncate font-mono text-sm">
                          {record.value}
                        </TableCell>
                        <TableCell>
                          {record.verified ? (
                            <Badge variant="default">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(record.value)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        /* Add Domain Form */
        <Card>
          <CardHeader>
            <CardTitle>Add Custom Domain</CardTitle>
            <CardDescription>
              Connect your own domain to this site
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField
                  control={form.control}
                  name="customDomain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="www.example.com"
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the domain you want to use for this site
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button type="submit" disabled={isAddingDomain}>
                  {isAddingDomain && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add Domain
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}

      {/* Default URL Info */}
      <Card>
        <CardHeader>
          <CardTitle>Default URL</CardTitle>
          <CardDescription>
            Your site is always accessible at this URL
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4">
            <code className="text-sm">
              {process.env['NEXT_PUBLIC_APP_URL']}/s/{siteId}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(`${process.env['NEXT_PUBLIC_APP_URL']}/s/${siteId}`)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-64 animate-pulse rounded-lg bg-muted" />
      <div className="h-32 animate-pulse rounded-lg bg-muted" />
    </div>
  );
}