using Application.Core;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activity;

public class UpdateActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
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
            var activity = await _context.Activities.Include(x => x.Attendees)
                .ThenInclude(a => a.Attendee).FirstOrDefaultAsync(q => q.Id == request.Id);
            if (activity is null) return null;

            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());
            
            if (user is null) return null;
            
            var hostName = activity.Attendees.FirstOrDefault(x => x.IsHost)?.Attendee.UserName;
            var attendance = activity.Attendees.FirstOrDefault(a => a.Attendee.Id == user.Id);
            
            if (attendance is not null && hostName == user.UserName)
                activity.IsCancelled = !activity.IsCancelled;

            if (attendance is not null && hostName != user.UserName)
                activity.Attendees.Remove(attendance);

            if (attendance is null)
                activity.Attendees.Add(new ActivityAttendee
                {
                    Attendee = user,
                    IsHost = false
                });

            var result = await _context.SaveChangesAsync() > 0;
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Error updating attendance");
        }
    }
}