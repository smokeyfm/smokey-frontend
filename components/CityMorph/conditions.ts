export interface CityCondition {
  name: string;
  skyGradient: string;
  skylineFilter: string;
  streetFilter: string;
  overlayColor: string;
  overlayOpacity: number;
  textGlow: string;
  hasRain: boolean;
  hasFog: boolean;
  cityPhotoFilter: string;
  staticOpacity: number;
}

export const conditions: CityCondition[] = [
  {
    name: "dawn",
    skyGradient:
      "linear-gradient(180deg, #1a0a2e 0%, #e8918d 40%, #f4c27f 70%, #fef0d5 100%)",
    skylineFilter: "brightness(0.3) contrast(1.2) sepia(0.3)",
    streetFilter: "brightness(0.4) saturate(0.8)",
    overlayColor: "rgba(235, 139, 139, 0.08)",
    overlayOpacity: 0.15,
    textGlow: "0 0 20px rgba(244, 194, 127, 0.3)",
    hasRain: false,
    hasFog: true,
    cityPhotoFilter: "brightness(0.4) saturate(0.8) hue-rotate(-20deg) blur(10px)",
    staticOpacity: 0.03
  },
  {
    name: "midday",
    skyGradient:
      "linear-gradient(180deg, #1e90ff 0%, #87ceeb 50%, #e0f0ff 100%)",
    skylineFilter: "brightness(0.9) contrast(1.3)",
    streetFilter: "brightness(0.8) saturate(1.1)",
    overlayColor: "rgba(255, 255, 255, 0.05)",
    overlayOpacity: 0.05,
    textGlow: "none",
    hasRain: false,
    hasFog: false,
    cityPhotoFilter: "brightness(0.7) saturate(1.2) blur(10px)",
    staticOpacity: 0.03
  },
  {
    name: "golden-hour",
    skyGradient:
      "linear-gradient(180deg, #1a0a3e 0%, #d4594e 30%, #e8a84c 60%, #f5d89a 100%)",
    skylineFilter:
      "brightness(0.5) contrast(1.1) sepia(0.5) hue-rotate(-10deg)",
    streetFilter: "brightness(0.5) saturate(1.3) sepia(0.3)",
    overlayColor: "rgba(232, 168, 76, 0.1)",
    overlayOpacity: 0.12,
    textGlow: "0 0 15px rgba(232, 168, 76, 0.4)",
    hasRain: false,
    hasFog: false,
    cityPhotoFilter: "brightness(0.5) saturate(1.3) hue-rotate(-30deg) sepia(0.3) blur(10px)",
    staticOpacity: 0.04
  },
  {
    name: "overcast",
    skyGradient:
      "linear-gradient(180deg, #4a4a5a 0%, #6b6b7b 40%, #8a8a9a 100%)",
    skylineFilter: "brightness(0.4) contrast(0.9) saturate(0.5)",
    streetFilter: "brightness(0.35) saturate(0.4)",
    overlayColor: "rgba(100, 100, 120, 0.12)",
    overlayOpacity: 0.2,
    textGlow: "none",
    hasRain: false,
    hasFog: true,
    cityPhotoFilter: "brightness(0.3) saturate(0.4) blur(10px)",
    staticOpacity: 0.04
  },
  {
    name: "rain",
    skyGradient:
      "linear-gradient(180deg, #1a1a2e 0%, #2d2d44 40%, #3a3a55 100%)",
    skylineFilter: "brightness(0.3) contrast(1.1) saturate(0.6)",
    streetFilter: "brightness(0.35) saturate(0.7) contrast(1.2)",
    overlayColor: "rgba(30, 30, 60, 0.15)",
    overlayOpacity: 0.25,
    textGlow: "0 0 10px rgba(100, 149, 237, 0.3)",
    hasRain: true,
    hasFog: false,
    cityPhotoFilter: "brightness(0.2) saturate(0.6) contrast(1.2) blur(10px)",
    staticOpacity: 0.05
  },
  {
    name: "neon-night",
    skyGradient:
      "linear-gradient(180deg, #000011 0%, #0a0a2e 40%, #1a1a3e 100%)",
    skylineFilter: "brightness(0.15) contrast(1.4) saturate(1.5)",
    streetFilter: "brightness(0.2) saturate(1.8) contrast(1.3)",
    overlayColor: "rgba(235, 139, 139, 0.06)",
    overlayOpacity: 0.1,
    textGlow:
      "0 0 20px rgba(235, 139, 139, 0.5), 0 0 40px rgba(235, 139, 139, 0.2)",
    hasRain: false,
    hasFog: false,
    cityPhotoFilter: "brightness(0.3) saturate(1.6) contrast(1.4) blur(10px)",
    staticOpacity: 0.04
  },
  {
    name: "misty-twilight",
    skyGradient:
      "linear-gradient(180deg, #1a0a3e 0%, #4a2a6e 40%, #7a5a9e 70%, #aa8ace 100%)",
    skylineFilter:
      "brightness(0.25) contrast(0.9) saturate(0.7) hue-rotate(20deg)",
    streetFilter: "brightness(0.3) saturate(0.5)",
    overlayColor: "rgba(122, 90, 158, 0.1)",
    overlayOpacity: 0.3,
    textGlow: "0 0 15px rgba(170, 138, 206, 0.4)",
    hasRain: false,
    hasFog: true,
    cityPhotoFilter: "brightness(0.25) saturate(0.7) hue-rotate(20deg) blur(10px)",
    staticOpacity: 0.04
  },
  {
    name: "stormy",
    skyGradient:
      "linear-gradient(180deg, #0a0a15 0%, #1a1a30 30%, #2a2a45 100%)",
    skylineFilter: "brightness(0.2) contrast(1.3) saturate(0.4)",
    streetFilter: "brightness(0.25) saturate(0.5) contrast(1.1)",
    overlayColor: "rgba(20, 20, 40, 0.2)",
    overlayOpacity: 0.3,
    textGlow: "0 0 5px rgba(200, 200, 255, 0.3)",
    hasRain: true,
    hasFog: false,
    cityPhotoFilter: "brightness(0.15) saturate(0.3) contrast(1.3) blur(10px)",
    staticOpacity: 0.06
  }
];
