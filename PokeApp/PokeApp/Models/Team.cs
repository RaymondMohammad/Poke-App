using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PokeApp.Models
{
    public class Team
    {
        public int TeamId { get; set; }
        public string Name { get; set; }
        public int TrainerId { get; set; }

        [JsonIgnore]
        public Trainer Trainer { get; set; }
        public ICollection<Pokemon> Pokemons { get; set; }
    }
}
