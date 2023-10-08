import { useEffect } from 'react';
// hooks
import useSettings from '../../hooks/useSettings';
// -----------------------------------------------

export default function SettingMode() {
  const { themeMode } = useSettings();

  useEffect(() => {
    window.document.documentElement.setAttribute("theme", themeMode || "light");
  }, [themeMode])

  return null;
}
