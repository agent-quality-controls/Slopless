export type Detection<Group extends string = string> = {
  readonly end: number;
  readonly group: Group;
  readonly label: string;
  readonly start: number;
};

export type DensityMatch<Group extends string = string> = {
  readonly count: number;
  readonly end: number;
  readonly group: Group;
  readonly labels: readonly string[];
  readonly start: number;
};
