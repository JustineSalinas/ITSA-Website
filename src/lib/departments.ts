export interface DepartmentTheme {
  name: string;
  hex: string;
  pastelHex: string;
  deepHex: string;
  roleColorClass: string;
}

export const DEPARTMENT_COLORS: Record<string, {
  name: string;
  hex: string;
  pastelHex: string;
  deepHex: string;
  roleColorClass: string;
}> = {
  executives: {
    name: "Executive",
    hex: "#E9D5FF",      // Pastel Lilac / Violet
    pastelHex: "#E9D5FF",
    deepHex: "#5B21B6",  // Deep Purple
    roleColorClass: "text-[#5B21B6]",
  },
  technology: {
    name: "Technology",
    hex: "#BAE6FD",      // Pastel Sky / Cyan Blue
    pastelHex: "#BAE6FD",
    deepHex: "#1D4ED8",  // Deep Cobalt Blue
    roleColorClass: "text-[#1D4ED8]",
  },
  communications: {
    name: "Communication",
    hex: "#FED7AA",      // Pastel Peach / Warm Coral
    pastelHex: "#FED7AA",
    deepHex: "#C2410C",  // Deep Coral / Orange
    roleColorClass: "text-[#C2410C]",
  },
  finance: {
    name: "Finance",
    hex: "#A7F3D0",      // Pastel Mint / Emerald
    pastelHex: "#A7F3D0",
    deepHex: "#047857",  // Deep Emerald Green
    roleColorClass: "text-[#047857]",
  },
  operations: {
    name: "Operation",
    hex: "#F6C5BC",      // Pastel Brick Red / Warm Terracotta
    pastelHex: "#F6C5BC",
    deepHex: "#B23B2A",  // Deep Brick Red
    roleColorClass: "text-[#B23B2A]",
  },
  supervisor: {
    name: "Supervisor",
    hex: "#E2E8F0",      // Pastel Slate
    pastelHex: "#E2E8F0",
    deepHex: "#1F2937",  // Deep Charcoal
    roleColorClass: "text-[#1F2937]",
  },
};

export function normalizeDepartmentId(id?: string): string {
  if (!id) return "executives";
  const lower = id.toLowerCase().trim();
  if (lower.startsWith("exec")) return "executives";
  if (lower.startsWith("tech")) return "technology";
  if (
    lower.startsWith("comm") ||
    lower.startsWith("creative") ||
    lower.startsWith("docu")
  ) {
    return "communications";
  }
  if (lower.startsWith("fin")) return "finance";
  if (
    lower.startsWith("oper") ||
    lower.startsWith("ops") ||
    lower.startsWith("event")
  ) {
    return "operations";
  }
  if (lower.startsWith("super") || lower.startsWith("facul")) {
    return "supervisor";
  }
  return "executives";
}

export function resolveOfficerDepartment(officer: {
  position: string;
  name?: string;
  section?: string;
}): string {
  if (
    officer.position.includes("Supervisor") ||
    (officer.name && officer.name.includes("Aguilar")) ||
    officer.section?.toLowerCase() === "faculty"
  ) {
    return "supervisor";
  }
  if (
    officer.position === "Chairman" ||
    officer.position === "President" ||
    officer.position.includes("Vice Chairman") ||
    officer.position.includes("Vice President") ||
    officer.position.includes("Secretary")
  ) {
    return "executives";
  }
  if (
    officer.position.includes("Technology") ||
    officer.position.includes("Developer") ||
    officer.position.includes("Security") ||
    officer.position.includes("Hardware") ||
    officer.position.includes("IoT") ||
    officer.position.includes("Web") ||
    officer.position.includes("Mobile") ||
    officer.position.includes("Project") ||
    officer.position.includes("Cyber")
  ) {
    return "technology";
  }
  if (
    officer.section === "Communications" ||
    officer.section === "Creatives" ||
    officer.section === "Documentation" ||
    officer.position.includes("Communication") ||
    officer.position.includes("Creatives") ||
    officer.position.includes("Documentation")
  ) {
    return "communications";
  }
  if (
    officer.section === "Operations" ||
    officer.position.includes("Operation") ||
    officer.position.includes("Events")
  ) {
    return "operations";
  }
  if (officer.section === "Finance" || officer.position.includes("Finance")) {
    return "finance";
  }
  return "executives";
}

export function getDepartmentTheme(
  departmentIdOrOfficer?: string | { position: string; name?: string; section?: string }
) {
  let normalizedId = "executives";
  if (typeof departmentIdOrOfficer === "string") {
    normalizedId = normalizeDepartmentId(departmentIdOrOfficer);
  } else if (departmentIdOrOfficer && typeof departmentIdOrOfficer === "object") {
    normalizedId = resolveOfficerDepartment(departmentIdOrOfficer);
  }
  return DEPARTMENT_COLORS[normalizedId] ?? DEPARTMENT_COLORS.executives;
}
