type PaletteGroup = Record<string, string>;

export interface Theme {
  name?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  darkBg: string;
  darkerBg: string;
  lightText: string;
  glassOpacity: number;
  palette: {
    primary: PaletteGroup;
    secondary: PaletteGroup;
    neutral: PaletteGroup;
    glass: PaletteGroup;
    gradients: PaletteGroup;
    transition: PaletteGroup;
  };
}
