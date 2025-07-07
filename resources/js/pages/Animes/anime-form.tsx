import { DatePicker } from '@/components/date-picker';
import GenresSelectTags from '@/components/genre-select-tags';
import RelatedInputTags from '@/components/related-input-tags';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLang } from '@/hooks/useLang';
import { AnimeData } from '@/types/anime';
import { GenreData } from '@/types/genre';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { AnimeDialogSyncMal } from './anime-dialog-sync-mal';

export function AnimeForm({ type = 'create', anime, genres }: { type?: 'create' | 'edit'; anime?: AnimeData; genres: GenreData[] }) {
    const { __ } = useLang();

    const isEdit = !!anime;

    const { data, setData, errors, post, put, processing, reset } = useForm({
        name: anime?.name || '',
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
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (processing) return;

        if (type === 'edit' && !anime?.id) {
            toast.error(__('animes.update.error_no_id'));
            return;
        }

        const onSuccess = () => {
            reset();
            toast(isEdit ? __('animes.update.success') : __('animes.create.success'), {});
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
                    {type === 'edit' ? __('animes.edit.button') : __('animes.create.button')}
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                <div className="flex flex-col gap-2 lg:col-span-6">
                    <Label htmlFor="name">{__('animes.form.name')}</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder={__('animes.form.name_placeholder')}
                        required
                    />
                    {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>
                <div className="flex flex-col gap-2 lg:col-span-6">
                    <Label htmlFor="slug">{__('animes.form.slug')}</Label>
                    <Input
                        id="slug"
                        value={data.slug}
                        onChange={(e) => setData('slug', e.target.value)}
                        placeholder={__('animes.form.slug_placeholder')}
                    />
                    <p className="line-clamp-1 text-xs overflow-ellipsis text-muted-foreground">{__('animes.form.slug_help')}</p>
                    {errors.slug && <p className="text-xs text-red-400">{errors.slug}</p>}
                </div>
                <div className="flex flex-col gap-2 lg:col-span-6">
                    <Label htmlFor="name_alternative">{__('animes.form.name_alternative')}</Label>
                    <Input
                        id="name_alternative"
                        value={data.name_alternative}
                        onChange={(e) => setData('name_alternative', e.target.value)}
                        placeholder={__('animes.form.name_alternative_placeholder')}
                    />
                    {errors.name_alternative && <p className="text-xs text-red-400">{errors.name_alternative}</p>}
                </div>
                <div className="flex flex-col gap-2 lg:col-span-2">
                    <Label htmlFor="type">{__('animes.form.type')}</Label>
                    <Select value={data.type} onValueChange={(value) => setData('type', value)} required>
                        <SelectTrigger>
                            <SelectValue placeholder={__('animes.form.type_placeholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="TV">{__('animes.types.tv')}</SelectItem>
                            <SelectItem value="Movie">{__('animes.types.movie')}</SelectItem>
                            <SelectItem value="Special">{__('animes.types.special')}</SelectItem>
                            <SelectItem value="OVA">{__('animes.types.ova')}</SelectItem>
                            <SelectItem value="ONA">{__('animes.types.ona')}</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.type && <p className="text-xs text-red-400">{errors.type}</p>}
                </div>
                <div className="flex flex-col gap-2 lg:col-span-2">
                    <Label htmlFor="status">{__('animes.form.status')}</Label>
                    <Select value={data.status?.toString()} onValueChange={(value) => setData('status', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={__('animes.form.status_placeholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="3">{__('animes.statuses.upcoming')}</SelectItem>
                            <SelectItem value="2">{__('animes.statuses.paused')}</SelectItem>
                            <SelectItem value="1">{__('animes.statuses.airing')}</SelectItem>
                            <SelectItem value="0">{__('animes.statuses.finished')}</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.status && <p className="text-xs text-red-400">{errors.status}</p>}
                </div>
                <div className="flex flex-col gap-2 lg:col-span-2">
                    <Label htmlFor="aired">{__('animes.form.aired')}</Label>
                    <DatePicker date={data.aired} onChange={(date) => setData('aired', date)} placeholder={__('animes.form.aired_placeholder')} />
                    {errors.aired && <p className="text-xs text-red-400">{errors.aired}</p>}
                </div>

                <div className="flex flex-col gap-2 lg:col-span-6">
                    <Label htmlFor="poster">{__('animes.form.poster')}</Label>
                    <Input
                        id="poster"
                        value={data.poster}
                        onChange={(e) => {
                            const val = e.target.value.trim();
                            if (val && !val.startsWith('/')) {
                                toast.warning(__('animes.form.poster_warning'));
                            }
                            setData('poster', val);
                        }}
                        placeholder={__('animes.form.poster_placeholder')}
                        required
                    />
                    {errors.poster && <p className="text-xs text-red-400">{errors.poster}</p>}
                </div>

                <div className="flex flex-col gap-2 lg:col-span-6">
                    <Label htmlFor="banner">{__('animes.form.banner')}</Label>
                    <Input
                        id="banner"
                        value={data.banner}
                        onChange={(e) => {
                            const val = e.target.value.trim();
                            if (val && !val.startsWith('/')) {
                                toast.warning(__('animes.form.banner_warning'));
                            }
                            setData('banner', val);
                        }}
                        placeholder={__('animes.form.banner_placeholder')}
                        required
                    />
                    {errors.banner && <p className="text-xs text-red-400">{errors.banner}</p>}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="overview">{__('animes.form.overview')}</Label>
                <Textarea
                    value={data.overview}
                    onChange={(e) => setData('overview', e.target.value)}
                    placeholder={__('animes.form.overview_placeholder')}
                    rows={3}
                />
                {errors.overview && <p className="text-xs text-red-400">{errors.overview}</p>}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                <div className="col-span-1 flex flex-col gap-2 md:col-span-2">
                    <Label htmlFor="premiered">{__('animes.form.premiered')}</Label>
                    <Input
                        id="premiered"
                        value={data.premiered}
                        onChange={(e) => setData('premiered', e.target.value)}
                        placeholder={__('animes.form.premiered_placeholder')}
                        required
                    />
                    {errors.premiered && <p className="text-xs text-red-400">{errors.premiered}</p>}
                </div>

                <div className="col-span-1 flex flex-col gap-2 md:col-span-2">
                    <Label htmlFor="broadcast">{__('animes.form.broadcast')}</Label>
                    <Select value={String(data.broadcast)} onValueChange={(value) => setData('broadcast', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={__('animes.form.broadcast_placeholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">{__('animes.broadcast.monday')}</SelectItem>
                            <SelectItem value="2">{__('animes.broadcast.tuesday')}</SelectItem>
                            <SelectItem value="3">{__('animes.broadcast.wednesday')}</SelectItem>
                            <SelectItem value="4">{__('animes.broadcast.thursday')}</SelectItem>
                            <SelectItem value="5">{__('animes.broadcast.friday')}</SelectItem>
                            <SelectItem value="6">{__('animes.broadcast.saturday')}</SelectItem>
                            <SelectItem value="7">{__('animes.broadcast.sunday')}</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.broadcast && <p className="text-xs text-red-400">{errors.broadcast}</p>}
                </div>

                <div className="col-span-1 flex flex-col gap-2 md:col-span-1">
                    <Label htmlFor="popularity">{__('animes.form.popularity')}</Label>
                    <Input
                        id="popularity"
                        type="number"
                        min={0}
                        value={data.popularity}
                        onChange={(e) => setData('popularity', Number(e.target.value))}
                        placeholder={__('animes.form.popularity_placeholder')}
                    />
                    {errors.popularity && <p className="text-xs text-red-400">{errors.popularity}</p>}
                </div>

                <div className="col-span-1 flex flex-col gap-2 md:col-span-1">
                    <Label htmlFor="vote_average">{__('animes.form.vote_average')}</Label>
                    <Input
                        id="vote_average"
                        type="number"
                        min={0}
                        max={10}
                        step={0.001}
                        value={data.vote_average}
                        onChange={(e) => setData('vote_average', Number(e.target.value))}
                        placeholder={__('animes.form.vote_average_placeholder')}
                    />
                    {errors.vote_average && <p className="text-xs text-red-400">{errors.vote_average}</p>}
                </div>

                <div className="col-span-1 flex flex-col gap-2 md:col-span-3">
                    <Label htmlFor="rating">{__('animes.form.rating')}</Label>
                    <Select value={data.rating} onValueChange={(value) => setData('rating', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={__('animes.form.rating_placeholder')} />
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
                    {errors.rating && <p className="text-xs text-red-400">{errors.rating}</p>}
                </div>

                <div className="col-span-1 flex flex-col gap-2 md:col-span-1">
                    <Label htmlFor="prequel">{__('animes.form.prequel')}</Label>
                    <Input
                        id="prequel"
                        type="number"
                        min={0}
                        value={data.prequel}
                        onChange={(e) => setData('prequel', Number(e.target.value))}
                        placeholder={__('animes.form.prequel_placeholder')}
                    />
                    {errors.prequel && <p className="text-xs text-red-400">{errors.prequel}</p>}
                </div>

                <div className="col-span-1 flex flex-col gap-2 md:col-span-1">
                    <Label htmlFor="sequel">{__('animes.form.sequel')}</Label>
                    <Input
                        id="sequel"
                        type="number"
                        min={0}
                        value={data.sequel}
                        onChange={(e) => setData('sequel', Number(e.target.value))}
                        placeholder={__('animes.form.sequel_placeholder')}
                    />
                    {errors.sequel && <p className="text-xs text-red-400">{errors.sequel}</p>}
                </div>

                <div className="col-span-1">
                    <AnimeDialogSyncMal anime={data} setData={setData} genres={genres} />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
                    <Label htmlFor="genres">{__('animes.form.genres')}</Label>
                    <GenresSelectTags allGenres={genres} value={data.genres} onChange={(val) => setData('genres', val)} />
                    {errors.genres && <p className="text-xs text-red-400">{errors.genres}</p>}
                </div>

                <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
                    <Label htmlFor="related">{__('animes.form.related')}</Label>
                    <RelatedInputTags
                        value={data.related}
                        onChange={(val) => setData('related', val)}
                        placeholder={__('animes.form.related_placeholder')}
                    />
                    {errors.related && <p className="text-xs text-red-400">{errors.related}</p>}
                </div>
            </div>
        </form>
    );
}
