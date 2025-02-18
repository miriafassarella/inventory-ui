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
export class Professional{
  id?: number;
  name?: string;
  registration?: string;
}

export class Usability{
  id?: number;
  name?: string;
}

export class Owner{
  id?: number;
  name?: string;
}

export class Product{
  id?: number;
  name?: string | null;
  dpurchase?: Date | null;
  serialNumber?: string;
  owner = new Owner();
  model = new Model();
  usability = new Usability();
  professional = new Professional();
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

export class Person {
    name?: string;
    mail?: string;
    password?: string;
    matricule?: string;
    permissions?: Number[];
}

