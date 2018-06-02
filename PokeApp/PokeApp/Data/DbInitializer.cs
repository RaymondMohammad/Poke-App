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
               new Trainer { UserId = "15656", Name = "Trainer1", Caught = 12},
               new Trainer { UserId = "55166", Name = "Trainer2", Caught = 8 },
               new Trainer { UserId = "56498", Name = "Trainer3", Caught = 26 }
           );

            context.SaveChanges();

            context.Pokemons.AddRange(
               new Pokemon { PokemonId = 1, TrainerId = 1, Name = "Bulbasaur", Height = 6, Weight = 4, Img = "img", Description = "desc", Types = "Grass", Generation = "gen 1", Habitat = "grassland", Species = "dragon", SpriteImg = "img" },
               new Pokemon { PokemonId = 4, TrainerId = 1, Name = "Charmander", Height = 6, Weight = 4, Img = "img", Description = "desc", Types = "Fire,Dragon", Generation = "gen 1", Habitat = "grassland", Species = "dragon", SpriteImg = "img" },
               new Pokemon { PokemonId = 7, TrainerId = 1, Name = "Squirtle", Height = 6, Weight = 4, Img = "img", Description = "desc", Types = "Water", Generation = "gen 1", Habitat = "grassland", Species = "dragon", SpriteImg = "img" }
           );

            context.SaveChanges();

            context.Teams.AddRange(
               new Team { TrainerId = 1, Name = "Team 1" },
               new Team { TrainerId = 2, Name = "Team 2" },
               new Team { TrainerId = 3, Name = "Team 3" }
           );

            context.SaveChanges();
        }
}
}
