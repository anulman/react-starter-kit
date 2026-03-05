import { forwardRef, type ComponentType } from "react";
import { css } from "styled-system/css";
import {
  // Living spaces
  HomeIcon,
  DoorIcon,
  BedIcon,
  SofaIcon,
  ArmchairIcon,
  StairsIcon,
  // Kitchen/Dining
  UtensilsIcon,
  CoffeeIcon,
  RefrigeratorIcon,
  MicrowaveIcon,
  WineIcon,
  // Bathroom/Utility
  ShowerIcon,
  BathIcon,
  WashingMachineIcon,
  DropletIcon,
  // Work/Study
  BriefcaseIcon,
  MonitorIcon,
  BookIcon,
  LampIcon,
  // Storage/Tools
  BoxIcon,
  CarIcon,
  KeyIcon,
  WrenchIcon,
  HammerIcon,
  HangerIcon,
  PackageIcon,
  // Outdoor/Garden
  TreeIcon,
  SunIcon,
  FlowerIcon,
  LeafIcon,
  UmbrellaIcon,
  FenceIcon,
  GrillIcon,
  PoolIcon,
  // Entertainment
  TvIcon,
  GamepadIcon,
  MusicIcon,
  HeadphonesIcon,
  SpeakerIcon,
  FilmIcon,
  CameraIcon,
  // Fitness/Recreation
  DumbbellIcon,
  // Kids/Pets
  ToyIcon,
  BabyIcon,
  PawIcon,
  // Climate/Utility
  FanIcon,
  ThermometerIcon,
  SnowflakeIcon,
  FlameIcon,
  LightbulbIcon,
  PlugIcon,
  CloudIcon,
  // Misc
  TrashIcon,
  RecycleIcon,
  MailIcon,
  ClockIcon,
  CalendarIcon,
  WifiIcon,
  SuitcaseIcon,
  PaintIcon,
  ScissorsIcon,
  BucketIcon,
  MoonIcon,
  StarIcon,
  HeartIcon,
  ShieldIcon,
  MapPinIcon,
} from "@/components/icons";

type IconComponent = ComponentType<{ size?: number }>;

/**
 * Available icons for zones, organized by category
 */
export const ZONE_ICONS: Array<{
  name: string;
  icon: IconComponent;
  label: string;
  category: string;
}> = [
  // Living Spaces
  { name: "home", icon: HomeIcon, label: "Home", category: "Living" },
  { name: "door", icon: DoorIcon, label: "Entry", category: "Living" },
  { name: "bed", icon: BedIcon, label: "Bedroom", category: "Living" },
  { name: "sofa", icon: SofaIcon, label: "Living Room", category: "Living" },
  { name: "armchair", icon: ArmchairIcon, label: "Lounge", category: "Living" },
  { name: "stairs", icon: StairsIcon, label: "Stairs", category: "Living" },

  // Kitchen/Dining
  { name: "utensils", icon: UtensilsIcon, label: "Kitchen", category: "Kitchen" },
  { name: "coffee", icon: CoffeeIcon, label: "Dining", category: "Kitchen" },
  { name: "refrigerator", icon: RefrigeratorIcon, label: "Fridge", category: "Kitchen" },
  { name: "microwave", icon: MicrowaveIcon, label: "Microwave", category: "Kitchen" },
  { name: "wine", icon: WineIcon, label: "Bar", category: "Kitchen" },

  // Bathroom/Laundry
  { name: "shower", icon: ShowerIcon, label: "Shower", category: "Bathroom" },
  { name: "bath", icon: BathIcon, label: "Bathtub", category: "Bathroom" },
  { name: "washing-machine", icon: WashingMachineIcon, label: "Laundry", category: "Bathroom" },
  { name: "droplet", icon: DropletIcon, label: "Water", category: "Bathroom" },

  // Work/Study
  { name: "briefcase", icon: BriefcaseIcon, label: "Office", category: "Work" },
  { name: "monitor", icon: MonitorIcon, label: "Computer", category: "Work" },
  { name: "book", icon: BookIcon, label: "Library", category: "Work" },
  { name: "lamp", icon: LampIcon, label: "Desk", category: "Work" },

  // Storage/Garage
  { name: "box", icon: BoxIcon, label: "Storage", category: "Storage" },
  { name: "car", icon: CarIcon, label: "Garage", category: "Storage" },
  { name: "key", icon: KeyIcon, label: "Keys", category: "Storage" },
  { name: "wrench", icon: WrenchIcon, label: "Workshop", category: "Storage" },
  { name: "hammer", icon: HammerIcon, label: "Tools", category: "Storage" },
  { name: "hanger", icon: HangerIcon, label: "Closet", category: "Storage" },
  { name: "package", icon: PackageIcon, label: "Packages", category: "Storage" },

  // Outdoor
  { name: "tree", icon: TreeIcon, label: "Garden", category: "Outdoor" },
  { name: "sun", icon: SunIcon, label: "Patio", category: "Outdoor" },
  { name: "flower", icon: FlowerIcon, label: "Flowers", category: "Outdoor" },
  { name: "leaf", icon: LeafIcon, label: "Plants", category: "Outdoor" },
  { name: "umbrella", icon: UmbrellaIcon, label: "Shade", category: "Outdoor" },
  { name: "fence", icon: FenceIcon, label: "Yard", category: "Outdoor" },
  { name: "grill", icon: GrillIcon, label: "BBQ", category: "Outdoor" },
  { name: "pool", icon: PoolIcon, label: "Pool", category: "Outdoor" },

  // Entertainment
  { name: "tv", icon: TvIcon, label: "TV Room", category: "Entertainment" },
  { name: "gamepad", icon: GamepadIcon, label: "Gaming", category: "Entertainment" },
  { name: "music", icon: MusicIcon, label: "Music", category: "Entertainment" },
  { name: "headphones", icon: HeadphonesIcon, label: "Audio", category: "Entertainment" },
  { name: "speaker", icon: SpeakerIcon, label: "Speaker", category: "Entertainment" },
  { name: "film", icon: FilmIcon, label: "Theater", category: "Entertainment" },
  { name: "camera", icon: CameraIcon, label: "Photos", category: "Entertainment" },

  // Fitness
  { name: "dumbbell", icon: DumbbellIcon, label: "Gym", category: "Fitness" },

  // Kids/Pets
  { name: "toy", icon: ToyIcon, label: "Kids Room", category: "Family" },
  { name: "baby", icon: BabyIcon, label: "Nursery", category: "Family" },
  { name: "paw", icon: PawIcon, label: "Pet Area", category: "Family" },

  // Climate/Utility
  { name: "fan", icon: FanIcon, label: "HVAC", category: "Utility" },
  { name: "thermometer", icon: ThermometerIcon, label: "Climate", category: "Utility" },
  { name: "snowflake", icon: SnowflakeIcon, label: "Cooling", category: "Utility" },
  { name: "flame", icon: FlameIcon, label: "Fireplace", category: "Utility" },
  { name: "lightbulb", icon: LightbulbIcon, label: "Lighting", category: "Utility" },
  { name: "plug", icon: PlugIcon, label: "Electrical", category: "Utility" },
  { name: "cloud", icon: CloudIcon, label: "Weather", category: "Utility" },

  // Misc
  { name: "trash", icon: TrashIcon, label: "Trash", category: "Misc" },
  { name: "recycle", icon: RecycleIcon, label: "Recycle", category: "Misc" },
  { name: "mail", icon: MailIcon, label: "Mailbox", category: "Misc" },
  { name: "clock", icon: ClockIcon, label: "Time", category: "Misc" },
  { name: "calendar", icon: CalendarIcon, label: "Calendar", category: "Misc" },
  { name: "wifi", icon: WifiIcon, label: "Network", category: "Misc" },
  { name: "suitcase", icon: SuitcaseIcon, label: "Guest", category: "Misc" },
  { name: "paint", icon: PaintIcon, label: "Craft", category: "Misc" },
  { name: "scissors", icon: ScissorsIcon, label: "Craft", category: "Misc" },
  { name: "bucket", icon: BucketIcon, label: "Cleaning", category: "Misc" },
  { name: "moon", icon: MoonIcon, label: "Night", category: "Misc" },
  { name: "star", icon: StarIcon, label: "Favorite", category: "Misc" },
  { name: "heart", icon: HeartIcon, label: "Love", category: "Misc" },
  { name: "shield", icon: ShieldIcon, label: "Security", category: "Misc" },
  { name: "map-pin", icon: MapPinIcon, label: "Location", category: "Misc" },
];

export type IconName = (typeof ZONE_ICONS)[number]["name"];

const containerStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: "md",
});

const gridStyles = css({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gap: "xs",
});

const iconButtonStyles = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  w: "36px",
  h: "36px",
  borderRadius: "sm",
  cursor: "pointer",
  border: "2px solid transparent",
  bg: "surface",
  color: "text",
  transition: "transform 0.1s, border-color 0.1s, background 0.1s",
  _hover: {
    transform: "scale(1.05)",
    bg: "background.hover",
  },
});

const iconButtonSelectedStyles = css({
  borderColor: "primary",
  bg: "primary.soft",
  transform: "scale(1.05)",
});

export type IconPickerProps = {
  /** Current icon name */
  value?: string | null;
  /** Called when icon changes */
  onChange?: (iconName: string) => void;
  /** Additional class name */
  className?: string;
};

/**
 * Icon selection component for zones with 70+ household-themed icons.
 *
 * Displays a grid of Lucide icons organized by category (Living, Kitchen,
 * Bathroom, Work, Storage, Outdoor, Entertainment, Fitness, Family, Utility, Misc).
 *
 * @example
 * ```tsx
 * <IconPicker
 *   value={zone.icon}
 *   onChange={(icon) => updateZone({ icon })}
 * />
 * ```
 */
export const IconPicker = forwardRef<HTMLDivElement, IconPickerProps>(
  function IconPicker({ value, onChange, className }, ref) {
    const handleIconClick = (iconName: string) => {
      onChange?.(iconName);
    };

    return (
      <div ref={ref} className={`${containerStyles} ${className ?? ""}`}>
        <div className={gridStyles}>
          {ZONE_ICONS.map(({ name, icon: Icon, label }) => (
            <button
              key={name}
              type="button"
              className={`${iconButtonStyles} ${
                value === name ? iconButtonSelectedStyles : ""
              }`}
              onClick={() => handleIconClick(name)}
              aria-label={`Select ${label} icon`}
              aria-pressed={value === name}
              title={label}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>
    );
  }
);

/**
 * Get the icon component for a given icon name.
 * Returns HomeIcon as fallback for invalid or missing names.
 *
 * @example
 * ```tsx
 * const Icon = getZoneIcon(zone.icon);
 * <Icon size={24} />
 * ```
 */
export function getZoneIcon(iconName: string | null | undefined): IconComponent {
  const iconConfig = ZONE_ICONS.find((i) => i.name === iconName);
  return iconConfig?.icon ?? HomeIcon;
}
