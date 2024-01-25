import { createComponent } from "@lit/react";
import { MdIcon } from "@material/web/icon/icon";
import { MdIconButton } from "@material/web/iconbutton/icon-button";
import { MdTextButton } from "@material/web/button/text-button";
import { MdOutlinedButton } from "@material/web/button/outlined-button";
import { MdOutlinedTextField } from "@material/web/textfield/outlined-text-field";
import { MdFilledTonalIconButton } from "@material/web/iconbutton/filled-tonal-icon-button";
import { MdTabs } from "@material/web/tabs/tabs";
import { MdSecondaryTab } from "@material/web/tabs/secondary-tab";

import React from "react";

export const Md3OutlinedTextField = createComponent({
  tagName: "md-outlined-text-field",
  elementClass: MdOutlinedTextField,
  react: React,
});

export const Md3Icon = createComponent({
  tagName: "md-icon",
  elementClass: MdIcon,
  react: React,
});
export const Md3TextButton = createComponent({
  tagName: "md-text-button",
  elementClass: MdTextButton,
  react: React,
});
export const Md3OutlinedButton = createComponent({
  tagName: "md-outlined-button",
  elementClass: MdOutlinedButton,
  react: React,
});
export const Md3IconButton = createComponent({
  tagName: "md-icon-button",
  elementClass: MdIconButton,
  react: React,
});
export const Md3FilledTonalIconButton = createComponent({
  tagName: "md-filled-tonal-icon-button",
  elementClass: MdFilledTonalIconButton,
  react: React,
});
export const Md3Tabs = createComponent({
  tagName: "md-tabs",
  elementClass: MdTabs,
  react: React,
});
export const Md3SecondaryTab = createComponent({
  tagName: "md-secondary-tab",
  elementClass: MdSecondaryTab,
  react: React,
});
