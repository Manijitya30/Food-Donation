import prisma from "../config/prisma.js";

export const getAdminStats = async (req, res) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear + 1, 0, 1);

    const startOfThisMonth = new Date(currentYear, currentMonth, 1);
    const startOfLastMonth = new Date(currentYear, currentMonth - 1, 1);

    const [
      totalDonations,
      totalDonors,
      totalRiders,
      totalOrganisations,
      recentDonations,
      recentDonors,
      yearDonations,
      deliveredDonations,
      thisMonthCount,
      lastMonthCount,
      categoryCounts
    ] = await Promise.all([
      prisma.donation.count(),

      prisma.user.count({ where: { role: "DONOR" } }),

      prisma.user.count({ where: { role: "RIDER" } }),

      prisma.user.count({ where: { role: "ORGANISATION" } }),

      prisma.donation.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          donor: true,
          organisation: {
            include: { user: true }
          },
          foodItems: true
        }
      }),

      prisma.user.findMany({
        where: { role: "DONOR" },
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, email: true }
      }),

      prisma.donation.findMany({
        where: {
          createdAt: { gte: startOfYear, lt: endOfYear }
        },
        select: { createdAt: true }
      }),

      prisma.donation.findMany({
        where: { status: "DELIVERED" },
        include: { foodItems: true }
      }),

      prisma.donation.count({
        where: {
          createdAt: { gte: startOfThisMonth }
        }
      }),

      prisma.donation.count({
        where: {
          createdAt: {
            gte: startOfLastMonth,
            lt: startOfThisMonth
          }
        }
      }),

      prisma.foodItem.groupBy({
        by: ["category"],
        _count: { _all: true }
      })
    ]);

    /* ---------- Monthly Donations ---------- */
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthlyMap = Array(12).fill(0);

    yearDonations.forEach(d => {
      monthlyMap[new Date(d.createdAt).getMonth()]++;
    });

    const monthlyDonations = monthlyMap.map((count, i) => ({
      month: months[i],
      year: currentYear,
      donations: count
    }));

    /* ---------- Food & Meals ---------- */
    let mealsServed = 0;

    deliveredDonations.forEach(d => {
      d.foodItems.forEach(item => {
        mealsServed += item.quantity || 1;
      });
    });

    const foodSaved = `${mealsServed} meals`;

    /* ---------- Monthly Growth ---------- */
    let monthlyGrowth = "0%";

    if (lastMonthCount > 0) {
      const growth =
        ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100;
      monthlyGrowth = `${growth.toFixed(1)}%`;
    }

    /* ---------- Category Distribution ---------- */
    const categoryDistribution = categoryCounts.map(c => ({
      name: c.category,
      value: c._count._all
    }));

    res.json({
      stats: {
        totalDonations,
        totalDonors,
        totalRiders,
        totalOrganisations,
        foodSaved,
        mealsServed,
        monthlyGrowth
      },
      recentDonations,
      recentDonors,
      monthlyDonations,
      categoryDistribution
    });

  } catch (err) {
    console.error("ADMIN STATS ERROR:", err);
    res.status(500).json({ message: "Admin stats error" });
  }
};
