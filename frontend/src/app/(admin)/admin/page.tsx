// ==== FILE: src/app/(admin)/admin/page.tsx ====
/**
 * Admin Dashboard Page
 */

'use client';

import { Users, Globe, Flag, MessageSquare, Activity, type LucideIcon } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Config
// ─────────────────────────────────────────────────────────────────────────────

interface StatCardData {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

interface ServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
}

const STATS: StatCardData[] = [
  { title: 'Total Users', value: '12,345', change: '+12%', icon: Users },
  { title: 'Active Sites', value: '1,234', change: '+5%', icon: Globe },
  { title: 'Pending Reports', value: '23', change: '-8%', icon: Flag },
  { title: 'Open Tickets', value: '45', change: '+3%', icon: MessageSquare },
];

const SERVICES: ServiceStatus[] = [
  { name: 'API Server', status: 'healthy' },
  { name: 'Database', status: 'healthy' },
  { name: 'Redis Cache', status: 'healthy' },
  { name: 'Storage', status: 'healthy' },
];

const STATUS_CONFIG = {
  healthy: { color: 'text-green-600', label: 'Healthy' },
  degraded: { color: 'text-yellow-600', label: 'Degraded' },
  unhealthy: { color: 'text-red-600', label: 'Unhealthy' },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

function StatCard({ stat }: { stat: StatCardData }) {
  const Icon = stat.icon;
  const isPositive = stat.change.startsWith('+');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {stat.title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.value}</div>
        <p className="text-xs text-muted-foreground">
          <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
            {stat.change}
          </span>{' '}
          from last month
        </p>
      </CardContent>
    </Card>
  );
}

function ServiceStatusIndicator({ service }: { service: ServiceStatus }) {
  const config = STATUS_CONFIG[service.status];

  return (
    <div className="flex items-center justify-between">
      <span>{service.name}</span>
      <span className={config.color}>● {config.label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and quick actions</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center text-muted-foreground">
              <Activity className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>Activity feed coming soon</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Service status overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {SERVICES.map((service) => (
                <ServiceStatusIndicator key={service.name} service={service} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}