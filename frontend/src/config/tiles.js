import { ENTITIES } from 'gravnic-game';

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
      color: '#00ff00',
    },
    name: 'Green block',
  },
  {
    id: '6',
    entity: {
      entityId: ENTITIES.BLOCK,
      color: '#0000ff',
    },
    name: 'Blue block',
  },
];
