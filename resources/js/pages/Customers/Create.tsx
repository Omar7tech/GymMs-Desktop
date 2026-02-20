import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Badge } from 'lucide-react';

interface Plan {
    id: number;
    name: string;
    description: string;
    category: string;
    duration_days: number;
    original_price: number;
    discounted_price: number | null;
    discount_percentage: number;
    features: string[];
    benefits: string[];
    max_members: number;
    is_popular: boolean;
    is_featured: boolean;
    badge_text: string | null;
    color_theme: string;
    valid_from: string | null;
    valid_until: string | null;
}

interface CustomersCreateProps {
    plans: Plan[];
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
    {
        title: 'Add Customer',
        href: '/customers/create',
    },
];

export default function Create({ plans }: CustomersCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        gender: '',
        address: '',
        join_date: new Date().toISOString().split('T')[0], // Today's date as default
        plan_id: '',
        plan_start_date: new Date().toISOString().split('T')[0], // Today's date as default
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data:', data);
        post('/customers');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Customer" />
            <div className="flex h-full flex-1 flex-col overflow-hidden">
                {/* Compact Header */}
                <div className="shrink-0 border-b px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Add Customer</h1>
                        <div className="text-sm text-muted-foreground">
                            Create customer and assign plan
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="py-6 px-4 sm:px-6 lg:px-8">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Compact Customer Info */}
                            <Card className="border">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">Customer Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Row 1: Name and Email */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <Label htmlFor="name" className="text-sm">Full Name *</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Enter full name"
                                                className="h-9"
                                                required
                                            />
                                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="email" className="text-sm">Email *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="customer@example.com"
                                                className="h-9"
                                                required
                                            />
                                            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                                        </div>
                                    </div>

                                    {/* Row 2: Phone, DOB, Gender */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <Label htmlFor="phone" className="text-sm">Phone</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="+1 (555) 123-4567"
                                                className="h-9"
                                            />
                                            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="date_of_birth" className="text-sm">Date of Birth</Label>
                                            <Input
                                                id="date_of_birth"
                                                type="date"
                                                value={data.date_of_birth}
                                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                                className="h-9"
                                            />
                                            {errors.date_of_birth && <p className="text-xs text-destructive">{errors.date_of_birth}</p>}
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="gender" className="text-sm">Gender</Label>
                                            <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                                                <SelectTrigger className="h-9">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.gender && <p className="text-xs text-destructive">{errors.gender}</p>}
                                        </div>
                                    </div>

                                    {/* Row 3: Join Date and Address */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <Label htmlFor="join_date" className="text-sm">Join Date *</Label>
                                            <Input
                                                id="join_date"
                                                type="date"
                                                value={data.join_date}
                                                onChange={(e) => setData('join_date', e.target.value)}
                                                className="h-9"
                                                required
                                            />
                                            {errors.join_date && <p className="text-xs text-destructive">{errors.join_date}</p>}
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="address" className="text-sm">Address</Label>
                                            <Input
                                                id="address"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                placeholder="Street address, city, state"
                                                className="h-9"
                                            />
                                            {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Compact Plan Assignment */}
                            <Card className="border">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">Plan Assignment</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {plans.length === 0 ? (
                                        <div className="text-center py-16">
                                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                                                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-muted-foreground mb-2">
                                                No Plans Available
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                                                Create some plans first to assign to customers. Plans can include discounts, features, and special benefits!
                                            </p>
                                            <Button asChild variant="outline">
                                                <Link href="/plans/create">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Create Your First Plan
                                                </Link>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {/* Plan Selection */}
                                            <div className="space-y-2">
                                                <Label htmlFor="plan_id" className="text-sm font-medium">
                                                    Choose Plan <span className="text-destructive">*</span>
                                                </Label>
                                                <Select value={data.plan_id} onValueChange={(value) => setData('plan_id', value)}>
                                                    <SelectTrigger className="h-12">
                                                        <SelectValue placeholder="Select the best plan for this customer" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {plans.map((plan) => (
                                                            <SelectItem key={plan.id} value={plan.id.toString()} className="py-3">
                                                                <div className="flex items-center justify-between w-full">
                                                                    <div className="flex items-center space-x-3">
                                                                        <div className="flex items-center space-x-2">
                                                                            <span className="font-medium">{plan.name}</span>
                                                                            {plan.badge_text && (
                                                                                <Badge className="text-xs px-2 py-0.5 bg-primary/10 text-primary border-primary/20">
                                                                                    {plan.badge_text}
                                                                                </Badge>
                                                                            )}
                                                                            {plan.is_popular && (
                                                                                <Badge className="text-xs px-2 py-0.5 bg-orange-100 text-orange-800">
                                                                                    🔥 Popular
                                                                                </Badge>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        {plan.discounted_price ? (
                                                                            <div className="flex items-center space-x-2">
                                                                                <span className="text-sm text-muted-foreground line-through">
                                                                                    ${plan.original_price}
                                                                                </span>
                                                                                <span className="font-bold text-green-600">
                                                                                    ${plan.discounted_price}
                                                                                </span>
                                                                                <Badge className="text-xs bg-green-100 text-green-800">
                                                                                    -{plan.discount_percentage}%
                                                                                </Badge>
                                                                            </div>
                                                                        ) : (
                                                                            <span className="font-bold">${plan.original_price}</span>
                                                                        )}
                                                                        <div className="text-xs text-muted-foreground">
                                                                            {plan.duration_days} days
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.plan_id && <p className="text-xs text-destructive">{errors.plan_id}</p>}
                                            </div>

                                            {/* Start Date */}
                                            <div className="space-y-2">
                                                <Label htmlFor="plan_start_date" className="text-sm font-medium">
                                                    Plan Start Date <span className="text-destructive">*</span>
                                                </Label>
                                                <Input
                                                    id="plan_start_date"
                                                    type="date"
                                                    value={data.plan_start_date}
                                                    onChange={(e) => setData('plan_start_date', e.target.value)}
                                                    className="h-11"
                                                    required
                                                />
                                                {errors.plan_start_date && <p className="text-xs text-destructive">{errors.plan_start_date}</p>}
                                            </div>

                                            {/* Selected Plan Preview - Ultra Creative */}
                                            {data.plan_id && (
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-medium flex items-center">
                                                        <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Selected Plan Preview
                                                    </h4>
                                                    {(() => {
                                                        const selectedPlan = plans.find(plan => plan.id.toString() === data.plan_id);
                                                        if (selectedPlan) {
                                                            const startDate = new Date(data.plan_start_date);
                                                            const endDate = new Date(startDate);
                                                            endDate.setDate(startDate.getDate() + selectedPlan.duration_days);

                                                            return (
                                                                <Card className={`border-2 transition-all duration-300 ${
                                                                    selectedPlan.is_featured
                                                                        ? 'border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg'
                                                                        : 'border-muted bg-card'
                                                                }`}>
                                                                    <CardContent className="p-6">
                                                                        <div className="space-y-4">
                                                                            {/* Header with badges */}
                                                                            <div className="flex items-start justify-between">
                                                                                <div className="space-y-1">
                                                                                    <div className="flex items-center space-x-2">
                                                                                        <h4 className="text-xl font-bold">{selectedPlan.name}</h4>
                                                                                        {selectedPlan.badge_text && (
                                                                                            <Badge className="bg-gradient-to-r from-primary to-primary/80">
                                                                                                {selectedPlan.badge_text}
                                                                                            </Badge>
                                                                                        )}
                                                                                    </div>
                                                                                    {selectedPlan.description && (
                                                                                        <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
                                                                                    )}
                                                                                </div>

                                                                                {/* Pricing Section */}
                                                                                <div className="text-right space-y-1">
                                                                                    {selectedPlan.discounted_price ? (
                                                                                        <div className="space-y-1">
                                                                                            <div className="flex items-center space-x-2">
                                                                                                <span className="text-lg text-muted-foreground line-through">
                                                                            ${selectedPlan.original_price}
                                                                                                </span>
                                                                                                <span className="text-2xl font-bold text-green-600">
                                                                                                    ${selectedPlan.discounted_price}
                                                                                                </span>
                                                                                            </div>
                                                                                            <Badge className="bg-green-100 text-green-800 text-xs">
                                                                                                Save {Math.round(((selectedPlan.original_price - selectedPlan.discounted_price) / selectedPlan.original_price) * 100)}%
                                                                                            </Badge>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div className="text-2xl font-bold">${selectedPlan.original_price}</div>
                                                                                    )}
                                                                                    <div className="text-sm text-muted-foreground">
                                                                                        per plan
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            {/* Key Details */}
                                                                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                                                                <div className="flex items-center space-x-2">
                                                                                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                    </svg>
                                                                                    <div>
                                                                                        <div className="text-sm font-medium">Duration</div>
                                                                                        <div className="text-sm text-muted-foreground">{selectedPlan.duration_days} days</div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="flex items-center space-x-2">
                                                                                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                                    </svg>
                                                                                    <div>
                                                                                        <div className="text-sm font-medium">Ends</div>
                                                                                        <div className="text-sm text-muted-foreground">{endDate.toLocaleDateString()}</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            {/* Features */}
                                                                            {selectedPlan.features && selectedPlan.features.length > 0 && (
                                                                                <div className="pt-4 border-t">
                                                                                    <div className="text-sm font-medium mb-2 flex items-center">
                                                                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                                        </svg>
                                                                                        What's Included
                                                                                    </div>
                                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                                                        {selectedPlan.features.slice(0, 6).map((feature: string, index: number) => (
                                                                                            <div key={index} className="flex items-center text-sm">
                                                                                                <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                                                </svg>
                                                                                                {feature}
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            )}

                                                                            {/* Special Benefits */}
                                                                            {selectedPlan.benefits && selectedPlan.benefits.length > 0 && (
                                                                                <div className="pt-4 border-t">
                                                                                    <div className="text-sm font-medium mb-2 flex items-center text-amber-600">
                                                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                                                        </svg>
                                                                                        Special Benefits
                                                                                    </div>
                                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                                                        {selectedPlan.benefits.map((benefit: string, index: number) => (
                                                                                            <div key={index} className="flex items-center text-sm text-amber-700">
                                                                                                <svg className="w-3 h-3 text-amber-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                                                                </svg>
                                                                                                {benefit}
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </CardContent>
                                                                </Card>
                                                            );
                                                        }
                                                        return null;
                                                    })()}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Compact Action Bar */}
                            <div className="flex items-center justify-between pt-2">
                                <Button type="button" variant="outline" asChild className="h-9 px-4">
                                    <Link href="/customers">Cancel</Link>
                                </Button>

                                <Button type="submit" disabled={processing} className="h-9 px-6">
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Customer'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
