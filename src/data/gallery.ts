import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/gallery/*.{jpg,png,webp}',
  { eager: true }
);

// Descriptive alt text rotated by service category for SEO + a11y.
// Cycle through these descriptors across the 40 gallery photos.
const altPool: string[] = [
  'Custom subwoofer enclosure install by K-1 Custom Orlando',
  'Aftermarket head unit and stereo upgrade in Orlando, FL',
  'Professional window tint application on sedan side glass',
  'Ceramic coating finish on a black sports car at K-1 Custom',
  'Custom amplifier rack and wiring by K-1 Custom Orlando',
  'LED accent lighting install on truck interior',
  'Vehicle wrap project completed at K-1 Custom Orlando shop',
  'Paint correction and detailing on a white SUV',
  'Custom fiberglass speaker enclosure for car audio system',
  'Backup camera and dash cam installation in Orlando FL',
  'Remote start and car alarm install by K-1 Custom',
  'Truck audio system with subwoofers and amp by K-1 Custom',
  'Custom door panel speaker install in Orlando FL',
  'Window tinting on SUV rear glass with micro-edge film',
  'Paint protection film install on hood and bumper',
  'Custom car audio build with show-quality wiring',
  'Tonneau cover and truck accessory install in Orlando',
  'GPS tracker and security install by K-1 Custom Orlando',
  'Ceramic coating polishing stage on luxury sedan',
  'Aftermarket touchscreen radio install with Apple CarPlay',
  'Sound deadening material install in vehicle floor',
  'Marine-grade audio install for boat by K-1 Custom',
  'Custom subwoofer box build at K-1 Custom Orlando shop',
  'Wheel and tire upgrade with custom rims in Orlando',
  'Roof rack and accessory install on SUV at K-1 Custom',
  'Color-change vinyl vehicle wrap by K-1 Custom Orlando',
  'Lifted truck with LED light bar and audio upgrade',
  'Custom leather interior install at K-1 Custom Orlando',
  'Headlight upgrade and HID install by K-1 Custom',
  'Steering wheel control integration with new stereo',
  'Performance amplifier and DSP install in Orlando',
  'Custom car audio install showcasing factory-clean finish',
  'Truck bed lighting and accessory install in Orlando FL',
  'Window tinting on a Jeep Wrangler by K-1 Custom Orlando',
  'Ceramic Pro coating application on hood of vehicle',
  'Mobile electronics install bay at K-1 Custom Orlando',
  'Bluetooth and hands-free integration upgrade in Orlando',
  'Backup sensor and camera install by K-1 Custom Orlando',
  'Custom audio install in Lake Nona, Orlando area',
  'Finished aftermarket stereo install by K-1 Custom',
];

const all = Object.entries(modules)
  .map(([path, mod], idx) => {
    return {
      src: mod.default,
      path,
      label: altPool[idx % altPool.length],
    };
  })
  .sort((a, b) => a.path.localeCompare(b.path))
  .map((item, idx) => ({ ...item, label: altPool[idx % altPool.length] }));

export const gallery = all;
