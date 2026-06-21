export type PeripheralCategoryId = "monitor" | "mouse" | "keyboard" | "speaker";

export type PeripheralProduct = {
  id: string;
  categoryId: PeripheralCategoryId;
  name: string;
  brand: string;
  price: number;
  wattage: number;
  specs: string[];
};

type PeripheralEntry = Omit<PeripheralProduct, "categoryId" | "wattage">;

function makeProducts(categoryId: PeripheralCategoryId, entries: PeripheralEntry[]): PeripheralProduct[] {
  return entries.map((entry) => ({ ...entry, categoryId, wattage: 0 }));
}

export const peripheralProducts: PeripheralProduct[] = [
  ...makeProducts("monitor", [
    { id: "monitor-aoc-24g2sp", name: "AOC 24G2SP", brand: "AOC", price: 6900, specs: ["23.8\" IPS", "165 Hz", "1 ms"] },
    { id: "monitor-lg-27gp850", name: "LG UltraGear 27GP850", brand: "LG", price: 14900, specs: ["27\" Nano IPS", "180 Hz", "QHD"] },
    { id: "monitor-asus-vg249q3a", name: "ASUS TUF VG249Q3A", brand: "ASUS", price: 8400, specs: ["23.8\" Fast IPS", "180 Hz", "Full HD"] },
    { id: "monitor-msi-g274qpf", name: "MSI G274QPF E2", brand: "MSI", price: 12900, specs: ["27\" Rapid IPS", "180 Hz", "QHD"] },
    { id: "monitor-gigabyte-m27q", name: "Gigabyte M27Q", brand: "Gigabyte", price: 13700, specs: ["27\" IPS", "170 Hz", "KVM switch"] },
    { id: "monitor-samsung-g4", name: "Samsung Odyssey G4", brand: "Samsung", price: 9900, specs: ["25\" IPS", "240 Hz", "Full HD"] },
    { id: "monitor-dell-g2724d", name: "Dell G2724D", brand: "Dell", price: 11900, specs: ["27\" Fast IPS", "165 Hz", "QHD"] },
    { id: "monitor-benq-mobiuz", name: "BenQ MOBIUZ EX240N", brand: "BenQ", price: 7200, specs: ["23.8\" VA", "165 Hz", "HDRi"] },
    { id: "monitor-viewsonic-vx2718", name: "ViewSonic VX2718-2KPC", brand: "ViewSonic", price: 10400, specs: ["27\" Curved", "180 Hz", "QHD"] },
    { id: "monitor-philips-evnia", name: "Philips Evnia 27M1N5500ZA", brand: "Philips", price: 15600, specs: ["27\" IPS", "170 Hz", "QHD"] },
  ]),
  ...makeProducts("mouse", [
    { id: "mouse-logitech-g502x", name: "Logitech G502 X", brand: "Logitech", price: 3290, specs: ["25K DPI", "89 g", "LIGHTFORCE"] },
    { id: "mouse-razer-viper-v3", name: "Razer Viper V3 Pro", brand: "Razer", price: 6990, specs: ["35K DPI", "54 g", "Wireless"] },
    { id: "mouse-steelseries-aerox", name: "SteelSeries Aerox 3", brand: "SteelSeries", price: 2590, specs: ["18K DPI", "59 g", "AquaBarrier"] },
    { id: "mouse-hyperx-pulsefire", name: "HyperX Pulsefire Haste 2", brand: "HyperX", price: 2490, specs: ["26K DPI", "53 g", "Wireless"] },
    { id: "mouse-corsair-m75", name: "Corsair M75 Air", brand: "Corsair", price: 3890, specs: ["26K DPI", "60 g", "SLIPSTREAM"] },
    { id: "mouse-asus-harpe", name: "ASUS ROG Harpe Ace", brand: "ASUS", price: 4990, specs: ["36K DPI", "54 g", "Aim Lab"] },
    { id: "mouse-glorious-model-o", name: "Glorious Model O 2", brand: "Glorious", price: 2190, specs: ["26K DPI", "59 g", "RGB"] },
    { id: "mouse-endgame-xm2we", name: "Endgame Gear XM2we", brand: "Endgame Gear", price: 3290, specs: ["19K DPI", "63 g", "Wireless"] },
    { id: "mouse-zowie-ec2", name: "Zowie EC2-CW", brand: "Zowie", price: 5290, specs: ["24-step wheel", "77 g", "Esports"] },
    { id: "mouse-darmoshark-m3", name: "Darmoshark M3 Pro", brand: "Darmoshark", price: 1990, specs: ["26K DPI", "55 g", "Tri-mode"] },
  ]),
  ...makeProducts("keyboard", [
    { id: "keyboard-keychron-k2", name: "Keychron K2 Pro", brand: "Keychron", price: 4290, specs: ["75%", "Hot-swap", "RGB"] },
    { id: "keyboard-logitech-g915", name: "Logitech G915 TKL", brand: "Logitech", price: 7990, specs: ["TKL", "LIGHTSPEED", "Low profile"] },
    { id: "keyboard-razer-huntsman", name: "Razer Huntsman V3 Pro", brand: "Razer", price: 8990, specs: ["Analog switches", "TKL", "RGB"] },
    { id: "keyboard-hyperx-alloy", name: "HyperX Alloy Origins 60", brand: "HyperX", price: 2990, specs: ["60%", "Red switches", "Aluminum"] },
    { id: "keyboard-steelseries-apex", name: "SteelSeries Apex Pro TKL", brand: "SteelSeries", price: 7590, specs: ["OmniPoint", "TKL", "OLED"] },
    { id: "keyboard-corsair-k70", name: "Corsair K70 Core", brand: "Corsair", price: 4290, specs: ["MLX Red", "Full size", "RGB"] },
    { id: "keyboard-asus-falchion", name: "ASUS ROG Falchion RX", brand: "ASUS", price: 6790, specs: ["65%", "RX switches", "Wireless"] },
    { id: "keyboard-akko-5075b", name: "Akko 5075B Plus", brand: "Akko", price: 3490, specs: ["75%", "Hot-swap", "Tri-mode"] },
    { id: "keyboard-royal-kludge", name: "Royal Kludge RK84", brand: "Royal Kludge", price: 2390, specs: ["75%", "Wireless", "Hot-swap"] },
    { id: "keyboard-ducky-one3", name: "Ducky One 3 TKL", brand: "Ducky", price: 4590, specs: ["TKL", "Cherry MX", "PBT"] },
  ]),
  ...makeProducts("speaker", [
    { id: "speaker-edifier-r1280dbs", name: "Edifier R1280DBs", brand: "Edifier", price: 5190, specs: ["42 W", "Bluetooth", "Optical"] },
    { id: "speaker-logitech-z407", name: "Logitech Z407", brand: "Logitech", price: 3790, specs: ["80 W", "2.1", "Bluetooth"] },
    { id: "speaker-creative-pebble", name: "Creative Pebble X Plus", brand: "Creative", price: 2890, specs: ["60 W", "2.1", "RGB"] },
    { id: "speaker-razer-nommo", name: "Razer Nommo V2", brand: "Razer", price: 6790, specs: ["Full range", "THX", "RGB"] },
    { id: "speaker-jbl-quantum", name: "JBL Quantum Duo", brand: "JBL", price: 5390, specs: ["20 W", "Dolby", "RGB"] },
    { id: "speaker-sven-mc30", name: "SVEN MC-30", brand: "SVEN", price: 4490, specs: ["200 W", "2.0", "Bluetooth"] },
    { id: "speaker-microlab-solo", name: "Microlab Solo 19", brand: "Microlab", price: 6290, specs: ["110 W", "2.0", "Wood cabinet"] },
    { id: "speaker-presonus-eris", name: "PreSonus Eris 3.5", brand: "PreSonus", price: 5990, specs: ["50 W", "Studio", "3.5\""] },
    { id: "speaker-klipsch-promedia", name: "Klipsch ProMedia 2.1", brand: "Klipsch", price: 8490, specs: ["200 W", "2.1", "THX"] },
    { id: "speaker-harman-soundsticks", name: "Harman Kardon SoundSticks 4", brand: "Harman Kardon", price: 9990, specs: ["140 W", "2.1", "Bluetooth"] },
  ]),
];
