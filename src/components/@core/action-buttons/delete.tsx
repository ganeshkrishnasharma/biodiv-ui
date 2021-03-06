import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { useLocalRouter } from "@components/@core/local-link";
import useTranslation from "@hooks/use-translation";
import DeleteIcon from "@icons/delete";
import notification, { NotificationType } from "@utils/notification";
import React from "react";

import SimpleActionButton from "./simple";

export default function DeleteActionButton({
  observationId,
  deleteFunc,
  title,
  description,
  deleted
}) {
  const { t } = useTranslation();
  const router = useLocalRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = React.useRef();

  const handleOnDelete = async () => {
    const { success } = await deleteFunc(observationId);
    if (success) {
      notification(deleted, NotificationType.Success);
      onClose();
      router.push("/", true);
    }
  };

  return (
    <>
      <SimpleActionButton onClick={onOpen} icon={<DeleteIcon />} title={title} colorScheme="red" />
      <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              🗑️ {title}
            </AlertDialogHeader>

            <AlertDialogBody>{description}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t("CANCEL")}
              </Button>
              <Button colorScheme="red" onClick={handleOnDelete} ml={3}>
                {t("DELETE")}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
