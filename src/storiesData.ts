export interface ImpactStory {
  id: number;
  title: string;
  location: string;
  date: string;
  category: "Disaster Relief" | "Daily Feeding" | "Festival Camp" | "Elderly Support" | "Children Wellness";
  description: string;
  image: string;
  impact: string;
}

const INDIAN_CITIES = [
  "Surat, Gujarat", "Ahmedabad, Gujarat", "Mumbai, Maharashtra", "Delhi, NCR",
  "Pune, Maharashtra", "Kolkata, West Bengal", "Bengaluru, Karnataka", "Chennai, Tamil Nadu",
  "Hyderabad, Telangana", "Jaipur, Rajasthan", "Lucknow, Uttar Pradesh", "Patna, Bihar",
  "Bhopal, Madhya Pradesh", "Ranchi, Jharkhand", "Guwahati, Assam", "Bhubaneswar, Odisha",
  "Dindoli, Surat", "Godadra, Surat", "Bardoli, Gujarat", "Vapi, Gujarat"
];

const CATEGORIES: ("Disaster Relief" | "Daily Feeding" | "Festival Camp" | "Elderly Support" | "Children Wellness")[] = [
  "Disaster Relief", "Daily Feeding", "Festival Camp", "Elderly Support", "Children Wellness"
];

const STORY_TEMPLATES = [
  {
    title: "Feeding program during difficult weather",
    description: "Our dedicated volunteers braved severe torrential downpours to distribute hot chapatis, dal, and fresh vegetables to families stranded in raw municipal shelters. Many had not eaten a warm meal in over 48 hours.",
    impact: "850+ Warm Meals distributed",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=400&auto=format&fit=crop"
  },
  {
    title: "Warm food for hungry children at municipal school",
    description: "Organized a wholesome nutrition camp providing fortified wheat chapatis, sweet kheer, and fruit bowls to impoverished children from local slums, boosting their energy and morale.",
    impact: "400+ Slum Children Nourished",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400&auto=format&fit=crop"
  },
  {
    title: "Elderly survival meals and dry ration supply",
    description: "Identified and supported neglected senior citizens living alone in unhygienic shanties. Distributed fresh, soft high-nutrition food kits tailored to their medical needs, alongside basic medicines.",
    impact: "250+ Senior Citizens Assisted",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400&auto=format&fit=crop"
  },
  {
    title: "Emergency disaster relief and dry food boxes",
    description: "Following sudden local flooding, our emergency kitchen sprang into action, mass-producing packed chapatis with pickle and pure water satchels for remote, mud-clogged peripheral settlements.",
    impact: "1,500+ Emergency Ration Bundles",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400&auto=format&fit=crop"
  },
  {
    title: "Festival distribution of pure ghee rotis",
    description: "Brought festive smiles and joy during Diwali by organizing community kitchen setups in backward blocks. Served premium grains, dry sweets, and pure ghee chapatis to make everyone feel remembered.",
    impact: "1,200+ Festival Thalis Served",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=400&auto=format&fit=crop"
  },
  {
    title: "Community labor hunger eradication camp",
    description: "Set up our custom mobile kitchen at active low-income construction intersections to feed daily wage workers, rickshaw-pullers, and seasonal migrant laborers who skip meals to save minor coins.",
    impact: "600+ Daily Wage Earners Fed",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=400&auto=format&fit=crop"
  },
  {
    title: "Nourishing expectant mothers in remote communities",
    description: "Launched a focused iron & protein rich meal distribution campaign for underprivileged pregnant women in fringe hamlets to ensure nutritional security for mothers and future babies.",
    impact: "180+ Pregnant Women Supported",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=400&auto=format&fit=crop"
  }
];

export const generate100Stories = (): ImpactStory[] => {
  const stories: ImpactStory[] = [];
  
  // Hardcode the first 6 specified items in the prompt to be precise:
  const promptStories = [
    {
      id: 1,
      title: "Surat Flood Relief Feeding",
      location: "Surat, Gujarat",
      date: "August 12, 2025",
      category: "Disaster Relief" as const,
      description: "During the devastating Surat seasonal floods, Ek Roti Foundation mobilized instantly, preparing and distributing warm rice, rotis, and pure water packets to more than 1,000 helpless citizens trapped near the Tapi river bank.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400&auto=format&fit=crop",
      impact: "1000+ Families Fed"
    },
    {
      id: 2,
      title: "Migrant Highway Support Drives",
      location: "Godadra Highway, Surat",
      date: "May 25, 2025",
      category: "Daily Feeding" as const,
      description: "Distributed emergency high-energy dry ration kits, water bottle crates, and freshly baked rotis to home-bound migrant workers travelling on foot and by trucks during extreme summer waves.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=400&auto=format&fit=crop",
      impact: "750+ Migrants Supported"
    },
    {
      id: 3,
      title: "Elderly Rains Survival Cover",
      location: "Dindoli, Surat",
      date: "July 04, 2025",
      category: "Elderly Support" as const,
      description: "Provided fresh meals, heavy rain jackets, and emergency medical kits to underprivileged senior citizens living in hazardous thatch roofs during heavy Gujarat monsoon downpours.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400&auto=format&fit=crop",
      impact: "300+ Elders Shielded"
    },
    {
      id: 4,
      title: "Slum Children Nutritional Camp",
      location: "Hare Krishna Villa Area, Surat",
      date: "September 15, 2025",
      category: "Children Wellness" as const,
      description: "Organized a weekend nourishment carnival with interactive games, pure quality meals, fresh fruit distribution, and basic education supplies for municipal neighborhood children.",
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=400&auto=format&fit=crop",
      impact: "500+ Children Nourished"
    },
    {
      id: 5,
      title: "Holi Festival Mega Food Camp",
      location: "Near Sky-9, Surat",
      date: "March 14, 2025",
      category: "Festival Camp" as const,
      description: "Shared the pure spirits of the colors festival by cooking a large batch of special puri-sabji, sweets, and rotis for homeless street-dwellers and poor children around Surat.",
      image: "https://images.unsplash.com/photo-1501516069922-a9982bd6f3bd?q=80&w=400&auto=format&fit=crop",
      impact: "1200+ Festival Smiles"
    },
    {
      id: 6,
      title: "Dry Ration Kits to Widows & Families",
      location: "Bardoli Rural, Gujarat",
      date: "November 21, 2025",
      category: "Daily Feeding" as const,
      description: "Distributed customized premium monthly dry grocer ration kits (including wheat flour, pulses, cooking oil, and salt) to underprivileged widows, ensuring long-term family survival.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=400&auto=format&fit=crop",
      impact: "450+ Dry Kits Distributed"
    }
  ];

  stories.push(...promptStories);

  // Generate the remaining 94 modular stories programmatically with diverse names & emotional settings
  for (let i = 7; i <= 100; i++) {
    const city = INDIAN_CITIES[i % INDIAN_CITIES.length];
    const category = CATEGORIES[i % CATEGORIES.length];
    const template = STORY_TEMPLATES[(i + 3) % STORY_TEMPLATES.length];
    
    // Add variations to make each stories unique
    const year = i % 2 === 0 ? "2025" : "2026";
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i % 12];
    const day = String((i * 7) % 28 + 1).padStart(2, '0');
    
    stories.push({
      id: i,
      title: `${category} Event - Chapter ${i}`,
      location: city,
      date: `${month} ${day}, ${year}`,
      category: category,
      description: `Ek Roti Foundation organized a dedicated community service mission in ${city}. ${template.description} Every volunteer went above and beyond to spread happiness and relief.`,
      image: template.image,
      impact: `${template.impact} (Batch #${1000 + i})`
    });
  }

  return stories;
};
