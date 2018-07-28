import { ENTITIES, MOVE_NONE, MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT } from 'gravnic-game';

export default [
  {
    id: '1',
    entity: {
      entityId: ENTITIES.NONE.id,
    },
    name: 'Empty',
  },
  {
    id: '2',
    entity: {
      entityId: ENTITIES.FLOOR.id,
    },
    name: 'Floor',
  },
  {
    id: '3',
    entity: {
      entityId: ENTITIES.GLASS.id,
    },
    name: 'Glass',
  },
  {
    id: '4',
    entity: {
      entityId: ENTITIES.BLOCK.id,
      color: '#ff0000',
    },
    name: 'Red block',
  },
  {
    id: '5',
    entity: {
      entityId: ENTITIES.BLOCK.id,
      color: '#FF8C00',
    },
    name: 'Orange block',
  },
  {
    id: '6',
    entity: {
      entityId: ENTITIES.BLOCK.id,
      color: '#FFFF00',
    },
    name: 'Yellow block',
  },
  {
    id: '7',
    entity: {
      entityId: ENTITIES.BLOCK.id,
      color: '#008000',
    },
    name: 'Green block',
  },
  {
    id: '8',
    entity: {
      entityId: ENTITIES.BLOCK.id,
      color: '#0000FF',
    },
    name: 'Blue block',
  },
  {
    id: '9',
    entity: {
      entityId: ENTITIES.BLOCK.id,
      color: '#800080',
    },
    name: 'Purple block',
  },
  {
    id: '10',
    entity: {
      entityId: ENTITIES.BLOCK.id,
      color: '#8B4513',
    },
    name: 'Brown block',
  },
  {
    id: '11',
    entity: {
      entityId: ENTITIES.BLOCK.id,
      color: '#FFE4E1',
    },
    name: 'Pink block',
  },
  {
    id: '12',
    entity: {
      entityId: ENTITIES.RAINBOW_BLOCK.id,
    },
    name: 'Rainbow block',
  },
  {
    id: '13',
    entity: {
      entityId: ENTITIES.BLACK_HOLE.id,
    },
    name: 'Black hole',
  },
  {
    id: '14',
    entity: {
      entityId: ENTITIES.STICKY_SPOT.id,
    },
    name: 'Sticky spot',
  },
  {
    id: '15',
    entity: {
      entityId: ENTITIES.LAVA.id,
    },
    name: 'Lava',
  },
  {
    id: '16',
    entity: {
      entityId: ENTITIES.SMART_BOMB.id,
    },
    name: 'Smart bomb',
  },
  {
    id: '17',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER.id,
      targetEntity: {
        entityId: ENTITIES.BLOCK.id,
        color: '#ff0000',
      },
    },
    name: 'Color changer (red block)',
  },
  {
    id: '18',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER.id,
      targetEntity: {
        entityId: ENTITIES.BLOCK.id,
        color: '#FF8C00',
      },
    },
    name: 'Color changer (orange block)',
  },
  {
    id: '19',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER.id,
      targetEntity: {
        entityId: ENTITIES.BLOCK.id,
        color: '#FFFF00',
      },
    },
    name: 'Color changer (yellow block)',
  },
  {
    id: '20',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER.id,
      targetEntity: {
        entityId: ENTITIES.BLOCK.id,
        color: '#008000',
      },
    },
    name: 'Color changer (green block)',
  },
  {
    id: '21',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER.id,
      targetEntity: {
        entityId: ENTITIES.BLOCK.id,
        color: '#0000FF',
      },
    },
    name: 'Color changer (blue block)',
  },
  {
    id: '22',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER.id,
      targetEntity: {
        entityId: ENTITIES.BLOCK.id,
        color: '#800080',
      },
    },
    name: 'Color changer (purple block)',
  },
  {
    id: '23',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER.id,
      targetEntity: {
        entityId: ENTITIES.BLOCK.id,
        color: '#8B4513',
      },
    },
    name: 'Color changer (brown block)',
  },
  {
    id: '24',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER.id,
      targetEntity: {
        entityId: ENTITIES.BLOCK.id,
        color: '#FFE4E1',
      },
    },
    name: 'Color changer (pink block)',
  },
  {
    id: '25',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER.id,
      targetEntity: {
        entityId: ENTITIES.RAINBOW_BLOCK.id,
      },
    },
    name: 'Color changer (rainbow block)',
  },
  {
    id: '26',
    entity: {
      entityId: ENTITIES.GRAVITY_CHANGER.id,
      direction: MOVE_NONE,
    },
    name: 'Gravity changer (static)',
  },
  {
    id: '27',
    entity: {
      entityId: ENTITIES.GRAVITY_CHANGER.id,
      direction: MOVE_UP,
    },
    name: 'Gravity changer (up)',
  },
  {
    id: '28',
    entity: {
      entityId: ENTITIES.GRAVITY_CHANGER.id,
      direction: MOVE_RIGHT,
    },
    name: 'Gravity changer (right)',
  },
  {
    id: '29',
    entity: {
      entityId: ENTITIES.GRAVITY_CHANGER.id,
      direction: MOVE_DOWN,
    },
    name: 'Gravity changer (down)',
  },
  {
    id: '30',
    entity: {
      entityId: ENTITIES.GRAVITY_CHANGER.id,
      direction: MOVE_LEFT,
    },
    name: 'Gravity changer (left)',
  },
  {
    id: '31',
    entity: {
      entityId: ENTITIES.CRATE.id,
    },
    name: 'Crate',
  },
  {
    id: '32',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      powered: true,
    },
    name: 'Barrier',
  },
  {
    id: '33',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#ff0000',
      powered: true,
    },
    name: 'Barrier (red)',
  },
  {
    id: '34',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#FF8C00',
      powered: true,
    },
    name: 'Barrier (orange)',
  },
  {
    id: '35',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#FFFF00',
      powered: true,
    },
    name: 'Barrier (yellow)',
  },
  {
    id: '36',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#008000',
      powered: true,
    },
    name: 'Barrier (green)',
  },
  {
    id: '37',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#0000FF',
      powered: true,
    },
    name: 'Barrier (blue)',
  },
  {
    id: '38',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#800080',
      powered: true,
    },
    name: 'Barrier (purple)',
  },
  {
    id: '39',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#8B4513',
      powered: true,
    },
    name: 'Barrier (brown)',
  },
  {
    id: '40',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#FFE4E1',
      powered: true,
    },
    name: 'Barrier (pink)',
  },
  {
    id: '41',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      powered: false,
    },
    name: 'Barrier (unpowered)',
  },
  {
    id: '42',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#ff0000',
      powered: false,
    },
    name: 'Barrier (red, unpowered)',
  },
  {
    id: '43',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#FF8C00',
      powered: false,
    },
    name: 'Barrier (orange, unpowered)',
  },
  {
    id: '44',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#FFFF00',
      powered: false,
    },
    name: 'Barrier (yellow, unpowered)',
  },
  {
    id: '45',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#008000',
      powered: false,
    },
    name: 'Barrier (green, unpowered)',
  },
  {
    id: '46',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#0000FF',
      powered: false,
    },
    name: 'Barrier (blue, unpowered)',
  },
  {
    id: '47',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#800080',
      powered: false,
    },
    name: 'Barrier (purple, unpowered)',
  },
  {
    id: '48',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#8B4513',
      powered: false,
    },
    name: 'Barrier (brown, unpowered)',
  },
  {
    id: '49',
    entity: {
      entityId: ENTITIES.BARRIER.id,
      color: '#FFE4E1',
      powered: false,
    },
    name: 'Barrier (pink, unpowered)',
  },
  {
    id: '50',
    entity: {
      entityId: ENTITIES.CRUSHER.id,
    },
    name: 'Crusher',
  },
];
