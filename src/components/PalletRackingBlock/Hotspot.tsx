import { Html } from "@react-three/drei";

const Hotspot = ({
  position,
  onHotspotClick,
  children,
  visible,
}: {
  position: [number, number, number];
  onHotspotClick: () => void;
  children: React.ReactNode;
  visible: boolean;
}) => {
  if (!visible) return null;

  return (
    <Html
      position={position}
      style={{ left: "unset", right: "unset" }}
      zIndexRange={[20, 20]}
    >
      <div
        onClick={onHotspotClick}
        className="animate-scale-pulse flex size-6 cursor-pointer items-center justify-center rounded-full bg-black text-white"
      >
        {children}
      </div>
    </Html>
  );
};

export default Hotspot;
