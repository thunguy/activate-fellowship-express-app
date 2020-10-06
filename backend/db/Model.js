const _ = require("lodash");

const Instance = require("./Instance");

class Model {
  constructor(name, instances = []) {
    this._name = name;
    this._instances = _.cloneDeep(instances);
    this._lastId = _.get(_.maxBy(instances, "id"), "id") || 0;
  }

  async create(props) {
    props = _.cloneDeep(props);
    props.id = ++this._lastId;

    this._instances.push(props);
    return new Instance(this, props);
  }

  async find(predicate) {
    const props = this._instances.find(_.matches(predicate)) || null;
    return props && new Instance(this, props);
  }

  async findAll(predicate) {
    return this._instances.filter(_.matches(predicate)).map((props) => {
      return new Instance(this, props);
    });
  }

  async update(id, changes) {
    const props = this._instances.find(_.matches({ id }));
    if (!props) {
      throw new Error(`${this._name} with id ${id} does not exist`);
    }
    _.assign(props, _.cloneDeep(changes));
    return new Instance(this, props);
  }

  async destroy(id) {
    const index = this._instances.findIndex(_.matches({ id }));
    if (index === -1) {
      throw new Error(`${this._name} with id ${id} does not exist`);
    }
    this._instances.splice(index, 1);
  }
}

module.exports = Model;
