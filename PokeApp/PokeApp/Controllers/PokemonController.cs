﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PokeApp.Data;
using PokeApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace PokeApp.Controllers
{
    [Authorize("isTrainer")]
    [EnableCors("CorsPolicy")]
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

            if (context.Pokemons.Where(t => t.PokemonId == pokemon.PokemonId && t.TrainerId == pokemon.TrainerId).Any())
            {
                return BadRequest();
            }
            context.Trainers.Where(t => t.TrainerId == pokemon.TrainerId).Single().Caught++;
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
