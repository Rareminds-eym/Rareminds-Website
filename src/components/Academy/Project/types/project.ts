
export interface PersonType {
  id: string;
  name: string;
  designation: string;
  contact?: string;
  image: string;
  universityId: string;
  description?: string;
}

export interface ClientType {
  id: string;
  name: string;
  faculty: PersonType[];
  spoc: PersonType[];
}
