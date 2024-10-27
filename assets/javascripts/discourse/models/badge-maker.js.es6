import RestModel from "discourse/models/rest";

export default RestModel.extend({
  createProperties: ["name", "description", "criteria"],

  create() {
    return this.store.createRecord("badge-maker", {
      name: this.name,
      description: this.description,
      criteria: this.criteria
    });
  }
});
