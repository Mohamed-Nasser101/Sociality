using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Activity;

public class List
{
    public class Query : IRequest<Result<PagedList<ActivityDto>>>
    {
        public ActivityParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result<PagedList<ActivityDto>>> Handle(Query request,
            CancellationToken cancellationToken)
        {
            var activities = await _context.Activities
                .OrderBy(a => a.Date)
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider,
                    new { currentUsername = _userAccessor.GetUsername() })
                .ApplyFiltering(new ActivityFilter(_userAccessor.GetUsername()), request.Params)
                .ToPagingAsync(request.Params);

            return Result<PagedList<ActivityDto>>.Success(activities);
        }
    }
}