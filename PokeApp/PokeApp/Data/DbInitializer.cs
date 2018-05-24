using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PokeApp.Models;

namespace PokeApp.Data
{
    public class DbInitializer
    {
        public static void Initialize(PokeContext context)
        {
            context.Database.EnsureCreated();

            if (context.Trainers.Any())
            {
                return;
            }

            context.Trainers.AddRange(
               new Trainer { Name = "Trainer1", Caught = 12},
               new Trainer { Name = "Trainer2", Caught = 8 },
               new Trainer { Name = "Trainer3", Caught = 26 }
           );

            context.SaveChanges();

            context.Pokemons.AddRange(
               new Pokemon { PokemonId = 1, TrainerId = 1, Name = "Bulbasaur", Height = 6, Weight = 4, Image = "img", Description = "desc", Type = "Grass" },
               new Pokemon { PokemonId = 4, TrainerId = 2, Name = "Charmander", Height = 6, Weight = 4, Image = "img", Description = "desc", Type = "Fire,Dragon" },
               new Pokemon { PokemonId = 7, TrainerId = 3, Name = "Squirtle", Height = 6, Weight = 4, Image = "img", Description = "desc", Type = "Water" }
           );

            context.SaveChanges();
        }
}
}
