import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    searchParams?: Record<string, string>;
};

const SitePagination = ({
    currentPage,
    totalPages,
    searchParams,
}: PaginationProps) => {
    const renderPageNumbers = () => {
        let components = [];
        // combine the searchParams with the page number
        const searchStr = searchParams
            ? new URLSearchParams(searchParams).toString() + '&'
            : '';
        if (currentPage > 1) {
            components.push(
                <PaginationItem key="prev">
                    <PaginationPrevious
                        href={`?${searchStr}page=${currentPage - 1}`}
                    />
                </PaginationItem>,
            );
        }

        if (currentPage <= 3) {
            components.push(renderPageItem(1, searchStr));
        }
        // Always show the first page
        if (currentPage > 3) {
            components.push(renderPageItem(1, searchStr));
            components.push(
                <PaginationItem key="ellipsis1">
                    <PaginationEllipsis />
                </PaginationItem>,
            );
        }

        // Previous, current, and next page numbers
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages, currentPage + 1);
        for (let i = startPage; i <= endPage; i++) {
            components.push(renderPageItem(i, searchStr));
        }

        // Always show the last page
        if (currentPage < totalPages - 2) {
            components.push(
                <PaginationItem key="ellipsis2">
                    <PaginationEllipsis />
                </PaginationItem>,
            );
            components.push(renderPageItem(totalPages, searchStr));
        }

        if (currentPage < totalPages) {
            components.push(
                <PaginationItem key="next">
                    <PaginationNext
                        href={`?${searchStr}page=${currentPage + 1}`}
                    />
                </PaginationItem>,
            );
        }

        return components;
    };

    const renderPageItem = (pageNumber: number, search: string) => (
        <PaginationItem
            key={pageNumber}
            className={
                currentPage === pageNumber ? 'underline underline-offset-2' : ''
            }
        >
            <PaginationLink
                href={`?${search}page=${pageNumber}`}
                aria-label={`Go to page ${pageNumber}`}
            >
                {pageNumber}
            </PaginationLink>
        </PaginationItem>
    );

    return (
        <Pagination>
            <PaginationContent>{renderPageNumbers()}</PaginationContent>
        </Pagination>
    );
};

export default SitePagination;
