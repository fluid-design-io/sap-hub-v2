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
};

const SitePagination = ({ currentPage, totalPages }: PaginationProps) => {
    const renderPageNumbers = () => {
        let components = [];

        if (currentPage > 1) {
            components.push(
                <PaginationItem key="prev">
                    <PaginationPrevious href={`?page=${currentPage - 1}`} />
                </PaginationItem>,
            );
        }

        if (currentPage <= 3) {
            components.push(renderPageItem(1));
        }
        // Always show the first page
        if (currentPage > 3) {
            components.push(renderPageItem(1));
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
            components.push(renderPageItem(i));
        }

        // Always show the last page
        if (currentPage < totalPages - 2) {
            components.push(
                <PaginationItem key="ellipsis2">
                    <PaginationEllipsis />
                </PaginationItem>,
            );
            components.push(renderPageItem(totalPages));
        }

        if (currentPage < totalPages) {
            components.push(
                <PaginationItem key="next">
                    <PaginationNext href={`?page=${currentPage + 1}`} />
                </PaginationItem>,
            );
        }

        return components;
    };

    const renderPageItem = (pageNumber: number) => (
        <PaginationItem
            key={pageNumber}
            className={
                currentPage === pageNumber ? 'underline underline-offset-2' : ''
            }
        >
            <PaginationLink
                href={`?page=${pageNumber}`}
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
