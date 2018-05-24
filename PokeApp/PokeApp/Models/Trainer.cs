using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PokeApp.Models
{
    public class Trainer
    {
        public int TrainerId { get; set; }
        public string Name { get; set; }
        public int Caught { get; set; }

        [JsonIgnore]
        public ICollection<Pokemon> Pokemons { get; set; }
    }
}
