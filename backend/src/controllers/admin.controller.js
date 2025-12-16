import prisma from "../config/prisma.js";

/* ================= ADMIN STATS ================= */

export const getAdminStats = async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const month =
      req.query.month !== undefined && req.query.month !== ""
        ? parseInt(req.query.month)
        : null;

    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year + 1, 0, 1);

    const startOfThisMonth =
      month !== null ? new Date(year, month, 1) : null;
    const startOfNextMonth =
      month !== null ? new Date(year, month + 1, 1) : null;

    const prevMonthStart =
      month === 0
        ? new Date(year - 1, 11, 1)
        : month !== null
        ? new Date(year, month - 1, 1)
        : null;

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
          organisation: { include: { user: true } },
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
        where: { createdAt: { gte: startOfYear, lt: endOfYear } },
        select: { createdAt: true }
      }),

      prisma.donation.findMany({
        where: { status: "DELIVERED" },
        include: { foodItems: true }
      }),

      month !== null
        ? prisma.donation.count({
            where: {
              createdAt: { gte: startOfThisMonth, lt: startOfNextMonth }
            }
          })
        : Promise.resolve(0),

      month !== null
        ? prisma.donation.count({
            where: {
              createdAt: { gte: prevMonthStart, lt: startOfThisMonth }
            }
          })
        : Promise.resolve(0),

      prisma.foodItem.groupBy({
        by: ["category"],
        _count: { _all: true }
      })
    ]);

    /* ---------- Monthly Donations ---------- */
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const monthlyMap = Array(12).fill(0);
    yearDonations.forEach(d => {
      monthlyMap[new Date(d.createdAt).getMonth()]++;
    });

    const monthlyDonations = monthlyMap.map((count, i) => ({
      month: months[i],
      year,
      donations: count
    }));

    /* ---------- Meals ---------- */
    let mealsServed = 0;
    deliveredDonations.forEach(d => {
      d.foodItems.forEach(item => {
        mealsServed += item.quantity ?? 1;
      });
    });

    const foodSaved = `${mealsServed} meals`;

    /* ---------- Growth ---------- */
    let monthlyGrowth = "0%";
    if (lastMonthCount === 0 && thisMonthCount > 0) {
      monthlyGrowth = "100%";
    } else if (lastMonthCount > 0) {
      const growth =
        ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100;
      monthlyGrowth = `${growth.toFixed(1)}%`;
    }

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


export const getAllDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        donor: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        foodItems: true
      }
    });

    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch donations" });
  }
};
export const getDonationById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid donation id" });
    }

    const donation = await prisma.donation.findUnique({
      where: { id },
      include: {
        donor: {
          select: { id: true, name: true, email: true }
        },
        organisation: {
          include: { user: true }
        },
        rider: {
          select: { id: true, name: true }
        },
        foodItems: true
      }
    });

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch donation" });
  }
};




export const getAllDonors = async (req, res) => {
  try {
    const donors = await prisma.user.findMany({
      where: { role: "DONOR" },
      select: { id: true, name: true, email: true }
    });
    res.json(donors);
  } catch {
    res.status(500).json({ message: "Failed to fetch donors" });
  }
};
export const getDonorById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid donor id" });
    }

    const donor = await prisma.user.findUnique({
      where: { id },
      include: {
        donationsGiven: {
          include: {
            foodItems: true
          }
        }
      }
    });

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.json({
      id: donor.id,
      name: donor.name,
      email: donor.email,
      donations: donor.donationsGiven
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch donor" });
  }
};



export const getAllRiders = async (req, res) => {
  try {
    const riders = await prisma.user.findMany({
      where: { role: "RIDER" },
      select: { id: true, name: true, email: true }
    });
    res.json(riders);
  } catch {
    res.status(500).json({ message: "Failed to fetch riders" });
  }
};

export const getRiderById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid rider id" });
    }

    const rider = await prisma.user.findUnique({
      where: { id },
      include: {
        donationsRide: true
      }
    });

    if (!rider) {
      return res.status(404).json({ message: "Rider not found" });
    }

    res.json(rider);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch rider" });
  }
};


export const getAllOrganisations = async (req, res) => {
  try {
    const orgs = await prisma.user.findMany({
      where: { role: "ORGANISATION" },
      select: { id: true, name: true, email: true }
    });
    res.json(orgs);
  } catch {
    res.status(500).json({ message: "Failed to fetch organisations" });
  }
};
export const getOrganisationById = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: "Invalid organisation user id" });
    }

    const org = await prisma.organisation.findUnique({
      where: { userId },
      include: {
        user: true,
        donations: {
          include: { foodItems: true }
        }
      }
    });

    if (!org) {
      return res.status(404).json({ message: "Organisation not found" });
    }

    res.json(org);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch organisation" });
  }
};

