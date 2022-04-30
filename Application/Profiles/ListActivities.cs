using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class ListActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        public string Username { get; set; }
        public string Predicate { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activities =await _context.ActivityAttendees
                .Where(a => a.Attendee.UserName == request.Username)
                .ApplyFiltering(new ListActivitiesFilter(), new() { Predicate = request.Predicate })
                .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            
            return Result<List<UserActivityDto>>.Success(activities);
        }
    }
}