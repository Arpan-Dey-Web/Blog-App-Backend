type iOptions = {
    page?: number | string;
    limit?: number | string;
    sortBy?: string;
    sortOrder?: string;
};
type ioptionResults = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
};
export default function paginationHelper(options: iOptions): ioptionResults;
export {};
//# sourceMappingURL=paginationHelper.d.ts.map