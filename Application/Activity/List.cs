using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activity;

public class List
{
    public class Query : IRequest<Result<List<ActivityDto>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<List<ActivityDto>>> Handle(Query request,
            CancellationToken cancellationToken)
        {
            var x =  _context.Activities
                // .Include(x => x.Attendees)
                // .ThenInclude(a => a.Attendee)
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider).ToQueryString();
            
            var activities = await _context.Activities
                // .Include(x => x.Attendees)
                // .ThenInclude(a => a.Attendee)
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return Result<List<ActivityDto>>.Success(activities);
        }
    }
}