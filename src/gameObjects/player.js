import Unit from "./unit";

export default class Player extends Unit {
  constructor(_class, race, level, name, events) {
    super(_class, race, level, name, events);

    this.specialization = null; // spec
  }
}
