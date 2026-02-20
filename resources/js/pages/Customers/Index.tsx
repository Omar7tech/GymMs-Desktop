import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Membership {
    id: number;
    plan_type: string;
    duration_days: number;
    price: number;
    start_date: string;
    end_date: string;
    status: string;
    expiry_status?: string;
    remaining_time_formatted?: string;
    notes: string;
}

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    date_of_birth: string | null;
    gender: string | null;
    address: string | null;
    join_date: string;
    active_membership?: Membership | null;
}

interface CustomersIndexProps {
    customers: Customer[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Customers',
        href: '/customers',
    },
];

export default function Index({ customers }: CustomersIndexProps) {
    console.log('Customers data:', customers);
    console.log('Customers type:', typeof customers);
    console.log('Customers isArray:', Array.isArray(customers));
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Customers</h1>
                        <p className="text-muted-foreground">
                            Manage your gym customers and their information.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/customers/create">Add Customer</Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Customers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {customers.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                No customers found. Add your first customer to get started.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-4 font-medium">Name</th>
                                            <th className="text-left p-4 font-medium">Email</th>
                                            <th className="text-left p-4 font-medium">Phone</th>
                                            <th className="text-left p-4 font-medium">Plan</th>
                                            <th className="text-left p-4 font-medium">Status</th>
                                            <th className="text-left p-4 font-medium">Expires</th>
                                            <th className="text-left p-4 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map((customer) => {
                                            const membership = customer.active_membership;
                                            const getStatusColor = (status: string) => {
                                                switch (status) {
                                                    case 'expired': return 'text-red-600 bg-red-50';
                                                    case 'expiring_soon': return 'text-yellow-600 bg-yellow-50';
                                                    case 'active': return 'text-green-600 bg-green-50';
                                                    default: return 'text-gray-600 bg-gray-50';
                                                }
                                            };

                                            return (
                                                <tr key={customer.id} className="border-b hover:bg-muted/50">
                                                    <td className="p-4">{customer.name}</td>
                                                    <td className="p-4">{customer.email}</td>
                                                    <td className="p-4">{customer.phone || '-'}</td>
                                                    <td className="p-4 capitalize">
                                                        {membership ? (() => {
                                                            try {
                                                                const details = JSON.parse(membership.notes || '{}');
                                                                return details.name || `${membership.duration_days} days`;
                                                            } catch {
                                                                return `${membership.duration_days} days`;
                                                            }
                                                        })() : 'No plan'}
                                                    </td>
                                                    <td className="p-4">
                                                        {membership ? (
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(membership.expiry_status || 'active')}`}>
                                                                {membership.expiry_status === 'expired' ? 'Expired' :
                                                                 membership.expiry_status === 'expiring_soon' ? 'Expiring Soon' :
                                                                 'Active'}
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-50">
                                                                No Plan
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-4">
                                                        {membership ? (
                                                            <div className="text-sm">
                                                                <div>{new Date(membership.end_date).toLocaleDateString()}</div>
                                                                <div className="text-muted-foreground text-xs">
                                                                    {membership.remaining_time_formatted}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </td>
                                                    <td className="p-4">
                                                        <Button variant="outline" size="sm">
                                                            View
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
