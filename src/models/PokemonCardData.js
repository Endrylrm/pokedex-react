export class PokemonCardData {
  constructor(id = 0, name = "", mainType = "", types = [], image = "") {
    this.id = id;
    this.name = name;
    this.mainType = mainType;
    this.types = types;
    this.image = image;
  }
}
