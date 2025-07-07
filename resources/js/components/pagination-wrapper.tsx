import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationLinkItem {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    links: PaginationLinkItem[];
}

export default function PaginationWrapper({ links }: Props) {
    if (!links || links.length <= 3) return null;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={links[0]?.url || '#'} />
                </PaginationItem>

                {links.slice(1, links.length - 1).map((link, i) => (
                    <PaginationItem key={i}>
                        {link.label === '...' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink href={link.url || '#'} isActive={link.active}>
                                {link.label}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext href={links[links.length - 1]?.url || '#'} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
