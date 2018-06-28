import { ENTITIES, MOVE_NONE, MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT } from 'gravnic-game';

export default [
  {
    id: '1',
    entity: {
      entityId: ENTITIES.NONE,
    },
    name: 'Empty',
  },
  {
    id: '2',
    entity: {
      entityId: ENTITIES.FLOOR,
    },
    name: 'Floor',
  },
  {
    id: '3',
    entity: {
      entityId: ENTITIES.GLASS,
    },
    name: 'Glass',
  },
  {
    id: '4',
    entity: {
      entityId: ENTITIES.BLOCK,
      color: '#ff0000',
    },
    name: 'Red block',
  },
  {
    id: '5',
    entity: {
      entityId: ENTITIES.BLOCK,
      color: '#FF8C00',
    },
    name: 'Orange block',
  },
  {
    id: '6',
    entity: {
      entityId: ENTITIES.BLOCK,
      color: '#FFFF00',
    },
    name: 'Yellow block',
  },
  {
    id: '7',
    entity: {
      entityId: ENTITIES.BLOCK,
      color: '#008000',
    },
    name: 'Green block',
  },
  {
    id: '8',
    entity: {
      entityId: ENTITIES.BLOCK,
      color: '#0000FF',
    },
    name: 'Blue block',
  },
  {
    id: '9',
    entity: {
      entityId: ENTITIES.BLOCK,
      color: '#800080',
    },
    name: 'Purple block',
  },
  {
    id: '10',
    entity: {
      entityId: ENTITIES.BLOCK,
      color: '#8B4513',
    },
    name: 'Brown block',
  },
  {
    id: '11',
    entity: {
      entityId: ENTITIES.BLOCK,
      color: '#FFE4E1',
    },
    name: 'Pink block',
  },
  {
    id: '12',
    entity: {
      entityId: ENTITIES.RAINBOW_BLOCK,
    },
    name: 'Rainbow block',
  },
  {
    id: '13',
    entity: {
      entityId: ENTITIES.BLACK_HOLE,
    },
    name: 'Black hole',
  },
  {
    id: '14',
    entity: {
      entityId: ENTITIES.STICKY_SPOT,
    },
    name: 'Sticky spot',
  },
  {
    id: '15',
    entity: {
      entityId: ENTITIES.LAVA,
    },
    name: 'Lava',
  },
  {
    id: '16',
    entity: {
      entityId: ENTITIES.SMART_BOMB,
    },
    name: 'Smart bomb',
  },
  {
    id: '17',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER,
      targetEntity: {
        entityId: ENTITIES.BLOCK,
        color: '#ff0000',
      },
    },
    name: 'Color changer (red block)',
  },
  {
    id: '18',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER,
      targetEntity: {
        entityId: ENTITIES.BLOCK,
        color: '#FF8C00',
      },
    },
    name: 'Color changer (orange block)',
  },
  {
    id: '19',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER,
      targetEntity: {
        entityId: ENTITIES.BLOCK,
        color: '#FFFF00',
      },
    },
    name: 'Color changer (yellow block)',
  },
  {
    id: '20',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER,
      targetEntity: {
        entityId: ENTITIES.BLOCK,
        color: '#008000',
      },
    },
    name: 'Color changer (green block)',
  },
  {
    id: '21',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER,
      targetEntity: {
        entityId: ENTITIES.BLOCK,
        color: '#0000FF',
      },
    },
    name: 'Color changer (blue block)',
  },
  {
    id: '22',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER,
      targetEntity: {
        entityId: ENTITIES.BLOCK,
        color: '#800080',
      },
    },
    name: 'Color changer (purple block)',
  },
  {
    id: '23',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER,
      targetEntity: {
        entityId: ENTITIES.BLOCK,
        color: '#8B4513',
      },
    },
    name: 'Color changer (brown block)',
  },
  {
    id: '24',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER,
      targetEntity: {
        entityId: ENTITIES.BLOCK,
        color: '#FFE4E1',
      },
    },
    name: 'Color changer (pink block)',
  },
  {
    id: '25',
    entity: {
      entityId: ENTITIES.COLOR_CHANGER,
      targetEntity: {
        entityId: ENTITIES.RAINBOW_BLOCK,
      },
    },
    name: 'Color changer (rainbow block)',
  },
  {
    id: '26',
    entity: {
      entityId: ENTITIES.GRAVITY_CHANGER,
      direction: MOVE_NONE,
    },
    name: 'Gravity changer (static)',
  },
  {
    id: '27',
    entity: {
      entityId: ENTITIES.GRAVITY_CHANGER,
      direction: MOVE_UP,
    },
    name: 'Gravity changer (up)',
  },
  {
    id: '28',
    entity: {
      entityId: ENTITIES.GRAVITY_CHANGER,
      direction: MOVE_RIGHT,
    },
    name: 'Gravity changer (right)',
  },
  {
    id: '29',
    entity: {
      entityId: ENTITIES.GRAVITY_CHANGER,
      direction: MOVE_DOWN,
    },
    name: 'Gravity changer (down)',
  },
  {
    id: '30',
    entity: {
      entityId: ENTITIES.GRAVITY_CHANGER,
      direction: MOVE_LEFT,
    },
    name: 'Gravity changer (left)',
  },
];
