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

function SitePagination({ currentPage, totalPages }: PaginationProps) {
    return (
        <Pagination className="mt-8">
            <PaginationContent>
                {currentPage > 1 && (
                    <PaginationItem aria-disabled={currentPage === 1}>
                        <PaginationPrevious
                            href={{
                                query: { page: currentPage - 1 },
                            }}
                        />
                    </PaginationItem>
                )}
                {/* Previous Page Link - Only show if current page is not the first page */}
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationLink href={`?page=${currentPage - 1}`}>
                            {currentPage - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                {/* Current Page Link */}
                <PaginationItem>
                    <PaginationLink href={`?page=${currentPage}`}>
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>
                {currentPage < totalPages && totalPages - currentPage > 1 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {currentPage <= totalPages - 1 && (
                    <PaginationItem>
                        <PaginationLink href={`?page=${totalPages}`}>
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                )}
                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext href={`?page=${currentPage + 1}`} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}

export default SitePagination;
