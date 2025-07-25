'use client';

import { Content } from '@radix-ui/react-dialog';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

type DialogContentProps = ComponentPropsWithoutRef<typeof Content>;
type DialogContentRef = React.ComponentRef<typeof Content>;

export const SafeDialogContent = forwardRef<DialogContentRef, DialogContentProps>((props, ref) => {
    return (
        <Content
            ref={ref}
            {...props}
            onKeyDown={(e) => {
                if (e.key === 'Escape' && e.target instanceof HTMLElement && e.target.closest('[role="listbox"]')) {
                    e.stopPropagation();
                }

                props.onKeyDown?.(e);
            }}
        />
    );
});

SafeDialogContent.displayName = 'SafeDialogContent';
