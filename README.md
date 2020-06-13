# use-pagination

Super simple TypeScript native pagination hook for React.

Inspired by https://github.com/mariosant/react-pagination-hook – cheers!

## Usage

Put an array in, get a paginated array and an API out.

```typescript
const {
nextPage,
previousPage,
firstPage,
lastPage,
paginated: paginatedWines,
page,
totalPages,
} = usePagination(orderedWines, 50);
```