using System.Collections;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Scheduler.Models
{
    public class Player
    {
        [Key]
        public int Id {get;set;}
        public string? Name {get;set;}
        public List<Object>? DefaultAvailability {get;set;}
        public List<Object>? SetAvailability {get;set;}
    }

    class SchedulerDb : DbContext{
        public SchedulerDb(DbContextOptions options) : base(options) { }
        public DbSet<Player> Players {get; set;} = null!;
    }
}