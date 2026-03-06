"use client";

import { useState } from "react";
import LandingPage    from "@/screens/LandingPage";
import ModuleSelector from "@/screens/ModuleSelector";
import Module1        from "@/screens/Module1";
import Module2        from "@/screens/Module2";
import Module3        from "@/screens/Module3";
import ProgressPage   from "@/screens/ProgressPage";
import ComingSoon     from "@/components/ComingSoon";
import HowItWorks     from "@/screens/HowItWorks";

export default function Home() {
  const [screen, setScreen] = useState("landing");

  const navigate = (id) => setScreen(id);

  return (
    <>
      {screen === "landing"      && <LandingPage    onNavigate={navigate} />}
      {screen === "how-it-works" && <HowItWorks     onNavigate={navigate} />}
      {screen === "modules"      && <ModuleSelector onNavigate={navigate} />}
      {screen === "module1"      && <Module1        onNavigate={navigate} />}
      {screen === "module2"      && <Module2        onNavigate={navigate} />}
      {screen === "module3"      && <Module3        onNavigate={navigate} />}
      {screen === "progress"     && <ProgressPage   onNavigate={navigate} />}
      {screen === "alerts"       && <ComingSoon title="Notifications" onNavigate={navigate} />}
      {screen === "settings"     && <ComingSoon title="Settings"      onNavigate={navigate} />}
    </>
  );
}

