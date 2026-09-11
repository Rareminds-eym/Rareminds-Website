export const recruitmentIndustries = [
  { id: 2, name: "Information Technology", image: 2 },
  { id: 1, name: "Banking & Finance", image: 3 },
  { id: 5, name: "Manufacturing", image: 4 },
  { id: 6, name: "Healthcare & Pharma", image: 5 },
  { id: 4, name: "Retail & E-commerce", image: 6 },
  { id: 12, name: "Telecommunications", image: 7 },
  { id: 11, name: "Automotive", image: 8 },
  { id: 7, name: "Construction", image: 9 },
  { id: 3, name: "Travel & Hospitality", image: 10 },
  { id: 10, name: "Media & Entertainment", image: 11 },
  { id: 8, name: "Energy & Utilities", image: 12 },
  { id: 9, name: "Agriculture & Food", image: 13 },
] as const;

export const industryImage = (image: number) =>
  `/Corporate/Images/Recruitment/industries/industries_${image}.webp`;
