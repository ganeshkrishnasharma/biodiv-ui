import { Box } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config.json";
import { ENDPOINT } from "@static/constants";
import { getMapCenter } from "@utils/location";
import { ExtendedMarkerProps } from "naksha-components-react";
import dynamic from "next/dynamic";
import React from "react";
import LazyLoad from "react-lazyload";

const Naksha: any = dynamic(
  () => import("naksha-components-react").then((mod: any) => mod.Naksha),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);

// TODO: observation map on click component
const onObservationGridClick = () => <Box maxH="250px" overflow="auto" fontSize="sm"></Box>;

const onObservationGridHover = ({ feature }) => (
  <div>{feature?.properties?.count} Observations</div>
);

interface ClusterMapProps {
  filter;
  latitude?;
  longitude?;
  k?;
  colorHex?;
  borderRadius?;
}

export default function ClusterMap({
  filter,
  latitude,
  longitude,
  k,
  colorHex = "E53E3E",
  borderRadius = "md"
}: ClusterMapProps) {
  const defaultViewPort = React.useMemo(() => getMapCenter(3.1), []);

  return (
    <Box
      h="422px"
      borderRadius={borderRadius}
      overflow="hidden"
      className="gray-box fadeInUp delay-5"
      display="block"
    >
      <LazyLoad height={422} once={true}>
        <Naksha
          mapboxApiAccessToken={SITE_CONFIG.TOKENS.MAPBOX}
          viewPort={defaultViewPort}
          key={k}
          layers={
            filter
              ? [
                  {
                    id: "species-observations",
                    title: "Species Observations",
                    isAdded: true,
                    source: {
                      type: "grid",
                      endpoint: `${ENDPOINT.ESMODULE}/v1/geo/aggregation`
                    },
                    data: {
                      index: "extended_observation",
                      type: "_doc",
                      geoField: "location",
                      ...filter
                    },
                    onHover: onObservationGridHover,
                    onClick: onObservationGridClick
                  }
                ]
              : []
          }
          markers={latitude ? ([{ latitude, longitude, colorHex }] as ExtendedMarkerProps[]) : []}
        />
      </LazyLoad>
    </Box>
  );
}
