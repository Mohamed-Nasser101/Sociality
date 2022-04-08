using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Api.Extensions;

public static class DataMigrationExtension
{
    public static async Task SeedDatabase(this DataContext context, ILogger logger)
    {
        try
        {
            await context.Database.MigrateAsync();
            await Seed.SeedData(context);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error while Migrating");
        }
    }
}