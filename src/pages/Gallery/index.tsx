import type React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import AcademyHeader from '@/components/Header/AcademyHeader';
import SectorBarrel from './SectorBarrel';
import SectorGallery from './SectorGallery';

type GalleryProps = {
  /** Sector slug (e.g. "school-teachers"). When given directly (path routes),
   *  it wins over the /gallery/:sector path segment. */
  sector?: string;
};

/** Persona gallery path routes (e.g. /school/teacher/gallery) use the
 *  Academy (Teacher/Student) nav bar; the /gallery/:sector paths do not. */
const ACADEMY_SECTORS = new Set(["school-teachers", "school-students"]);

/** Path route galleries whose fixed sector nav bar (rendered by the Header
 *  dispatcher) requires a top offset on the content: the two corporate
 *  routes and the universities route. A sector prop can never collide with
 *  the /gallery hub variant, where no prop is passed. */
const FIXED_NAV_PATH_SECTORS = new Set([
  "corporate-recruitment",
  "corporate-training",
  "universities",
]);

const Gallery: React.FC<GalleryProps> = ({ sector: sectorProp }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const routeParams = useParams<{ sector?: string }>();
  // Priority: explicit prop (persona path routes) > /gallery/:sector path
  // segment. The sector always comes from the URL path.
  const sector = sectorProp ?? routeParams.sector;
  const isAcademyPath = !!sectorProp && ACADEMY_SECTORS.has(sectorProp);
  const isFixedNavPath = !!sectorProp && FIXED_NAV_PATH_SECTORS.has(sectorProp);

  // Legacy URLs like /gallery?sector=government redirect to the clean
  // path form /gallery/government so the address bar always shows a path.
  const legacySector = !sectorProp ? searchParams.get('sector') : null;
  useEffect(() => {
    if (legacySector) {
      navigate(`/gallery/${legacySector}`, { replace: true });
    }
  }, [legacySector, navigate]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to top whenever the sector changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sector]);

  // While a legacy ?sector= URL is redirecting, render nothing so the
  // hub page never flashes.
  if (legacySector) return null;

  return (
    <div className="min-h-screen bg-white">
      {sector ? (
        <>
          {isAcademyPath ? <AcademyHeader /> : null}
          {/* Sector nav bars are fixed at the top, so the content below
              needs the same top offset it gets on their sector pages. */}
          <div className={isAcademyPath || isFixedNavPath ? "pt-[88px]" : undefined}>
            <SectorGallery sector={sector} />
          </div>
        </>
      ) : (
        <SectorBarrel />
      )}
    </div>
  );
};

export default Gallery;