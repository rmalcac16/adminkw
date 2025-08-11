import AlternativeNamesInputTags from '@/components/alternative-names-input-tag';
import { DatePicker } from '@/components/date-picker';
import GenresSelectTags from '@/components/genre-select-tags';
import InputError from '@/components/input-error';
import RelatedInputTags from '@/components/related-input-tags';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useLang } from '@/hooks/useLang';
import { AnimeData } from '@/types/anime';
import { GenreData } from '@/types/genre';
import { useForm } from '@inertiajs/react';
import { Edit3, Plus } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { AnimeDialogSyncMal } from './anime-dialog-sync-mal';

export function AnimeForm({ type = 'create', anime, genres }: { type?: 'create' | 'edit'; anime?: AnimeData; genres: GenreData[] }) {
    const { __ } = useLang();
    const isEdit = !!anime;

    const { data, setData, errors, post, put, processing, reset } = useForm({
        name: anime?.name || '',
        name_en: anime?.name_en || '',
        name_alternative: anime?.name_alternative || '',
        slug: anime?.slug || '',
        banner: anime?.banner || '',
        poster: anime?.poster || '',
        aired: anime?.aired || new Date().toISOString().split('T')[0],
        type: anime?.type || 'TV',
        status: anime?.status || '0',
        premiered: anime?.premiered || '',
        broadcast: anime?.broadcast || '1',
        popularity: anime?.popularity || '0',
        genres: anime?.genres || '',
        rating: anime?.rating || 'pg',
        vote_average: anime?.vote_average || '0',
        prequel: anime?.prequel || '',
        sequel: anime?.sequel || '',
        related: anime?.related || '',
        overview: anime?.overview || '',
        short_name: anime?.short_name || '',
    });

    const [originalName, setOriginalName] = useState(anime?.name || '');
    const [useEnglishTitle, setUseEnglishTitle] = useState(false);

    const handleSwitchChange = (checked: boolean) => {
        setUseEnglishTitle(checked);

        const alternativesSet = new Set(
            (data.name_alternative || '')
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
        );

        if (checked) {
            setOriginalName(data.name);
            alternativesSet.add(data.name);
            alternativesSet.delete(data.name_en);
            setData('name', data.name_en || data.name);
            setData('name_alternative', Array.from(alternativesSet).join(','));
        } else {
            setData('name', originalName);
            const updatedAlternatives = Array.from(alternativesSet).filter((alt) => alt !== originalName);
            if (data.name_en && !updatedAlternatives.includes(data.name_en)) {
                updatedAlternatives.push(data.name_en);
            }
            setData('name_alternative', updatedAlternatives.join(','));
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (processing) return;
        if (type === 'edit' && !anime?.id) {
            toast.error(__('animes.update.error_no_id'));
            return;
        }
        const onSuccess = () => {
            reset();
        };
        if (isEdit) {
            put(route('animes.update', anime!.id), { onSuccess });
        } else {
            post(route('animes.store'), { onSuccess });
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex sm:items-end sm:justify-end">
                <Button type="submit" disabled={processing}>
                    {type === 'edit' ? (
                        <>
                            <Edit3 />
                            {__('common.update')}
                        </>
                    ) : (
                        <>
                            <Plus />
                            {__('common.create')}
                        </>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                <div className="flex flex-col gap-2 lg:col-span-5">
                    <Label htmlFor="name">{__('animes.labels.name')}</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder={__('animes.placeholders.name')}
                        required
                    />
                    <InputError message={errors.name} className="text-xs" />
                    <div className="flex items-center gap-2 lg:col-span-12">
                        <Switch checked={useEnglishTitle} onCheckedChange={handleSwitchChange} id="useEnglish" />
                        <Label htmlFor="useEnglish" className="text-sm">
                            Alternar títulos original/ingles
                        </Label>
                    </div>
                </div>

                <div className="flex flex-col gap-2 lg:col-span-5">
                    <Label htmlFor="slug">{__('animes.labels.slug')}</Label>
                    <Input
                        id="slug"
                        value={data.slug}
                        onChange={(e) => setData('slug', e.target.value)}
                        placeholder={__('animes.placeholders.slug')}
                    />
                    <p className="line-clamp-1 text-xs overflow-ellipsis text-muted-foreground">{__('animes.labels.slug_help')}</p>
                    <InputError message={errors.slug} className="text-xs" />
                </div>

                <div className="flex flex-col gap-2 lg:col-span-2">
                    <Label htmlFor="short_name">{__('animes.labels.short_name')}</Label>
                    <Input
                        id="short_name"
                        value={data.short_name}
                        onChange={(e) => setData('short_name', e.target.value)}
                        placeholder={__('animes.placeholders.short_name')}
                    />
                    <InputError message={errors.short_name} className="text-xs" />
                </div>

                <div className="flex flex-col gap-2 lg:col-span-6">
                    <Label htmlFor="name_alternative">{__('animes.labels.name_alternative')}</Label>
                    <AlternativeNamesInputTags
                        value={data.name_alternative}
                        onChange={(value) => setData('name_alternative', value)}
                        placeholder={__('animes.placeholders.name_alternative')}
                    />
                    <InputError message={errors.name_alternative} className="text-xs" />
                </div>

                <div className="flex flex-col gap-2 lg:col-span-2">
                    <Label htmlFor="type">{__('animes.labels.type')}</Label>
                    <Select value={data.type} onValueChange={(value) => setData('type', value)} required>
                        <SelectTrigger>
                            <SelectValue placeholder={__('animes.placeholders.type')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="TV">{__('animes.types.tv')}</SelectItem>
                            <SelectItem value="Movie">{__('animes.types.movie')}</SelectItem>
                            <SelectItem value="Special">{__('animes.types.special')}</SelectItem>
                            <SelectItem value="OVA">{__('animes.types.ova')}</SelectItem>
                            <SelectItem value="ONA">{__('animes.types.ona')}</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.type} className="text-xs" />
                </div>

                <div className="flex flex-col gap-2 lg:col-span-2">
                    <Label htmlFor="status">{__('animes.labels.status')}</Label>
                    <Select value={data.status?.toString()} onValueChange={(value) => setData('status', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={__('animes.placeholders.status')} />
                        </SelectTrigger>
                        <SelectContent>
                            {[0, 1, 2, 3].map((status) => (
                                <SelectItem key={status} value={String(status)}>
                                    {__(`animes.statuses.${status}`)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status} className="text-xs" />
                </div>

                <div className="flex flex-col gap-2 lg:col-span-2">
                    <Label htmlFor="aired">{__('animes.labels.aired')}</Label>
                    <DatePicker date={data.aired} onChange={(date) => setData('aired', date)} placeholder={__('animes.placeholders.aired')} />
                    <InputError message={errors.aired} className="text-xs" />
                </div>

                <div className="flex flex-col gap-2 lg:col-span-6">
                    <Label htmlFor="poster">{__('animes.labels.poster')}</Label>
                    <Input
                        id="poster"
                        value={data.poster}
                        onChange={(e) => {
                            const val = e.target.value.trim();
                            setData('poster', val);
                        }}
                        placeholder={__('animes.placeholders.poster')}
                        required
                    />
                    <InputError message={errors.poster} className="text-xs" />
                </div>

                <div className="flex flex-col gap-2 lg:col-span-6">
                    <Label htmlFor="banner">{__('animes.labels.banner')}</Label>
                    <Input
                        id="banner"
                        value={data.banner}
                        onChange={(e) => {
                            const val = e.target.value.trim();
                            setData('banner', val);
                        }}
                        placeholder={__('animes.placeholders.banner')}
                        required
                    />
                    <InputError message={errors.banner} className="text-xs" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="overview">{__('animes.labels.overview')}</Label>
                <Textarea
                    value={data.overview}
                    onChange={(e) => setData('overview', e.target.value)}
                    placeholder={__('animes.placeholders.overview')}
                    rows={3}
                />
                <InputError message={errors.overview} className="text-xs" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                <div className="col-span-1 flex flex-col gap-2 md:col-span-2">
                    <Label htmlFor="premiered">{__('animes.labels.premiered')}</Label>
                    <Input
                        id="premiered"
                        value={data.premiered}
                        onChange={(e) => setData('premiered', e.target.value)}
                        placeholder={__('animes.placeholders.premiered')}
                        required
                    />
                    <InputError message={errors.premiered} className="text-xs" />
                </div>

                <div className="col-span-1 flex flex-col gap-2 md:col-span-2">
                    <Label htmlFor="broadcast">{__('animes.labels.broadcast')}</Label>
                    <Select value={String(data.broadcast)} onValueChange={(value) => setData('broadcast', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={__('animes.placeholders.broadcast')} />
                        </SelectTrigger>
                        <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                                <SelectItem key={day} value={String(day)}>
                                    {__(`animes.broadcast.${day}`)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.broadcast} className="text-xs" />
                </div>

                <div className="col-span-1 flex flex-col gap-2 md:col-span-1">
                    <Label htmlFor="popularity">{__('animes.labels.popularity')}</Label>
                    <Input
                        id="popularity"
                        type="number"
                        min={0}
                        value={data.popularity}
                        onChange={(e) => setData('popularity', Number(e.target.value))}
                        placeholder={__('animes.placeholders.popularity')}
                    />
                    <InputError message={errors.popularity} className="text-xs" />
                </div>

                <div className="col-span-1 flex flex-col gap-2 md:col-span-1">
                    <Label htmlFor="vote_average">{__('animes.labels.vote_average')}</Label>
                    <Input
                        id="vote_average"
                        type="number"
                        min={0}
                        max={10}
                        step={0.001}
                        value={data.vote_average}
                        onChange={(e) => setData('vote_average', Number(e.target.value))}
                        placeholder={__('animes.placeholders.vote_average')}
                    />
                    <InputError message={errors.vote_average} className="text-xs" />
                </div>

                <div className="col-span-1 flex flex-col gap-2 md:col-span-3">
                    <Label htmlFor="rating">{__('animes.labels.rating')}</Label>
                    <Select value={data.rating} onValueChange={(value) => setData('rating', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={__('animes.placeholders.rating')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="g">{__('animes.ratings.g')}</SelectItem>
                            <SelectItem value="pg">{__('animes.ratings.pg')}</SelectItem>
                            <SelectItem value="pg_13">{__('animes.ratings.pg_13')}</SelectItem>
                            <SelectItem value="r">{__('animes.ratings.r')}</SelectItem>
                            <SelectItem value="r_plus">{__('animes.ratings.r_plus')}</SelectItem>
                            <SelectItem value="rx">{__('animes.ratings.rx')}</SelectItem>
                            <SelectItem value="x">{__('animes.ratings.x')}</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.rating} className="text-xs" />
                </div>

                <div className="col-span-1 flex flex-col gap-2 md:col-span-1">
                    <Label htmlFor="prequel">{__('animes.labels.prequel')}</Label>
                    <Input
                        id="prequel"
                        type="text"
                        value={data.prequel || ''}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === '' || /^[1-9]\d*$/.test(val)) {
                                setData('prequel', val === '' ? '' : Number(val));
                            }
                        }}
                        placeholder={__('animes.placeholders.prequel')}
                    />
                    <InputError message={errors.prequel} className="text-xs" />
                </div>

                <div className="col-span-1 flex flex-col gap-2 md:col-span-1">
                    <Label htmlFor="sequel">{__('animes.labels.sequel')}</Label>
                    <Input
                        id="sequel"
                        type="text"
                        value={data.sequel || ''}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === '' || /^[1-9]\d*$/.test(val)) {
                                setData('sequel', val === '' ? '' : Number(val));
                            }
                        }}
                        placeholder={__('animes.placeholders.sequel')}
                    />
                    <InputError message={errors.sequel} className="text-xs" />
                </div>

                <div className="col-span-1">
                    <AnimeDialogSyncMal anime={data} setData={setData} genres={genres} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
                    <Label htmlFor="genres">{__('animes.labels.genres')}</Label>
                    <GenresSelectTags allGenres={genres} value={data.genres ?? ''} onChange={(val) => setData('genres', val ?? '')} />
                    <InputError message={errors.genres} className="text-xs" />
                </div>

                <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
                    <Label htmlFor="related">{__('animes.labels.related')}</Label>
                    <RelatedInputTags
                        value={data.related}
                        onChange={(val) => setData('related', val)}
                        placeholder={__('animes.placeholders.related')}
                    />
                    <InputError message={errors.related} className="text-xs" />
                </div>
            </div>
        </form>
    );
}
