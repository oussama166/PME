import { Request, Response } from "express";
import { PrismaReservationRepository } from "../Service/Repository/PrismaReservationRepository";
import { ReservationService } from "../Service/ReservationService";
import { handleErrorResponse } from "../../utils/utilsFunc";
import { PrismaMeetingRepository } from "../Service/Repository/PrismaMeetingRepository";
import { PrismaRomRepository } from "../Service/Repository/PrismaRoomRepository";
import { Meeting } from "@prisma/client";

const reservationRepository = new PrismaReservationRepository();
const meetingRepository = new PrismaMeetingRepository();
const roomRepository = new PrismaRomRepository();

const reservationService = new ReservationService(
  reservationRepository,
  meetingRepository,
  roomRepository
);

export const createReservation = async (req: Request, res: Response) => {
  try {
    const getData = req.body;
    if (!getData) {
      return res.status(400).send("Request body is null");
    }

    const reservation = getData as Meeting;
    const result = await reservationService.createReservation(reservation);

    return res.status(201).send(result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

// export const createReservations = async (req: Request, res: Response) => {
//   try {
//     const data = req.body;
//     if (!data || !Array.isArray(data)) {
//       return res
//         .status(400)
//         .send("Request body is null of the you to format to array !!!");
//     }
//     const result = await reservationService.createReservation(data as Meeting);
//     return res.status(201).send(`${result} Reservations added susccefuly`);
//   } catch (error) {
//     handleErrorResponse(res, error);
//   }
// };
export const showReservation = async (req: Request, res: Response) => {
  try {
    const { meetingName, roomName } = req.body;
    if (!meetingName || !roomName) {
      return res.status(400).send("Meeting Name or Room Name is missing");
    }
    const result = await reservationService.showReservation(
      meetingName,
      roomName
    );
    return res.status(200).send(result);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const showReservations = async (req: Request, res: Response) => {
  try {
    const result = await reservationService.showReservations();
    return res.status(200).send(result);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
