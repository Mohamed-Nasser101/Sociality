using Domain.Identities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Api.Extensions;

public static class DataMigrationExtension
{
    public static async Task MigrateAndSeedDatabase(this DataContext context, ILogger logger, UserManager<AppUser> userManager)
    {
        try
        {
            await context.Database.MigrateAsync();
            await Seed.SeedData(context, userManager);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error while Migrating");
        }
    }
}