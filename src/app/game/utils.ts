export const enoughResources = (res, needed) => res.wood >= needed.wood && res.clay >= needed.clay && res.iron >= needed.iron;

export const resourceTime = (res, needed, production) => {
  if (enoughResources(res, needed)) {
    return false
  }
  return Math.min(...Object.entries(res).map(([name, value]) => (value - needed[name]) / production[name]));
}
