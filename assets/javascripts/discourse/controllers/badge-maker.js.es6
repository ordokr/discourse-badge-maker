import Controller from "@ember/controller";
import { action } from "@ember/object";
import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.setProperties({
      name: "",
      description: "",
      criteria: ""
    });
  },

  @action
  async createBadge() {
    try {
      const badge = await ajax("/badge-maker/create", {
        type: "POST",
        data: {
          name: this.name,
          description: this.description,
          criteria: this.criteria
        }
      });
      
      this.send("closeModal");
      this.flash(I18n.t("badge_maker.success"), "success");
    } catch (error) {
      popupAjaxError(error);
    }
  }
});
