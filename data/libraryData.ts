
import { LibraryPlant } from '../types';

export const PLANTS_LIBRARY: LibraryPlant[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    category: 'Tropical',
    careLevel: 'Moderate',
    light: 'Bright, indirect sunlight',
    water: 'Every 1-2 weeks, allowing soil to dry out between waterings',
    soil: 'Well-draining potting mix with peat moss',
    description: 'Famous for its natural leaf holes, the Monstera is a stunning climber that brings a tropical feel to any room.',
    commonIssues: ['Yellowing leaves (overwatering)', 'Brown edges (low humidity)', 'Small leaves (low light)'],
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Snake Plant',
    scientificName: 'Dracaena trifasciata',
    category: 'Succulent',
    careLevel: 'Easy',
    light: 'Any light from low to bright indirect',
    water: 'Every 2-4 weeks, soil must be completely dry',
    soil: 'Cactus or succulent mix',
    description: 'One of the hardiest plants available. Excellent for air purification and nearly impossible to kill.',
    commonIssues: ['Root rot (too much water)', 'Mushy leaves (extreme overwatering)', 'Wrinkled leaves (very thirsty)'],
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    category: 'Tree',
    careLevel: 'Challenging',
    light: 'Consistent bright, indirect light',
    water: 'Weekly, keep soil moist but not soggy',
    soil: 'Well-draining, nutrient-rich potting soil',
    description: 'Known for its large, violin-shaped leaves. It is beautiful but can be temperamental about its environment.',
    commonIssues: ['Leaf drop (sudden environment change)', 'Brown spots (root rot or bacterial infection)', 'Pale leaves (lack of nutrients)'],
    image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    category: 'Hanging',
    careLevel: 'Easy',
    light: 'Bright to moderate indirect light',
    water: 'Once a week, soil should dry slightly',
    soil: 'Standard potting mix',
    description: 'Produces small "pups" that hang down like spiders on a web. Very adaptable and great for beginners.',
    commonIssues: ['Brown leaf tips (fluoride in water)', 'Fading color (too much direct sun)', 'Sparse growth (needs repotting)'],
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum',
    category: 'Flowering',
    careLevel: 'Moderate',
    light: 'Low to medium indirect light',
    water: 'Keep soil moist, will "wilt" when thirsty',
    soil: 'Rich, well-draining potting soil',
    description: 'Elegant white flowers and deep green foliage. It is excellent at communicating its water needs.',
    commonIssues: ['Brown tips (dry air)', 'Yellow leaves (too much sun)', 'No blooms (not enough light)'],
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis miller',
    category: 'Succulent',
    careLevel: 'Easy',
    light: 'Bright, direct sunlight',
    water: 'Every 2-3 weeks, allow soil to dry completely',
    soil: 'Well-draining succulent mix',
    description: 'A useful succulent known for the medicinal properties of the gel inside its thick leaves.',
    commonIssues: ['Soft stems (overwatering)', 'Thin leaves (underwatering)', 'Brown leaves (excessive direct heat)'],
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800'
  }
];
