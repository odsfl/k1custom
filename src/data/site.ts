export const site = {
  name: 'K-1 Custom',
  shortName: 'K-1 Custom',
  tagline: 'Custom Audio Systems & More in Orlando, FL',
  url: 'https://www.k-1custom.com',
  phone: '(407) 440-3321',
  phoneHref: 'tel:+14074403321',
  email: 'konecustom@gmail.com',
  address: {
    street: '6647 Narcoossee Rd Suite 120',
    city: 'Orlando',
    region: 'FL',
    postal: '32822',
    country: 'US',
  },
  hours: {
    weekdays: 'Monday to Saturday, 9:00am to 6:00pm',
    weekend: 'Sunday, Closed',
  },
  serviceArea: ['Orlando', 'Lake Nona', 'Kissimmee', 'St. Cloud', 'Winter Park', 'Altamonte Springs', 'Sanford', 'Oviedo'],
  social: {
    facebook: 'https://www.facebook.com/konecustom' as string | null,
    instagram: 'https://www.instagram.com/konecustom/' as string | null,
    google: 'https://share.google/VrS8q8gQdTeY7Shng' as string | null,
  },
  geo: { latitude: 28.4327, longitude: -81.2470 },
  yearsExperience: 10,
  vehiclesCustomized: 2500,
  foundingYear: 2014,
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About Us' },
  { href: '/services/', label: 'Our Services' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/testimonials/', label: 'Testimonials' },
  { href: '/contact/', label: 'Contact Us' },
];
