export const buildingData = {
  headquarters: {
    name: 'Headquarters',
    description: 'Headquarters is the main building of every town. Buildings need a specific level of the headquarters to be built. Barracks require to reach level 3, while the Academy needs level 15 to be built.',
  },
  clay: {
    name: 'Clay pit',
    description: 'Workers gather clay in the clay pit. Clay is an important resource for building construction. The higher the level the more clay is produced.',
    details: 'production',
    detailText: 'clay production',
  },
  wood: {
    name: 'Timber camp',
    description: 'Wood is harvested in the timber camp. Wood is an important resource for building constructions and unit weapons. The higher the level the more wood is produced.',
    details: 'production',
    detailText: 'wood production',
  },
  iron: {
    name: 'Iron mine',
    description: 'Iron is mined in the iron mine. Iron is heavily relied upon for weapons and cavalry armor. The higher the level the more iron is produced.',
    details: 'production',
    detailText: 'iron production',
  },
  storage: {
    name: 'Warehouse',
    description: 'All resources are stored in the warehouse. The amount of stored resources depends on the level of the warehouse. Upgrading the warehouse will increase the maximum stored amount.',
    details: 'storage',
    detailText: 'storage',
  },
  farm: {
    name: 'Farm',
    description: 'Farm produces food for your troops and directly affects the amount of population your town can hold. Upgrading the farm will increase the maximum population.',
    details: 'population',
    detailText: 'population',
  },
  barracks: {
    name: 'Barracks',
    description: 'Your troops are trained in the barracks. Some units require a specific level of barracks to be trained. Upgrading the barracks will increase the training speed of your troops.',
    details: 'recruitment',
    detailText: 'recruitment speed',
  },
  wall: {
    name: 'Wall',
    description: 'The wall helps protect your town. Each level of the wall provides a bonus to defense.',
    details: 'defense',
    detailText: 'defense bonus',
  },
  castle: {
    name: 'Academy',
    description: 'Academy is a prestigious institution used to train nobles. Once the town has a Headquarters of level 15 the academy is unlocked to build. Building the academy allows the recruitment of nobles, whom help you conquer other towns.'
  },
};
export const unitData = {
  axe: {
    name: 'Axeman',
    description: 'Axes questions.'
  },
  sword: {
    name: 'Swordsman',
    description: 'My sword and shield.'
  },
  mace: {
    name: 'Maceman',
    description: 'Spray some mace.'
  },
  archer: {
    name: 'Archer',
    description: 'Shoots arrows.'
  },
  scout: {
    name: 'Scout',
    description: 'Scouts around.'
  },
  lightCavalry: {
    name: 'Light cavalary',
    description: 'Rides fast.'
  },
  mountedArcher: {
    name: 'Mounted archer',
    description: 'Horses with bows.'
  },
  heavyCavalry: {
    name: 'Heavy cavalary',
    description: 'Armored horses.'
  },
  trebuchet: {
    name: 'Trebuchet',
    description: 'Shoot rocks.'
  },
  noble: {
    name: 'Diplomat',
    description: 'Buy towns.'
  },
  commander: {
    name: 'Commander',
    description: 'Bears flags.'
  },
}
