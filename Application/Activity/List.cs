using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activity;

public class List
{
    public class Query : IRequest<Result<List<Domain.Entities.Activity>>>
    {
    }
    public class Handler : IRequestHandler<Query, Result<List<Domain.Entities.Activity>>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<Domain.Entities.Activity>>> Handle(Query request, CancellationToken cancellationToken)
        {
            return Result<List<Domain.Entities.Activity>>.Success(await _context.Activities.ToListAsync());
        }
    }
}