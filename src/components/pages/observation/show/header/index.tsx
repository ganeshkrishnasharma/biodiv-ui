import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import DeleteActionButton from "@components/@core/action-buttons/delete";
import FlagActionButton from "@components/@core/action-buttons/flag";
import FollowActionButton from "@components/@core/action-buttons/follow";
import ShareActionButton from "@components/@core/action-buttons/share";
import SimpleActionButton from "@components/@core/action-buttons/simple";
import { useLocalRouter } from "@components/@core/local-link";
import useGlobalState from "@hooks/use-global-state";
import useTranslation from "@hooks/use-translation";
import EditIcon from "@icons/edit";
import { ShowData } from "@interfaces/observation";
import {
  axDeleteObservation,
  axFlagObservation,
  axFollowObservation,
  axUnFlagObservation
} from "@services/observation.service";
import { RESOURCE_SIZE } from "@static/constants";
import { adminOrAuthor } from "@utils/auth";
import { formatDateReadableFromUTC } from "@utils/date";
import { getObservationImage } from "@utils/media";
import { NextSeo } from "next-seo";
import React, { useEffect, useMemo, useState } from "react";

import Breadcrumbs from "../breadcrumbs";
import ObservationStatusBadge from "../status-badge";

interface IHeaderProps {
  o: ShowData;
  following?: boolean;
}

function Header({ o, following = false }: IHeaderProps) {
  const { t } = useTranslation();
  const router = useLocalRouter();
  const { isLoggedIn, user } = useGlobalState();
  const [showActions, setShowActions] = useState(false);

  const pageTitle = `${o.recoIbp?.scientificName || t("OBSERVATION.UNKNOWN")} by ${
    o.authorInfo.name
  } on ${formatDateReadableFromUTC(o.observation.fromDate)}`;

  const pageDescription = `${o.recoIbp?.scientificName || t("OBSERVATION.UNKNOWN")} Observed by ${
    o.authorInfo.name
  } at ${o.observation.placeName} on ${formatDateReadableFromUTC(o.observation.fromDate)}`;

  const reprImage: any = useMemo(() => {
    if (o.observation.reprImageId) {
      const r = o.observationResource.find((i) => i.resource.id === o.observation.reprImageId);
      return getObservationImage(r?.resource.fileName, RESOURCE_SIZE.TWITTER);
    }
  }, []);

  useEffect(() => {
    setShowActions(adminOrAuthor(o.authorInfo.id));
  }, [isLoggedIn]);

  const handleOnEdit = () => router.push(`/observation/edit/${o.observation.id}`, true);

  return (
    <>
      <NextSeo
        openGraph={{
          title: pageTitle,
          images: reprImage && [{ url: reprImage }],
          description: pageDescription
        }}
        title={pageTitle}
      />
      <SimpleGrid columns={[1, 1, 4, 4]} mb={4} className="fadeInUp">
        <Box gridColumn="1 / 4">
          <Heading as="h1" size="xl" mb={2}>
            <Text as="i" mr={2}>
              {o.recoIbp?.scientificName || t("OBSERVATION.UNKNOWN")}
            </Text>
            <ObservationStatusBadge
              reco={o.recoIbp}
              maxVotedRecoId={o.observation.maxVotedRecoId}
            />
          </Heading>
          {o.recoIbp?.commonName && (
            <Heading as="h2" size="lg">
              {o.recoIbp?.commonName}
            </Heading>
          )}
        </Box>
        <Flex alignItems="top" justifyContent={["flex-start", "flex-end"]}>
          {showActions && (
            <SimpleActionButton
              icon={<EditIcon />}
              title={t("OBSERVATION.EDIT_OBSERVATION")}
              onClick={handleOnEdit}
              colorScheme="teal"
            />
          )}
          <FollowActionButton
            following={following}
            resourceId={o.observation.id}
            toggleFollowFunc={axFollowObservation}
            followTitle={t("OBSERVATION.FOLLOW_OBSERVATION")}
            unFollowTitle={t("OBSERVATION.UNFOLLOW_OBSERVATION")}
          />
          <FlagActionButton
            resourceId={o.observation.id}
            initialFlags={o.flag}
            userId={user.id}
            flagFunc={axFlagObservation}
            unFlagFunc={axUnFlagObservation}
          />
          {showActions && (
            <DeleteActionButton
              observationId={o.observation.id}
              title={t("OBSERVATION.REMOVE.TITLE")}
              description={t("OBSERVATION.REMOVE.DESCRIPTION")}
              deleted={t("OBSERVATION.REMOVE.SUCCESS")}
              deleteFunc={axDeleteObservation}
            />
          )}
          <ShareActionButton text={pageDescription} title={t("OBSERVATION.SHARE")} />
        </Flex>
      </SimpleGrid>
      <Breadcrumbs crumbs={o.recoIbp?.breadCrumbs} />
    </>
  );
}

export default Header;
