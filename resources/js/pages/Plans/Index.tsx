import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Star, TrendingUp, CheckCircle, Check } from 'lucide-react';
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
    is_featured: boolean;
    is_popular: boolean;
    badge_text?: string;
    color_theme: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface PlansIndexProps {
    plans: Plan[];
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
];

export default function Index({ plans }: PlansIndexProps) {
    const getStatusColor = (isActive: boolean) => {
        return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

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

    const getEffectivePrice = (plan: Plan) => {
        return plan.discounted_price || plan.original_price;
    };

    const hasDiscount = (plan: Plan) => {
        return plan.discounted_price && plan.discounted_price < plan.original_price;
    };

    const deletePlan = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete the "${name}" plan? This action cannot be undone.`)) {
            router.delete(`/plans/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Plans" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Plans</h1>
                        <p className="text-muted-foreground mt-2">
                            Create and manage your gym plans and pricing.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/plans/create">Create Plan</Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    {plans.length === 0 ? (
                        <div className="col-span-full">
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <div className="text-center">
                                        <h3 className="text-lg font-medium text-muted-foreground mb-2">
                                            No plans yet
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Create your first plan to get started with customer subscriptions.
                                        </p>
                                        <Button asChild>
                                            <Link href="/plans/create">Create First Plan</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        plans.map((plan) => {
                            return (
                                <Card key={plan.id} className={`
                                    hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1
                                    ${plan.is_featured ? 'ring-2 ring-yellow-400 ring-opacity-50 dark:ring-yellow-600' : ''}
                                    bg-card border-border
                                `}>
                                    <div className={`h-2 bg-linear-to-r ${
                                        plan.color_theme === 'blue' ? 'from-blue-500 to-blue-600' :
                                        plan.color_theme === 'green' ? 'from-green-500 to-green-600' :
                                        plan.color_theme === 'purple' ? 'from-purple-500 to-purple-600' :
                                        plan.color_theme === 'gold' ? 'from-yellow-500 to-yellow-600' :
                                        plan.color_theme === 'red' ? 'from-red-500 to-red-600' :
                                        'from-gray-500 to-gray-600'
                                    }`}></div>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <CardTitle className={`text-lg font-semibold ${
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
                                                        <Badge className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                                            <TrendingUp className="w-3 h-3 mr-1" />
                                                            Popular
                                                        </Badge>
                                                    )}
                                                    {plan.badge_text && (
                                                        <Badge className="bg-card text-card-foreground text-xs px-2 py-1 rounded-full border border-border">
                                                            {plan.badge_text}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex gap-1">
                                                    <Badge className={`${getCategoryColor(plan.category)} text-xs px-2 py-1 rounded-md`}>
                                                        {plan.category}
                                                    </Badge>
                                                    <Badge className={getStatusColor(plan.is_active)}>
                                                        {plan.is_active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                </div>
                                                {plan.description && (
                                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                                                        {plan.description}
                                                    </p>
                                                )}
                                            </div>
                                            {plan.is_featured && (
                                                <div className="flex items-center">
                                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                                </div>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="space-y-3">
                                            {/* Pricing Section */}
                                            <div className={`rounded-lg p-3 ${
                                                plan.is_featured                                                        
                                                    ? 'bg-linear-to-r from-yellow-50 to-orange-50 border border-yellow-200 dark:from-yellow-900/20 dark:to-orange-900/20 dark:border-yellow-800' 
                                                    : 'bg-muted border border-border'
                                            }`}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs font-medium text-muted-foreground">Duration</span>
                                                    <span className="text-sm font-semibold">{plan.duration_days} days</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        {hasDiscount(plan) && (
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-lg font-bold text-muted-foreground line-through">
                                                                    ${plan.original_price}
                                                                </span>
                                                                <Badge className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                                                    Save {Math.round(((plan.original_price - plan.discounted_price!) / plan.original_price) * 100)}%
                                                                </Badge>
                                                            </div>
                                                        )}
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-2xl font-bold text-foreground">
                                                                ${getEffectivePrice(plan)}
                                                            </span>
                                                            <span className="text-xs text-muted-foreground">/plan</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Features Section */}
                                            {plan.features && plan.features.length > 0 && (
                                                <div>
                                                    <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center">
                                                        <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                                                        Features
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-1">
                                                        {plan.features.slice(0, 4).map((feature: string, index: number) => (
                                                            <div key={index} className="flex items-center text-xs text-muted-foreground">
                                                                <Check className="w-3 h-3 mr-1 text-green-500 shrink-0" />
                                                                <span className="line-clamp-1">{feature}</span>
                                                            </div>
                                                        ))}
                                                        {plan.features.length > 4 && (
                                                            <div className="text-xs text-muted-foreground italic col-span-2">
                                                                +{plan.features.length - 4} more
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex flex-col gap-1 pt-2 border-t border-border">
                                                <div className="flex gap-1">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        className="flex-1 text-xs h-7"
                                                        asChild
                                                    >
                                                        <Link href={`/plans/${plan.id}`}>
                                                            <Eye className="w-3 h-3 mr-1" />
                                                            <span className="hidden sm:inline">View</span>
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        className="flex-1 text-xs h-7"
                                                        asChild
                                                    >
                                                        <Link href={`/plans/${plan.id}/edit`}>
                                                            <Edit className="w-3 h-3 mr-1" />
                                                            <span className="hidden sm:inline">Edit</span>
                                                        </Link>
                                                    </Button>
                                                </div>
                                                <Button 
                                                    variant="destructive" 
                                                    size="sm" 
                                                    className="w-full text-xs h-7"
                                                    onClick={() => deletePlan(plan.id, plan.name)}
                                                >
                                                    <Trash2 className="w-3 h-3 mr-1" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
