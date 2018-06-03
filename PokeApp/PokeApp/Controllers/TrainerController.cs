using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PokeApp.Models;
using PokeApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace PokeApp.Controllers
{
    [Authorize("isTrainer")]
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class TrainerController : Controller
    {
        private readonly PokeContext context;

        public TrainerController(PokeContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult GetAllTrainers()
        {
            var trainer = context.Trainers.Include(t => t.Pokemons).ToList();

            return new OkObjectResult(trainer);
        }

        [HttpGet("{id}")]
        public IActionResult GetTrainerById(int id)
        {
            var trainer = context.Trainers.Include(t => t.Pokemons).Include(t => t.Teams).ThenInclude(t => t.Pokemons).SingleOrDefault( t => t.TrainerId == id);
            if ( trainer == null )
            {
                return NotFound();
            }

            return new OkObjectResult(trainer);
        }

        [HttpGet("user/{id}")]
        public IActionResult GetTrainerByUserId(string id)
        {
            var trainer = context.Trainers.Include(t => t.Pokemons).Include(t => t.Teams).ThenInclude(t => t.Pokemons).SingleOrDefault(t => t.UserId == id);
            if (trainer == null)
            {
                return NotFound();
            }

            return new OkObjectResult(trainer);
        }

        [HttpGet("{id}/team")]
        public IActionResult GetTrainerTeams(int id)
        {
            var trainer = context.Trainers.Include(t => t.Pokemons).Include(t => t.Teams).SingleOrDefault(t => t.TrainerId == id);
            if (trainer == null)
            {
                return NotFound();
            }

            return new OkObjectResult(trainer);
        }

        [HttpPost]
        public IActionResult AddTrainer([FromBody] Trainer newTrainer)
        {
            Trainer trainer = newTrainer;

            if (context.Trainers.Where(t => t.UserId == trainer.UserId).Any())
            {
                return BadRequest();
            }

            context.Trainers.Add(trainer);
            context.SaveChanges();
            return new OkObjectResult(trainer);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTrainer(int id)
        {
            var trainer = context.Trainers.Find(id);
            if (trainer == null)
            {
                return NotFound();
            }

            context.Trainers.Remove(trainer);
            context.SaveChanges();
            return NoContent();
        }

        [HttpPut]
        public IActionResult UpdateTrainer([FromBody] Trainer updateTrainer)
        {
            var trainer = context.Trainers.Find(updateTrainer.TrainerId);
            if (trainer == null)
            {
                return NotFound();
            }

            trainer = updateTrainer;

            context.Trainers.Update(trainer);
            context.SaveChanges();
            return new OkObjectResult(trainer);
        }

        //Add pokemon to trainer
        [HttpPut("{id}/add/{pokemonId}")]
        public IActionResult AddPokemon(int id, int pokemonId)
        {
            var trainer = context.Trainers.Include(t => t.Pokemons).SingleOrDefault(t => t.TrainerId == id);
            var pokemon = context.Pokemons.SingleOrDefault(p => p.PokemonId == pokemonId);
            if (trainer == null || pokemon == null)
            {
                return NotFound();
            }
            else
            {
                trainer.Pokemons.Add(pokemon);
                context.SaveChanges();
            }

            return new OkObjectResult(trainer);
        }

        //Remove pokemon from trainer
        [HttpPut("{id}/remove/{pokemonId}")]
        public IActionResult RemovePokemon(int id, int pokemonId)
        {
            var trainer = context.Trainers.Include(t => t.Pokemons).SingleOrDefault(t => t.TrainerId == id);
            var pokemon = context.Pokemons.Include(p => p.Team).SingleOrDefault(p => p.PokemonId == pokemonId);

            if (trainer == null || pokemon == null)
            {
                return NotFound();
            }
            else
            {
                if (pokemon.Team != null)
                {
                    var team = context.Teams.Include(t => t.Pokemons).SingleOrDefault(t => pokemon.Team.TeamId == t.TeamId);
                    if (team == null)
                        return NotFound();

                    team.Pokemons.Remove(pokemon);
                }
                trainer.Pokemons.Remove(pokemon);
                context.SaveChanges();
            }

            return new OkObjectResult(trainer);

        }
    }
}
