import Unit from "./unit";

export default class Player extends Unit {
  constructor(_class, race, level, name, events, isEnemy) {
    super(_class, race, level, name, events,isEnemy);

    this.specialization = null; // spec
  }
}
