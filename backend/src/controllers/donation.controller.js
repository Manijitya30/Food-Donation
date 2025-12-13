import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  prisma  from "../config/prisma.js";
import { assignOrganisation } from "../utils/assignOrganisation.js";
import { assignAvailableRider } from "../utils/assignAvailableRider.js";
export const createDonation = async (req, res) => {
  try {
    const donorId = req.user.id; // 🔥 FROM TOKEN

    const { pickupAddress, pickupTime, notes, foodItems } = req.body;

    if (!foodItems || foodItems.length === 0) {
      return res.status(400).json({ message: "At least one food item required" });
    }

    const organisation = await assignOrganisation();
    if (!organisation) {
      return res.status(400).json({ message: "No organisation available" });
    }

    const rider = await assignAvailableRider();

    const donation = await prisma.donation.create({
      data: {
        donorId,
        pickupAddress,
        pickupTime: new Date(pickupTime),
        notes,
        organisationId: organisation.id,
        riderId: rider ? rider.userId : null,
        status: rider ? "ASSIGNED" : "PENDING",
        foodItems: {
          create: foodItems
        }
      },
      include: {
        foodItems: true,
        organisation: true,
        rider: true
      }
    });
    await prisma.rider.update({
  where: { userId: rider.userId },
  data: { isAvailable: false }
});


    res.status(201).json({ message: "Donation created", donation });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error",err});
  }
};

export const getRiderDonations = async (req, res) => {
  try {
    const riderId = req.user.id;

    const donations = await prisma.donation.findMany({
      where: {
        riderId,
        status: { in: ["ASSIGNED", "PICKED_UP", "IN_TRANSIT"] }
      },
      include: {
        foodItems: true,
        donor: true,
        organisation: true
      }
    });

    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const riderAction = async (req, res) => {
  try {
    const donationId = Number(req.params.id);
    const { action } = req.body;
    const riderUserId = req.user.id;

    if (!["ACCEPT", "REJECT"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const donation = await prisma.donation.findUnique({
      where: { id: donationId }
    });

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // 🔒 Ensure only assigned rider can act
    if (donation.riderId !== riderUserId) {
      return res.status(403).json({ message: "Not authorized for this donation" });
    }

    // 🔒 Only allow action if status is ASSIGNED
    if (donation.status !== "ASSIGNED") {
      return res.status(400).json({
        message: `Cannot ${action} donation in ${donation.status} state`
      });
    }

    // ✅ ACCEPT
    if (action === "ACCEPT") {
      return res.json({
        message: "Donation accepted successfully",
        donation
      });
    }
     
  //   await prisma.rider.update({
  //   where: { userId: req.user.id },
  //   data: { isAvailable: true }
  // });// to be done
    // ❌ REJECT
    const newRider = await assignAvailableRider(riderUserId);

    const updatedDonation = await prisma.donation.update({
      where: { id: donationId },
      data: {
        riderId: newRider ? newRider.userId : null,
        status: newRider ? "ASSIGNED" : "PENDING"
      }
    });
    
    return res.json({
      message: newRider
        ? "Donation reassigned to another rider"
        : "No rider available, donation pending",
      donation: updatedDonation
    });

  } catch (err) {
    console.error("RIDER ACTION ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateDonationStatus = async (req, res) => {
  try {
    const donationId = Number(req.params.id);
    const { status } = req.body;

    const donation = await prisma.donation.update({
      where: { id: donationId },
      data: { status }
    });

    res.json({ message: "Status updated", donation });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrganisationDonations = async (req, res) => {
  const organisationUserId = req.user.id;

  const organisation = await prisma.organisation.findUnique({
    where: { userId: organisationUserId }
  });

  const donations = await prisma.donation.findMany({
    where: { organisationId: organisation.id },
    include: {
      donor: true,
      rider: true,
      foodItems: true
    }
  });

  res.json(donations);
};

export const getDonorDonations = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const donorId = req.user.id; // USER ID (correct)

    const donations = await prisma.donation.findMany({
      where: { donorId },
      include: {
        foodItems: true,
        organisation: true,
        rider: true,
      },
    });

    res.json(donations);
  } catch (err) {
    console.error("GET DONOR DONATIONS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
