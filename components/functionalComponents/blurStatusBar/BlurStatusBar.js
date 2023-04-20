import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

function BlurStatusBar() {
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      intensity={60}
      tint="dark"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: insets.top,
        zIndex: 10,
      }}
    />
  );
}

export default BlurStatusBar;
