import { Link, MenuItem, MenuList } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import useGlobalState from "@hooks/use-global-state";
import useTranslation from "@hooks/use-translation";
import notification from "@utils/notification";
import React, { useMemo } from "react";

export default function SubMenu({ rows, onClose, prefix = "" }) {
  const { t } = useTranslation();
  const activeSubMenuItems = useMemo(() => rows.filter(({ active = true }) => active), [rows]);
  const { isCurrentGroupMember, isLoggedIn } = useGlobalState();

  return (
    <MenuList>
      {activeSubMenuItems.map((item, index) => {
        const label = item.name && t(prefix + item.name);
        return (
          <MenuItem key={index}>
            {isLoggedIn && item.memberOnly && !isCurrentGroupMember ? (
              <Link w="full" onClick={() => notification(t("HEADER.MEMBER_ONLY"))}>
                {label}
              </Link>
            ) : (
              <LocalLink href={item.to} params={item.params} prefixGroup={true}>
                <Link w="full" onClick={onClose}>
                  {label}
                </Link>
              </LocalLink>
            )}
          </MenuItem>
        );
      })}
    </MenuList>
  );
}
