using Application.Core;

namespace Application.Activity;

public class ActivityParams : PagingParams
{
    public string Condition { get; set; }
    public DateTime StartDate { get; set; } = DateTime.UtcNow;
}

public class ActivityFilter : IFilteringStrategy<ActivityDto, ActivityParams>
{
    private readonly string _username;

    public ActivityFilter(string username)
    {
        _username = username;
    }

    public IQueryable<ActivityDto> ApplyFiltering(IQueryable<ActivityDto> query, ActivityParams parameters)
    {
        var newQuery = query.Where(a => a.Date >= parameters.StartDate);

        if (parameters.Condition == "going")
            newQuery = newQuery.Where(x => x.Attendees.Any(a => a.Username == _username));

        if (parameters.Condition == "host")
            newQuery = newQuery.Where(x => x.HostUsername == _username);

        return newQuery;
    }
}