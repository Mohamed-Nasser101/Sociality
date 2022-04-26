using Microsoft.EntityFrameworkCore;

namespace Application.Core;

public class PagedList<T> : List<T>
{
    private PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
    {
        CurrentPage = pageNumber;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        TotalCount = count;
        PageSize = pageSize;
        AddRange(items);
    }

    public int CurrentPage { get; }
    public int TotalPages { get; }
    public int TotalCount { get; }
    public int PageSize { get; }

    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
    {
        var count = await source.CountAsync();
        var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PagedList<T>(items, count, pageNumber, pageSize);
    }
}

public static class QueryExtensions
{
    public static Task<PagedList<T>> ToPagingAsync<T>(this IQueryable<T> query, PagingParams paging)
    {
        return PagedList<T>.CreateAsync(query, paging.PageNumber, paging.PageSize);
    }
}