using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers;

public class FollowToggle
{
    public class Command : IRequest<Result<Unit>>
    {
        public string TargetUsername { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var observer = await _context.Users.FirstOrDefaultAsync(a => a.UserName == _userAccessor.GetUsername());
            if (observer is null) return null;

            var target = await _context.Users.FirstOrDefaultAsync(a => a.UserName == request.TargetUsername);
            if (target is null) return null;

            var following = await _context.UserFollowings.FindAsync(observer.Id, target.Id);

            if (following is null)
            {
                observer.Followings.Add(new()
                {
                    Observer = observer,
                    Target = target
                });
            }
            else
            {
                observer.Followings.Remove(following);
            }

            var result = await _context.SaveChangesAsync() > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Error Following this User");
        }
    }
}