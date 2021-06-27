import { FirstPart } from './pages/firstPart';
import { SecondPart } from './pages/secondPart';

export const routes = [
  {
    path: '/part1',
    component: FirstPart,
    title: 'Part 1'
  },
  {
    path: '/part2',
    component: SecondPart,
    title: 'Part 2'
  }
];
