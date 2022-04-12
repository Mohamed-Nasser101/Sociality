using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Activity;

public class Delete
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                if (activity is null) return null;
                _context.Activities.Remove(activity);

                var result = await _context.SaveChangesAsync() > 0;
                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Error deleting the activity");
            }
        }
    }
}