using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos;

public class Delete
{
    public class Command : IRequest<Result<Unit>>
    {
        public string Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
        {
            _context = context;
            _photoAccessor = photoAccessor;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Include(x => x.Photos.Where(p => p.Id == request.Id))
                .FirstOrDefaultAsync(a => a.UserName == _userAccessor.GetUsername());

            var photo = user?.Photos.FirstOrDefault();
            if (photo is null) return null;
            if (photo.IsMain) return Result<Unit>.Failure("Can't delete main photo");

            var deletePhotoResult = await _photoAccessor.DeletePhotoAsync(request.Id);
            if (deletePhotoResult is null) return Result<Unit>.Failure("Error Deleting the photo");

            user.Photos.Remove(photo);
            var result = await _context.SaveChangesAsync() > 0;
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Error deleting the photo");
        }
    }
}