export interface ILocation {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

export const defaultLocation = {
  latitude: 50.449414,  // Replace with your desired default latitude
  longitude: 30.458208, // Replace with your desired default longitude
  zoom: 16, // Adjust zoom level as needed
};

export const campusLocations: ILocation[] = [
  // {
  //   id: 1,
  //   title: "Main Entrance",
  //   description: "Welcome to the university! This is the main access point.",
  //   latitude: 51.505,
  //   longitude: -0.09,
  // },
  // {
  //   id: 2,
  //   title: "Lecture Hall 1",
  //   description: "Lecture Hall for Computer Science classes.",
  //   latitude: 51.506,
  //   longitude: -0.092,
  // },
  // {
  //   id: 3,
  //   title: "Library",
  //   description: "Central library with extensive resources.",
  //   latitude: 51.504,
  //   longitude: -0.088,
  // },
];
