import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, ArrowLeft } from 'lucide-react';
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

interface PlansEditProps {
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
        title: 'Edit Plan',
        href: '/plans/edit',
    },
];

export default function Edit({ plan }: PlansEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: plan.name || '',
        description: plan.description || '',
        category: plan.category || 'basic',
        duration_days: plan.duration_days?.toString() || '',
        original_price: plan.original_price?.toString() || '',
        discounted_price: plan.discounted_price?.toString() || '',
        features: plan.features || [],
        benefits: plan.benefits || [],
        max_members: plan.max_members?.toString() || '1',
        is_featured: plan.is_featured || false,
        is_popular: plan.is_popular || false,
        badge_text: plan.badge_text || '',
        color_theme: plan.color_theme || 'blue',
        valid_from: plan.valid_from || '',
        valid_until: plan.valid_until || '',
        sort_order: plan.sort_order?.toString() || '0',
        is_active: plan.is_active ?? true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/plans/${plan.id}`, data as any);
    };

    const addFeature = (e?: React.MouseEvent) => {
        setData('features', [...data.features, '']);
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...data.features];
        newFeatures[index] = value;
        setData('features', newFeatures);
    };

    const removeFeature = (index: number) => {
        setData('features', data.features.filter((_, i) => i !== index));
    };

    const deletePlan = () => {
        if (confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
            router.delete(`/plans/${plan.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${plan.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Edit Plan</h1>
                        <p className="text-muted-foreground mt-2">
                            Update your gym plan details and pricing.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/plans">
                                <ArrowLeft className="h-4 w-4 mr-1" />
                                Back to Plans
                            </Link>
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={deletePlan}
                            disabled={processing}
                        >
                            <X className="h-4 w-4 mr-1" />
                            Delete Plan
                        </Button>
                    </div>
                </div>

                <div className="max-w-4xl">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <form onSubmit={submit}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Plan Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div className="md:col-span-2 space-y-2">
                                                <Label htmlFor="name">Plan Name *</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="e.g., Premium Monthly, Student Plan, VIP Membership"
                                                    required
                                                />
                                                {errors.name && (
                                                    <p className="text-sm text-destructive">{errors.name}</p>
                                                )}
                                            </div>

                                            <div className="md:col-span-2 space-y-2">
                                                <Label htmlFor="description">Description</Label>
                                                <textarea
                                                    id="description"
                                                    value={data.description}
                                                    onChange={(e) => setData('description', e.target.value)}
                                                    placeholder="Describe what this membership includes..."
                                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    rows={3}
                                                />
                                                {errors.description && (
                                                    <p className="text-sm text-destructive">{errors.description}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="duration_days">Duration (Days) *</Label>
                                                <Input
                                                    id="duration_days"
                                                    type="number"
                                                    min="1"
                                                    value={data.duration_days}
                                                    onChange={(e) => setData('duration_days', e.target.value)}
                                                    placeholder="e.g., 30, 90, 365"
                                                    required
                                                />
                                                {errors.duration_days && (
                                                    <p className="text-sm text-destructive">{errors.duration_days}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="original_price">Original Price ($USD) *</Label>
                                                <Input
                                                    id="original_price"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={data.original_price}
                                                    onChange={(e) => setData('original_price', e.target.value)}
                                                    placeholder="e.g., 49.99, 99.99"
                                                    required
                                                />
                                                {errors.original_price && (
                                                    <p className="text-sm text-destructive">{errors.original_price}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="category">Category *</Label>
                                                <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="basic">Basic</SelectItem>
                                                        <SelectItem value="standard">Standard</SelectItem>
                                                        <SelectItem value="premium">Premium</SelectItem>
                                                        <SelectItem value="vip">VIP</SelectItem>
                                                        <SelectItem value="enterprise">Enterprise</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors.category && (
                                                    <p className="text-sm text-destructive">{errors.category}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="discounted_price">Discounted Price ($USD)</Label>
                                                <Input
                                                    id="discounted_price"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={data.discounted_price}
                                                    onChange={(e) => setData('discounted_price', e.target.value)}
                                                    placeholder="e.g., 39.99, 79.99"
                                                />
                                                {errors.discounted_price && (
                                                    <p className="text-sm text-destructive">{errors.discounted_price}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="color_theme">Color Theme *</Label>
                                                <Select value={data.color_theme} onValueChange={(value) => setData('color_theme', value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select color theme" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="blue">Blue</SelectItem>
                                                        <SelectItem value="green">Green</SelectItem>
                                                        <SelectItem value="purple">Purple</SelectItem>
                                                        <SelectItem value="gold">Gold</SelectItem>
                                                        <SelectItem value="red">Red</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors.color_theme && (
                                                    <p className="text-sm text-destructive">{errors.color_theme}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="is_active" className="text-base font-medium">Plan Status</Label>
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id="is_active"
                                                        checked={data.is_active}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('is_active', e.target.checked)}
                                                        className="h-4 w-4 rounded border border-input bg-background text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                    <Label htmlFor="is_active" className="text-sm">
                                                        {data.is_active ? 'Active' : 'Inactive'}
                                                    </Label>
                                                </div>
                                            </div>
                                            {errors.is_active && (
                                                <p className="text-sm text-destructive">{errors.is_active}</p>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="is_featured" className="text-base font-medium">Featured Plan</Label>
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id="is_featured"
                                                        checked={data.is_featured}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('is_featured', e.target.checked)}
                                                        className="h-4 w-4 rounded border border-input bg-background text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                    <Label htmlFor="is_featured" className="text-sm">
                                                        {data.is_featured ? 'Featured' : 'Not Featured'}
                                                    </Label>
                                                </div>
                                            </div>
                                            {errors.is_featured && (
                                                <p className="text-sm text-destructive">{errors.is_featured}</p>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="is_popular" className="text-base font-medium">Popular Plan</Label>
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id="is_popular"
                                                        checked={data.is_popular}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('is_popular', e.target.checked)}
                                                        className="h-4 w-4 rounded border border-input bg-background text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                    <Label htmlFor="is_popular" className="text-sm">
                                                        {data.is_popular ? 'Popular' : 'Not Popular'}
                                                    </Label>
                                                </div>
                                            </div>
                                            {errors.is_popular && (
                                                <p className="text-sm text-destructive">{errors.is_popular}</p>
                                            )}

                                            <div className="space-y-2">
                                                <Label htmlFor="badge_text">Badge Text</Label>
                                                <Input
                                                    id="badge_text"
                                                    type="text"
                                                    value={data.badge_text}
                                                    onChange={(e) => setData('badge_text', e.target.value)}
                                                    placeholder="e.g., Most Popular, Best Value"
                                                />
                                                {errors.badge_text && (
                                                    <p className="text-sm text-destructive">{errors.badge_text}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="sort_order">Sort Order</Label>
                                                <Input
                                                    id="sort_order"
                                                    type="number"
                                                    min="0"
                                                    value={data.sort_order}
                                                    onChange={(e) => setData('sort_order', e.target.value)}
                                                    placeholder="0 for first"
                                                />
                                                {errors.sort_order && (
                                                    <p className="text-sm text-destructive">{errors.sort_order}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="max_members">Max Members (Group Plans)</Label>
                                                <Input
                                                    id="max_members"
                                                    type="number"
                                                    min="1"
                                                    value={data.max_members}
                                                    onChange={(e) => setData('max_members', e.target.value)}
                                                    placeholder="1 for individual plans"
                                                />
                                                {errors.max_members && (
                                                    <p className="text-sm text-destructive">{errors.max_members}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-base font-medium">Features & Benefits</Label>
                                                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                                                    <Plus className="h-4 w-4 mr-1" />
                                                    Add Feature
                                                </Button>
                                            </div>

                                            <div className="space-y-2">
                                                {data.features.map((feature, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <Input
                                                            value={feature}
                                                            onChange={(e) => updateFeature(index, e.target.value)}
                                                            placeholder="e.g., Unlimited gym access, Personal trainer sessions"
                                                            className="flex-1"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => removeFeature(index)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                            {errors.features && (
                                                <p className="text-sm text-destructive">{errors.features}</p>
                                            )}
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <Button type="submit" disabled={processing}>
                                                {processing ? 'Updating Plan...' : 'Update Plan'}
                                            </Button>
                                            <Button type="button" variant="outline" asChild>
                                                <Link href="/plans">Cancel</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </form>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Plan Preview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold text-lg">{data.name || 'Plan Name'}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {data.description || 'Plan description will appear here'}
                                            </p>
                                        </div>

                                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm">Duration:</span>
                                                <span className="font-medium">{data.duration_days || '0'} days</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm">Price:</span>
                                                <span className="font-bold text-lg">${data.original_price || '0.00'}</span>
                                            </div>
                                            <div className="flex justify-between border-t pt-2">
                                                <span className="text-sm">Price per day:</span>
                                                <span className="font-medium">${(parseFloat(data.original_price || '0') / parseInt(data.duration_days || '1')).toFixed(2)}</span>
                                            </div>
                                        </div>

                                        {data.features.length > 0 && (
                                            <div>
                                                <h4 className="font-medium mb-2">Features:</h4>
                                                <ul className="space-y-1">
                                                    {data.features.map((feature, index) => (
                                                        <li key={index} className="text-sm flex items-center">
                                                            <span className="mr-2">✓</span>
                                                            {feature || 'Feature description'}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="flex items-center space-x-2 pt-2">
                                            <Badge className={data.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                                {data.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                            {data.is_featured && (
                                                <Badge className="bg-yellow-100 text-yellow-800">
                                                    Featured
                                                </Badge>
                                            )}
                                            {data.is_popular && (
                                                <Badge className="bg-orange-100 text-orange-800">
                                                    Popular
                                                </Badge>
                                            )}
                                        </div>
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
