import prisma from "../config/prisma.js";

export const assignAvailableRider = async () => {
  try {
    const rider = await prisma.rider.findFirst({
      where: {
        isAvailable: true
      },
      orderBy: {
        id: "asc"
      }
    });

    // returns null if no rider available
    return rider;

  } catch (error) {
    console.error("ASSIGN RIDER ERROR:", error);
    return null;
  }
};
