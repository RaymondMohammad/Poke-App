using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PokeApp.Models
{
    public class Pokemon
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int PokemonId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public string Image { get; set; }


        public Trainer Trainer { get; set; }
        [JsonIgnore]
        public Team Team { get; set; }
    }
}
