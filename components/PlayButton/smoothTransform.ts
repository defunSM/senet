import { useSpring } from "framer-motion";
import { useTransform } from "framer-motion";

export default function useSmoothTransform(value: any, springOptions: any, transformer: any) {
  return useSpring(useTransform(value, transformer), springOptions);
}
