import DiscourseRoute from "discourse/routes/discourse";

export default DiscourseRoute.extend({
  renderTemplate() {
    this.render("badge-maker");
  },

  model() {
    return this.store.createRecord("badge-maker");
  }
});
