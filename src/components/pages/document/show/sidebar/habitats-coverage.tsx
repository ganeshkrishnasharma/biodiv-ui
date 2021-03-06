import { AspectRatio, Box, Image, SimpleGrid } from "@chakra-ui/react";
import BoxHeading from "@components/@core/layout/box-heading";
import useTranslation from "@hooks/use-translation";
import React from "react";

export default function HabitatsCoverage({ habitat }) {
  const { t } = useTranslation();

  return (
    <Box mb={4} className="white-box">
      <BoxHeading>🏜 {t("GROUP.HABITATS_COVERED")}</BoxHeading>
      <SimpleGrid columns={4} spacing={4} p={4}>
        {habitat.map((id) => (
          <AspectRatio ratio={1} key={id}>
            <Image
              overflow="hidden"
              objectFit="cover"
              alt={id}
              src={id}
              bg="gray.200"
              borderRadius="md"
            />
          </AspectRatio>
        ))}
      </SimpleGrid>
    </Box>
  );
}
