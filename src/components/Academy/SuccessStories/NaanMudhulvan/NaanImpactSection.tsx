
import { Users, CheckCircle, Lightbulb, Building2, MessageSquare, Star } from "lucide-react";

// ── Constants ────────────────────────────────────────────────────────────────

// SVG Arc dimensions for decorative notch
const ARC_DIMENSIONS = {
  WIDTH: 60,
  HEIGHT: 35,
  VIEWBOX_WIDTH: 70,
  VIEWBOX_HEIGHT: 35,
} as const;

interface StatItem {
  id: string; 
  value: string;
  label: string;
}

interface ImpactSection {
  title: string;
  items: StatItem[];
}

interface NaanImpactSectionProps {
  impactSection: ImpactSection;
}

// Icon pool — cycles through for however many items the DB provides
const ICONS = [Users, CheckCircle, Lightbulb, Building2, MessageSquare, Star];

// Arc notch decoration above each card
const ArcNotch = (): JSX.Element => (
  <svg
    className="absolute left-1/2 -translate-x-1/2 overflow-visible pointer-events-none -top-9 stroke-gray-300"
    width={ARC_DIMENSIONS.WIDTH}
    height={ARC_DIMENSIONS.HEIGHT}
    viewBox={`0 0 ${ARC_DIMENSIONS.VIEWBOX_WIDTH} ${ARC_DIMENSIONS.VIEWBOX_HEIGHT}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={`M0,${ARC_DIMENSIONS.VIEWBOX_HEIGHT} A${ARC_DIMENSIONS.VIEWBOX_HEIGHT / 2},${ARC_DIMENSIONS.VIEWBOX_HEIGHT / 2} 0 0,1 ${ARC_DIMENSIONS.VIEWBOX_WIDTH},${ARC_DIMENSIONS.VIEWBOX_HEIGHT}`} fill="none" strokeWidth="1" />
  </svg>
);

function NaanImpactSection({ impactSection }: NaanImpactSectionProps): JSX.Element {
  const { title, items } = impactSection;

  const renderCard = (item: StatItem, index: number, sizeClass: string) => {
    const Icon = ICONS[index % ICONS.length];
    return (
      <div
        key={item.id}
        className={`bg-white rounded-2xl border-2 border-gray-300 shadow-sm relative ${sizeClass}`}
      >
        <ArcNotch />
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
            <Icon className="w-5 h-5 text-blue-500" />
          </div>
        </div>
        <div className="pt-6 text-center">
          <h3 className="text-xl font-bold text-gray-600 mb-2">{item.value}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{item.label}</p>
        </div>
      </div>
    );
  };

  const topItems = items.slice(0, 3);
  const bottomItems = items.slice(3, 5);
  const mobileFirst4 = items.slice(0, 4);
  const mobileFifth = items[4];

  return (
    <div className="min-h-screen bg-white py-3 px-6 -mt-5 md:mt-16">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-16">
        {title}
      </h1>

      <div className="max-w-6xl mx-auto">

        {/* Desktop (xl+): top 3 + bottom 2 */}
        <div className="hidden xl:grid xl:grid-cols-3 gap-6 mb-16">
          {topItems.map((item, i) => renderCard(item, i, "p-5"))}
        </div>
        {bottomItems.length > 0 && (
          <div className="hidden xl:grid xl:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {bottomItems.map((item, i) => renderCard(item, i + 3, "p-5"))}
          </div>
        )}

        {/* Mobile/tablet (below xl): 2-col grid + centered 5th */}
        <div className="xl:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-6 md:gap-y-16 mb-16">
            {mobileFirst4.map((item, i) => renderCard(item, i, "p-4 md:p-8"))}
          </div>
          {mobileFifth && (
            <div className="flex justify-center">
              {renderCard(mobileFifth, 4, "p-4 md:p-8 w-full md:w-1/2")}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default NaanImpactSection;
