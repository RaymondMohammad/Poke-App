using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PokeApp.Data;
using PokeApp.Models;
using Microsoft.EntityFrameworkCore;

namespace PokeApp.Controllers
{
    [Route("api/[controller]")]
    public class PokemonController : Controller
    {
        private readonly PokeContext context;

        public PokemonController(PokeContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult GetAllPokemon()
        {
            var pokemon = context.Pokemons.Include(t => t.Trainer).ToList();

            return new OkObjectResult(pokemon);
        }

        [HttpGet("{id}")]
        public IActionResult GetPokemonById(int id)
        {
            var pokemon = context.Pokemons.Include(t => t.Trainer).SingleOrDefault(t => t.PokemonId == id);
            if (pokemon == null)
            {
                return NotFound();
            }

            context.Pokemons.Remove(pokemon);
            context.SaveChanges();

            return new OkObjectResult(pokemon);
        }

        [HttpPost]
        public IActionResult AddPokemon([FromBody] Pokemon newPokemon)
        {
            var pokemon = newPokemon;

            context.Pokemons.Add(pokemon);
            context.SaveChanges();
            return new OkObjectResult(pokemon);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePokemon(int id)
        {
            var pokemon = context.Pokemons.Find(id);
            if (pokemon == null)
            {
                return NotFound();
            }

            context.Pokemons.Remove(pokemon);
            context.SaveChanges();
            return NoContent();
        }

        [HttpPut]
        public IActionResult UpdatePokemon([FromBody] Pokemon updatePokemon)
        {
            var pokemon = context.Pokemons.Find(updatePokemon.PokemonId);
            if (pokemon == null)
            {
                return NotFound();
            }

            pokemon = updatePokemon;

            context.Pokemons.Update(pokemon);
            context.SaveChanges();
            return new OkObjectResult(pokemon);
        }
    }
}
