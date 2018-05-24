using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PokeApp.Models;
using PokeApp.Data;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PokeApp.Controllers
{
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
            var trainer = context.Trainers.Include( t => t.Pokemons).SingleOrDefault( t => t.TrainerId == id);
            if ( trainer == null )
            {
                return NotFound();
            }

            return new OkObjectResult(trainer);
        }

        [HttpPost]
        public IActionResult AddTrainer([FromBody] Trainer newTrainer)
        {
            var trainer = newTrainer;

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
    }
}
