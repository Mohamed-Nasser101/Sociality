using Application.Core;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos;

public class Add
{
    public class Command : IRequest<Result<Photo>>
    {
        public IFormFile File { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Photo>>
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

        public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(x => x.Photos)
                .FirstOrDefaultAsync(a => a.UserName == _userAccessor.GetUsername());

            if (user is null) return null;

            var photoUploadResult = await _photoAccessor.AddPhotoAsync(request.File);
            var photo = new Photo
            {
                Id = photoUploadResult.PublicId,
                Url = photoUploadResult.Url,
                IsMain = !user.Photos.Any(p => p.IsMain)
            };

            user.Photos.Add(photo);
            var result = await _context.SaveChangesAsync() > 0;

            return result
                ? Result<Photo>.Success(photo)
                : Result<Photo>.Failure("Error adding the photo");
        }
    }
}