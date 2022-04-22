using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos;

public class SetMain
{
    public class Command : IRequest<Result<Unit>>
    {
        public string Id { get; set; }
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
            var user = await _context.Users.Include(x => x.Photos)
                .FirstOrDefaultAsync(a => a.UserName == _userAccessor.GetUsername());

            var photo = user?.Photos.FirstOrDefault(p => p.Id == request.Id);
            var currentMain = user?.Photos.FirstOrDefault(p => p.IsMain);
            
            if (photo is not null) photo.IsMain = true;
            if (currentMain is not null) currentMain.IsMain = false;
            
            var result = await _context.SaveChangesAsync() > 0;
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Error Updating Status");
        }
    }
}