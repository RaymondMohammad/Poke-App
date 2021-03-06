﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PokeApp.Models
{
    public class Trainer
    {
        public int TrainerId { get; set; }
        [JsonProperty("userId")]
        public string UserId { get; set; }
        public string Name { get; set; }
        public int Caught { get; set; }

        public ICollection<Pokemon> Pokemons { get; set; }
        public ICollection<Team> Teams { get; set; }
    }
}
