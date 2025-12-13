import prisma from "../config/prisma.js";

export const assignOrganisation = async () => {
  try {
    const organisation = await prisma.organisation.findFirst({
      orderBy: {
        id: "asc",
      },
    });

    return organisation;
  } catch (error) {
    console.error("ASSIGN ORGANISATION ERROR:", error);
    return null;
  }
};
