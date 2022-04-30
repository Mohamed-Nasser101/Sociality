using Application.Core;
using Persistence.Migrations;

namespace Application.Profiles;

public class ListActivitiesParams
{
    public string Predicate { get; set; }
}

public class ListActivitiesFilter : IFilteringStrategy<Domain.Entities.ActivityAttendee, ListActivitiesParams>
{
    public IQueryable<Domain.Entities.ActivityAttendee> ApplyFiltering(
        IQueryable<Domain.Entities.ActivityAttendee> query,
        ListActivitiesParams parameters)
    {
        var newQuery = query.OrderBy(x => x.Activity.Date);
        
        return parameters.Predicate switch
        {
            "past" => newQuery.Where(a => a.Activity.Date <= DateTime.UtcNow && !a.IsHost),
            "future" => newQuery.Where(a => a.Activity.Date >= DateTime.UtcNow && !a.IsHost),
            "host" => newQuery.Where(a => a.IsHost),
            _ => newQuery
        };
    }
}