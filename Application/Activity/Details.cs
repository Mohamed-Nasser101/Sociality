using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activity;

public class Details
{
    public class Query : IRequest<Result<Domain.Entities.Activity>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<Domain.Entities.Activity>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Domain.Entities.Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Id);
            return Result<Domain.Entities.Activity>.Success(activity);
        }
    }
}