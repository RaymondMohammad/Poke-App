using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokeApp.Data;
using PokeApp.Models;

namespace PokeApp.Controllers
{
    [Route("api/[controller]")]
    public class TeamController : Controller
    {
        private readonly PokeContext context;

        public TeamController(PokeContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult GetAllTeams()
        {
            var teams = context.Teams.Include(t => t.Pokemons).ToList();

            return new OkObjectResult(teams);
        }

        [HttpGet("trainer/{id}")]
        public IActionResult GetTeamById(int id)
        {
            var team = context.Teams.Include(t => t.Pokemons).SingleOrDefault(t => t.TeamId == id);
            if (team == null)
            {
                return NotFound();
            }

            return new OkObjectResult(team);
        }

        [HttpPost]
        public IActionResult AddTeam([FromBody] Team newTeam)
        {
            var team = newTeam;

            context.Teams.Add(team);
            context.SaveChanges();
            return new OkObjectResult(team);
        }

        // Add to team
        [HttpPut("{id}/add/{pokemonId}/{newPokemon?}")]
        public IActionResult UpdateTeam(int id, int pokemonId, int newPokemon)
        {
            var team = context.Teams.Include(t => t.Pokemons).SingleOrDefault(t => t.TeamId == id);
            var pokemon = context.Pokemons.SingleOrDefault(p => p.PokemonId == pokemonId && p.Trainer.TrainerId == team.TrainerId);
            if (team == null || pokemon == null || context.Pokemons.Any(p => p.PokemonId == 2))
            {
                return NotFound();
            }
            else
            {
                team.Pokemons.Add(pokemon);
                context.SaveChanges();
            }

            return new OkObjectResult(team);
        }

        // Remove from team
        [HttpPut("{id}/remove/{pokemonId}")]
        public IActionResult RemovePokemon(int id, int pokemonId)
        {
            var team = context.Teams.Include(t => t.Pokemons).SingleOrDefault(t => t.TeamId == id);
            var pokemon = context.Pokemons.SingleOrDefault(p => p.PokemonId == pokemonId);
            if (team == null || pokemon == null)
            {
                return NotFound();
            }
            else
            {
                team.Pokemons.Remove(pokemon);
                context.SaveChanges();
            }

            return new OkObjectResult(team);

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTeam(int id)
        {
            var team = context.Teams.Include(t => t.Pokemons).SingleOrDefault(t => t.TeamId == id);
            if (team == null)
            {
                return NotFound();
            }

            //team.Pokemons.Clear();
            context.Teams.Remove(team);
            context.SaveChanges();
            return NoContent();
        }
    }
}
