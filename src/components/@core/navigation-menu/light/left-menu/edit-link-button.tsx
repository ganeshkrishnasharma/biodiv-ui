import { Button } from "@chakra-ui/core";
import LocalLink from "@components/@core/local-link";
import useGlobalState from "@hooks/useGlobalState";
import { adminOrAuthor } from "@utils/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function EditLinkButton({ label }) {
  const {
    currentGroup: { webAddress, id },
    user: { id: authorId }
  } = useGlobalState();
  const { pathname } = useRouter();

  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    setCanEdit(adminOrAuthor(authorId) && id && !pathname.endsWith("edit"));
  }, []);

  return canEdit ? (
    <LocalLink href={`${webAddress}/edit`}>
      <Button className="join-usergroup" leftIcon="edit" m={2} variantColor="blue" size="sm">
        {label}
      </Button>
    </LocalLink>
  ) : null;
}