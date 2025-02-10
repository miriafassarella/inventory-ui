export class Sector{
  id?: number;
  name?: string;
}

export class Establishment{
  id?: number;
  name?: string;
  enumber?: string;
  sector = new Sector();
}

export class Product{
  id?: number;
  name?: string;
  serialNumber?: string;
  model = new Model();
  establishment = new Establishment();
}

export class Type{
  id?: number;
  name?: string;
}

export class Model{
  id?: number;
  name?: string;
  type = new Type();
}


