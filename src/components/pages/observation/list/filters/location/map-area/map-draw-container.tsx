import { Box } from "@chakra-ui/react";
import useObservationFilter from "@components/pages/observation/common/use-observation-filter";
import SITE_CONFIG from "@configs/site-config.json";
import { getMapCenter, stringToFeature } from "@utils/location";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

const FILTER_NAME = "location";

const MapAreaDraw: any = dynamic(
  () => import("naksha-components-react").then((mod: any) => mod.MapAreaDraw),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);

export default function MapDrawContainer() {
  const { filter, addFilter, removeFilter } = useObservationFilter();
  const defaultFeatures = useMemo(() => stringToFeature(filter?.location), []);
  const defaultViewPort = useMemo(() => getMapCenter(2.8), []);

  const handleOnFeatureChange = (features) => {
    if (features.length > 0) {
      addFilter(FILTER_NAME, features[0]?.geometry?.coordinates.toString());
      return;
    }
    removeFilter(FILTER_NAME);
  };

  return (
    <Box position="relative" h="22rem">
      <MapAreaDraw
        defaultViewPort={defaultViewPort}
        defaultFeatures={defaultFeatures}
        mapboxApiAccessToken={SITE_CONFIG.TOKENS.MAPBOX}
        onFeaturesChange={handleOnFeatureChange}
        isPolygon={true}
      />
    </Box>
  );
}
