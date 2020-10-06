const _ = require("lodash");

class Instance {
  constructor(model, props) {
    this._model = model;
    _.assign(this, _.cloneDeep(props));
  }

  async update(changes) {
    changes = _.omit(changes, 'id');
    await this._model.update(this.id, changes);
    _.assign(this, _.cloneDeep(changes));
    return this;
  }

  async destroy() {
    return this._model.destroy(this.id);
  }

  toJSON() {
    return _.omit(this, "_model");
  }
}

module.exports = Instance;
