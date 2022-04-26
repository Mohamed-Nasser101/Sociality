using System.Text.Json;

namespace Api.Extensions;

public static class HttpExtensions
{
    public static void AddPaginationHeaders(this HttpResponse response, int currentPage, int itemsPerPage,
        int totalItems, int totalPages)
    {
        var header = new { currentPage, itemsPerPage, totalItems, totalPages };
        response.Headers.Add("Pagination", JsonSerializer.Serialize(header));
        response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
    }
}