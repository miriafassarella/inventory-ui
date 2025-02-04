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

export class product{
  id?: number;
  name?: string;
}
