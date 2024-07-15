"use client";

import getLPTheme from "./getLPTheme";
import { createTheme } from "@mui/material/styles";

const theme = createTheme(getLPTheme("light"));

export default theme;
