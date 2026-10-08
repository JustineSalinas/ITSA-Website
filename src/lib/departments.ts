export interface DepartmentTheme {
  pastel: string;
  deep: string;
}

// Every department shares one formula -- a near-white tint (L 0.95, C 0.035)
// over a legible mid-tone (L 0.47, C 0.15-0.17) -- at a hue drawn from
// DESIGN.md's brand family (globals.css's --brand/--brand-cyan/--brand-orange/
// --brand-red hue angles) instead of six unrelated named swatches. That's
// what makes this read as one designed system rather than a generic
// category-tag palette: every card's colors are a tint/shade pair of the
// same ITSA hues used in the hero and footer, just rotated per department.
// Finance's green has no existing brand token to match, so it extends the
// same formula to a new hue rather than reaching for a stock swatch.
export const DEPARTMENT_COLORS: Record<string, DepartmentTheme> = {
  executives: {
    pastel: "oklch(0.95 0.035 254)", // brand blue, tinted
    deep: "oklch(0.47 0.17 254)",
  },
  technology: {
    pastel: "oklch(0.95 0.035 232)", // brand cyan, tinted
    deep: "oklch(0.47 0.15 232)",
  },
  communications: {
    pastel: "oklch(0.95 0.035 52)", // brand orange, tinted
    deep: "oklch(0.47 0.17 52)",
  },
  operations: {
    pastel: "oklch(0.95 0.035 30)", // brand red, tinted
    deep: "oklch(0.47 0.18 30)",
  },
  finance: {
    pastel: "oklch(0.95 0.035 150)", // green, same formula, new hue
    deep: "oklch(0.47 0.15 150)",
  },
  supervisor: {
    pastel: "oklch(0.95 0.01 255)", // near-neutral: faculty sits outside the department system
    deep: "oklch(0.35 0.02 255)",
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
