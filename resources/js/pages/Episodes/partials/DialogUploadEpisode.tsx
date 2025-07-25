'use client';

import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useLang } from '@/hooks/useLang';
import { useUploadServers } from '@/hooks/useUploadServers';

import { Upload, Video } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
    animeId: number;
    episodeNumber: number;
    seasonId: number | null;
}

export default function DialogUploadEpisode({ animeId, episodeNumber, seasonId }: Props) {
    const { __ } = useLang();
    const { servers, loading } = useUploadServers();

    const formRef = useRef<HTMLFormElement | null>(null);

    const form = useForm({
        file: null as File | null,
    });

    const handleChangeFile = (file: File | null) => {
        form.setData('file', file);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        form.clearErrors();

        if (!form.data.file) {
            form.setError('file', __('episodes.errors.no_file_selected'));
            return;
        }

        const targetServer = servers?.find((s) => s.upload_url?.includes('myvideo.com'));

        if (!targetServer) {
            toast.error(__('episodes.errors.no_servers'));
            return;
        }

        if (formRef.current) {
            formRef.current.submit();
        }
    };

    const isAnyExternalUploading = loading || !servers?.length;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" size="sm" className="gap-1.5">
                    <Upload className="size-4" />
                    {__('episodes.upload')}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{__('episodes.upload')}</DialogTitle>
                    <DialogDescription>{__('episodes.upload_dialog_description')}</DialogDescription>
                </DialogHeader>

                <form ref={formRef} method="POST" encType="multipart/form-data" action="https://s1.myvideo.com/upload/01" onSubmit={handleSubmit}>
                    <input type="hidden" name="key" value="94176w33vl8cw4jue7shp" />
                    <input type="hidden" name="html_redirect" value="1" />

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="file">{__('episodes.select_file')}</Label>
                            <Input
                                id="file"
                                type="file"
                                name="file"
                                accept="video/mp4"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeFile(e.target.files?.[0] ?? null)}
                                required
                                disabled={isAnyExternalUploading}
                            />
                            {form.errors.file && <p className="text-sm text-red-500">{form.errors.file}</p>}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isAnyExternalUploading} className="gap-1.5">
                            <Video className="size-4" />
                            {__('episodes.start_upload')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
