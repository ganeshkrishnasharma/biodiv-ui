import { AspectRatioBox, Avatar, Box, Button, Flex, VisuallyHidden } from "@chakra-ui/core";
import useTranslation from "@configs/i18n/useTranslation";
import { axUploadResource } from "@services/files.service";
import { axUpdateUserImage } from "@services/user.service";
import { getUserImage } from "@utils/media";
import notification, { NotificationType } from "@utils/notification";
import React, { useState } from "react";

import { UserEditPageComponentProps } from "..";

const VH: any = VisuallyHidden;

export default function UserInfoSidebar({ user }: UserEditPageComponentProps) {
  const [userImage, setUserImage] = useState(getUserImage(user.profilePic, 400));
  const { t } = useTranslation();

  const handleOnPhotoUpload = async (e) => {
    if (e.target.files.length) {
      const r = await axUploadResource(e.target.files[0], "users");
      if (r.success) {
        const { success } = await axUpdateUserImage({ id: user.id, profilePic: r.data });
        if (success) {
          setUserImage(getUserImage(r.data, 400));
          notification(t("USER.UPDATED"), NotificationType.Success);
          return;
        }
      }
    }
    notification(t("USER.UPDATE_ERROR"));
  };

  return (
    <div>
      <Flex
        flexDirection={{ base: "row", md: "column" }}
        alignItems={{ base: "center", md: "initial" }}
        mb={4}
      >
        <AspectRatioBox ratio={1} mb={{ md: 4 }} size={{ base: "4rem", md: "auto" }} flexShrink={0}>
          <Avatar fontSize={{ md: "6xl" }} src={userImage} name={user.name} />
        </AspectRatioBox>
        <Box pl={{ base: 4, md: 0 }}>
          <Button type="button" as="label" cursor="pointer" w="full" variantColor="blue">
            <VH
              as="input"
              type="file"
              id="user-profile"
              accept="image/*"
              onChange={handleOnPhotoUpload}
            />
            {t("USER.UPLOAD_PHOTO")}
          </Button>
        </Box>
      </Flex>
    </div>
  );
}