import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Star, TrendingUp, CheckCircle, Check } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Plan {
    id: number;
    name: string;
    description?: string;
    category: string;
    duration_days: number;
    original_price: number;
    discounted_price?: number;
    features?: string[];
    benefits?: string[];
    max_members: number;
    is_featured: boolean;
    is_popular: boolean;
    badge_text?: string;
    color_theme: string;
    valid_from?: string;
    valid_until?: string;
    sort_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface PlansShowProps {
    plan: Plan;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Plans',
        href: '/plans',
    },
    {
        title: 'View Plan',
        href: '/plans/view',
    },
];

export default function Show({ plan }: PlansShowProps) {
    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'basic': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'standard': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'vip': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'enterprise': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getCategoryTheme = (color_theme: string) => {
        switch (color_theme) {
            case 'blue': return 'from-blue-500 to-blue-600 border-blue-200';
            case 'green': return 'from-green-500 to-green-600 border-green-200';
            case 'purple': return 'from-purple-500 to-purple-600 border-purple-200';
            case 'gold': return 'from-yellow-500 to-yellow-600 border-yellow-200';
            case 'red': return 'from-red-500 to-red-600 border-red-200';
            default: return 'from-gray-500 to-gray-600 border-gray-200';
        }
    };

    const getStatusColor = (isActive: boolean) => {
        return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    const getEffectivePrice = () => {
        return plan.discounted_price || plan.original_price;
    };

    const hasDiscount = () => {
        return plan.discounted_price && plan.discounted_price < plan.original_price;
    };

    const getDiscountPercentage = () => {
        if (hasDiscount()) {
            return Math.round(((plan.original_price - plan.discounted_price!) / plan.original_price) * 100);
        }
        return 0;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={plan.name} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{plan.name}</h1>
                        <p className="text-muted-foreground mt-2">
                            View detailed information about this gym plan.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/plans">
                                <ArrowLeft className="h-4 w-4 mr-1" />
                                Back to Plans
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={`/plans/${plan.id}/edit`}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit Plan
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Plan Card */}
                        <div className="lg:col-span-2">
                            <Card className="bg-card border-border">
                                <div className={`h-3 bg-linear-to-r ${
                                    plan.color_theme === 'blue' ? 'from-blue-500 to-blue-600' :
                                    plan.color_theme === 'green' ? 'from-green-500 to-green-600' :
                                    plan.color_theme === 'purple' ? 'from-purple-500 to-purple-600' :
                                    plan.color_theme === 'gold' ? 'from-yellow-500 to-yellow-600' :
                                    plan.color_theme === 'red' ? 'from-red-500 to-red-600' :
                                    'from-gray-500 to-gray-600'
                                }`}></div>
                                <CardHeader className="pb-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <CardTitle className={`text-2xl font-bold ${
                                                    plan.color_theme === 'blue' ? 'text-blue-700 dark:text-blue-300' :
                                                    plan.color_theme === 'green' ? 'text-green-700 dark:text-green-300' :
                                                    plan.color_theme === 'purple' ? 'text-purple-700 dark:text-purple-300' :
                                                    plan.color_theme === 'gold' ? 'text-yellow-700 dark:text-yellow-300' :
                                                    plan.color_theme === 'red' ? 'text-red-700 dark:text-red-300' :
                                                    'text-foreground'
                                                }`}>
                                                    {plan.name}
                                                </CardTitle>
                                                {plan.is_popular && (
                                                    <Badge className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                                                        <TrendingUp className="w-3 h-3 mr-1" />
                                                        Popular
                                                    </Badge>
                                                )}
                                                {plan.badge_text && (
                                                    <Badge className="bg-card text-card-foreground text-xs px-3 py-1 rounded-full border border-border">
                                                        {plan.badge_text}
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex gap-2 mb-3">
                                                <Badge className={`${getCategoryColor(plan.category)} text-xs px-3 py-1 rounded-md`}>
                                                    {plan.category}
                                                </Badge>
                                                <Badge className={getStatusColor(plan.is_active)}>
                                                    {plan.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </div>
                                            {plan.description && (
                                                <p className="text-muted-foreground leading-relaxed text-lg">
                                                    {plan.description}
                                                </p>
                                            )}
                                        </div>
                                        {plan.is_featured && (
                                            <div className="flex items-center">
                                                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="space-y-6">
                                        {/* Pricing Section */}
                                        <div className={`rounded-xl p-6 ${
                                            plan.is_featured 
                                                ? 'bg-linear-to-r from-yellow-50 to-orange-50 border border-yellow-200 dark:from-yellow-900/20 dark:to-orange-900/20 dark:border-yellow-800' 
                                                : 'bg-muted border border-border'
                                        }`}>
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Duration</span>
                                                <span className="text-lg font-bold">{plan.duration_days} days</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    {hasDiscount() && (
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="text-3xl font-bold text-muted-foreground line-through">
                                                                ${plan.original_price}
                                                            </span>
                                                            <Badge className="bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                                                                Save {getDiscountPercentage()}%
                                                            </Badge>
                                                        </div>
                                                    )}
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-4xl font-bold text-foreground">
                                                            ${getEffectivePrice()}
                                                        </span>
                                                        <span className="text-lg text-muted-foreground">/plan</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Features Section */}
                                        {plan.features && plan.features.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                                                    Included Features
                                                </h3>
                                                <div className="grid gap-3">
                                                    {plan.features.map((feature: string, index: number) => (
                                                        <div key={index} className="flex items-center text-gray-700">
                                                            <Check className="w-5 h-5 mr-3 text-green-500 shrink-0" />
                                                            <span className="text-base">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Benefits Section */}
                                        {plan.benefits && plan.benefits.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                                                    Special Benefits
                                                </h3>
                                                <div className="grid gap-3">
                                                    {plan.benefits.map((benefit: string, index: number) => (
                                                        <div key={index} className="flex items-center text-gray-700">
                                                            <Star className="w-5 h-5 mr-3 text-yellow-500 shrink-0" />
                                                            <span className="text-base">{benefit}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Additional Details */}
                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                            <div>
                                                <span className="text-sm text-muted-foreground">Max Members</span>
                                                <p className="font-semibold">{plan.max_members}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-muted-foreground">Sort Order</span>
                                                <p className="font-semibold">{plan.sort_order}</p>
                                            </div>
                                            {plan.valid_from && (
                                                <div>
                                                    <span className="text-sm text-muted-foreground">Valid From</span>
                                                    <p className="font-semibold">{new Date(plan.valid_from).toLocaleDateString()}</p>
                                                </div>
                                            )}
                                            {plan.valid_until && (
                                                <div>
                                                    <span className="text-sm text-muted-foreground">Valid Until</span>
                                                    <p className="font-semibold">{new Date(plan.valid_until).toLocaleDateString()}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button className="w-full" asChild>
                                        <Link href={`/plans/${plan.id}/edit`}>
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit Plan
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href="/plans">
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Back to Plans
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Plan Stats */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Plan Statistics</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Status</span>
                                        <Badge className={getStatusColor(plan.is_active)}>
                                            {plan.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Category</span>
                                        <Badge className={getCategoryColor(plan.category)}>
                                            {plan.category}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Featured</span>
                                        <Badge className={plan.is_featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}>
                                            {plan.is_featured ? 'Yes' : 'No'}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Popular</span>
                                        <Badge className={plan.is_popular ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}>
                                            {plan.is_popular ? 'Yes' : 'No'}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Created/Updated Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Timestamps</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <span className="text-sm text-muted-foreground">Created</span>
                                        <p className="font-semibold">{new Date(plan.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-muted-foreground">Last Updated</span>
                                        <p className="font-semibold">{new Date(plan.updated_at).toLocaleDateString()}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
