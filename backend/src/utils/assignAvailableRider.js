export const assignAvailableRider = async (excludeUserId) => {
  const rider = await prisma.rider.findFirst({
    where: {
      userId: { not: excludeUserId },
      isAvailable: true  
    },
    orderBy: {
      updatedAt: "asc"   // fair assignment
    }
  });

  if (!rider) return null;

  return {
    riderId: rider.id,
    userId: rider.userId
  };
};
