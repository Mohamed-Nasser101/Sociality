using System.Linq.Expressions;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Identities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Profile = Application.Profiles.Profile;

namespace Application.Followers;

public class List
{
    public class Query : IRequest<Result<List<Profile>>>
    {
        public string Predicate { get; set; }
        public string Username { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<Profile>>>
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

        public async Task<Result<List<Profile>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profiles = await ProfileDict(request.Username)[request.Predicate];
            return Result<List<Profile>>.Success(profiles);
        }

        private Dictionary<string, Task<List<Profile>>> ProfileDict(string username)
        {
            var profileDict = new Dictionary<string, Task<List<Profile>>>
            {
                { "followers", ProfileSource(x => x.Target.UserName == username, x => x.Observer) },
                { "followings", ProfileSource(x => x.Observer.UserName == username, x => x.Target) }
            };
            return profileDict;
        }

        private Task<List<Profile>> ProfileSource(Expression<Func<UserFollowing, bool>> predicate,
            Expression<Func<UserFollowing, AppUser>> func)
        {
            return _context.UserFollowings.Where(predicate).Select(func)
                .ProjectTo<Profile>(_mapper.ConfigurationProvider,
                    new { currentUsername = _userAccessor.GetUsername() })
                .ToListAsync();
        }
    }
}