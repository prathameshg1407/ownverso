// ==== FILE: src/app/(auth)/mfa/setup/_components/mfa-setup-form.tsx ====
/**
 * MFA Setup Form Component
 */

'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QrCode, Copy, CheckCircle, Loader2, Shield, Smartphone, Key } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { mfaApi } from '@/lib/api/endpoints';
import { formatError } from '@/lib/api/error-handler';
import { mfaCodeSchema, type MfaCodeFormData } from '@/lib/validation/auth.schema';
import { READER_ROUTES } from '@/lib/constants/routes';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type SetupStep = 'intro' | 'qr-code' | 'verify' | 'backup-codes' | 'complete';

interface MfaSetupState {
  qrCodeUrl: string;
  secret: string;
  backupCodes: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Intro Step
// ─────────────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Shield,
    title: 'Enhanced Security',
    description: 'Protect your account from unauthorized access',
  },
  {
    icon: Smartphone,
    title: 'Authenticator App',
    description: 'Use Google Authenticator, Authy, or similar apps',
  },
  {
    icon: Key,
    title: 'Backup Codes',
    description: 'Recovery codes in case you lose access to your device',
  },
] as const;

interface IntroStepProps {
  onNext: () => void;
  isLoading: boolean;
}

function IntroStep({ onNext, isLoading }: IntroStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full" onClick={onNext} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Setting up...
          </>
        ) : (
          'Get Started'
        )}
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QR Code Step
// ─────────────────────────────────────────────────────────────────────────────

interface QrCodeStepProps {
  qrCodeUrl: string;
  secret: string;
  onNext: () => void;
}

function QrCodeStep({ qrCodeUrl, secret, onNext }: QrCodeStepProps) {
  const [copied, setCopied] = useState(false);

  const copySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="mb-2 font-medium">Scan QR Code</h3>
        <p className="text-sm text-muted-foreground">
          Scan this QR code with your authenticator app
        </p>
      </div>

      {qrCodeUrl && (
        <div className="flex justify-center">
          <div className="rounded-lg bg-white p-4">
            <img src={qrCodeUrl} alt="MFA QR Code" className="h-48 w-48" />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-center text-xs text-muted-foreground">
          Can&apos;t scan? Enter this code manually:
        </p>
        <div className="flex items-center gap-2">
          <code className="flex-1 rounded bg-muted px-3 py-2 font-mono text-xs">
            {secret}
          </code>
          <Button variant="ghost" size="icon" onClick={copySecret}>
            {copied ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <Button className="w-full" onClick={onNext}>
        Next: Verify Setup
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Verify Step
// ─────────────────────────────────────────────────────────────────────────────

interface VerifyStepProps {
  onVerify: (code: string) => void;
  isLoading: boolean;
}

function VerifyStep({ onVerify, isLoading }: VerifyStepProps) {
  const form = useForm<MfaCodeFormData>({
    resolver: zodResolver(mfaCodeSchema),
    defaultValues: { code: '' },
  });

  const onSubmit = (data: MfaCodeFormData) => {
    onVerify(data.code);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center">
          <h3 className="mb-2 font-medium">Verify Setup</h3>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  className="py-4 text-center font-mono text-2xl tracking-widest"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify and Continue'
          )}
        </Button>
      </form>
    </Form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Backup Codes Step
// ─────────────────────────────────────────────────────────────────────────────

interface BackupCodesStepProps {
  backupCodes: string[];
  onNext: () => void;
}

function BackupCodesStep({ backupCodes, onNext }: BackupCodesStepProps) {
  const [copied, setCopied] = useState(false);

  const copyBackupCodes = async () => {
    try {
      await navigator.clipboard.writeText(backupCodes.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="mb-2 font-medium">Save Backup Codes</h3>
        <p className="text-sm text-muted-foreground">
          Save these codes in a safe place. You can use them to access your account if you
          lose your device.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <div className="grid grid-cols-2 gap-2">
          {backupCodes.map((code, index) => (
            <code key={index} className="rounded bg-background px-2 py-1 font-mono text-sm">
              {code}
            </code>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={copyBackupCodes}>
        {copied ? (
          <>
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" />
            Copy All Codes
          </>
        )}
      </Button>

      <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/20">
        <AlertDescription className="text-xs text-yellow-800 dark:text-yellow-200">
          <strong>Important:</strong> Each backup code can only be used once. After using all
          codes, you&apos;ll need to generate new ones.
        </AlertDescription>
      </Alert>

      <Button className="w-full" onClick={onNext}>
        I&apos;ve Saved My Codes
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Complete Step
// ─────────────────────────────────────────────────────────────────────────────

interface CompleteStepProps {
  onComplete: () => void;
}

function CompleteStep({ onComplete }: CompleteStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div className="space-y-2 text-center">
        <h3 className="text-lg font-semibold">Setup Complete!</h3>
        <p className="text-sm text-muted-foreground">
          Two-factor authentication is now enabled on your account.
        </p>
      </div>

      <Button className="w-full" onClick={onComplete}>
        Go to Security Settings
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export function MfaSetupForm() {
  const router = useRouter();
  const [step, setStep] = useState<SetupStep>('intro');
  const [isLoading, setIsLoading] = useState(false);
  const [setupData, setSetupData] = useState<MfaSetupState>({
    qrCodeUrl: '',
    secret: '',
    backupCodes: [],
  });

  const initializeSetup = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await mfaApi.setupMfa();
      setSetupData({
        qrCodeUrl: response.qrCodeDataUrl,
        secret: response.secret,
        backupCodes: response.backupCodes,
      });
      setStep('qr-code');
    } catch (error) {
      toast.error(formatError(error).message || 'Failed to initialize MFA setup');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifySetup = useCallback(async (code: string) => {
    setIsLoading(true);
    try {
      await mfaApi.verifyMfaSetup(code);
      setStep('backup-codes');
    } catch (error) {
      toast.error(formatError(error).message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const completeSetup = useCallback(() => {
    toast.success('Two-factor authentication enabled successfully!');
    router.push(READER_ROUTES.settingsSecurity);
  }, [router]);

  switch (step) {
    case 'intro':
      return <IntroStep onNext={initializeSetup} isLoading={isLoading} />;
    case 'qr-code':
      return (
        <QrCodeStep
          qrCodeUrl={setupData.qrCodeUrl}
          secret={setupData.secret}
          onNext={() => setStep('verify')}
        />
      );
    case 'verify':
      return <VerifyStep onVerify={verifySetup} isLoading={isLoading} />;
    case 'backup-codes':
      return (
        <BackupCodesStep backupCodes={setupData.backupCodes} onNext={() => setStep('complete')} />
      );
    case 'complete':
      return <CompleteStep onComplete={completeSetup} />;
  }
}