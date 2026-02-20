import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

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
        title: 'Create Plan',
        href: '/plans/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors, setError } = useForm({
        name: '',
        description: '',
        category: 'basic',
        duration_days: '',
        original_price: '',
        discounted_price: '',
        features: [] as string[],
        benefits: [] as string[],
        max_members: '1',
        is_featured: false,
        is_popular: false,
        badge_text: '',
        color_theme: 'blue',
        valid_from: '',
        valid_until: '',
        sort_order: '0',
        is_active: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/plans');
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

    const getPricePerDay = () => {
        const days = parseInt(data.duration_days) || 0;
        const price = parseFloat(data.original_price) || 0;
        if (days > 0 && price > 0) {
            return (price / days).toFixed(2);
        }
        return '0.00';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Plan" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="max-w-4xl">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">Create Plan</h1>
                        <p className="text-muted-foreground mt-2">
                            Design a new plan with custom pricing and features for your gym.
                        </p>
                    </div>

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
                                                <Label htmlFor="price">Original Price ($USD) *</Label>
                                                <Input
                                                    id="price"
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
                                                {processing ? 'Creating Plan...' : 'Create Plan'}
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
                                                <span className="font-medium">${getPricePerDay()}</span>
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
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Tips</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm text-muted-foreground">
                                    <p>• Use clear, descriptive plan names</p>
                                    <p>• Highlight unique benefits in features</p>
                                    <p>• Consider pricing psychology (e.g., $99 vs $100)</p>
                                    <p>• Test different durations for your market</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
