import prisma from "../config/prisma.js";

export const assignOrganisation = async () => {
  try {
    const organisation = await prisma.organisation.findFirst({
      where: {
        isActive: true
      },
      orderBy: {
        id: "asc"
      }
    });

    return organisation || null;
  } catch (error) {
    console.error("ASSIGN ORGANISATION ERROR:", error);
    return null;
  }
};
