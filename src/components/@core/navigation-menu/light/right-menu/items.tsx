import SITE_CONFIG from "@configs/site-config.json";

import PagesMenuItem from "./pages-menu-item";

export default [
  {
    active: SITE_CONFIG.SPECIES.ACTIVE,
    name: "HEADER.MENU_SECONDARY.SPECIES.",
    rows: [
      {
        name: "SPECIES_PAGES",
        to: "/species/list"
      },
      {
        name: "TAXON_NAMELIST",
        to: "/namelist/index"
      },
      {
        name: "SPECIES_TRAITS",
        to: "/species/traits"
      },
      {
        name: "SPECIES_DATATABLES",
        params: {
          type: "species"
        },
        to: "/dataTable/list"
      }
    ]
  },
  {
    active: SITE_CONFIG.OBSERVATION.ACTIVE,
    name: "HEADER.MENU_SECONDARY.OBSERVATION.",
    rows: [
      {
        name: "OBSERVATIONS",
        to: "/observation/list"
      },
      {
        name: "CHECKLISTS",
        to: "/checklist/index"
      },
      {
        name: "DATASETS",
        to: "/datasource/list"
      },
      {
        name: "OBSERVATION_TRAITS",
        to: "/observation/traits"
      },
      {
        name: "OBSERVATION_DATATABLES",
        params: {
          type: "observations"
        },
        to: "/dataTable/list"
      }
    ]
  },
  {
    active: SITE_CONFIG.MAP.ACTIVE,
    name: "HEADER.MENU_SECONDARY.MAPS.",
    to: "/map"
  },
  {
    active: SITE_CONFIG.DOCUMENT.ACTIVE,
    name: "HEADER.MENU_SECONDARY.DOCUMENTS.",
    rows: [
      {
        name: "DOCUMENTS",
        to: "/document/list"
      },
      {
        name: "DOCUMENT_DATATABLES",
        params: {
          type: "documents"
        },
        to: "/dataTable/list"
      }
    ]
  },
  {
    active: SITE_CONFIG.LANDSCAPE.ACTIVE,
    name: "HEADER.MENU_SECONDARY.LANDSCAPES.",
    to: "/landscape/list"
  },
  {
    active: SITE_CONFIG.PAGES.ACTIVE,
    cell: PagesMenuItem,
    name: "HEADER.MENU_SECONDARY.PAGES."
  },
  {
    name: "HEADER.MENU_SECONDARY.MORE.",
    rows: [
      {
        active: SITE_CONFIG.ACTIVITY.ACTIVE,
        name: "ACTIVITY",
        to: "/activityFeed/list"
      },
      {
        active: SITE_CONFIG.DISCUSSION.ACTIVE,
        name: "DISCUSSIONS",
        to: "/discussion/list"
      },
      {
        active: SITE_CONFIG.DATASET.ACTIVE,
        name: "DATASETS",
        to: "/dataset/list"
      },
      {
        active: SITE_CONFIG.PARTICIPANTS.ACTIVE,
        name: "PARTICIPANTS",
        to: "/user/list"
      },
      {
        active: SITE_CONFIG.LEADERBOARD.ACTIVE,
        name: "LEADERBOARD",
        to: "/user/leaderboard"
      },
      {
        active: SITE_CONFIG.DASHBOARD.ACTIVE,
        name: "DASHBOARD",
        to: "/chart/show"
      },
      {
        active: SITE_CONFIG.ABOUT.ACTIVE,
        name: "ABOUT_US",
        to: "/about"
      }
    ]
  }
];
