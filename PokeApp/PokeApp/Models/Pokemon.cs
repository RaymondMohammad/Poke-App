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
        public int Id { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int PokemonId { get; set; }
        public string Name { get; set; }
        public string Types { get; set; }
        public string Description { get; set; }
        public string Habitat { get; set; }
        public string Generation { get; set; }
        public string Species { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public string SpriteImg { get; set; }
        public string Img { get; set; }
        public int TrainerId { get; set; }

        [JsonIgnore]
        public Trainer Trainer { get; set; }
        [JsonIgnore]
        public Team Team { get; set; }
    }
}
