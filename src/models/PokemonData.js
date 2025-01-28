export class PokemonData {
  constructor(
    id = 0,
    name = "",
    mainType = "",
    types = [],
    image = "",
    shinyImage = "",
    stats = [],
    flavorTexts = []
  ) {
    this.id = id;
    this.name = name;
    this.mainType = mainType;
    this.types = types;
    this.image = image;
    this.shinyImage = shinyImage;
    this.stats = stats;
    this.flavorTexts = flavorTexts;
  }

  getTotalPoints() {
    let sum = 0;

    this.stats.forEach((stat) => (sum += stat));

    return sum;
  }

  getRandomFlavorText() {
    return this.flavorTexts[
      Math.floor(this.flavorTexts.length * Math.random())
    ];
  }
}
